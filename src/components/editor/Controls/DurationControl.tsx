"use client";

import { useEditorStore } from "../../../lib/editor/store";

export default function DurationControl() {
  const project = useEditorStore((s) => s.project);
  const setDuration = useEditorStore((s) => s.setDuration);

  if (!project) return null;

  const durationInSeconds = project.durationInFrames / project.fps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seconds = parseFloat(e.target.value);
    if (seconds > 0) {
      const frames = Math.round(seconds * project.fps);
      setDuration(frames);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-white/70 font-medium">Duration:</label>
      <input
        type="number"
        min="1"
        max="600"
        step="0.5"
        value={durationInSeconds.toFixed(1)}
        onChange={handleChange}
        className="w-20 px-3 py-1.5 rounded bg-neutral-800 text-white text-sm border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
      />
      <span className="text-xs text-white/60">s</span>
    </div>
  );
}
