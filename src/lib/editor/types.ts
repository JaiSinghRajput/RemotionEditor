export type Project = {
  id: string;
  name: string;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  layers: Layer[];
};

export type Transition =
  | { type: "none" }
  | { type: "fade"; duration: number }
  | { type: "slideUp"; duration: number; distance: number }
  | { type: "slideLeft"; duration: number; distance: number }
  | { type: "zoom"; duration: number; from: number };

export type BaseLayer = {
  id: string;
  name: string;
  from: number;
  to: number;
  zIndex: number;
  enabled: boolean;

  transitionIn?: Transition;
  transitionOut?: Transition;
};


export type BackgroundLayer = BaseLayer & {
  type: "background";
  src: string;
  fit?: "cover" | "contain";
};

export type TextAnimation =
  | { type: "none" }
  | { type: "fade"; duration: number }
  | { type: "slideUp"; duration: number; distance: number }
  | { type: "scaleIn"; duration: number; from: number }
  | { type: "typewriter"; cps: number }; // chars per second

export type TextShadow = {
  enabled: boolean;
  color: string;     // rgba or hex
  x: number;
  y: number;
  blur: number;
};

export type TextStroke = {
  enabled: boolean;
  color: string;
  width: number;
};

export type TextBg = {
  enabled: boolean;
  color: string;
  paddingX: number;
  paddingY: number;
  radius: number;
};

export type TextLayer = BaseLayer & {
  id: string;
  type: "text";
  name: string;
  from: number;
  to: number;
  zIndex: number;
  enabled: boolean;

  text: string;

  x: number;
  y: number;

  fontSize: number;
  lineHeight: number;
  letterSpacing: number;

  color: string;
  opacity: number;

  fontFamily: string;
  fontWeight: number;
  fontStyle: "normal" | "italic";
  textTransform: "none" | "uppercase" | "lowercase";
  align: "left" | "center" | "right";

  shadow: TextShadow;
  stroke: TextStroke;
  background: TextBg;

  animationIn: TextAnimation;
  animationOut: TextAnimation;
};


export type Layer = BackgroundLayer | TextLayer;

