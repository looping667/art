import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  getStyleById,
  getAspectRatio,
  buildFinalPrompt,
  type SubjectAnalysis,
} from "@/lib/styles";
import { v4 as uuidv4 } from "uuid";

async function analyzeAndAdaptSubject(
  ai: GoogleGenAI,
  userSubject: string,
  styleId: string
): Promise<SubjectAnalysis> {
  const style = getStyleById(styleId);
  const isNamedStyle = style && styleId !== "free";

  const styleContextBlock = isNamedStyle
    ? `PREDEFINED STYLE: ${style.styleName}
${style.styleContext}
You MUST adapt the subject to this painter's universe and artistic world.${style.id === "hockney" ? "\nIMPORTANT: This is a living artist. Do NOT use the artist's name anywhere in your output. Describe by movement and period instead (e.g. \"1960s California Pop Art pool paintings\")." : ""}`
    : `FREE STYLE: No predefined painter. Analyze the user's text carefully:
- If they mention a specific artist or painter name, use your deep art history knowledge to describe that artist's style, technique, palette, and universe. Research the artist thoroughly.
- If they mention an art movement (impressionism, cubism, etc.), describe that movement's visual characteristics.
- If no artist or movement is mentioned, choose a painterly style that best suits the subject described.
IMPORTANT: If the detected artist is still living (born after 1930 with no known death date), do NOT use their name in adapted_subject or anchor_paintings. Describe their style by movement and period without naming them.`;

  const systemPrompt = `You are a world-renowned art director and art historian. Your mission is to transform ANY user input — even a single word — into a master-level painting prompt.

${styleContextBlock}

YOUR TASKS:
1. TRANSLATE: If the text is not in English, translate it to English.
2. ENRICH THE SCENE: Transform the user's text into a vivid, detailed 2-3 sentence painting scene description. Add atmosphere, time of day, specific visual details, emotional mood. Even a minimal input like "a cat" must become a complete, painterly scene.
3. PAINTING TECHNIQUE: Describe the brushwork, paint application, texture, medium, and surface finish in detail (e.g. "thick impasto highlights with thin transparent glazes in the shadows, visible canvas weave").
4. COLOR PALETTE: Describe the palette using color names only — NEVER hex codes. Be specific (e.g. "warm cadmium yellow, deep ultramarine blue, burnt sienna" not just "warm colors").
5. LIGHTING: Describe the quality, direction, temperature, and atmosphere of the light (e.g. "low-angle golden afternoon light from the left casting long violet shadows").
6. COMPOSITION: Describe the framing, perspective, focal point placement, and spatial structure (e.g. "wide horizontal composition with a low horizon line, subject placed at the right third").
7. ANCHOR PAINTINGS: Name 2-3 actual famous paintings that are closest in subject or mood — these serve as visual style references.
8. FIGURES: Detect whether the scene contains human figures or people.
9. ORIENTATION: Determine the best painting orientation (landscape or portrait) for this scene.
10. ARTIST DETECTION: If the user mentioned a specific artist (in free style mode), identify them. Otherwise null.

Respond in JSON only:
{
  "adapted_subject": "2-3 sentence vivid scene description in English",
  "painting_technique": "detailed brushwork and technique description",
  "color_palette": "specific color names describing the palette",
  "lighting": "detailed lighting description",
  "composition": "framing and composition description",
  "anchor_paintings": ["Famous Painting Title 1", "Famous Painting Title 2"],
  "has_figures": true or false,
  "orientation": "landscape" or "portrait",
  "detected_artist": "Artist Name or null"
}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: userSubject,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      temperature: 0.7,
      maxOutputTokens: 600,
    },
  });

  const content = response.text;
  const fallbackOrientation = style?.defaultOrientation ?? "landscape";

  if (!content) {
    return {
      adapted_subject: userSubject,
      painting_technique: "",
      color_palette: "",
      lighting: "",
      composition: "",
      anchor_paintings: [],
      has_figures: false,
      orientation: fallbackOrientation,
      detected_artist: null,
    };
  }

  const parsed = JSON.parse(content);
  return {
    adapted_subject: parsed.adapted_subject || userSubject,
    painting_technique: parsed.painting_technique || "",
    color_palette: parsed.color_palette || "",
    lighting: parsed.lighting || "",
    composition: parsed.composition || "",
    anchor_paintings: Array.isArray(parsed.anchor_paintings)
      ? parsed.anchor_paintings
      : [],
    has_figures: Boolean(parsed.has_figures),
    orientation: parsed.orientation === "portrait" ? "portrait" : "landscape",
    detected_artist: parsed.detected_artist || null,
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

    // Step 1: Enrich the subject with Gemini (art direction + adaptation)
    const analysis = await analyzeAndAdaptSubject(ai, prompt, style);

    // Step 2: Build the final prompt with narrative template + painting anchors
    const enrichedPrompt = buildFinalPrompt(analysis, style);

    // Step 3: Determine aspect ratio (style default + subject override)
    const aspectRatio = getAspectRatio(style, analysis.orientation);

    // Step 4: Generate image with Gemini
    const imageResponse = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: enrichedPrompt,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: "2K",
        },
      },
    });

    const parts = imageResponse.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find(
      (p: { inlineData?: unknown }) => p.inlineData
    ) as { inlineData: { data: string; mimeType: string } } | undefined;

    if (!imagePart?.inlineData) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    // Upload base64 image directly to Supabase Storage
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

    // Save generation to database
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
