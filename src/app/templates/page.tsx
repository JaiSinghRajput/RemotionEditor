"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { templateStorage, Template } from "../../lib/templates/storage";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [projectName, setProjectName] = useState("");
  const router = useRouter();

  useEffect(() => {
    setTemplates(templateStorage.getAll());
  }, []);

  const handleUseTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setProjectName(`${template.name} (Copy)`);
  };

  const confirmUseTemplate = () => {
    if (!selectedTemplate) return;
    
    // Create a new project from template
    const newProjectId = crypto.randomUUID();
    const newProject = {
      ...selectedTemplate.project,
      id: newProjectId,
      name: projectName.trim() || `${selectedTemplate.name} (Copy)`,
    };
    
    // Save to localStorage for the editor to load
    localStorage.setItem(`project-${newProjectId}`, JSON.stringify(newProject));
    
    router.push(`/editor/${newProjectId}`);
  };

  const handleDelete = (id: string, isDefault: boolean) => {
    if (isDefault) {
      alert("Cannot delete default templates. You can create a copy and modify it instead.");
      return;
    }
    
    if (confirm("Delete this template?")) {
      templateStorage.delete(id);
      setTemplates(templateStorage.getAll());
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Video Templates</h1>
            <p className="text-sm opacity-70 mt-1">
              Choose a template to customize and render your video
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/5 transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-16 border border-white/10 rounded-xl bg-neutral-950">
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-lg font-medium mb-2">No Templates Yet</h3>
            <p className="text-sm opacity-70 mb-4">
              Create a video in the editor and save it as a template
            </p>
            <Link
              href="/editor/new"
              className="inline-flex px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all"
            >
              Create New Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((template) => {
              const isDefault = template.id.startsWith("template-");
              return (
              <div
                key={template.id}
                className="border border-white/10 rounded-xl bg-neutral-950 hover:border-white/20 transition-all overflow-hidden group"
              >
                <div className="h-40 bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center border-b border-white/10 relative">
                  <div className="text-6xl opacity-30">🎬</div>
                  {isDefault && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600/80 text-white text-xs rounded-md font-medium">
                      Default
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-1 truncate">{template.name}</h3>
                  <p className="text-xs opacity-60 mb-1 line-clamp-2 h-8">
                    {template.description || "No description"}
                  </p>
                  <div className="text-xs opacity-40 mb-1">
                    {template.project.width}×{template.project.height} • {template.project.fps}fps
                  </div>
                  <div className="text-xs opacity-40 mb-3">
                    {template.project.layers.length} layer{template.project.layers.length !== 1 ? "s" : ""}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all"
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => handleDelete(template.id, isDefault)}
                      className={`px-3 py-2 border rounded-lg text-sm transition-all ${
                        isDefault
                          ? "border-white/10 text-white/30 cursor-not-allowed"
                          : "border-red-500/30 text-red-400 hover:bg-red-500/10"
                      }`}
                      title={isDefault ? "Cannot delete default templates" : "Delete"}
                      disabled={isDefault}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-neutral-900 border border-white/20 rounded-xl p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-lg font-semibold mb-4">Use Template: {selectedTemplate.name}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full px-3 py-2 bg-neutral-800 border border-white/20 rounded-lg text-sm focus:border-white/40 focus:outline-none"
                    autoFocus
                  />
                </div>
                
                <div className="text-sm opacity-70">
                  <p>This will create a new project based on this template.</p>
                  <p className="mt-2">You can customize all text, images, and settings in the editor.</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUseTemplate}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}      </div>
    </main>
  );
}
