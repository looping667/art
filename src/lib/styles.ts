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
      "A [SUBJECT] painted in the style of Eugène Boudin, French pre-Impressionism, plein air oil on canvas. LIGHTING: Soft diffused Norman coastal light, no direct sun, overcast or partially cloudy sky, light arriving from the side filtered through clouds, cool temperature 5500K grey-white. PALETTE: Pearlescent grey-blue #B8C4C9 (dominant sky), warm ochre sand #C8B89A (ground/surfaces), ivory nacré #E8E0C8 (brightest light), slate grey #8FA0A8 (cloud shadows), muted green-grey #8A9E8C (distant vegetation), single vivid red accent #C44030 on one small object only. TECHNIQUE: Short rapid comma-shaped brushstrokes, visible and spontaneous, pochade sketch quality, slightly unfinished, thin translucent paint layers, canvas texture visible in background, no smooth blending. COMPOSITION: Very low horizon line, sky occupies 70% of the image, subject compressed into lower third, wide breathing space, soft diagonal, any human figures reduced to small color patches. ATMOSPHERE: Vaporous, airy, melancholic poetry of a grey seaside morning, forms dissolving at the edges, time suspended between two weather changes. AVOID: Direct harsh sunlight, saturated colors across the whole image, sharp outlines, symmetrical composition, dark dramatic shadows, photographic finish, smooth polished surface. TAGS: Eugène Boudin style, pre-Impressionism, plein air pochade, Norman light, pearlescent atmosphere, 19th century French painting, museum quality.",
    color: "#B8C4C9",
  },
  {
    id: "monet",
    nameKey: "styleMonet",
    descKey: "styleMonetDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of Claude Monet, French Impressionism, oil on canvas. LIGHTING: Dappled natural light, no single hard source, light broken by foliage or water reflections, warm morning or late afternoon temperature 4000–5000K, light is the true subject. PALETTE: Monet blue #3A7BB5 (water and sky), aqua green #5B9E8A (aquatic vegetation), violet shadow #8C6BAE (all shadows — never grey or black), pearly rose #D4849A (flowers and reflections), Giverny green #6A9E5A (foliage), warm gold #E8A830 (sunlight), luminous white #F2ECD8 (maximum light). TECHNIQUE: Visible comma-shaped and dash brushstrokes, pure unmixed colors placed side by side for optical blending at distance, alla prima direct painting, light impasto on brightest zones, no black anywhere, colored shadows only. COMPOSITION: Subject can fill entire canvas without horizon, Japanese-influenced off-center framing, water reflections doubling the world, forms dissolving into light at edges, possible series approach showing light variations. ATMOSPHERE: Shimmering, joyful, sensory immersion in nature, time captured in its most fleeting instant, vibrating chromatic energy. AVOID: Black or neutral grey shadows, sharp outlines, photographic realism, symmetrical composition, flat even lighting, muted desaturated tones, smooth blended surface. TAGS: Claude Monet style, French Impressionism, Giverny, optical color vibration, shimmering light, 19th century masterwork, museum quality.",
    color: "#6A9E5A",
  },
  {
    id: "boucher",
    nameKey: "styleBoucher",
    descKey: "styleBoucherDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of François Boucher, French Rococo, 18th century, oil on canvas. LIGHTING: Omnidirectional soft golden light with no identifiable source, warm flattering boudoir atmosphere 3200K amber-gold, no hard shadows anywhere, light caresses every surface equally. PALETTE: Pearlescent pink flesh #F0B8A0 (dominant), porcelain blue #9DC4D8 (draperies and sky), soft gold #E8CC88 (warm light), powder rose #D898A0 (shadows on skin), pale tender green #A8C898 (vegetation), cream white #F5EED8 (brightest light), warm golden brown #C89858 (depth and warmth). TECHNIQUE: Extremely smooth polished surface, no visible brushwork, imperceptible transitions between tones, superimposed glazes for skin and silk textures, porcelain-like finish, virtuoso rendering of silk, velvet and fur textures. COMPOSITION: Fluid asymmetrical curves and arabesques, no dominant straight lines, idealized female figures in foreground, putti in corners and background, Arcadian decor of mossy grottos and fountains, soft diagonals guiding the eye in spirals. ATMOSPHERE: Hedonistic pleasure, aristocratic lightness, sensual and playful frivolity, Versailles fantasy, everything beautiful and desirable, no ugliness or hardship. AVOID: Realism or rawness, hard dramatic shadows, dark or cold dominant tones, rough textures, symmetrical rigid composition, visible brushwork, poverty or austerity. TAGS: François Boucher style, French Rococo, 18th century, Versailles aesthetic, mythological pastoral, porcelain finish, museum quality.",
    color: "#F0B8A0",
  },
  {
    id: "hopper",
    nameKey: "styleHopper",
    descKey: "styleHopperDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of Edward Hopper, American Realism, mid-20th century, oil on canvas. LIGHTING: Single harsh raking light source, either strong oblique sunlight casting long geometric shadows or cold artificial fluorescent light at night, high contrast between lit and shadow zones, temperature either very warm 2800K (sunlight) or cold 5000K green-yellow (artificial). PALETTE: Chrome yellow sunlight #E8C840 (raking light), cold neon green-yellow #D8D870 (artificial light), dry azure blue #5A88C0 (American sky), warm pale ochre #D8C090 (sunlit walls), cold blue shadow #7878A0 (shade zones), night black-blue #2A2838 (darkness), rust brown #A07048 (wood and furniture), flat off-white #E8E0D0 (architecture). TECHNIQUE: Flat broad color areas with minimal texture variation, hard precise geometric edges, simplified forms stripped of anecdotal detail, matte oil finish, architectural precision, figures reduced to essential silhouettes. COMPOSITION: Strong geometric masses, single window or light source as organizational axis, exaggerated empty space isolating figures, cinematic fixed-camera framing, voyeuristic angle as if observing unseen, interior/exterior boundary through glass or doorway. ATMOSPHERE: Psychological silence, solitude, suspended time, a moment frozen before or after something — existential American loneliness, no warmth or conviviality. AVOID: Warm cozy atmosphere, figures interacting, soft diffused light, decorative ornamental elements, expressive faces, movement or action, vaporous or blurred forms. TAGS: Edward Hopper style, American Realism, psychological solitude, cinematic framing, mid-century America, museum quality.",
    color: "#E8C840",
  },
  {
    id: "rembrandt",
    nameKey: "styleRembrandt",
    descKey: "styleRembrandtDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of Rembrandt van Rijn, Dutch Golden Age Baroque, 17th century, oil on canvas. LIGHTING: Single warm amber candlelight or window light from upper left, 80% of image in deep shadow, 20% illuminated, light color temperature 2200K deep gold, dramatic diagonal light beam crossing the composition. PALETTE: Deep Van Dyck brown #2A1A0E (dominant — 80% of image), warm burnt umber #5A3820 (mid-tones), amber gold #D4900A (main illuminated zone), warm off-white gold #F0D890 (maximum highlight on single focal detail), copper rust #B87830 (metallic reflections on one object), deep warm black #1A1208 (darkest garments), dark bordeaux #6A1820 (deep red accents in drapery). TECHNIQUE: Thick impasto on brightest highlights, thin transparent brown glazes building shadow depth, expressive free brushwork in mid-tones, rough canvas texture visible in dark areas, deliberately unsmoothed finish, contrast of thick light and thin dark paint layers. COMPOSITION: Close intimate framing, figure partially cut by frame edges, single diagonal of light from upper-left to lower-right, infinite dark indeterminate background, one single detail receiving maximum light (a hand, a face, a metal object). ATMOSPHERE: Solemn, meditative, profound human dignity, the soul emerging from darkness, time outside of time, psychological truth over physical beauty. AVOID: Light or white backgrounds, multiple light sources, cold or blue tones, pastel colors, flat even lighting, decorative lightness, photographic surface, Rococo frivolity. TAGS: Rembrandt van Rijn style, Dutch Golden Age, chiaroscuro, tenebrism, Baroque, 17th century masterwork, museum quality.",
    color: "#D4900A",
  },
  {
    id: "hockney",
    nameKey: "styleHockney",
    descKey: "styleHockneyDesc",
    promptTemplate:
      "A [SUBJECT] painted in the style of David Hockney, British Pop Art and contemporary painting, acrylic on large canvas. LIGHTING: Direct clear sunlight with no atmosphere or haze, sharp geometric shadows with precise edges, light color temperature 6500K crisp daylight, California noon light quality — bright, direct, democratic, illuminating everything. PALETTE: California turquoise blue #1A9EC8 (water and pools — signature), vivid azure sky #3878D0 (sky), acid chartreuse green #78C830 (foliage), emerald green #28A850 (grass and plants), pure sun yellow #F0C820 (sunlight), brilliant white #F8F4E8 (walls and surfaces), blue-grey shadow #A0B8D0 (geometric shadows), magenta pink #E83888 (flowers and accents), warm dry beige #D8C098 (ground). TECHNIQUE: Flat pure color areas with minimal internal variation, clean hard edges between zones, visible confident acrylic brushwork, no atmospheric blending, graphic clarity, bold simplified forms, large format energy. COMPOSITION: Geometric horizontal and vertical structure, multiple simultaneous viewpoints in the same image, flat decorative surfaces (water as pure color area), stylized parallel wave lines for water, lush vegetation as exuberant frame, simplified figures in relaxed poses. ATMOSPHERE: Joyful, celebratory, sensory pleasure of color and light, California hedonism, optimistic and direct, the happiness of seeing clearly. AVOID: Atmospheric haze or vapour, muted or desaturated tones, dramatic dark shadows, earthy Rembrandt palette, gestural expressionist brushwork, photographic realism, melancholy or solitude. TAGS: David Hockney style, British Pop Art, California light, vivid flat colors, contemporary painting, acrylic on canvas, museum quality.",
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
  return `${userPrompt}. oil painting, highly detailed, fine art, museum quality, no text, no watermark`;
}
