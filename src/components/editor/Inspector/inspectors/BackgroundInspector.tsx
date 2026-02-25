"use client";
import { useEditorStore } from "../../../../lib/editor/store";
import { BackgroundLayer } from "../../../../lib/editor/types";
import FieldSelect from "../fields/FieldSelect";
import FieldText from "../fields/FieldText";
import FieldTransition from "../fields/FieldTransition";
export default function BackgroundInspector({ layer }: { layer: BackgroundLayer }) {
  const updateLayer = useEditorStore((s) => s.updateLayer);

  return (
    <div className="flex flex-col gap-3">
      <FieldText
        label="Background URL"
        value={layer.src}
        onChange={(v) => updateLayer(layer.id, layer.type, { src: v })}
      />

      <FieldSelect
        label="Fit"
        value={layer.fit ?? "cover"}
        options={[
          { label: "Cover", value: "cover" },
          { label: "Contain", value: "contain" },
        ]}
        onChange={(v) => updateLayer(layer.id, layer.type, { fit: v })}
      />
      <FieldTransition
        label="Transition In"
        value={layer.transitionIn}
        onChange={(v) => updateLayer(layer.id, "background", { transitionIn: v })}
      />

      <FieldTransition
        label="Transition Out"
        value={layer.transitionOut}
        onChange={(v) => updateLayer(layer.id, "background", { transitionOut: v })}
      />
    </div>
  );
}
