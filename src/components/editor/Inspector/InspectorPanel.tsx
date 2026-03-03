"use client";

import { useEditorStore } from "../../../lib/editor/store";
import BackgroundInspector from "./inspectors/BackgroundInspector";
import TextInspector from "./inspectors/TextInspector";
import AudioInspector from "./inspectors/AudioInspector";

export default function InspectorPanel() {
  const project = useEditorStore((s) => s.project);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);

  if (!project) return null;
  const layer = project.layers.find((l) => l.id === selectedLayerId);

  if (!layer) return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
        <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-white/40">No layer selected</p>
        <p className="text-xs text-white/20 mt-1">Click a layer to inspect it</p>
      </div>
    </div>
  );

  const typeColor =
    layer.type === "audio"
      ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
      : layer.type === "text"
        ? "text-violet-400 bg-violet-400/10 border-violet-400/20"
        : "text-slate-400 bg-slate-400/10 border-slate-400/20";

  return (
    <div className="flex flex-col h-full">
      {/* Inspector Header */}
      <div className="sticky top-0 z-10 px-5 py-4 border-b border-white/5 bg-[#121215] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Inspector</span>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColor}`}>
          {layer.type}
        </span>
      </div>

      {/* Layer name */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-sm font-semibold text-white/90 truncate">{layer.name}</p>
      </div>

      {/* Properties */}
      <div className="px-5 pb-5 space-y-4 overflow-auto flex-1">
        {layer.type === "text" && <TextInspector layer={layer} />}
        {layer.type === "background" && <BackgroundInspector layer={layer} />}
        {layer.type === "audio" && <AudioInspector layer={layer} />}
      </div>
    </div>
  );
}
