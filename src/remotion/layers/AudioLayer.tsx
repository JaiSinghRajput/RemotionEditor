import { Audio } from "remotion";
import { AudioLayer } from "../../lib/editor/types";

export default function AudioLayerComp({ layer }: { layer: AudioLayer }) {
  if (!layer.src) return null;

  return (
    <Audio
      src={layer.src}
      volume={Math.max(0, layer.volume)}
      startFrom={Math.max(0, Math.floor(layer.startFrom ?? 0))}
    />
  );
}
