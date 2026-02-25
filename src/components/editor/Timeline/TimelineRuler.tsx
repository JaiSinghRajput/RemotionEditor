"use client";
import { useEditorStore } from "../../../lib/editor/store";
import { PX_PER_SEC } from "./Timeline";
import { useRef, useState } from "react";

export default function TimelineRuler({ canvasWidth }: { canvasWidth: number }) {
  const project = useEditorStore((s) => s.project);
  const zoom = useEditorStore((s) => s.zoom);
  const setFrame = useEditorStore((s) => s.setFrame);
  const rulerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!project) return null;

  const seconds = Math.ceil(project.durationInFrames / project.fps);

  const seekToPosition = (clientX: number) => {
    if (!rulerRef.current) return;
    
    const rect = rulerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const secondsValue = x / (PX_PER_SEC * zoom);
    const frames = Math.round(secondsValue * project.fps);
    setFrame(frames);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seekToPosition(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    seekToPosition(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={rulerRef}
      className="sticky top-0 z-30 h-10 bg-gradient-to-b from-neutral-800 to-neutral-900 border-b border-white/15 cursor-pointer select-none"
      style={{ width: canvasWidth }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="relative h-full w-full pointer-events-none">
        {Array.from({ length: seconds + 1 }).map((_, i) => {
          const left = i * PX_PER_SEC * zoom;

          return (
            <div
              key={i}
              className="absolute top-0 h-full"
              style={{ left }}
            >
              {/* Major tick - full height */}
              <div className="absolute top-0 bottom-0 w-px bg-white/25 shadow-sm" />

              {/* Sub ticks every 0.5s */}
              {zoom > 1 && (
                <>
                  <div
                    className="absolute top-3 bottom-0 w-px bg-white/15"
                    style={{ left: PX_PER_SEC * zoom * 0.5 }}
                  />
                  
                  {/* Sub-sub ticks every 0.1s */}
                  {zoom > 2 && (
                    Array.from({ length: 4 }).map((_, j) => (
                      <div
                        key={`tick-${j}`}
                        className="absolute top-5 bottom-0 w-px bg-white/8"
                        style={{ left: PX_PER_SEC * zoom * (0.1 * (j + 1)) }}
                      />
                    ))
                  )}
                </>
              )}

              {/* label */}
              <div className="absolute top-1 left-2 text-xs opacity-80 select-none font-semibold text-white/80">
                {i}s
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
