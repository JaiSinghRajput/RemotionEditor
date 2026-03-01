"use client";
import RenderButton from "./Controls/RenderButton";
import UndoRedo from "./Controls/UndoRedo";
import FormatSwitcher from "./Controls/FormatSwitcher";
import DurationControl from "./Controls/DurationControl";
import SaveTemplateButton from "./Controls/SaveTemplateButton";

export default function Topbar() {
  return (
    <div className="h-14 border-b border-white/15 bg-gradient-to-r from-neutral-950 via-neutral-950 to-neutral-900 flex items-center justify-between px-5 shadow-lg">
      <div className="font-semibold text-sm tracking-wider text-white">Remotion Video Editor</div>

      <div className="flex items-center gap-5">
        <DurationControl />
        <div className="w-px h-6 bg-white/10"></div>
        <FormatSwitcher />
        <div className="w-px h-6 bg-white/10"></div>
        <UndoRedo />
        <div className="w-px h-6 bg-white/10"></div>
        <SaveTemplateButton />
        <RenderButton />
      </div>
    </div>
  );
}
