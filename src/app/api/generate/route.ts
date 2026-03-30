import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getStyleById, getImageSize, buildFinalPrompt } from "@/lib/styles";
import { v4 as uuidv4 } from "uuid";

interface SubjectAnalysis {
  adapted_subject: string;
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
      has_figures: false,
      orientation: "landscape",
    };
  }

  // Combined call: translate + adapt to painter's universe + classify
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an art director specializing in classical painting. Your job is to take a user's painting subject and adapt it to fit naturally within a specific painter's universe.

Painter: ${style.styleName}
Context: ${style.styleContext}

Instructions:
1. Translate the user's subject to English if needed
2. Rewrite the subject so it fits naturally within this painter's world, themes, era, and iconography
3. Keep the user's core idea but transform it into something the painter would actually have painted
4. Determine if the adapted subject contains human figures/people
5. Determine the best orientation (landscape or portrait) for this specific subject

Respond in JSON format only:
{
  "adapted_subject": "the rewritten subject in English, 1-2 sentences max",
  "has_figures": true/false,
  "orientation": "landscape" or "portrait"
}`,
      },
      { role: "user", content: userSubject },
    ],
    temperature: 0.7,
    max_tokens: 300,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    return {
      adapted_subject: userSubject,
      has_figures: false,
      orientation: style.defaultOrientation,
    };
  }

  const parsed = JSON.parse(content) as SubjectAnalysis;
  return {
    adapted_subject: parsed.adapted_subject || userSubject,
    has_figures: Boolean(parsed.has_figures),
    orientation: parsed.orientation === "portrait" ? "portrait" : "landscape",
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

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Step 1: Translate + adapt subject to painter's universe + classify
    const analysis = await analyzeAndAdaptSubject(openai, prompt, style);

    // Step 2: Build the final prompt with contextual template
    const enrichedPrompt = buildFinalPrompt(
      analysis.adapted_subject,
      style,
      analysis.has_figures
    );

    // Step 3: Determine image size (style default + subject override)
    const imageSize = getImageSize(style, analysis.orientation);

    // Step 4: Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enrichedPrompt,
      n: 1,
      size: imageSize,
      quality: "hd",
      style: "natural",
    });

    const dalleUrl = response.data?.[0]?.url;
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

    // Save generation to database
    const { data: generation, error: dbError } = await getSupabaseAdmin()
      .from("generations")
      .insert({
        user_session_id: sessionId,
        prompt_original: prompt,
        style_choisi: style,
        prompt_enrichi: enrichedPrompt,
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
