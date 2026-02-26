import { useMemo, useEffect, useState } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { TextLayer } from "../../lib/editor/types";
import { ensureGoogleFontLoaded } from "../../lib/fonts/googleFonts";
import { getTransitionStyle } from "../transitions/getTransitionStyle";

function applyTransformText(text: string, mode: TextLayer["textTransform"]) {
  if (mode === "uppercase") return text.toUpperCase();
  if (mode === "lowercase") return text.toLowerCase();
  return text;
}

export default function TextLayerComp({ layer }: { layer: TextLayer }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [fontLoaded, setFontLoaded] = useState(false);

  // relative frame inside layer
  const localFrame = frame - layer.from;
  const duration = layer.to - layer.from;

  const inAnim = layer.animationIn;
  const outAnim = layer.animationOut;

  // ✅ load font dynamically in browser preview and wait for it
  useEffect(() => {
    let mounted = true;
    setFontLoaded(false);
    
    ensureGoogleFontLoaded(layer.fontFamily).then(() => {
      if (mounted) {
        setFontLoaded(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [layer.fontFamily]);
  let opacity = layer.opacity;

  // animation values (your existing ones)
  let animTranslateY = 0;
  let animScale = 1;

  if (inAnim.type === "fade") {
    opacity *= interpolate(localFrame, [0, inAnim.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
  }

  if (inAnim.type === "slideUp") {
    const p = spring({ fps, frame: localFrame, config: { damping: 200 } });
    animTranslateY = (1 - p) * inAnim.distance;

    opacity *= interpolate(localFrame, [0, inAnim.duration], [0, 1], {
      extrapolateRight: "clamp",
    });
  }

  if (inAnim.type === "scaleIn") {
    const p = spring({ fps, frame: localFrame, config: { damping: 200 } });
    animScale = inAnim.from + (1 - inAnim.from) * p;

    opacity *= interpolate(localFrame, [0, 12], [0, 1], {
      extrapolateRight: "clamp",
    });
  }

  const outStart = duration - (outAnim.type === "fade" ? outAnim.duration : 12);

  if (outAnim.type === "fade") {
    const o = interpolate(localFrame, [outStart, duration], [1, 0], {
      extrapolateLeft: "clamp",
    });
    opacity *= o;
  }
  const t = getTransitionStyle({
    localFrame,
    duration,
    fps,
    transitionIn: layer.transitionIn,
    transitionOut: layer.transitionOut,
  });

  opacity *= t.opacity;
  const displayText = useMemo(() => {
    const text = applyTransformText(layer.text, layer.textTransform);

    if (inAnim.type !== "typewriter") return text;

    const chars = Math.floor((localFrame / fps) * inAnim.cps);
    return text.slice(0, Math.max(0, chars));
  }, [layer.text, layer.textTransform, inAnim, localFrame, fps]);

  const textShadow = layer.shadow?.enabled
    ? `${layer.shadow.x}px ${layer.shadow.y}px ${layer.shadow.blur}px ${layer.shadow.color}`
    : undefined;

  const stroke = layer.stroke?.enabled
    ? `${layer.stroke.width}px ${layer.stroke.color}`
    : undefined;

  const finalTransform = `${t.transform} translateY(${animTranslateY}px) scale(${animScale})`;

  // Hide text until font is loaded to prevent flickering
  const finalOpacity = fontLoaded ? opacity : 0;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: layer.x,
          top: layer.y,

          opacity: finalOpacity,
          transform: finalTransform,
          transformOrigin: "top left",

          fontSize: layer.fontSize,
          lineHeight: layer.lineHeight,
          letterSpacing: layer.letterSpacing,

          color: layer.color,
          fontFamily: layer.fontFamily,
          fontWeight: layer.fontWeight,
          fontStyle: layer.fontStyle,

          textAlign: layer.align,
          textShadow,
          WebkitTextStroke: stroke,

          padding: layer.background?.enabled
            ? `${layer.background.paddingY}px ${layer.background.paddingX}px`
            : undefined,
          background: layer.background?.enabled ? layer.background.color : undefined,
          borderRadius: layer.background?.enabled ? layer.background.radius : undefined,

          whiteSpace: "pre-wrap",
        }}
      >
        {displayText}
      </div>
    </AbsoluteFill>
  );
}
