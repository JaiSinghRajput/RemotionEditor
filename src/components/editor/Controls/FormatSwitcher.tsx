"use client";

import { FORMAT_PRESETS } from "../../../lib/editor/constants";
import { useEditorStore } from "../../../lib/editor/store";

export default function FormatSwitcher() {
  const project = useEditorStore((s) => s.project);
  const setFormat = useEditorStore((s) => s.setFormat);

  if (!project) return null;

  const currentKey =
    FORMAT_PRESETS.find((p) => p.width === project.width && p.height === project.height)?.key ??
    "custom";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/70 font-medium">Format</span>

      <select
        className="bg-neutral-800 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white/90 hover:border-white/40 focus:border-white/50 focus:outline-none transition-colors cursor-pointer"
        value={currentKey}
        onChange={(e) => {
          const preset = FORMAT_PRESETS.find((p) => p.key === e.target.value);
          if (!preset) return;
          setFormat(preset.width, preset.height);
        }}
      >
        {FORMAT_PRESETS.map((p) => (
          <option key={p.key} value={p.key} className="bg-neutral-800">
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
