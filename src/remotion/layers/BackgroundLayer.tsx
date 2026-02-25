import { AbsoluteFill, Img, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Gif } from "@remotion/gif";
import { getTransitionStyle } from "../transitions/getTransitionStyle";
import { BackgroundLayer } from "../../lib/editor/types";

export default function BackgroundLayerComp({ layer }: { layer: BackgroundLayer }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!layer.src) return <AbsoluteFill style={{ backgroundColor: "black" }} />;

  const localFrame = frame - layer.from;
  const duration = layer.to - layer.from;

  const t = getTransitionStyle({
    localFrame,
    duration,
    fps,
    transitionIn: layer.transitionIn,
    transitionOut: layer.transitionOut,
  });

  const isGif =
    layer.src.toLowerCase().includes(".gif") ||
    layer.src.toLowerCase().includes("f_gif");


  return (
    <Sequence from={layer.from} durationInFrames={duration}>
      <AbsoluteFill style={{ opacity: t.opacity, transform: t.transform }}>
        {isGif ? (
          <Gif
            key={`${layer.id}-${layer.from}-${layer.to}`}
            src={layer.src}
            style={{ width: "100%", height: "100%" }}
            fit={layer.fit ?? "cover"}
          />
        ) : (
          <Img
            src={layer.src}
            style={{
              width: "100%",
              height: "100%",
              objectFit: layer.fit ?? "cover",
            }}
          />
        )}
      </AbsoluteFill>
    </Sequence>
  );
}
