import { interpolate } from "remotion";
import { TextLayer } from "../../lib/editor/types";

export function getTextStyle(layer: TextLayer, localFrame: number) {
  const anim = layer.animationIn; // ✅ use new field

  // safety
  if (!anim || anim.type === "none") return {};

  if (anim.type === "fade") {
    const p = interpolate(localFrame, [0, anim.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
    return { opacity: p };
  }

  if (anim.type === "slideUp") {
    const p = interpolate(localFrame, [0, anim.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
    return {
      opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`,
    };
  }

  if (anim.type === "scaleIn") {
    const p = interpolate(localFrame, [0, anim.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
    return {
      opacity: p,
      transform: `scale(${interpolate(p, [0, 1], [anim.from ?? 0.7, 1])})`,
    };
  }

  if (anim.type === "typewriter") {
    const text = layer.text ?? "";
    const chars = Math.floor(
      interpolate(localFrame, [0, 60], [0, text.length], {
        extrapolateRight: "clamp",
      })
    );

    return {
      opacity: 1,
      __textOverride: text.slice(0, chars),
    } as any;
  }

  return {};
}
