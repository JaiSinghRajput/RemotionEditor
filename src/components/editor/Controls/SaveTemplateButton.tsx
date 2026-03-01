"use client";

import { useState } from "react";
import { useEditorStore } from "../../../lib/editor/store";
import { templateStorage } from "../../../lib/templates/storage";

export default function SaveTemplateButton() {
  const project = useEditorStore((s) => s.project);
  const [showDialog, setShowDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!project || !templateName.trim()) return;
    
    setSaving(true);
    try {
      const template = templateStorage.createFromProject(
        project,
        templateName.trim(),
        description.trim()
      );
      templateStorage.save(template);
      
      setShowDialog(false);
      setTemplateName("");
      setDescription("");
      alert("Template saved successfully!");
    } catch (error) {
      alert("Failed to save template");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (!project) return null;

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="px-3 py-1.5 border border-white/20 rounded-lg text-sm text-white/90 hover:bg-white/10 transition-all"
        title="Save as Template"
      >
        💾 Save Template
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-white/20 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-semibold mb-4">Save as Template</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Template Name *</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., Product Promo Video"
                  className="w-full px-3 py-2 bg-neutral-800 border border-white/20 rounded-lg text-sm focus:border-white/40 focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this template for?"
                  rows={3}
                  className="w-full px-3 py-2 bg-neutral-800 border border-white/20 rounded-lg text-sm focus:border-white/40 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDialog(false)}
                className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/5 transition-all"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!templateName.trim() || saving}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
