"use client";

import { useRef, useState } from "react";
import { useEditorStore } from "../../../lib/editor/store";
import { Layer } from "../../../lib/editor/types";
import { clamp } from "../../../lib/editor/utils";
import { PX_PER_SEC } from "./Timeline";

type DragMode = "move" | "resize-left" | "resize-right" | null;

export default function TimelineLayerItem({ layer }: { layer: Layer }) {
  const project = useEditorStore((s) => s.project);
  const zoom = useEditorStore((s) => s.zoom);

  const updateLayer = useEditorStore((s) => s.updateLayer);
  const selectLayer = useEditorStore((s) => s.selectLayer);
  const selected = useEditorStore((s) => s.selectedLayerId === layer.id);

  const [dragMode, setDragMode] = useState<DragMode>(null);

  const startClientX = useRef(0);
  const initialFrom = useRef(0);
  const initialTo = useRef(0);
  const initialAudioStartFrom = useRef(0);

  if (!project) return null;

  const fps = project.fps;
  const totalFrames = project.durationInFrames;

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

      updateLayer(layer.id, layer.type, { from: newFrom, to: newTo } as any);
      return;
    }

    if (dragMode === "resize-left") {
      const newFrom = clamp(initialFrom.current + snappedDf, 0, initialTo.current - 1);

      if (layer.type === "audio") {
        const deltaFrames = newFrom - initialFrom.current;
        const newStartFrom = Math.max(0, initialAudioStartFrom.current + deltaFrames);
        updateLayer(layer.id, "audio", { from: newFrom, startFrom: newStartFrom } as any);
      } else {
        updateLayer(layer.id, layer.type, { from: newFrom } as any);
      }
      return;
    }

    if (dragMode === "resize-right") {
      const newTo = clamp(initialTo.current + snappedDf, initialFrom.current + 1, totalFrames);
      updateLayer(layer.id, layer.type, { to: newTo } as any);
      return;
    }
  }

  function onPointerUp() {
    setDragMode(null);
  }

  return (
    <div
      className={`absolute top-1 h-9 rounded-lg cursor-grab active:cursor-grabbing select-none transition-all ${
        layer.type === "background"
          ? "bg-gradient-to-r from-slate-600 to-slate-700"
          : layer.type === "audio"
          ? "bg-gradient-to-r from-cyan-600 to-cyan-700"
          : "bg-gradient-to-r from-violet-600 to-violet-700"
      } ${selected ? "ring-2 ring-blue-500 shadow-lg" : "shadow"} ${dragMode ? "opacity-90" : "opacity-100"}`}
      style={{
        left: leftPx,
        width: widthPx,
      }}
      onPointerDown={(e) => onPointerDown(e, "move")}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* LEFT HANDLE */}
      <div
        className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-white/30 hover:bg-white/50 rounded-l-lg transition-colors"
        onPointerDown={(e) => onPointerDown(e, "resize-left")}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />

      {/* RIGHT HANDLE */}
      <div
        className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-white/30 hover:bg-white/50 rounded-r-lg transition-colors"
        onPointerDown={(e) => onPointerDown(e, "resize-right")}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />

      <div className="px-3 text-xs h-full flex items-center font-medium text-white truncate">
        {layer.name}
      </div>
    </div>
  );
}
