"use client";

import { useState } from "react";
import { useEditorStore } from "../../../lib/editor/store";

export default function RenderButton() {
  const project = useEditorStore((s) => s.project);
  const [loading, setLoading] = useState(false);

  async function handleRender() {
    if (!project) return;

    setLoading(true);
    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project }),
      });

      const data = await res.json();

      if (data.ok) {
        window.open(data.url, "_blank");
      } else {
        alert(data.error);
      }

    } catch (e) {
      console.error(e);
      alert("Render failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/50 hover:shadow-xl"
      onClick={handleRender}
      disabled={loading}
    >
      {loading ? "Rendering..." : "🎬 Render"}
    </button>
  );
}
