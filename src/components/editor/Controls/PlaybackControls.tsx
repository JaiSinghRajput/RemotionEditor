"use client";

import { useEffect } from "react";
import { useEditorStore } from "../../../lib/editor/store";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
export default function PlaybackControls() {
  const project = useEditorStore((s) => s.project);
  const currentFrame = useEditorStore((s) => s.currentFrame);

  const playing = useEditorStore((s) => s.playing);
  const togglePlay = useEditorStore((s) => s.togglePlay);

  const incrementFrame = useEditorStore((s) => s.incrementFrame);
  const seekFrames = useEditorStore((s) => s.seekFrames);

  useEffect(() => {
    if (!project || !playing) return;

    const interval = setInterval(() => {
      incrementFrame();
    }, 1000 / project.fps);

    return () => clearInterval(interval);
  }, [project, playing, incrementFrame]);

  if (!project) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        className="p-2 border border-white/20 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        onClick={() => seekFrames(-10)}
        title="Back 10 frames"
      >
        <SkipBack size={18} />
      </button>

      <button
        className="p-2 border border-white/20 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        onClick={togglePlay}
        title={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <button
        className="p-2 border border-white/20 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        onClick={() => seekFrames(+10)}
        title="Forward 10 frames"
      >
        <SkipForward size={18} />
      </button>

      <div className="text-xs opacity-70 ml-3 font-medium">
        Frame: <span className="text-white/90">{currentFrame}/{project.durationInFrames}</span>
      </div>
    </div>
  );
}
