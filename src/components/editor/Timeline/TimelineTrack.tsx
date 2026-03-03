"use client";
import { memo, useMemo } from "react";
import TimelineLayerItem from "./TimelineLayerItem";
import { TRACK_H, PX_PER_SEC } from "./Timeline";
import { Layer } from "../../../lib/editor/types";
import { useEditorStore } from "../../../lib/editor/store";

// Memoized so it only re-renders when `layer`, `zoom`, or `project.durationInFrames/fps` changes
// Critically: does NOT re-render when currentFrame changes (subscribes only to zoom and project dims)
const TimelineTrack = memo(function TimelineTrack({ layer }: { layer: Layer }) {
  const fps = useEditorStore((s) => s.project?.fps ?? 30);
  const totalFrames = useEditorStore((s) => s.project?.durationInFrames ?? 0);
  const zoom = useEditorStore((s) => s.zoom);

  const gridLines = useMemo(() => {
    const seconds = Math.ceil(totalFrames / fps);
    const lines: { position: number; type: "major" | "minor" }[] = [];

    for (let i = 0; i <= seconds; i++) {
      lines.push({ position: i * PX_PER_SEC * zoom, type: "major" });

      if (zoom > 1.5) {
        for (let j = 1; j < 10; j++) {
          lines.push({
            position: (i + j * 0.1) * PX_PER_SEC * zoom,
            type: "minor",
          });
        }
      }
    }
    return lines;
  }, [fps, totalFrames, zoom]);

  return (
    <div
      className="border-b border-white/5 relative bg-[#0d0d10]"
      style={{ height: TRACK_H }}
    >
      {/* Grid lines */}
      {gridLines.map((line, idx) => (
        <div
          key={`grid-${idx}`}
          className={`absolute top-0 bottom-0 ${line.type === "major" ? "bg-white/5" : "bg-white/[0.02]"
            }`}
          style={{
            left: line.position,
            width: line.type === "major" ? "1px" : "0.5px",
          }}
        />
      ))}

      {/* Layer item */}
      <div className="relative h-full z-10">
        <TimelineLayerItem layer={layer} />
      </div>
    </div>
  );
});

export default TimelineTrack;
