export const DEFAULT_FPS = 30;
export const DEFAULT_WIDTH = 1080;
export const DEFAULT_HEIGHT = 1920;
export const DEFAULT_DURATION = 300; // 10 seconds @ 30fps
export const FORMAT_PRESETS = [
  { key: "portrait_9_16", name: "Portrait (9:16)", width: 1080, height: 1920 },
  { key: "landscape_16_9", name: "Landscape (16:9)", width: 1920, height: 1080 },
  { key: "square_1_1", name: "Square (1:1)", width: 1080, height: 1080 },
] as const;
