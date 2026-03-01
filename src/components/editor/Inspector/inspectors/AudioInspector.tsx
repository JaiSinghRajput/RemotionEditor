"use client";

import { useEditorStore } from "../../../../lib/editor/store";
import { AudioLayer } from "../../../../lib/editor/types";
import FieldNumber from "../fields/FieldNumber";
import FieldText from "../fields/FieldText";

export default function AudioInspector({ layer }: { layer: AudioLayer }) {
  const updateLayer = useEditorStore((s) => s.updateLayer);

  return (
    <div className="flex flex-col gap-3">
      <FieldText
        label="Audio URL"
        value={layer.src}
        onChange={(v) => updateLayer(layer.id, "audio", { src: v })}
      />

      <FieldNumber
        label="Volume (0-2)"
        value={layer.volume}
        onChange={(v) => updateLayer(layer.id, "audio", { volume: Math.max(0, Math.min(2, v)) })}
      />
    </div>
  );
}
