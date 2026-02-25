"use client";

import { createBackgroundLayer, createTextLayer } from "../../../lib/editor/factories";
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
  return (
    <div className="w-full flex gap-2 mb-3">
      <button
        className="flex-1 px-2 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm cursor-pointer font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!project}
        onClick={handleAddText}
      >
        + Text
      </button>
      <button
        className="flex-1 px-2 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm cursor-pointer font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!project}
        onClick={handleAddBackground}
      >
        + BG
      </button>
    </div>
  );
}
