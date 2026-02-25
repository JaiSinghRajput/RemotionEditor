"use client";
import TimelineLayerItem from "./TimelineLayerItem";
import { TRACK_H, PX_PER_SEC } from "./Timeline";
import { Layer } from "../../../lib/editor/types";
import { useEditorStore } from "../../../lib/editor/store";
import { useMemo } from "react";

export default function TimelineTrack({ layer }: { layer: Layer }) {
  const project = useEditorStore((s) => s.project);
  const zoom = useEditorStore((s) => s.zoom);

  const gridLines = useMemo(() => {
    if (!project) return [];
    const seconds = Math.ceil(project.durationInFrames / project.fps);
    const lines = [];

    // Major grid lines every second
    for (let i = 0; i <= seconds; i++) {
      lines.push({
        position: i * PX_PER_SEC * zoom,
        type: "major",
      });

      // Minor grid lines every 0.1s
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
  }, [project, zoom]);

  return (
    <div
      className="border-b border-white/10 relative bg-neutral-950/50"
      style={{ height: TRACK_H }}
    >
      {/* Grid lines */}
      {gridLines.map((line, idx) => (
        <div
          key={`grid-${idx}`}
          className={`absolute top-0 bottom-0 ${
            line.type === "major" ? "bg-white/8" : "bg-white/3"
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
}
