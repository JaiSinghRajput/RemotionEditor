"use client";

import Topbar from "./Topbar";
import PreviewPanel from "./Preview/PreviewPanel";
import Timeline from "./Timeline/Timeline";
import InspectorPanel from "./Inspector/InspectorPanel";
import LayersPanel from "./Layers/LayersPanel";
import AssetPanel from "./Assets/AssetPanel";
import { useEditorStore } from "../../lib/editor/store";
import { useEffect } from "react";

export default function EditorLayout() {
  useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
      const id = useEditorStore.getState().selectedLayerId;
      if (!id) return;
      useEditorStore.getState().deleteLayer(id);
      useEditorStore.getState().selectLayer(null);
    }
  };

  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-950 text-white overflow-hidden">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT */}
        <aside className="w-[280px] border-r border-white/15 bg-neutral-900 overflow-auto shadow-lg">
          <AssetPanel />
          <LayersPanel />
        </aside>

        {/* CENTER */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* PREVIEW STAGE */}
          <div className="flex-1 overflow-hidden flex items-center justify-center">
            <PreviewPanel />
          </div>

          {/* TIMELINE */}
          <div className="h-[280px] border-t border-white/15 bg-neutral-900 overflow-hidden shadow-inner">
            <Timeline />
          </div>
        </main>


        {/* RIGHT */}
        <aside className="w-[340px] border-l border-white/15 bg-neutral-900 overflow-auto shadow-lg">
          <InspectorPanel />
        </aside>
      </div>
    </div>
  );
}
