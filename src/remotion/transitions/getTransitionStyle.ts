import { interpolate, spring } from "remotion";
import { Transition } from "../../lib/editor/types";

export function getTransitionStyle(params: {
  localFrame: number; // frame relative to layer.from
  duration: number;   // layer.to - layer.from
  fps: number;
  transitionIn?: Transition;
  transitionOut?: Transition;
}) {
  const { localFrame, duration, fps, transitionIn, transitionOut } = params;

  let opacity = 1;
  let translateX = 0;
  let translateY = 0;
  let scale = 1;

  // ✅ IN transition
  if (transitionIn?.type === "fade") {
    opacity *= interpolate(localFrame, [0, transitionIn.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
  }

  if (transitionIn?.type === "slideUp") {
    const d = transitionIn.distance ?? 80;
    const p = spring({ fps, frame: localFrame, config: { damping: 200 } });
    translateY = (1 - p) * d;
    opacity *= interpolate(localFrame, [0, transitionIn.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
  }

  if (transitionIn?.type === "slideLeft") {
    const d = transitionIn.distance ?? 120;
    const p = spring({ fps, frame: localFrame, config: { damping: 200 } });
    translateX = (1 - p) * d;
    opacity *= interpolate(localFrame, [0, transitionIn.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
  }

  if (transitionIn?.type === "zoom") {
    const from = transitionIn.from ?? 0.9;
    const p = spring({ fps, frame: localFrame, config: { damping: 200 } });
    scale = from + (1 - from) * p;
    opacity *= interpolate(localFrame, [0, transitionIn.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
  }

  // ✅ OUT transition
  if (transitionOut?.type === "fade") {
    const start = duration - transitionOut.duration;
    opacity *= interpolate(localFrame, [start, duration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  if (transitionOut?.type === "slideUp") {
    const d = transitionOut.distance ?? 80;
    const start = duration - transitionOut.duration;
    const localTransitionFrame = Math.max(0, localFrame - start);
    const p = spring({ fps, frame: localTransitionFrame, config: { damping: 200 } });
    translateY = -p * d;
    opacity *= interpolate(localFrame, [start, duration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  if (transitionOut?.type === "slideLeft") {
    const d = transitionOut.distance ?? 120;
    const start = duration - transitionOut.duration;
    const localTransitionFrame = Math.max(0, localFrame - start);
    const p = spring({ fps, frame: localTransitionFrame, config: { damping: 200 } });
    translateX = -p * d;
    opacity *= interpolate(localFrame, [start, duration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  if (transitionOut?.type === "zoom") {
    const from = transitionOut.from ?? 0.9;
    const start = duration - transitionOut.duration;
    const localTransitionFrame = Math.max(0, localFrame - start);
    const p = spring({ fps, frame: localTransitionFrame, config: { damping: 200 } });
    scale = 1 - (1 - from) * p;
    opacity *= interpolate(localFrame, [start, duration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  return {
    opacity,
    transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
  };
}
