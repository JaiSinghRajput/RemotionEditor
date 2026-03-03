"use client";

import { useEditorStore } from "../../../lib/editor/store";

export default function TimelineZoom() {
  const zoom = useEditorStore((s) => s.zoom);
  const setZoom = useEditorStore((s) => s.setZoom);

  return (
    <div className="flex items-center gap-2">
      <svg className="w-3 h-3 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
      <input
        type="range"
        min={1}
        max={5}
        step={0.25}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        className="w-20 accent-indigo-400 h-1 cursor-pointer"
      />
      <span className="text-[10px] text-white/40 font-mono w-7 tabular-nums">{zoom}x</span>
    </div>
  );
}
