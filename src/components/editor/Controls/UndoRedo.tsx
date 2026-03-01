"use client";

import { useEffect } from "react";
import { useEditorStore } from "../../../lib/editor/store";

export default function UndoRedo() {
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const canUndo = useEditorStore((s) => s.canUndo());
  const canRedo = useEditorStore((s) => s.canRedo());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z for undo
      if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) undo();
      }
      // Ctrl+Y for redo
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        if (canRedo) redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  return (
    <div className="flex gap-2">
      <button
        onClick={undo}
        disabled={!canUndo}
        className={`px-3 py-1.5 border border-white/20 rounded-lg text-sm transition-opacity ${
          canUndo
            ? "text-white/90 hover:bg-white/10 cursor-pointer"
            : "opacity-50 cursor-not-allowed text-white/60"
        }`}
        title="Undo (Ctrl+Z)"
      >
        ↶ Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className={`px-3 py-1.5 border border-white/20 rounded-lg text-sm transition-opacity ${
          canRedo
            ? "text-white/90 hover:bg-white/10 cursor-pointer"
            : "opacity-50 cursor-not-allowed text-white/60"
        }`}
        title="Redo (Ctrl+Y)"
      >
        ↷ Redo
      </button>
    </div>
  );
}
