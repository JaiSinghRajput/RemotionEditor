"use client";
import LayerRow from "./LayerRow";
import AddLayerMenu from "./AddLayerMenu";
import { useEditorStore } from "../../../lib/editor/store";

export default function LayersPanel() {
  const project = useEditorStore((s) => s.project);
  if (!project) return null;

  return (
    <div className="p-4">
      <div className="text-sm font-semibold mb-3 text-white/90">🎞️ Layers</div>
      <AddLayerMenu />
      <div className="flex flex-col gap-1.5 mt-3">
        {project.layers
          .slice()
          .sort((a, b) => b.zIndex - a.zIndex)
          .map((layer) => (
            <LayerRow key={layer.id} layerId={layer.id} />
          ))}
      </div>
    </div>
  );
}
