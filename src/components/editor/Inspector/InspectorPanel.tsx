"use client";

import { useEditorStore } from "../../../lib/editor/store";
import BackgroundInspector from "./inspectors/BackgroundInspector";
import TextInspector from "./inspectors/TextInspector";

export default function InspectorPanel() {
  const project = useEditorStore((s) => s.project);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);

  if (!project) return null;
  const layer = project.layers.find((l) => l.id === selectedLayerId);

  if (!layer) return <div className="p-6 text-sm text-white/50 flex items-center justify-center h-full">👈 Select a layer</div>;

  return (
    <div className="p-5">
      <div className="font-semibold mb-4 text-white/90">⚙️ {layer.name}</div>
      <div className="space-y-4">
        {layer.type === "text" && <TextInspector layer={layer} />}
        {layer.type === "background" && <BackgroundInspector layer={layer} />}
      </div>
    </div>
  );
}
