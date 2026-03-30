import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseAdmin } from "@/lib/supabase";
import { buildEnrichedPrompt, getImageSize } from "@/lib/styles";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, sessionId } = await req.json();

    if (!prompt || !style || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const enrichedPrompt = buildEnrichedPrompt(prompt, style);
    const imageSize = getImageSize(style);

    // Generate image with DALL-E 3
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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

    const { error: uploadError } = await getSupabaseAdmin().storage
      .from("paintings")
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
