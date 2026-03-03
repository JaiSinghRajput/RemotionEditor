"use client";
import LayerRow from "./LayerRow";
import AddLayerMenu from "./AddLayerMenu";
import { useEditorStore } from "../../../lib/editor/store";

export default function LayersPanel() {
  const project = useEditorStore((s) => s.project);
  if (!project) return null;

  return (
    <div className="p-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Layers</span>
      </div>

      <AddLayerMenu />

      <div className="flex flex-col gap-1 mt-3">
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
