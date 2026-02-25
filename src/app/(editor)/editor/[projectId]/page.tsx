"use client";

import {useEffect} from "react";
import EditorShell from "./EditorShell";
import { useEditorStore } from "../../../../lib/editor/store";
import { useParams } from "next/navigation";

export default function EditorPage({params}: {params: {projectId: string}}) {
  const setProject = useEditorStore((s) => s.setProject);
const projectId = useParams().projectId;

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      setProject(data.project);
    }
    load();
  }, [projectId, setProject]);

  return <EditorShell />;
}
