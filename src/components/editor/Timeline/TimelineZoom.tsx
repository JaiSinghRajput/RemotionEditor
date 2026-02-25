"use client";

import { useEditorStore } from "../../../lib/editor/store";

export default function TimelineZoom() {
  const zoom = useEditorStore((s) => s.zoom);
  const setZoom = useEditorStore((s) => s.setZoom);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs opacity-70">Zoom</span>
      <input
        type="range"
        min={1}
        max={5}
        step={0.25}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
      />
      <span className="text-xs w-10">{zoom}x</span>
    </div>
  );
}
