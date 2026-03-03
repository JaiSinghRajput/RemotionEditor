"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "../../../lib/editor/store";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

function framesToTimeString(frame: number, fps: number): string {
  const totalMs = Math.round((frame / fps) * 1000);
  const mins = Math.floor(totalMs / 60000);
  const secs = Math.floor((totalMs % 60000) / 1000);
  const ms = totalMs % 1000;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

export default function PlaybackControls() {
  const project = useEditorStore((s) => s.project);
  // Only subscribe to things that affect button state, NOT currentFrame
  const playing = useEditorStore((s) => s.playing);
  const muted = useEditorStore((s) => s.muted);
  const togglePlay = useEditorStore((s) => s.togglePlay);
  const toggleMute = useEditorStore((s) => s.toggleMute);
  const seekFrames = useEditorStore((s) => s.seekFrames);

  // Refs for DOM elements we'll update directly — avoids React re-renders on every frame
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timeLabelRef = useRef<HTMLSpanElement>(null);
  const totalLabelRef = useRef<HTMLSpanElement>(null);

  // Set total duration label once on mount
  useEffect(() => {
    if (!project || !totalLabelRef.current) return;
    totalLabelRef.current.textContent = framesToTimeString(project.durationInFrames, project.fps);
  }, [project]);

  // Subscribe to currentFrame changes via getState() + listener to avoid re-renders
  useEffect(() => {
    if (!project) return;
    const fps = project.fps;
    const totalFrames = project.durationInFrames;

    return useEditorStore.subscribe((state) => {
      const frame = state.currentFrame;

      // Update progress bar width directly via DOM
      if (progressBarRef.current) {
        const pct = totalFrames > 1 ? (frame / (totalFrames - 1)) * 100 : 0;
        progressBarRef.current.style.width = `${pct}%`;
      }

      // Update time label directly via DOM
      if (timeLabelRef.current) {
        timeLabelRef.current.textContent = framesToTimeString(frame, fps);
      }
    });
  }, [project]);

  if (!project) return null;

  const fps = project.fps;

  const iconBtn =
    "p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150 active:scale-95 border border-transparent hover:border-white/10";

  const primaryBtn =
    "p-3 rounded-xl bg-white text-black hover:bg-neutral-200 transition-all duration-150 active:scale-95 shadow-lg shadow-black/30";

  return (
    <div className="flex flex-col items-center gap-3 w-full px-2">
      {/* Progress bar — width updated by DOM ref, no React re-render */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-indigo-500 rounded-full"
          style={{ width: "0%", transition: "width 0.05s linear" }}
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-1 w-full">
        {/* Mute button */}
        <button
          className={`${iconBtn} ${muted ? "text-red-400 hover:text-red-300" : ""}`}
          onClick={toggleMute}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Current time — updated by DOM ref */}
        <span
          ref={timeLabelRef}
          className="text-[11px] font-mono text-white/40 tabular-nums ml-1 select-none"
        >
          00:00.000
        </span>

        <div className="flex-1" />

        {/* Back 1s */}
        <button
          className={iconBtn}
          onClick={() => seekFrames(-fps)}
          title="Back 1 second"
        >
          <SkipBack size={16} />
        </button>

        {/* Play / Pause */}
        <button className={primaryBtn} onClick={togglePlay} title={playing ? "Pause" : "Play"}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>

        {/* Forward 1s */}
        <button
          className={iconBtn}
          onClick={() => seekFrames(+fps)}
          title="Forward 1 second"
        >
          <SkipForward size={16} />
        </button>

        <div className="flex-1" />

        {/* Total duration — set once via DOM ref */}
        <span
          ref={totalLabelRef}
          className="text-[11px] font-mono text-white/30 tabular-nums mr-1 select-none"
        >
          --:--.---
        </span>

        {/* Balance mute */}
        <div className="w-10" />
      </div>
    </div>
  );
}
