"use client";

import { Player, PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
import { useEditorStore } from "../../../lib/editor/store";
import { VideoComposition } from "../../../remotion/Composition";

export default function RemotionPreview() {
  const project = useEditorStore((s) => s.project);
  const currentFrame = useEditorStore((s) => s.currentFrame);
  const setFrame = useEditorStore((s) => s.setFrame);
  const playing = useEditorStore((s) => s.playing);

  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    playerRef.current?.seekTo(currentFrame);
  }, [currentFrame]);

  useEffect(() => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.play();
    else playerRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (!project || !playing) return;

    const interval = setInterval(() => {
      const f = playerRef.current?.getCurrentFrame();
      if (typeof f === "number") setFrame(f);
    }, 1000 / project.fps);

    return () => clearInterval(interval);
  }, [project, playing, setFrame]);

  if (!project) return null;

  return (
    <Player
      ref={playerRef}
      component={VideoComposition}
      inputProps={{ project }}
      durationInFrames={project.durationInFrames}
      fps={project.fps}
      compositionWidth={project.width}
      compositionHeight={project.height}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    />
  );
}
