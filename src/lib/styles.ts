export interface ArtStyle {
  id: string;
  nameKey: string;
  descKey: string;
  promptTemplate: string;
  color: string;
  orientation: "landscape" | "portrait";
}

export const artStyles: ArtStyle[] = [
  {
    id: "boudin",
    nameKey: "styleBoudin",
    descKey: "styleBoudinDesc",
    promptTemplate:
      'A [SUBJECT] painted in the style of Eugène Boudin, French pre-Impressionism, plein air oil on canvas. LIGHTING: Soft diffused Norman coastal light, no direct sun, overcast sky, cool grey-white temperature, light arriving filtered through clouds from the side. PALETTE: Pearlescent grey-blue #B8C4C9 dominant sky, warm ochre sand #C8B89A ground and surfaces, ivory nacré #E8E0C8 brightest light, slate grey #8FA0A8 cloud shadows, muted green-grey #8A9E8C distant vegetation, single vivid red accent #C44030 on one small object only. TECHNIQUE: Short rapid comma-shaped brushstrokes visible and spontaneous, pochade sketch quality, slightly unfinished, thin translucent paint layers, canvas texture visible in background, no smooth blending. COMPOSITION: Very low horizon line, sky or light source occupies 70% of the image, subject compressed into lower third, wide breathing space, soft diagonal, any human figures reduced to small color patches. ATMOSPHERE: Vaporous, airy, melancholic poetry of a grey seaside morning, forms dissolving at the edges. AVOID: Direct harsh sunlight, saturated colors, sharp outlines, symmetrical composition, dark dramatic shadows, photographic finish, smooth polished surface, black shadows.',
    color: "#B8C4C9",
    orientation: "landscape",
  },
  {
    id: "monet",
    nameKey: "styleMonet",
    descKey: "styleMonetDesc",
    promptTemplate:
      'A [SUBJECT] painted in the style of Claude Monet, French Impressionism, oil on canvas. LIGHTING: Dappled natural light broken by foliage or water reflections, warm morning or late afternoon temperature, light is the true subject not the objects. PALETTE: Monet blue #3A7BB5 water and sky, aqua green #5B9E8A aquatic vegetation, violet shadow #8C6BAE all shadows never grey or black, pearly rose #D4849A flowers and reflections, Giverny green #6A9E5A foliage, warm gold #E8A830 sunlight, luminous white #F2ECD8 maximum light. TECHNIQUE: Visible comma-shaped and dash brushstrokes, pure unmixed colors placed side by side for optical blending, alla prima direct painting, light impasto on brightest zones, no black anywhere, colored shadows only. COMPOSITION: Subject can fill entire canvas without horizon, Japanese-influenced off-center framing, water reflections doubling the world, forms dissolving into light at edges. ATMOSPHERE: Shimmering, joyful, sensory immersion in nature, vibrating chromatic energy. AVOID: Black or grey shadows, sharp outlines, photographic realism, symmetrical composition, flat even lighting, muted desaturated tones, smooth blended surface.',
    color: "#6A9E5A",
    orientation: "landscape",
  },
  {
    id: "boucher",
    nameKey: "styleBoucher",
    descKey: "styleBoucherDesc",
    promptTemplate:
      'A [SUBJECT] painted in the style of François Boucher, French Rococo 18th century, oil on canvas. LIGHTING: Omnidirectional soft golden light with no identifiable source, warm flattering atmosphere, no hard shadows anywhere, light caresses every surface equally. PALETTE: Pearlescent pink flesh #F0B8A0 dominant, porcelain blue #9DC4D8 draperies and sky, soft gold #E8CC88 warm light, powder rose #D898A0 shadows on skin, pale tender green #A8C898 vegetation, cream white #F5EED8 brightest light, warm golden brown #C89858 depth. TECHNIQUE: Extremely smooth polished surface, no visible brushwork, imperceptible transitions between tones, porcelain-like finish, virtuoso rendering of silk velvet and fur textures. COMPOSITION: Fluid asymmetrical curves and arabesques, no dominant straight lines, idealized figures in foreground, putti cherubs in corners, Arcadian decor of mossy grottos and fountains. ATMOSPHERE: Hedonistic pleasure, aristocratic lightness, sensual Rococo frivolity, Versailles fantasy, everything beautiful and desirable. AVOID: Realism or rawness, hard dramatic shadows, dark or cold tones, rough textures, visible brushwork, poverty or austerity, symmetrical rigid composition.',
    color: "#F0B8A0",
    orientation: "portrait",
  },
  {
    id: "hopper",
    nameKey: "styleHopper",
    descKey: "styleHopperDesc",
    promptTemplate:
      'A [SUBJECT] painted in the style of Edward Hopper, American Realism mid-20th century, oil on canvas. LIGHTING: Single harsh raking light source, either strong oblique sunlight casting long geometric shadows or cold artificial fluorescent light at night, high contrast between lit and shadow zones. PALETTE: Chrome yellow sunlight #E8C840, cold neon green-yellow #D8D870 artificial light, dry azure blue #5A88C0 American sky, warm pale ochre #D8C090 sunlit walls, cold blue shadow #7878A0 shade zones, night black-blue #2A2838 darkness, rust brown #A07048 wood and furniture, flat off-white #E8E0D0 architecture. TECHNIQUE: Flat broad color areas with minimal texture variation, hard precise geometric edges, simplified forms stripped of all anecdotal detail, matte oil finish, figures reduced to essential silhouettes. COMPOSITION: Strong geometric masses, single window or light source as organizational axis, exaggerated empty space isolating figures, cinematic fixed-camera framing, voyeuristic angle, interior divided from exterior by glass or doorway. ATMOSPHERE: Psychological silence, solitude, suspended time, existential American loneliness, no warmth or conviviality. AVOID: Warm cozy atmosphere, figures interacting, soft diffused light, decorative ornamental elements, vaporous or blurred forms, movement or action.',
    color: "#E8C840",
    orientation: "landscape",
  },
  {
    id: "rembrandt",
    nameKey: "styleRembrandt",
    descKey: "styleRembrandtDesc",
    promptTemplate:
      'A [SUBJECT] painted in the style of Rembrandt van Rijn, Dutch Golden Age Baroque 17th century, oil on canvas. LIGHTING: Single warm amber candlelight from upper left, 80% of image in deep shadow, 20% illuminated, deep gold light, dramatic diagonal light beam crossing the composition. PALETTE: Deep Van Dyck brown #2A1A0E dominant 80% of image, warm burnt umber #5A3820 mid-tones, amber gold #D4900A main illuminated zone, warm off-white gold #F0D890 maximum highlight on single focal detail only, copper rust #B87830 metallic reflections, deep warm black #1A1208 darkest garments, dark bordeaux #6A1820 deep red drapery accents. TECHNIQUE: Thick impasto on brightest highlights, thin transparent brown glazes building shadow depth, expressive free brushwork in mid-tones, rough canvas texture visible in dark areas, contrast of thick light and thin dark paint layers. COMPOSITION: Close intimate framing, figure partially cut by frame edges, single diagonal of light upper-left to lower-right, infinite dark indeterminate background, one single detail receiving maximum light. ATMOSPHERE: Solemn, meditative, profound human dignity, the soul emerging from darkness, psychological truth over physical beauty. AVOID: Light or white backgrounds, multiple light sources, cold or blue tones, pastel colors, flat even lighting, decorative lightness, photographic surface.',
    color: "#D4900A",
    orientation: "portrait",
  },
  {
    id: "hockney",
    nameKey: "styleHockney",
    descKey: "styleHockneyDesc",
    promptTemplate:
      'A [SUBJECT] in a vivid contemporary British Pop Art painting style, acrylic on large canvas. LIGHTING: Direct clear sunlight with no atmosphere or haze, sharp geometric shadows with precise edges, crisp bright daylight, California noon quality bright and democratic illuminating everything equally. PALETTE: California turquoise blue #1A9EC8 water and pools, vivid azure sky #3878D0, acid chartreuse green #78C830 foliage, emerald green #28A850 grass and plants, pure sun yellow #F0C820 sunlight, brilliant white #F8F4E8 walls and surfaces, blue-grey shadow #A0B8D0 geometric shadows, magenta pink #E83888 flowers and accents, warm dry beige #D8C098 ground. TECHNIQUE: Flat pure color areas with minimal internal variation, clean hard edges between zones, confident acrylic brushwork, no atmospheric blending, graphic clarity, bold simplified forms. COMPOSITION: Geometric horizontal and vertical structure, multiple simultaneous viewpoints, flat decorative surfaces, stylized parallel wave lines for water, lush vegetation as exuberant frame, simplified figures in relaxed poses. ATMOSPHERE: Joyful, celebratory, sensory pleasure of color and light, California hedonism, optimistic and direct. AVOID: Atmospheric haze, muted or desaturated tones, dramatic dark shadows, earthy palette, gestural expressionist brushwork, photographic realism, melancholy.',
    color: "#1A9EC8",
    orientation: "landscape",
  },
  {
    id: "free",
    nameKey: "styleFree",
    descKey: "styleFreeDesc",
    promptTemplate: "",
    color: "#C4714A",
    orientation: "landscape",
  },
];

export function getImageSize(
  styleId: string
): "1792x1024" | "1024x1792" | "1024x1024" {
  const style = artStyles.find((s) => s.id === styleId);
  if (!style) return "1024x1024";
  return style.orientation === "portrait" ? "1024x1792" : "1792x1024";
}

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
