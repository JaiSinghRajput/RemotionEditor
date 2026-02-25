"use client";

import { useEditorStore } from "../../../lib/editor/store";
import { PX_PER_SEC } from "./Timeline";

export default function TimelinePlayhead() {
  const project = useEditorStore((s) => s.project);
  const currentFrame = useEditorStore((s) => s.currentFrame);
  const zoom = useEditorStore((s) => s.zoom);

  if (!project) return null;

  const x = (currentFrame / project.fps) * PX_PER_SEC * zoom;
  const seconds = (currentFrame / project.fps).toFixed(2);
  
  return (
    <>
      {/* Playhead line */}
      <div
        className="absolute top-0 -bottom-9 w-[3px] bg-gradient-to-b from-red-500 to-red-600 z-50 pointer-events-none shadow-lg"
        style={{ left: x, transform: "translateX(-50%)" }}
      />
      
      {/* Playhead marker at top */}
      <div
        className="absolute top-0 z-50 pointer-events-none"
        style={{ left: x, transform: "translateX(-50%)" }}
      >
        <div className="w-0 h-0 border-l-2 border-r-2 border-t-3 border-l-transparent border-r-transparent border-t-red-500" />
      </div>

      {/* Time label */}
      <div
        className="absolute top-0 text-xs font-mono text-red-400 opacity-80 pointer-events-none z-40"
        style={{
          left: x,
          transform: "translateX(-50%)",
          marginTop: "2px",
          whiteSpace: "nowrap",
        }}
      >
        {seconds}s
      </div>
    </>
  );
}
