"use client";

import { useEditorStore } from "../../../lib/editor/store";

export default function LayerRow({ layerId }: { layerId: string }) {
  const project = useEditorStore((s) => s.project)!;
  const selectLayer = useEditorStore((s) => s.selectLayer);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);

  const layer = project.layers.find((l) => l.id === layerId);
  if (!layer) return null;

  const selected = selectedLayerId === layerId;

  const typeColor =
    layer.type === "audio"
      ? "bg-cyan-400"
      : layer.type === "text"
        ? "bg-violet-400"
        : "bg-slate-400";

  return (
    <button
      onClick={() => selectLayer(layerId)}
      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center gap-2.5 group ${selected
          ? "bg-white/8 border border-white/10 text-white"
          : "border border-transparent hover:border-white/5 hover:bg-white/4 text-white/70 hover:text-white/90"
        }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${typeColor} ${selected ? "opacity-100" : "opacity-50 group-hover:opacity-80"}`} />
      <span className="truncate font-medium flex-1">{layer.name}</span>
      <span className={`text-[10px] shrink-0 font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${selected ? "bg-white/10 text-white/60" : "text-white/30 group-hover:text-white/40"
        }`}>{layer.type.slice(0, 3)}</span>
    </button>
  );
}
