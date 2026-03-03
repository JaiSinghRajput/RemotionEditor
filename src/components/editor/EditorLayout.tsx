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
    <div className="h-screen w-screen flex flex-col bg-[#09090b] text-white overflow-hidden selection:bg-indigo-500/30">
      <Topbar />

      <div className="flex flex-1 overflow-hidden p-2 gap-2 bg-[#09090b]">
        {/* LEFT COMPARTMENT */}
        <aside className="w-[300px] flex flex-col rounded-xl border border-white/5 bg-[#121215] overflow-auto shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <AssetPanel />
          <div className="h-px bg-white/5 mx-4" />
          <LayersPanel />
        </aside>

        {/* CENTER COMPARTMENT */}
        <main className="flex-1 flex flex-col gap-2 overflow-hidden">
          {/* PREVIEW STAGE */}
          <div className="flex-1 rounded-xl border border-white/5 bg-[#121215] overflow-hidden flex flex-col relative shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-10" />
            <div className="flex-1 w-full h-full flex items-center justify-center relative z-0">
              <PreviewPanel />
            </div>
          </div>

          {/* TIMELINE */}
          <div className="h-[300px] rounded-xl border border-white/5 bg-[#121215] overflow-hidden relative shadow-2xl flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            <Timeline />
          </div>
        </main>

        {/* RIGHT COMPARTMENT */}
        <aside className="w-[340px] flex flex-col rounded-xl border border-white/5 bg-[#121215] overflow-auto shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <InspectorPanel />
        </aside>
      </div>
    </div>
  );
}
