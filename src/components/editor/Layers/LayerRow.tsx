"use client";

import { useEditorStore } from "../../../lib/editor/store";

export default function LayerRow({layerId}: {layerId: string}) {
  const project = useEditorStore((s) => s.project)!;
  const selectLayer = useEditorStore((s) => s.selectLayer);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);

  const layer = project.layers.find((l) => l.id === layerId);
  if (!layer) return null;

  const selected = selectedLayerId === layerId;

  return (
    <button
      onClick={() => selectLayer(layerId)}
      className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${
        selected ? "bg-blue-600/30 border-blue-500/50 text-blue-200" : "border-white/15 hover:border-white/30 hover:bg-white/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="truncate font-medium">{layer.name}</span>
        <span className="text-xs opacity-60 ml-2">{layer.type}</span>
      </div>
    </button>
  );
}
