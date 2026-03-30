export interface ArtStyle {
  id: string;
  nameKey: string;
  descKey: string;
  promptTemplate: string;
  color: string;
}

export const artStyles: ArtStyle[] = [
  {
    id: "boudin",
    nameKey: "styleBoudin",
    descKey: "styleBoudinDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of Eugène Boudin, French pre-Impressionism, plein air oil on canvas. LIGHTING: Soft diffused Norman coastal light, no direct sun, overcast or partially cloudy sky, light arriving from the side filtered through clouds, cool grey-white tone. PALETTE: Pearlescent grey-blue as dominant sky color, warm ochre sand for ground and surfaces, ivory nacré for brightest light, slate grey for cloud shadows, muted green-grey for distant vegetation, one single vivid red accent on one small object only. TECHNIQUE: Short rapid comma-shaped brushstrokes, visible and spontaneous, pochade sketch quality, slightly unfinished, thin translucent paint layers, canvas texture visible in background, no smooth blending. COMPOSITION: Very low horizon line, sky occupies 70% of the image, subject compressed into lower third, wide breathing space, soft diagonal, any human figures reduced to small color patches. ATMOSPHERE: Vaporous, airy, melancholic poetry of a grey seaside morning, forms dissolving at the edges, time suspended between two weather changes. The final image must be a pure painting with absolutely no text, no labels, no color swatches, no palette chart, no annotations of any kind.",
    color: "#B8C4C9",
  },
  {
    id: "monet",
    nameKey: "styleMonet",
    descKey: "styleMonetDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of Claude Monet, French Impressionism, oil on canvas. LIGHTING: Dappled natural light, no single hard source, light broken by foliage or water reflections, warm morning or late afternoon glow, light is the true subject. PALETTE: Rich blue for water and sky, aqua green for aquatic vegetation, violet for all shadows — never grey or black, pearly rose for flowers and reflections, lush green for foliage, warm gold for sunlight, luminous creamy white for maximum light. TECHNIQUE: Visible comma-shaped and dash brushstrokes, pure unmixed colors placed side by side for optical blending at distance, alla prima direct painting, light impasto on brightest zones, no black anywhere, colored shadows only. COMPOSITION: Subject can fill entire canvas without horizon, Japanese-influenced off-center framing, water reflections doubling the world, forms dissolving into light at edges. ATMOSPHERE: Shimmering, joyful, sensory immersion in nature, time captured in its most fleeting instant, vibrating chromatic energy. The final image must be a pure painting with absolutely no text, no labels, no color swatches, no palette chart, no annotations of any kind.",
    color: "#6A9E5A",
  },
  {
    id: "boucher",
    nameKey: "styleBoucher",
    descKey: "styleBoucherDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of François Boucher, French Rococo, 18th century, oil on canvas. LIGHTING: Omnidirectional soft golden light with no identifiable source, warm flattering boudoir atmosphere, no hard shadows anywhere, light caresses every surface equally. PALETTE: Pearlescent pink flesh tones as dominant, porcelain blue for draperies and sky, soft gold for warm light, powder rose for shadows on skin, pale tender green for vegetation, cream white for brightest light, warm golden brown for depth. TECHNIQUE: Extremely smooth polished surface, no visible brushwork, imperceptible transitions between tones, superimposed glazes for skin and silk textures, porcelain-like finish, virtuoso rendering of silk, velvet and fur textures. COMPOSITION: Fluid asymmetrical curves and arabesques, no dominant straight lines, idealized figures in foreground, putti cherubs in corners and background, Arcadian decor of mossy grottos and fountains, soft diagonals guiding the eye in spirals. ATMOSPHERE: Hedonistic pleasure, aristocratic lightness, sensual and playful frivolity, Versailles fantasy, everything beautiful and desirable. The final image must be a pure painting with absolutely no text, no labels, no color swatches, no palette chart, no annotations of any kind.",
    color: "#F0B8A0",
  },
  {
    id: "hopper",
    nameKey: "styleHopper",
    descKey: "styleHopperDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of Edward Hopper, American Realism, mid-20th century, oil on canvas. LIGHTING: Single harsh raking light source, either strong oblique sunlight casting long geometric shadows or cold artificial fluorescent light at night, high contrast between lit and shadow zones. PALETTE: Chrome yellow for raking sunlight, cold greenish-yellow for artificial neon light, dry azure blue for American sky, warm pale ochre for sunlit walls, cold blue-grey for shade zones, deep dark blue-black for night scenes, rust brown for wood and furniture, flat off-white for architecture. TECHNIQUE: Flat broad color areas with minimal texture variation, hard precise geometric edges, simplified forms stripped of anecdotal detail, matte oil finish, architectural precision, figures reduced to essential silhouettes. COMPOSITION: Strong geometric masses, single window or light source as organizational axis, exaggerated empty space isolating figures, cinematic fixed-camera framing, voyeuristic angle as if observing unseen, interior/exterior boundary through glass or doorway. ATMOSPHERE: Psychological silence, solitude, suspended time, a moment frozen before or after something — existential American loneliness, no warmth or conviviality. The final image must be a pure painting with absolutely no text, no labels, no color swatches, no palette chart, no annotations of any kind.",
    color: "#E8C840",
  },
  {
    id: "rembrandt",
    nameKey: "styleRembrandt",
    descKey: "styleRembrandtDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of Rembrandt van Rijn, Dutch Golden Age Baroque, 17th century, oil on canvas. LIGHTING: Single warm amber candlelight or window light from upper left, 80% of image in deep shadow, only 20% illuminated, deep golden light color, dramatic diagonal light beam crossing the composition. PALETTE: Deep Van Dyck brown as dominant covering 80% of the image, warm burnt umber for mid-tones, amber gold for the main illuminated zone, warm off-white gold for maximum highlight on a single focal detail, copper rust for metallic reflections, deep warm near-black for darkest garments, dark bordeaux for deep red accents in drapery. TECHNIQUE: Thick impasto on brightest highlights, thin transparent brown glazes building shadow depth, expressive free brushwork in mid-tones, rough canvas texture visible in dark areas, deliberately unsmoothed finish, contrast of thick light and thin dark paint layers. COMPOSITION: Close intimate framing, figure partially cut by frame edges, single diagonal of light from upper-left to lower-right, infinite dark indeterminate background, one single detail receiving maximum light such as a hand, a face, or a metal object. ATMOSPHERE: Solemn, meditative, profound human dignity, the soul emerging from darkness, time outside of time, psychological truth over physical beauty. The final image must be a pure painting with absolutely no text, no labels, no color swatches, no palette chart, no annotations of any kind.",
    color: "#D4900A",
  },
  {
    id: "hockney",
    nameKey: "styleHockney",
    descKey: "styleHockneyDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of David Hockney, British Pop Art and contemporary painting, acrylic on large canvas. LIGHTING: Direct clear sunlight with no atmosphere or haze, sharp geometric shadows with precise edges, crisp bright daylight, California noon light quality — bright, direct, democratic, illuminating everything. PALETTE: California turquoise blue for water and pools as signature color, vivid azure for sky, acid chartreuse green for foliage, emerald green for grass and plants, pure sun yellow for sunlight, brilliant white for walls and surfaces, light blue-grey for geometric shadows, magenta pink for flowers and accents, warm dry beige for ground. TECHNIQUE: Flat pure color areas with minimal internal variation, clean hard edges between zones, visible confident acrylic brushwork, no atmospheric blending, graphic clarity, bold simplified forms, large format energy. COMPOSITION: Geometric horizontal and vertical structure, multiple simultaneous viewpoints in the same image, flat decorative surfaces with water as pure color area, stylized parallel wave lines for water, lush vegetation as exuberant frame, simplified figures in relaxed poses. ATMOSPHERE: Joyful, celebratory, sensory pleasure of color and light, California hedonism, optimistic and direct, the happiness of seeing clearly. The final image must be a pure painting with absolutely no text, no labels, no color swatches, no palette chart, no annotations of any kind.",
    color: "#1A9EC8",
  },
  {
    id: "free",
    nameKey: "styleFree",
    descKey: "styleFreeDesc",
    promptTemplate: "",
    color: "#C4714A",
  },
];

export function buildEnrichedPrompt(
  userPrompt: string,
  styleId: string
): string {
  const style = artStyles.find((s) => s.id === styleId);

  if (style?.promptTemplate) {
    return style.promptTemplate.replace("[SUBJECT]", userPrompt);
  }

  // Free style: just the user prompt + generic suffix
  return `${userPrompt}. oil painting, highly detailed, fine art, museum quality, no text, no watermark, no color palette, no annotations`;
}
