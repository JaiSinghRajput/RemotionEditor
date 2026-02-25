import { nanoid } from "nanoid";
import { BackgroundLayer, Project, TextLayer } from "./types";

export const createBackgroundLayer = (partial?: Partial<BackgroundLayer>): BackgroundLayer => ({
  id: crypto.randomUUID(),
  name: "Background",
  from: 0,
  to: 150,
  zIndex: 0,
  enabled: true,
  type: "background",
  src: "",
  fit: "cover",
  ...partial,
  transitionIn: { type: "fade", duration: 10 },
  transitionOut: { type: "fade", duration: 10 },
});
export function createTextLayer(project: Project | null | undefined): TextLayer {
  const fps = project?.fps ?? 30;
  const durationInFrames = project?.durationInFrames ?? fps * 10;

  return {
    id: nanoid(),
    type: "text",
    name: "Text",
    from: 0,
    to: Math.min(durationInFrames, fps * 5),
    zIndex: 20,
    enabled: true,

    text: "Text",
    x: 200,
    y: 240,

    fontSize: 80,
    lineHeight: 1.1,
    letterSpacing: 0,
    color: "#ffffff",
    opacity: 1,

    fontFamily: "Inter",
    fontWeight: 700,
    fontStyle: "normal",
    textTransform: "none",
    align: "left",

    shadow: { enabled: false, color: "rgba(0,0,0,0.6)", x: 0, y: 8, blur: 18 },
    stroke: { enabled: false, color: "#000000", width: 6 },
    background: {
      enabled: false,
      color: "rgba(0,0,0,0.35)",
      paddingX: 18,
      paddingY: 10,
      radius: 14,
    },

    animationIn: { type: "fade", duration: 12 },
    animationOut: { type: "fade", duration: 12 },
    transitionIn: { type: "fade", duration: 10 },
    transitionOut: { type: "fade", duration: 10 },

  };
}