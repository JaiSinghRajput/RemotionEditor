"use client";

import { useMemo } from "react";
import TimelineRuler from "./TimelineRuler";
import TimelineTrack from "./TimelineTrack";
import TimelinePlayhead from "./TimelinePlayhead";
import { useEditorStore } from "../../../lib/editor/store";

export const PX_PER_SEC = 80;
export const TRACK_H = 52;

export default function Timeline() {
  const project = useEditorStore((s) => s.project);
  const zoom = useEditorStore((s) => s.zoom);

  if (!project) return null;

  const seconds = Math.ceil(project.durationInFrames / project.fps);

  const canvasWidth = useMemo(() => seconds * PX_PER_SEC * zoom, [seconds, zoom]);
  const canvasHeight = useMemo(
    () => 40 + project.layers.length * TRACK_H,
    [project.layers.length]
  );

  return (
    <div className="h-full w-full bg-neutral-950 text-white overflow-hidden">
      <div className="h-full w-full overflow-auto">
        <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
          <TimelineRuler canvasWidth={canvasWidth} />

          <div style={{ paddingTop: 40 }}>
            {project.layers.map((layer) => (
              <TimelineTrack key={layer.id} layer={layer} />
            ))}
          </div>

          <TimelinePlayhead />
        </div>
      </div>
    </div>
  );
}
