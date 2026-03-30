import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getStyleById, getImageSize, buildFinalPrompt } from "@/lib/styles";
import { v4 as uuidv4 } from "uuid";

interface SubjectAnalysis {
  adapted_subject: string;
  anchor_paintings: string[];
  has_figures: boolean;
  orientation: "landscape" | "portrait";
}

async function analyzeAndAdaptSubject(
  openai: OpenAI,
  userSubject: string,
  styleId: string
): Promise<SubjectAnalysis> {
  const style = getStyleById(styleId);

  if (!style || styleId === "free") {
    // For free style, just translate to English
    const translation = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Translate the following text to English. Output only the translated text, nothing else. If the text is already in English, return it unchanged.",
        },
        { role: "user", content: userSubject },
      ],
      temperature: 0,
      max_tokens: 200,
    });

    return {
      adapted_subject:
        translation.choices[0]?.message?.content?.trim() ?? userSubject,
      anchor_paintings: [],
      has_figures: false,
      orientation: "landscape",
    };
  }

  // Use gpt-4o for better art direction
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an expert art historian and painting director. Your job is to take a user's painting subject and adapt it to fit naturally within a specific painter's universe.

Painter: ${style.styleName}
Context: ${style.styleContext}

Instructions:
1. Translate the user's subject to English if needed.
2. Rewrite the subject as a vivid 2-3 sentence scene description that this painter would naturally have painted. Include specific compositional framing and time-of-day or lighting conditions this painter favored. Keep the user's core idea but transform it into something coherent with this painter's world.
3. Name 2-3 actual famous paintings by this artist that are closest in subject matter or mood to what the user wants. These will be used as visual style anchors in the prompt.${style.id === "hockney" ? " IMPORTANT: Do NOT use the artist name — describe by movement and period instead (e.g. \"1960s California Pop Art pool paintings\")." : ""}
4. Determine if the adapted scene contains human figures or people.
5. Determine the best painting orientation (landscape or portrait) for this specific scene.

Respond in JSON only:
{
  "adapted_subject": "2-3 sentence vivid scene description in English",
  "anchor_paintings": ["Famous Painting Title 1", "Famous Painting Title 2"],
  "has_figures": true or false,
  "orientation": "landscape" or "portrait"
}`,
      },
      { role: "user", content: userSubject },
    ],
    temperature: 0.7,
    max_tokens: 400,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    return {
      adapted_subject: userSubject,
      anchor_paintings: [],
      has_figures: false,
      orientation: style.defaultOrientation,
    };
  }

  const parsed = JSON.parse(content) as SubjectAnalysis;
  return {
    adapted_subject: parsed.adapted_subject || userSubject,
    anchor_paintings: Array.isArray(parsed.anchor_paintings)
      ? parsed.anchor_paintings
      : [],
    has_figures: Boolean(parsed.has_figures),
    orientation: parsed.orientation === "portrait" ? "portrait" : "landscape",
  };
}

// Prefix that reduces DALL-E 3's tendency to rewrite and dilute the prompt
const DALLE_PREFIX =
  "I NEED to test how the tool works with extremely specific prompts. DO NOT add any detail, just use it AS-IS:\n\n";

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, sessionId } = await req.json();

    if (!prompt || !style || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Step 1: Translate + adapt subject to painter's universe + get anchor paintings
    const analysis = await analyzeAndAdaptSubject(openai, prompt, style);

    // Step 2: Build the final prompt with narrative template + painting anchors
    const enrichedPrompt = buildFinalPrompt(
      analysis.adapted_subject,
      style,
      analysis.has_figures,
      analysis.anchor_paintings
    );

    // Step 3: Determine image size (style default + subject override)
    const imageSize = getImageSize(style, analysis.orientation);

    // Step 4: Generate image with DALL-E 3 (with anti-rewrite prefix)
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: DALLE_PREFIX + enrichedPrompt,
      n: 1,
      size: imageSize,
      quality: "hd",
      style: "natural",
    });

    const dalleUrl = response.data?.[0]?.url;
    const revisedPrompt = response.data?.[0]?.revised_prompt ?? null;

    if (!dalleUrl) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    // Download the image and upload to Supabase Storage
    const imageResponse = await fetch(dalleUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const fileName = `${uuidv4()}.png`;

    const { error: uploadError } = await getSupabaseAdmin()
      .storage.from("paintings")
      .upload(fileName, imageBuffer, {
        contentType: "image/png",
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

    // Save generation to database (including revised_prompt for debugging)
    const { data: generation, error: dbError } = await getSupabaseAdmin()
      .from("generations")
      .insert({
        user_session_id: sessionId,
        prompt_original: prompt,
        style_choisi: style,
        prompt_enrichi: enrichedPrompt,
        revised_prompt: revisedPrompt,
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
