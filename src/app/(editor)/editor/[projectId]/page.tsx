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
      // First, check localStorage for a saved project (from template)
      const savedProject = localStorage.getItem(`project-${projectId}`);
      
      if (savedProject) {
        try {
          const project = JSON.parse(savedProject);
          setProject(project);
          return;
        } catch (error) {
          console.error("Failed to parse saved project:", error);
        }
      }
      
      // Otherwise, load from API (returns default empty project)
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      setProject(data.project);
    }
    load();
  }, [projectId, setProject]);

  return <EditorShell />;
}
