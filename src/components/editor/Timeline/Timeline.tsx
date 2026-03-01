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
  const visualLayers = project.layers.filter((layer) => layer.type !== "audio");
  const audioLayers = project.layers.filter((layer) => layer.type === "audio");

  const canvasWidth = useMemo(() => seconds * PX_PER_SEC * zoom, [seconds, zoom]);
  const canvasHeight = useMemo(
    () => 40 + (visualLayers.length + audioLayers.length + (audioLayers.length > 0 ? 1 : 0)) * TRACK_H,
    [visualLayers.length, audioLayers.length]
  );

  return (
    <div className="h-full w-full bg-neutral-950 text-white overflow-hidden">
      <div className="h-full w-full overflow-auto">
        <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
          <TimelineRuler canvasWidth={canvasWidth} />

          <div style={{ paddingTop: 40 }}>
            {visualLayers.map((layer) => (
              <TimelineTrack key={layer.id} layer={layer} />
            ))}

            {audioLayers.length > 0 ? (
              <div
                className="border-b border-white/10 relative bg-neutral-900/40 px-3 text-xs font-semibold text-cyan-300 flex items-center"
                style={{ height: TRACK_H }}
              >
                Audio Track
              </div>
            ) : null}

            {audioLayers.map((layer) => (
              <TimelineTrack key={layer.id} layer={layer} />
            ))}
          </div>

          <TimelinePlayhead />
        </div>
      </div>
    </div>
  );
}
