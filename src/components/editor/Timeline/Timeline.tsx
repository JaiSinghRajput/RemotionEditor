"use client";

import { useMemo } from "react";
import TimelineRuler from "./TimelineRuler";
import TimelineTrack from "./TimelineTrack";
import TimelinePlayhead from "./TimelinePlayhead";
import TimelineZoom from "./TimelineZoom";
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
    <div className="h-full w-full bg-[#0c0c0e] text-white overflow-hidden flex flex-col">
      {/* Timeline header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#111114] shrink-0">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18" />
          </svg>
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Timeline</span>
        </div>
        <TimelineZoom />
      </div>

      {/* Scrollable tracks */}
      <div className="flex-1 overflow-auto">
        <div className="relative" style={{ width: canvasWidth, height: canvasHeight }}>
          <TimelineRuler canvasWidth={canvasWidth} />

          <div style={{ paddingTop: 40 }}>
            {visualLayers.map((layer) => (
              <TimelineTrack key={layer.id} layer={layer} />
            ))}

            {audioLayers.length > 0 && (
              <div
                className="border-y border-white/5 relative bg-cyan-950/20 px-4 text-[10px] font-bold text-cyan-400/70 tracking-widest uppercase flex items-center gap-1.5"
                style={{ height: 24 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 inline-block" />
                Audio
              </div>
            )}

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
