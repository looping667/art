import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  getStyleById,
  buildFinalPrompt,
  type SubjectAnalysis,
} from "@/lib/styles";
import { v4 as uuidv4 } from "uuid";

export const maxDuration = 60;

// Fast text model for preprocessing (vs the slow image-gen model)
const TEXT_MODEL = "gemini-2.5-flash";
const IMAGE_MODEL = "gemini-3-pro-image-preview";

async function analyzeAndAdaptSubject(
  ai: GoogleGenAI,
  userSubject: string,
  styleId: string
): Promise<SubjectAnalysis> {
  const style = getStyleById(styleId);
  const isNamedStyle = style && styleId !== "free";

  // Named styles: lean enrichment (template already contains technique/palette/lighting)
  // Free style: rich enrichment (needs all fields)
  const systemPrompt = isNamedStyle
    ? `You are an art historian helping adapt a subject to fit ${style.styleName}'s world.
${style.styleContext}
${style.id === "hockney" ? 'IMPORTANT: Hockney is a living artist — NEVER name him. Anchors must use period/movement only (e.g. "1960s California pool paintings").' : ""}

TASKS:
1. Translate subject to English if needed.
2. Adapt it in 1-2 English sentences to this painter's world — keep the user's core idea but place it in a scene this artist would naturally have painted.
3. Pick 2 famous paintings by this artist as style anchors.
4. Detect if human figures are present (true/false).

Respond in compact JSON only:
{"adapted_subject":"...","anchor_paintings":["...","..."],"has_figures":false}`
    : `You are a world-class art director. Transform ANY input into a rich painting prompt.

Analyze the user's text:
- If they mention a specific artist, use your deep art history knowledge of that artist's technique, palette, and universe.
- If living artist (born after 1930, no death date), describe by movement/period only — do NOT name them.
- If no artist, pick a painterly style fitting the subject.

TASKS (be CONCISE — 1 sentence per field):
1. Translate + enrich subject in 2 English sentences (vivid scene with atmosphere).
2. Painting technique: 1 sentence on brushwork, medium, surface.
3. Palette: 4-5 specific color names (no hex).
4. Lighting: 1 sentence on direction, quality, temperature.
5. Composition: 1 sentence on framing and focal point.
6. 2 famous paintings as style anchors.
7. Has human figures (true/false).

Respond in compact JSON only:
{"adapted_subject":"...","painting_technique":"...","color_palette":"...","lighting":"...","composition":"...","anchor_paintings":["...","..."],"has_figures":false}`;

  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: userSubject,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      temperature: 0.5,
      maxOutputTokens: isNamedStyle ? 400 : 800,
    },
  });

  const content = response.text;

  const emptyAnalysis: SubjectAnalysis = {
    adapted_subject: userSubject,
    painting_technique: "",
    color_palette: "",
    lighting: "",
    composition: "",
    anchor_paintings: [],
    has_figures: false,
  };

  if (!content) return emptyAnalysis;

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    console.error("Failed to parse enrichment JSON:", content.slice(0, 300));
    return emptyAnalysis;
  }

  return {
    adapted_subject: parsed.adapted_subject || userSubject,
    painting_technique: parsed.painting_technique || "",
    color_palette: parsed.color_palette || "",
    lighting: parsed.lighting || "",
    composition: parsed.composition || "",
    anchor_paintings: Array.isArray(parsed.anchor_paintings)
      ? parsed.anchor_paintings.slice(0, 2)
      : [],
    has_figures: Boolean(parsed.has_figures),
  };
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, sessionId } = await req.json();

    if (!prompt || !style || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Step 1: Lean/rich enrichment via fast text model
    const analysis = await analyzeAndAdaptSubject(ai, prompt, style);

    // Step 2: Build final prompt from template or analysis
    const enrichedPrompt = buildFinalPrompt(analysis, style);

    // Step 3: Generate image with the image model
    let imageResponse;
    try {
      imageResponse = await ai.models.generateContent({
        model: IMAGE_MODEL,
        contents: enrichedPrompt,
        config: {
          responseModalities: ["IMAGE"],
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "2K",
          },
        },
      });
    } catch (imgErr) {
      const imgMsg =
        imgErr instanceof Error ? imgErr.message : "Image generation failed";
      console.error("Gemini image error:", imgMsg);
      return NextResponse.json(
        { error: `Image generation failed: ${imgMsg}` },
        { status: 500 }
      );
    }

    const parts = imageResponse.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find(
      (p: { inlineData?: unknown }) => p.inlineData
    ) as { inlineData: { data: string; mimeType: string } } | undefined;

    if (!imagePart?.inlineData) {
      console.error(
        "No image in Gemini response:",
        JSON.stringify(imageResponse.candidates?.[0] ?? {}).slice(0, 500)
      );
      return NextResponse.json(
        { error: "No image generated — the model returned no image data" },
        { status: 500 }
      );
    }

    const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
    const mimeType = imagePart.inlineData.mimeType ?? "image/png";
    const ext = mimeType.includes("webp") ? "webp" : "png";
    const fileName = `${uuidv4()}.${ext}`;

    const { error: uploadError } = await getSupabaseAdmin()
      .storage.from("paintings")
      .upload(fileName, imageBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to store image" },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = getSupabaseAdmin().storage.from("paintings").getPublicUrl(fileName);

    const { data: generation, error: dbError } = await getSupabaseAdmin()
      .from("generations")
      .insert({
        user_session_id: sessionId,
        prompt_original: prompt,
        style_choisi: style,
        prompt_enrichi: enrichedPrompt,
        revised_prompt: null,
        image_url: publicUrl,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json(
        { error: "Failed to save generation" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: publicUrl,
      generationId: generation.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Generate error:", message);
    return NextResponse.json(
      { error: `Generation failed: ${message}` },
      { status: 500 }
    );
  }
}
