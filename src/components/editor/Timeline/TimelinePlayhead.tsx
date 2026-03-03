"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "../../../lib/editor/store";
import { PX_PER_SEC } from "./Timeline";

export default function TimelinePlayhead() {
  const project = useEditorStore((s) => s.project);

  const lineRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Subscribe to currentFrame without causing React re-renders
  useEffect(() => {
    if (!project) return;
    const fps = project.fps;
    return useEditorStore.subscribe((state) => {
      const frame = state.currentFrame;
      const z = state.zoom;
      const x = (frame / fps) * PX_PER_SEC * z;

      const totalMs = Math.round((frame / fps) * 1000);
      const mins = Math.floor(totalMs / 60000);
      const secs = Math.floor((totalMs % 60000) / 1000);
      const ms = totalMs % 1000;
      const label = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;

      if (lineRef.current) lineRef.current.style.left = `${x}px`;
      if (triangleRef.current) triangleRef.current.style.left = `${x}px`;
      if (labelRef.current) {
        labelRef.current.style.left = `${x + 6}px`;
        labelRef.current.textContent = label;
      }
    });
  }, [project]);

  if (!project) return null;

  // Initial position
  const initFrame = useEditorStore.getState().currentFrame;
  const initZoom = useEditorStore.getState().zoom;
  const initX = (initFrame / project.fps) * PX_PER_SEC * initZoom;

  return (
    <>
      {/* Playhead line */}
      <div
        ref={lineRef}
        className="absolute top-0 -bottom-9 w-px bg-red-500/80 z-50 pointer-events-none shadow-[0_0_6px_rgba(239,68,68,0.6)]"
        style={{ left: initX, transform: "translateX(-50%)" }}
      />

      {/* Playhead triangle marker */}
      <div
        ref={triangleRef}
        className="absolute top-0 z-50 pointer-events-none"
        style={{ left: initX, transform: "translateX(-50%)" }}
      >
        <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-500" />
      </div>

      {/* Time label */}
      <div
        ref={labelRef}
        className="absolute top-0.5 text-[9px] font-mono text-red-400/90 pointer-events-none z-40 bg-[#111114]/80 px-1 rounded"
        style={{ left: initX + 6, whiteSpace: "nowrap" }}
      >
        00:00.000
      </div>
    </>
  );
}
