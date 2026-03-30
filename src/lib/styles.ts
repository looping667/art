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
      "in the style of Eugène Boudin, loose impressionist brushwork, luminous sky, Norman coast atmosphere, oil on canvas",
    color: "#87CEEB",
  },
  {
    id: "monet",
    nameKey: "styleMonet",
    descKey: "styleMonetDesc",
    modifier:
      "in the style of Claude Monet, impressionist, soft light, visible brushstrokes, garden or water scene, oil painting",
    color: "#9DC183",
  },
  {
    id: "boucher",
    nameKey: "styleBoucher",
    descKey: "styleBoucherDesc",
    modifier:
      "in the style of François Boucher, French baroque, pastoral scenes, golden tones, rococo elegance, oil painting",
    color: "#C9A84C",
  },
  {
    id: "hopper",
    nameKey: "styleHopper",
    descKey: "styleHopperDesc",
    modifier:
      "in the style of Edward Hopper, American realism, raking light, solitude, urban scenes, oil painting",
    color: "#D4956A",
  },
  {
    id: "rembrandt",
    nameKey: "styleRembrandt",
    descKey: "styleRembrandtDesc",
    modifier:
      "in the style of Rembrandt, chiaroscuro, dramatic lighting, classical realism, rich dark tones, oil painting",
    color: "#8B6914",
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
