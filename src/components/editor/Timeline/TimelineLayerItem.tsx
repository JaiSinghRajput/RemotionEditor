"use client";

import { memo, useRef, useState } from "react";
import { useEditorStore } from "../../../lib/editor/store";
import { Layer } from "../../../lib/editor/types";
import { clamp } from "../../../lib/editor/utils";
import { PX_PER_SEC } from "./Timeline";

type DragMode = "move" | "resize-left" | "resize-right" | null;

export default memo(function TimelineLayerItem({ layer }: { layer: Layer }) {
  const fps = useEditorStore((s) => s.project?.fps ?? 30);
  const totalFrames = useEditorStore((s) => s.project?.durationInFrames ?? 0);
  const zoom = useEditorStore((s) => s.zoom);

  const updateLayerSilent = useEditorStore((s) => s.updateLayerSilent);
  const commitHistory = useEditorStore((s) => s.commitHistory);
  const selectLayer = useEditorStore((s) => s.selectLayer);
  const selected = useEditorStore((s) => s.selectedLayerId === layer.id);

  const [dragMode, setDragMode] = useState<DragMode>(null);

  const startClientX = useRef(0);
  const initialFrom = useRef(0);
  const initialTo = useRef(0);
  const initialAudioStartFrom = useRef(0);


  const frameToPx = (frame: number) => (frame / fps) * PX_PER_SEC * zoom;

  const pxToFrames = (px: number) => {
    const sec = px / (PX_PER_SEC * zoom);
    return Math.round(sec * fps);
  };

  // Snap to frames (1 frame grid)
  const snapFrames = (frames: number) => {
    return Math.round(frames);
  };

  const leftPx = frameToPx(layer.from);
  const widthPx = Math.max(12, frameToPx(layer.to) - frameToPx(layer.from));

  function onPointerDown(e: React.PointerEvent, mode: DragMode) {
    e.stopPropagation();
    selectLayer(layer.id);

    setDragMode(mode);
    startClientX.current = e.clientX;

    initialFrom.current = layer.from;
    initialTo.current = layer.to;
    initialAudioStartFrom.current = layer.type === "audio" ? (layer.startFrom ?? 0) : 0;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragMode) return;

    const dx = e.clientX - startClientX.current;
    const df = pxToFrames(dx);
    const snappedDf = snapFrames(df);

    if (dragMode === "move") {
      const duration = initialTo.current - initialFrom.current;

      const newFrom = clamp(initialFrom.current + snappedDf, 0, totalFrames - duration);
      const newTo = newFrom + duration;

      updateLayerSilent(layer.id, layer.type, { from: newFrom, to: newTo } as any);
      return;
    }

    if (dragMode === "resize-left") {
      if (layer.type === "audio") {
        const maxDelta = -initialAudioStartFrom.current;
        const allowedDf = Math.max(snappedDf, maxDelta);
        const newFrom = clamp(initialFrom.current + allowedDf, 0, initialTo.current - 1);
        const deltaFrames = newFrom - initialFrom.current;
        const newStartFrom = initialAudioStartFrom.current + deltaFrames;

        updateLayerSilent(layer.id, "audio", { from: newFrom, startFrom: newStartFrom } as any);
      } else {
        const newFrom = clamp(initialFrom.current + snappedDf, 0, initialTo.current - 1);
        updateLayerSilent(layer.id, layer.type, { from: newFrom } as any);
      }
      return;
    }

    if (dragMode === "resize-right") {
      const newTo = clamp(initialTo.current + snappedDf, initialFrom.current + 1, totalFrames);
      updateLayerSilent(layer.id, layer.type, { to: newTo } as any);
      return;
    }
  }

  function onPointerUp() {
    if (dragMode) commitHistory();
    setDragMode(null);
  }

  return (
    <div
      className={`absolute top-1.5 rounded-lg cursor-grab active:cursor-grabbing select-none transition-shadow ${layer.type === "background"
        ? "bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-500/40"
        : layer.type === "audio"
          ? "bg-gradient-to-r from-cyan-800 to-cyan-700 border border-cyan-500/40"
          : "bg-gradient-to-r from-violet-700 to-indigo-700 border border-violet-500/40"
        } ${selected ? "ring-2 ring-white/40 shadow-lg shadow-black/40" : "shadow-md shadow-black/30"} ${dragMode ? "opacity-80 scale-[1.01]" : "opacity-100"}`}
      style={{
        left: leftPx,
        width: widthPx,
        height: 40,
      }}
      onPointerDown={(e) => onPointerDown(e, "move")}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* LEFT HANDLE */}
      <div
        className="absolute left-0 top-0 h-full w-2.5 cursor-ew-resize rounded-l-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/30"
        onPointerDown={(e) => onPointerDown(e, "resize-left")}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="w-px h-4 bg-white/60 rounded-full" />
      </div>

      {/* RIGHT HANDLE */}
      <div
        className="absolute right-0 top-0 h-full w-2.5 cursor-ew-resize rounded-r-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 hover:bg-black/30"
        onPointerDown={(e) => onPointerDown(e, "resize-right")}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="w-px h-4 bg-white/60 rounded-full" />
      </div>

      {/* Label */}
      <div className="px-3 text-xs h-full flex items-center gap-1.5 font-medium text-white/90 truncate pointer-events-none">
        {layer.type === "audio" && (
          <svg className="w-3 h-3 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )}
        {layer.type === "text" && (
          <svg className="w-3 h-3 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        )}
        {layer.type === "background" && (
          <svg className="w-3 h-3 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
        <span className="truncate">{layer.name}</span>
      </div>
    </div>
  );
});
