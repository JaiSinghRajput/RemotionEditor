"use client";

import { useEditorStore } from "../../../../lib/editor/store";
import { AudioLayer } from "../../../../lib/editor/types";
import FieldNumber from "../fields/FieldNumber";
import FieldText from "../fields/FieldText";

export default function AudioInspector({ layer }: { layer: AudioLayer }) {
  const updateLayer = useEditorStore((s) => s.updateLayer);
  const project = useEditorStore((s) => s.project);
  const fps = project?.fps ?? 30;

  return (
    <div className="flex flex-col gap-4">
      <FieldText
        label="Audio URL / Path"
        value={layer.src}
        onChange={(v) => updateLayer(layer.id, "audio", { src: v })}
      />

      <FieldNumber
        label="Volume (0 – 2)"
        value={layer.volume ?? 1}
        onChange={(v) => updateLayer(layer.id, "audio", { volume: Math.max(0, Math.min(2, v)) })}
      />

      <FieldNumber
        label="Start Offset (frames)"
        value={layer.startFrom ?? 0}
        onChange={(v) =>
          updateLayer(layer.id, "audio", { startFrom: Math.max(0, Math.round(v)) })
        }
      />

      {/* Helper text */}
      <p className="text-[11px] text-white/30 leading-relaxed">
        <strong className="text-white/50">Start Offset</strong> trims the audio — higher values skip the beginning of the clip (like left-edge cropping on the timeline).
        <br />
        At {fps} fps, {fps} frames = 1 second.
      </p>
    </div>
  );
}
