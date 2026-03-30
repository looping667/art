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

const NO_PALETTE =
  "CRITICAL: The output must be a pure painting only. Do NOT include any color swatches, palette strips, color charts, hex codes, labels, annotations, text overlays, or any graphic elements outside the painting itself.";

export const artStyles: ArtStyle[] = [
  {
    id: "boudin",
    nameKey: "styleBoudin",
    descKey: "styleBoudinDesc",
    styleName: "Eugène Boudin",
    styleContext:
      "French pre-Impressionist, painted Norman coastal scenes, harbors, beaches, vast luminous skies. His world is maritime, atmospheric, outdoors. Adapt subjects to coastal or plein-air settings with vast skies.",
    promptTemplate: `A [SUBJECT] painted in the style of Eugène Boudin, French pre-Impressionism, plein air oil on canvas. LIGHTING: Soft diffused Norman coastal light, no direct sun, overcast sky, cool grey-white tone, light arriving filtered through clouds from the side. PALETTE: Pearlescent grey-blue dominant sky, warm ochre sand for ground and surfaces, ivory nacré for brightest light, slate grey for cloud shadows, muted green-grey for distant vegetation, one single vivid red accent on one small object only. TECHNIQUE: Short rapid comma-shaped brushstrokes visible and spontaneous, pochade sketch quality, slightly unfinished, thin translucent paint layers, canvas texture visible in background, no smooth blending. COMPOSITION: Very low horizon line, sky or light source occupies 70% of the image, subject compressed into lower third, wide breathing space, soft diagonal, any human figures reduced to small color patches. ATMOSPHERE: Vaporous, airy, melancholic poetry of a grey seaside morning, forms dissolving at the edges. AVOID: Direct harsh sunlight, saturated colors, sharp outlines, symmetrical composition, dark dramatic shadows, photographic finish, smooth polished surface, black shadows. ${NO_PALETTE}`,
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
    promptTemplate: `A [SUBJECT] painted in the style of Claude Monet, French Impressionism, oil on canvas. LIGHTING: Dappled natural light broken by foliage or water reflections, warm morning or late afternoon glow, light is the true subject not the objects. PALETTE: Rich blue for water and sky, aqua green for aquatic vegetation, violet for all shadows — never grey or black, pearly rose for flowers and reflections, lush green for foliage, warm gold for sunlight, luminous creamy white for maximum light. TECHNIQUE: Visible comma-shaped and dash brushstrokes, pure unmixed colors placed side by side for optical blending, alla prima direct painting, light impasto on brightest zones, no black anywhere, colored shadows only. COMPOSITION: Subject can fill entire canvas without horizon, Japanese-influenced off-center framing, water reflections doubling the world, forms dissolving into light at edges. ATMOSPHERE: Shimmering, joyful, sensory immersion in nature, vibrating chromatic energy. AVOID: Black or grey shadows, sharp outlines, photographic realism, symmetrical composition, flat even lighting, muted desaturated tones, smooth blended surface. ${NO_PALETTE}`,
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
    promptTemplate: `A [SUBJECT] painted in the style of François Boucher, French Rococo 18th century, oil on canvas. LIGHTING: Omnidirectional soft golden light with no identifiable source, warm flattering atmosphere, no hard shadows anywhere, light caresses every surface equally. PALETTE: Pearlescent pink flesh tones as dominant, porcelain blue for draperies and sky, soft gold for warm light, powder rose for shadows on skin, pale tender green for vegetation, cream white for brightest light, warm golden brown for depth. TECHNIQUE: Extremely smooth polished surface, no visible brushwork, imperceptible transitions between tones, superimposed glazes for skin and silk textures, porcelain-like finish, virtuoso rendering of silk velvet and fur textures. COMPOSITION: Fluid asymmetrical curves and arabesques, no dominant straight lines, idealized figures in foreground, putti cherubs in corners, Arcadian decor of mossy grottos and fountains, soft diagonals guiding the eye in spirals. ATMOSPHERE: Hedonistic pleasure, aristocratic lightness, sensual Rococo frivolity, Versailles fantasy, everything beautiful and desirable. AVOID: Realism or rawness, hard dramatic shadows, dark or cold tones, rough textures, visible brushwork, poverty or austerity, symmetrical rigid composition. ${NO_PALETTE}`,
    promptTemplateNoFigures: `A [SUBJECT] painted in the style of François Boucher, French Rococo 18th century, oil on canvas. LIGHTING: Omnidirectional soft golden light with no identifiable source, warm flattering atmosphere, no hard shadows anywhere, light caresses every surface equally. PALETTE: Pearlescent pink tones as dominant, porcelain blue for sky, soft gold for warm light, pale tender green for vegetation, cream white for brightest light, warm golden brown for depth. TECHNIQUE: Extremely smooth polished surface, no visible brushwork, imperceptible transitions between tones, porcelain-like finish on foliage clouds and sky, soft rendering of flower petals and ornamental vegetation. COMPOSITION: Fluid asymmetrical curves and arabesques, lush ornamental vegetation framing the scene, flowering trees in soft spirals, classical fountain or temple glimpsed in background, putti optionally nestled among flowers, panoramic Arcadian depth. ATMOSPHERE: Hedonistic pleasure, aristocratic lightness, Rococo pastoral beauty, Versailles garden fantasy, everything beautiful and desirable. AVOID: Realism or rawness, hard dramatic shadows, dark or cold tones, rough textures, visible brushwork, poverty or austerity, symmetrical rigid composition. ${NO_PALETTE}`,
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
    promptTemplate: `A [SUBJECT] painted in the style of Edward Hopper, American Realism mid-20th century, oil on canvas. LIGHTING: Single harsh raking light source, either strong oblique sunlight casting long geometric shadows or cold artificial fluorescent light at night, high contrast between lit and shadow zones. PALETTE: Chrome yellow for raking sunlight, cold greenish-yellow for artificial neon light, dry azure blue for American sky, warm pale ochre for sunlit walls, cold blue-grey for shade zones, deep dark blue-black for night scenes, rust brown for wood and furniture, flat off-white for architecture. TECHNIQUE: Flat broad color areas with minimal texture variation, hard precise geometric edges, simplified forms stripped of all anecdotal detail, matte oil finish, figures reduced to essential silhouettes. COMPOSITION: Strong geometric masses, single window or light source as organizational axis, exaggerated empty space isolating figures, cinematic fixed-camera framing, voyeuristic angle, interior divided from exterior by glass or doorway. ATMOSPHERE: Psychological silence, solitude, suspended time, existential American loneliness, no warmth or conviviality. AVOID: Warm cozy atmosphere, figures interacting, soft diffused light, decorative ornamental elements, vaporous or blurred forms, movement or action. ${NO_PALETTE}`,
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
    promptTemplate: `A [SUBJECT] painted in the style of Rembrandt van Rijn, Dutch Golden Age Baroque 17th century, oil on canvas. LIGHTING: Single warm amber candlelight from upper left, 80% of image in deep shadow, only 20% illuminated, deep golden light, dramatic diagonal light beam crossing the composition. PALETTE: Deep Van Dyck brown as dominant covering 80% of image, warm burnt umber for mid-tones, amber gold for the main illuminated zone, warm off-white gold for maximum highlight on a single focal detail, copper rust for metallic reflections, deep warm near-black for darkest garments, dark bordeaux for deep red accents in drapery. TECHNIQUE: Thick impasto on brightest highlights, thin transparent brown glazes building shadow depth, expressive free brushwork in mid-tones, rough canvas texture visible in dark areas, contrast of thick light and thin dark paint layers. COMPOSITION: Close intimate framing, figure partially cut by frame edges, single diagonal of light upper-left to lower-right, infinite dark indeterminate background, one single detail receiving maximum light. ATMOSPHERE: Solemn, meditative, profound human dignity, the soul emerging from darkness, psychological truth over physical beauty. AVOID: Light or white backgrounds, multiple light sources, cold or blue tones, pastel colors, flat even lighting, decorative lightness, photographic surface. ${NO_PALETTE}`,
    promptTemplateNoFigures: `A [SUBJECT] painted in the style of Rembrandt van Rijn, Dutch Golden Age Baroque 17th century, oil on canvas. LIGHTING: Single warm amber light from upper left, 80% of image in deep shadow, only 20% illuminated, deep golden light, dramatic diagonal light beam crossing the composition. PALETTE: Deep Van Dyck brown as dominant covering 80% of image, warm burnt umber for mid-tones, amber gold for the main illuminated zone, warm off-white gold for maximum highlight on a single focal detail, copper rust for metallic reflections on one object, deep warm near-black for deepest shadows. TECHNIQUE: Thick impasto on brightest highlights, thin transparent brown glazes building shadow depth, rough canvas texture visible in dark areas, contrast of thick light and thin dark paint layers. COMPOSITION: Single diagonal of light upper-left to lower-right, infinite dark indeterminate background, one single object or surface detail receiving maximum light, vast darkness surrounding the subject. ATMOSPHERE: Solemn, meditative, still life emerging from darkness, time outside of time, quiet contemplation. AVOID: Light or white backgrounds, multiple light sources, cold or blue tones, pastel colors, flat even lighting, decorative lightness, photographic surface. ${NO_PALETTE}`,
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
    promptTemplate: `A [SUBJECT] in a vivid contemporary British Pop Art painting style, acrylic on large canvas. LIGHTING: Direct clear sunlight with no atmosphere or haze, sharp geometric shadows with precise edges, crisp bright daylight, California noon quality bright and democratic illuminating everything equally. PALETTE: California turquoise blue for water and pools, vivid azure for sky, acid chartreuse green for foliage, emerald green for grass and plants, pure sun yellow for sunlight, brilliant white for walls and surfaces, light blue-grey for geometric shadows, magenta pink for flowers and accents, warm dry beige for ground. TECHNIQUE: Flat pure color areas with minimal internal variation, clean hard edges between zones, confident acrylic brushwork, no atmospheric blending, graphic clarity, bold simplified forms. COMPOSITION: Geometric horizontal and vertical structure, multiple simultaneous viewpoints, flat decorative surfaces, stylized parallel wave lines for water, lush vegetation as exuberant frame, simplified figures in relaxed poses. ATMOSPHERE: Joyful, celebratory, sensory pleasure of color and light, California hedonism, optimistic and direct. AVOID: Atmospheric haze, muted or desaturated tones, dramatic dark shadows, earthy palette, gestural expressionist brushwork, photographic realism, melancholy. ${NO_PALETTE}`,
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

export function getImageSize(
  styleId: string,
  orientationOverride?: "landscape" | "portrait"
): "1792x1024" | "1024x1792" {
  const style = getStyleById(styleId);
  const orientation = orientationOverride ?? style?.defaultOrientation ?? "landscape";
  return orientation === "portrait" ? "1024x1792" : "1792x1024";
}

export function buildFinalPrompt(
  adaptedSubject: string,
  styleId: string,
  hasFigures: boolean
): string {
  const style = getStyleById(styleId);

  if (!style?.promptTemplate) {
    // Free style
    return `${adaptedSubject}. oil painting, highly detailed, fine art, museum quality, no text, no watermark. ${NO_PALETTE}`;
  }

  const template =
    !hasFigures && style.promptTemplateNoFigures
      ? style.promptTemplateNoFigures
      : style.promptTemplate;

  return template.replace("[SUBJECT]", adaptedSubject);
}
