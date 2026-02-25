"use client";

export default function UndoRedo() {
  // Implement later using "immer" + patch history
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1.5 border border-white/20 rounded-lg text-sm opacity-50 cursor-not-allowed text-white/60 hover:opacity-60 transition-opacity">
        ↶ Undo
      </button>
      <button className="px-3 py-1.5 border border-white/20 rounded-lg text-sm opacity-50 cursor-not-allowed text-white/60 hover:opacity-60 transition-opacity">
        ↷ Redo
      </button>
    </div>
  );
}
