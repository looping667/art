#!/usr/bin/env node
/**
 * Generate real demo paintings for the homepage carousel.
 *
 * Usage:
 *   GEMINI_API_KEY=xxx node scripts/generate-gallery.mjs
 *
 * Writes 5 JPEGs to public/gallery/painting-{1..5}.jpg using the same
 * Gemini image pipeline as /api/generate.
 */
import { GoogleGenAI } from "@google/genai";
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "gallery");
const IMAGE_MODEL = "gemini-3-pro-image-preview";

const demos = [
  {
    file: "painting-1.jpg",
    prompt:
      "A real handmade oil painting on canvas of a contemporary portrait of a young woman with chestnut hair, soft window light from the left, muted earth tones, loose confident brushwork in the manner of Lucian Freud. Visible impasto, linen canvas texture. NOT a photograph, NOT a 3D render, NOT digital art.",
  },
  {
    file: "painting-2.jpg",
    prompt:
      "A real handmade oil painting on canvas of a lush bouquet of purple irises in a ceramic vase on a wooden table, soft diffuse light, rich violets and greens, thick expressive brushstrokes in the style of late 19th century impressionism. Visible canvas weave. NOT a photograph, NOT CGI.",
  },
  {
    file: "painting-3.jpg",
    prompt:
      "A real handmade oil painting on canvas of a Venetian canal at golden hour, gondolas moored against weathered palazzi, warm ochres and teal reflections, loose atmospheric brushwork in the manner of Turner. Visible impasto and canvas texture. NOT a photograph, NOT 3D.",
  },
  {
    file: "painting-4.jpg",
    prompt:
      "A real handmade oil painting on canvas still life of three lemons and a white ceramic pitcher on a linen cloth, dramatic side light, dark background, Spanish bodegón tradition in the manner of Sánchez Cotán. Visible brushwork and canvas weave. NOT a photograph, NOT CGI.",
  },
  {
    file: "painting-5.jpg",
    prompt:
      "A real handmade oil painting on canvas of a baroque-style portrait of an elegant man in contemporary clothing, chiaroscuro lighting, deep browns and gold, rich glazes in the manner of Rembrandt. Visible impasto and linen canvas texture. NOT a photograph, NOT digital art.",
  },
];

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  for (const demo of demos) {
    console.log(`Generating ${demo.file}...`);
    const res = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: demo.prompt,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: "1:1", imageSize: "2K" },
      },
    });
    const parts = res.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData);
    if (!imagePart?.inlineData) {
      console.error(`  No image returned for ${demo.file}`);
      continue;
    }
    const buf = Buffer.from(imagePart.inlineData.data, "base64");
    await writeFile(join(OUT_DIR, demo.file), buf);
    console.log(`  Saved ${demo.file} (${buf.length} bytes)`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
