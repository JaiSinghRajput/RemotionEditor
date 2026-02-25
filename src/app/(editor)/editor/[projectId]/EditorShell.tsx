"use client";

import EditorLayout from "../../../../components/editor/EditorLayout";
import { useEditorStore } from "../../../../lib/editor/store";

export default function EditorShell() {
  const project = useEditorStore((s) => s.project);

  if (!project) return <div className="p-6">Loading project...</div>;

  return <EditorLayout />;
}
