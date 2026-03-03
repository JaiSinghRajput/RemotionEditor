"use client";

import { createAudioLayer, createBackgroundLayer, createTextLayer } from "../../../lib/editor/factories";
import { useEditorStore } from "../../../lib/editor/store";

export default function AddLayerMenu() {
  const project = useEditorStore((s) => s.project);

  const addLayer = useEditorStore((s) => s.addLayer);

  const handleAddText = () => {
    if (!project) return;
    addLayer(createTextLayer(project));
  };
  const handleAddBackground = () => {
    if (!project) return;
    addLayer(createBackgroundLayer());
  };
  const handleAddAudio = () => {
    if (!project) return;
    addLayer(createAudioLayer(project));
  };
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <button
        className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 text-violet-300/80 hover:text-violet-200 text-xs font-medium cursor-pointer transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={!project}
        onClick={handleAddText}
        title="Add Text Layer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
        Text
      </button>
      <button
        className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border border-slate-500/20 bg-slate-500/5 hover:bg-slate-500/10 text-slate-300/80 hover:text-slate-200 text-xs font-medium cursor-pointer transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={!project}
        onClick={handleAddBackground}
        title="Add Background Layer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        BG
      </button>
      <button
        className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-300/80 hover:text-cyan-200 text-xs font-medium cursor-pointer transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={!project}
        onClick={handleAddAudio}
        title="Add Audio Layer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        Audio
      </button>
    </div>
  );
}
