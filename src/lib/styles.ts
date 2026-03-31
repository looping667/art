export interface ArtStyle {
  id: string;
  nameKey: string;
  descKey: string;
  promptTemplate: string;
  promptTemplateNoFigures?: string;
  color: string;
  defaultOrientation: "landscape" | "portrait";
  styleName: string;
  styleContext: string;
}

const NO_SWATCH =
  "IMPORTANT: Generate ONLY the painting itself filling the entire image edge to edge. NEVER include a picture frame, wall, easel, color palette, color swatches, paint tubes, art supplies, labels, text, annotations, or any element outside the painting. The painting IS the image — no border, no frame, no meta-elements.";

export const artStyles: ArtStyle[] = [
  {
    id: "boudin",
    nameKey: "styleBoudin",
    descKey: "styleBoudinDesc",
    styleName: "Eugène Boudin",
    styleContext:
      "French pre-Impressionist, painted Norman coastal scenes, harbors, beaches, vast luminous skies. His world is maritime, atmospheric, outdoors. Adapt subjects to coastal or plein-air settings with vast skies.",
    promptTemplate: `An oil painting of [SUBJECT] in the unmistakable style of Eugène Boudin's plein air coastal work, closely resembling the technique and atmosphere seen in [ANCHORS]. A vast pearlescent grey-blue sky fills at least 70% of the canvas, with the subject compressed into the lower third beneath an immense Norman overcast. The paint is applied in short rapid comma-shaped strokes, thin and translucent like a pochade sketch — slightly unfinished, spontaneous, with the raw canvas texture showing through. The palette is limited to soft grey-blues, warm ochre sand tones, pale ivory light, and muted green-grey, with one single small vivid red accent. Light is diffused and lateral, filtered through clouds, casting soft colored shadows that are never black. Forms dissolve at their edges into vaporous coastal atmosphere — a pochade sketch, spontaneous and unfinished. ${NO_SWATCH}`,
    color: "#B8C4C9",
    defaultOrientation: "landscape",
  },
  {
    id: "monet",
    nameKey: "styleMonet",
    descKey: "styleMonetDesc",
    styleName: "Claude Monet",
    styleContext:
      "French Impressionist, painted gardens, water lilies, haystacks, cathedrals, bridges, rivers. His world is Giverny, nature, water reflections, flowers. Adapt subjects to garden or waterside settings bathed in changing light.",
    promptTemplate: `An oil painting of [SUBJECT] in the unmistakable style of Claude Monet's mature Impressionist period, closely resembling the technique and atmosphere seen in [ANCHORS]. The entire surface is built from visible comma-shaped and dash brushstrokes of pure unmixed pigment placed side by side so colors blend optically in the viewer's eye, with light impasto in the brightest zones. The palette is dominated by rich cerulean blue, aqua green, violet shadows with absolutely no black or grey anywhere, pearly rose, lush green, and warm gold where sunlight strikes. Forms dissolve into shimmering light at their edges, the composition is asymmetrical with Japanese-influenced framing, and the atmosphere vibrates with joyful chromatic energy — pure unmixed colors and visible brushstrokes of pure pigment throughout. ${NO_SWATCH}`,
    color: "#6A9E5A",
    defaultOrientation: "landscape",
  },
  {
    id: "boucher",
    nameKey: "styleBoucher",
    descKey: "styleBoucherDesc",
    styleName: "François Boucher",
    styleContext:
      "French Rococo master, painted mythological pastorals, nymphs, shepherdesses, putti, aristocratic fantasies. His world is an idealized Arcadia of pleasure and beauty. Never realistic — always fantastical. Adapt any modern or mundane subject into an 18th-century Arcadian fantasy with figures, draperies, and ornament.",
    promptTemplate: `An oil painting of [SUBJECT] in the unmistakable style of François Boucher's French Rococo masterpieces, closely resembling the technique and sensuality seen in [ANCHORS]. The surface is extremely smooth and polished like Sèvres porcelain, with absolutely no visible brushwork and imperceptible transitions between tones — superimposed glazes render skin as pearlescent pink flesh, silk draperies shimmer in porcelain blue. The composition flows in asymmetrical arabesques and soft spirals with idealized figures, playful putti cherubs nestled in corners, and an Arcadian backdrop of mossy grottos and fountains. Omnidirectional soft golden light with no hard shadows bathes every surface in warm flattering radiance. The palette is dominated by pearlescent pink, porcelain blue, soft gold, cream white, and pale green — an aristocratic Versailles fantasy of pleasure and beauty, smooth polished porcelain-like finish throughout. ${NO_SWATCH}`,
    promptTemplateNoFigures: `An oil painting of [SUBJECT] in the unmistakable style of François Boucher's French Rococo landscapes, closely resembling the decorative pastoral beauty seen in [ANCHORS]. The surface is extremely smooth and polished like Sèvres porcelain, with absolutely no visible brushwork and imperceptible transitions between tones. Lush ornamental vegetation frames the scene in soft spirals — flowering trees, abundant roses, and delicate foliage rendered with porcelain-like precision. A classical fountain or temple is glimpsed in the background, putti optionally nestled among the flowers. Omnidirectional soft golden light with no hard shadows bathes the scene in warm flattering radiance. The palette is dominated by pearlescent pink, porcelain blue, soft gold, cream white, pale green, and warm golden brown — a Versailles garden fantasy, smooth polished porcelain-like finish throughout. ${NO_SWATCH}`,
    color: "#F0B8A0",
    defaultOrientation: "portrait",
  },
  {
    id: "hopper",
    nameKey: "styleHopper",
    descKey: "styleHopperDesc",
    styleName: "Edward Hopper",
    styleContext:
      "American Realist, painted diners, gas stations, hotel rooms, office buildings, empty streets. His world is mid-century American solitude, isolation, silence. Adapt subjects to stark, lonely American urban or suburban settings with dramatic raking light.",
    promptTemplate: `An oil painting of [SUBJECT] in the unmistakable style of Edward Hopper's mid-century American Realism, closely resembling the psychological tension and raking light seen in [ANCHORS]. A single harsh light source — either oblique warm sunlight or cold greenish fluorescent neon — carves the scene into stark geometric planes of flat uniform color with hard precise edges and long angular shadows. The palette is chrome yellow sunlight against cold blue-grey shadow zones, with warm pale ochre walls, deep dark blue-black for night, rust brown for wood, and flat off-white for architecture — broad flat color areas with minimal texture. Figures if present are reduced to still silent silhouettes, backs turned, isolated in exaggerated empty space. Cinematic fixed-camera framing with a voyeuristic angle, a window or glass pane dividing interior from exterior — psychological silence, solitude, a frozen suspended moment of existential American loneliness. Flat simplified geometric planes and hard edges throughout. ${NO_SWATCH}`,
    color: "#E8C840",
    defaultOrientation: "landscape",
  },
  {
    id: "rembrandt",
    nameKey: "styleRembrandt",
    descKey: "styleRembrandtDesc",
    styleName: "Rembrandt van Rijn",
    styleContext:
      "Dutch Golden Age master, painted portraits, self-portraits, biblical scenes, domestic interiors by candlelight. His world is intimate, dark, dramatic — everything emerges from shadow into warm golden light. Adapt subjects to dark intimate settings with a single warm light source revealing one key detail.",
    promptTemplate: `An oil painting of [SUBJECT] in the unmistakable chiaroscuro style of Rembrandt van Rijn's Dutch Golden Age masterworks, closely resembling the dramatic tenebrism seen in [ANCHORS]. Eighty percent of the canvas is submerged in deep warm Van Dyck brown darkness, with only twenty percent illuminated by a single warm amber light source from the upper left casting a dramatic diagonal beam across the composition. One focal detail — a face, a hand, a copper object — catches the full golden light with thick impasto highlights, while everything else recedes into infinite dark indeterminate background. Thin transparent brown glazes build the shadow depth, rough canvas texture is visible in the dark areas, and the contrast between thick bright paint and thin dark glazes creates a tactile surface. The palette is entirely warm: deep browns, burnt umber, amber gold, copper rust, and dark bordeaux — the soul emerging from darkness, chiaroscuro tenebrism, 80% shadow and 20% golden light throughout. ${NO_SWATCH}`,
    promptTemplateNoFigures: `An oil painting of [SUBJECT] in the unmistakable chiaroscuro style of Rembrandt van Rijn's Dutch Golden Age masterworks, closely resembling the dramatic tenebrism seen in [ANCHORS]. Eighty percent of the canvas is submerged in deep warm Van Dyck brown darkness, with only twenty percent illuminated by a single warm amber light source from the upper left casting a dramatic diagonal beam. One single object or surface catches the full golden light with thick impasto highlights, while everything else recedes into infinite dark indeterminate background. Thin transparent brown glazes build the shadow depth, rough canvas texture is visible in the dark areas. The palette is entirely warm: deep browns, burnt umber, amber gold, copper rust — a still life emerging from darkness, solemn and meditative, chiaroscuro tenebrism, 80% shadow and 20% golden light throughout. ${NO_SWATCH}`,
    color: "#D4900A",
    defaultOrientation: "portrait",
  },
  {
    id: "hockney",
    nameKey: "styleHockney",
    descKey: "styleHockneyDesc",
    styleName: "David Hockney",
    styleContext:
      "British Pop Art and contemporary painter, painted California swimming pools, Yorkshire landscapes, portraits of friends, bright interiors. His world is joyful, colorful, sun-drenched. Adapt subjects to bright California or English garden settings with vivid flat colors and graphic clarity. IMPORTANT: Do NOT mention the artist name in the final prompt — he is a living artist.",
    promptTemplate: `A vivid acrylic painting on large canvas of [SUBJECT] in the unmistakable style of 1960s-1970s California Pop Art pool scenes and bright Yorkshire landscape paintings, closely resembling the graphic clarity and chromatic joy seen in [ANCHORS]. The surface is built from flat pure color areas with minimal internal variation and clean hard edges between zones — water rendered as a flat turquoise field with stylized parallel wave lines, shadows as crisp light blue-grey geometric shapes. The palette blazes with California turquoise blue, vivid azure sky, acid chartreuse green, emerald foliage, pure sun yellow, brilliant white, and magenta pink accents — bold pure unmixed colors at maximum intensity. Direct clear sunlight illuminates everything equally with no atmospheric haze. Simplified figures in relaxed poses, lush vegetation as an exuberant frame — joyful, celebratory, the happiness of seeing clearly. Flat bold color fields with hard graphic edges throughout. ${NO_SWATCH}`,
    color: "#1A9EC8",
    defaultOrientation: "landscape",
  },
  {
    id: "free",
    nameKey: "styleFree",
    descKey: "styleFreeDesc",
    styleName: "Free style",
    styleContext: "No specific painter reference. The user has full creative freedom.",
    promptTemplate: "",
    color: "#C4714A",
    defaultOrientation: "landscape",
  },
];

export function getStyleById(styleId: string): ArtStyle | undefined {
  return artStyles.find((s) => s.id === styleId);
}

export function getAspectRatio(
  styleId: string,
  orientationOverride?: "landscape" | "portrait"
): string {
  return "1:1";
}

export interface SubjectAnalysis {
  adapted_subject: string;
  painting_technique: string;
  color_palette: string;
  lighting: string;
  composition: string;
  anchor_paintings: string[];
  has_figures: boolean;
  orientation: "landscape" | "portrait";
  detected_artist: string | null;
}

export function buildFinalPrompt(
  analysis: SubjectAnalysis,
  styleId: string
): string {
  const style = getStyleById(styleId);

  if (!style?.promptTemplate) {
    // Free style — build a rich prompt from the enriched analysis fields
    const parts = [
      `An oil painting of ${analysis.adapted_subject}, painted directly on canvas filling the entire image edge to edge.`,
    ];
    if (analysis.painting_technique) {
      parts.push(analysis.painting_technique);
    }
    if (analysis.color_palette) {
      parts.push(`The palette is built from ${analysis.color_palette}.`);
    }
    if (analysis.lighting) {
      parts.push(analysis.lighting);
    }
    if (analysis.composition) {
      parts.push(analysis.composition);
    }
    if (analysis.anchor_paintings.length > 0) {
      parts.push(
        `Closely resembling the technique and atmosphere seen in ${analysis.anchor_paintings.join(" and ")}.`
      );
    }
    parts.push(NO_SWATCH);
    return parts.join(" ");
  }

  // Named style — use the predefined narrative template
  const template =
    !analysis.has_figures && style.promptTemplateNoFigures
      ? style.promptTemplateNoFigures
      : style.promptTemplate;

  const anchorsText =
    analysis.anchor_paintings.length > 0
      ? analysis.anchor_paintings.join(" and ")
      : "this artist's most celebrated works";

  return template
    .replace("[SUBJECT]", analysis.adapted_subject)
    .replace("[ANCHORS]", anchorsText);
}
