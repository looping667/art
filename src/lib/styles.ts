export interface ArtStyle {
  id: string;
  nameKey: string;
  descKey: string;
  modifier: string;
  color: string;
}

export const artStyles: ArtStyle[] = [
  {
    id: "boudin",
    nameKey: "styleBoudin",
    descKey: "styleBoudinDesc",
    modifier:
      "in the style of Eugène Boudin, plein air oil sketch, pochade, Norman coastal light, translucent pearlescent atmosphere, low horizon line occupying only bottom third, vast luminous sky 65-75% of composition, loose rapid brushwork, comma-shaped strokes, grey-blue palette #B8C4C9, warm ochre #C8B89A, ivory white #E8E0C8, atmospheric haze, soft diffused lateral light filtered through clouds, muted tones with one single vivid red accent, visible canvas texture, slightly unfinished spontaneous quality, alla prima, vaporous dissolving forms, no hard edges, colored blue-grey shadows never black",
    color: "#B8C4C9",
  },
  {
    id: "monet",
    nameKey: "styleMonet",
    descKey: "styleMonetDesc",
    modifier:
      "in the style of Claude Monet, French Impressionism, visible comma brushstrokes, pure juxtaposed unmixed colors, colored shadows in violet #8C6BAE and blue never black, shimmering light reflections, alla prima plein air, Giverny garden atmosphere, dissolving forms in light, optical color vibration, luminous chromatic palette, blues #3A7BB5, greens #6A9E5A, roses #D4849A, golden light #E8A830, morning mist, water lily surface quality, japoniste asymmetric composition, double world of reflections, lush vegetation framing",
    color: "#6A9E5A",
  },
  {
    id: "boucher",
    nameKey: "styleBoucher",
    descKey: "styleBoucherDesc",
    modifier:
      "in the style of François Boucher, French Rococo, 18th century pastoral, soft pastel palette, pearlescent pink #F0B8A0, porcelain blue #9DC4D8, golden warmth #E8CC88, voluptuous idealized forms, silk draperies in elegant curves, putti cherubs, Arcadian landscape, golden warm diffused atmosphere with no hard shadows, smooth polished surface, no visible brushwork, lush ornamental details, porcelain-like finish, sensual and playful, Versailles aesthetic, gilded ornate furniture, lilac shadows #C8A8C0, cream whites #F5EED8",
    color: "#F0B8A0",
  },
  {
    id: "hopper",
    nameKey: "styleHopper",
    descKey: "styleHopperDesc",
    modifier:
      "in the style of Edward Hopper, American realism, psychological solitude, harsh raking light from single source, long angular geometric shadows, simplified geometric architecture, cinematic fixed-camera framing, isolation and stillness, empty exaggerated interior space, single window as light source and divide between worlds, chrome yellow light #E8C840, cold green-yellow neon #D8D870, blue sky #5A88C0, cold brown shadows #5A5048, pale ochre walls #D8C090, flat uniform color areas, precise hard edges, voyeuristic perspective, suspended silent moment, static figures with backs turned, no atmosphere no haze, dry air direct light",
    color: "#E8C840",
  },
  {
    id: "rembrandt",
    nameKey: "styleRembrandt",
    descKey: "styleRembrandtDesc",
    modifier:
      "in the style of Rembrandt van Rijn, Dutch Golden Age, chiaroscuro tenebrism, single warm amber light source from the left, 80% deep darkness 20% golden light, dramatic diagonal lighting, deep brown Van Dyck shadows #2A1A0E and #5A3820, golden amber light #D4900A, warm sfumato transitions at light edges, dark indeterminate background receding into infinite shadow, thick impasto on highlights, rich brown oil glazes building shadows, earthy warm palette, emerge from darkness, one detail in full light, visible brushwork in dark areas, psychological depth",
    color: "#D4900A",
  },
  {
    id: "hockney",
    nameKey: "styleHockney",
    descKey: "styleHockneyDesc",
    modifier:
      "in the style of David Hockney, British Pop Art, California swimming pool aesthetic, vivid flat color areas, turquoise blue water #1A9EC8 with stylized parallel wave ripple lines, bold pure unmixed colors at maximum intensity, geometric sharp shadows in light blue-grey #A0B8D0, multiple simultaneous perspectives, clean hard edges and outlines, acrylic on canvas matte quality, joyful chromatic intensity, acid green foliage #78C830, emerald green #28A850, pure yellow sunlight #F0C820, brilliant white #F8F4E8, direct California sunlight no atmosphere no haze, graphic clarity, simplified but present figures, magenta accents #E83888",
    color: "#1A9EC8",
  },
  {
    id: "free",
    nameKey: "styleFree",
    descKey: "styleFreeDesc",
    modifier: "",
    color: "#C4714A",
  },
];

const PROMPT_SUFFIX =
  "oil painting, highly detailed, fine art, museum quality, no text, no watermark";

export function buildEnrichedPrompt(
  userPrompt: string,
  styleId: string
): string {
  const style = artStyles.find((s) => s.id === styleId);
  const parts = [userPrompt];
  if (style?.modifier) {
    parts.push(style.modifier);
  }
  parts.push(PROMPT_SUFFIX);
  return parts.join(". ");
}
