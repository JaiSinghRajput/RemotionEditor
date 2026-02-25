"use client";

import { useRef, useState } from "react";
import { useEditorStore } from "../../../lib/editor/store";

export default function UploadAssetButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const project = useEditorStore((s) => s.project);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);
  const updateLayer = useEditorStore((s) => s.updateLayer);

  const selectedLayer = project?.layers.find((l) => l.id === selectedLayerId);
  const isBackgroundSelected = selectedLayer?.type === "background";

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      if (!project) return;

      // Priority: use selected layer if it's a background, otherwise use first background layer
      let targetLayer = isBackgroundSelected
        ? selectedLayer
        : project.layers.find((l) => l.type === "background");

      if (targetLayer && targetLayer.type === "background") {
        updateLayer(targetLayer.id, "background", { src: data.url });
      } else {
        setError("Please select a background layer first.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const backgroundLayers = project?.layers.filter((l) => l.type === "background") ?? [];
  const hasBackgroundLayers = backgroundLayers.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading || !hasBackgroundLayers}
        className="w-full px-3 py-2 rounded-lg border border-blue-500/50 text-sm mb-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        title={isBackgroundSelected ? "Upload to selected background" : "Select a background layer first"}
      >
        {isLoading ? "Uploading..." : isBackgroundSelected ? "↑ Upload BG" : "↑ Select BG Layer"}
      </button>
      {error && <div className="text-xs text-red-400 px-2">{error}</div>}
    </div>
  );
}
