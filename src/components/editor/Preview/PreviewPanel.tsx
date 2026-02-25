"use client";

import { useEffect, useRef, useState } from "react";
import RemotionPreview from "./RemotionPreview";
import PlaybackControls from "../Controls/PlaybackControls";
import { useFitScale } from "./useFitScale";
import { useEditorStore } from "../../../lib/editor/store";

export default function PreviewPanel() {
  const project = useEditorStore((s) => s.project);
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = useFitScale({
    containerWidth: size.w,
    containerHeight: size.h,
    contentWidth: project?.width ?? 1080,
    contentHeight: project?.height ?? 1920,
    padding: 20,
  });

  if (!project) return null;

  return (
    <div className="w-full h-full overflow-hidden flex flex-col bg-neutral-950">
      {/* ✅ STAGE */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-950"
      >
        {/* ✅ always centered */}
        <div
          className="flex items-center justify-center"
          style={{
            width: project.width,
            height: project.height,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* frame */}
          <div
            className="rounded-2xl border border-white/20 shadow-2xl bg-black overflow-hidden ring-1 ring-white/10"
            style={{
              width: project.width,
              height: project.height,
            }}
          >
            <RemotionPreview />
          </div>
        </div>
      </div>

      {/* ✅ CONTROLS always centered */}
      <div className="h-[80px] flex items-center justify-center border-t border-white/10">
        <div className="rounded-xl border border-white/20 bg-neutral-900/80 backdrop-blur-sm px-5 py-3 shadow-lg">
          <PlaybackControls />
        </div>
      </div>
    </div>
  );
}
