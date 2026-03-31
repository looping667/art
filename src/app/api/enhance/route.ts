import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getStyleById } from "@/lib/styles";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, locale } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const styleInfo = getStyleById(style);
    const styleHint =
      styleInfo && style !== "free"
        ? `\nThe user selected the style: ${styleInfo.styleName}. ${styleInfo.styleContext}\nOrient your enrichment toward this painter's universe — mention elements they would have painted (specific light, settings, atmosphere they favored).`
        : "";

    const lang = locale === "fr" ? "French" : "English";

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are an art director helping someone describe their dream painting. Enrich their description with vivid visual details: lighting, atmosphere, colors, season, time of day, textures, mood. Make the scene come alive as if describing a painting hanging in a museum.
${styleHint}
RULES:
- Respond in ${lang} only.
- 2-3 sentences maximum. Be poetic but concise.
- Return ONLY the enriched text. No quotes, no prefix, no explanation.
- Keep the user's core idea — add richness, don't change the subject.
- Focus on what you SEE in the painting: light, shadow, color, texture, depth.`,
        temperature: 0.8,
        maxOutputTokens: 300,
      },
    });

    const enhanced = response.text?.trim();

    if (!enhanced) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ enhanced });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Enhance error:", message);
    return NextResponse.json(
      { error: `Enhancement failed: ${message}` },
      { status: 500 }
    );
  }
}
