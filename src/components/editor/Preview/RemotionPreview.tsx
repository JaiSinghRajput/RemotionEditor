"use client";

import { Player, PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
import { useEditorStore } from "../../../lib/editor/store";
import { VideoComposition } from "../../../remotion/Composition";

export default function RemotionPreview() {
  const project = useEditorStore((s) => s.project);
  const playerRef = useRef<PlayerRef>(null);

  // Subscribe for play/pause/mute changes only — these need React effect timing
  const playing = useEditorStore((s) => s.playing);
  const muted = useEditorStore((s) => s.muted);

  // Sync play/pause → player
  useEffect(() => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.play();
    else playerRef.current.pause();
  }, [playing]);

  // Sync muted → player via imperative API
  useEffect(() => {
    if (!playerRef.current) return;
    if (muted) playerRef.current.mute();
    else playerRef.current.unmute();
  }, [muted]);

  // Use store.subscribe (not hook) to sync frame → player + frame display
  // This avoids React re-renders on every frame tick during playback
  useEffect(() => {
    if (!project) return;

    return useEditorStore.subscribe((state, prev) => {
      // Seek when paused and frame changed externally (e.g. timeline scrub)
      if (!state.playing && state.currentFrame !== prev.currentFrame) {
        playerRef.current?.seekTo(state.currentFrame);
      }
    });
  }, [project]);

  // While playing, sync player → store frame (player is source of truth)
  useEffect(() => {
    if (!project || !playing) return;

    const interval = setInterval(() => {
      const f = playerRef.current?.getCurrentFrame();
      if (typeof f === "number") {
        useEditorStore.getState().setFrame(f);
      }
    }, Math.round(1000 / project.fps));

    return () => clearInterval(interval);
  }, [project, playing]);

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
      numberOfSharedAudioTags={8}
      initiallyMuted={false}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    />
  );
}
