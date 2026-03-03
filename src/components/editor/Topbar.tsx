"use client";
import RenderButton from "./Controls/RenderButton";
import UndoRedo from "./Controls/UndoRedo";
import FormatSwitcher from "./Controls/FormatSwitcher";
import DurationControl from "./Controls/DurationControl";
import SaveTemplateButton from "./Controls/SaveTemplateButton";

export default function Topbar() {
  return (
    <div className="h-16 border-b border-white/5 bg-[#121215]/80 backdrop-blur-xl flex items-center justify-between px-6 shadow-md relative z-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="font-bold text-sm tracking-wide text-neutral-200">
          Remotion <span className="text-white/40 font-normal">Editor</span>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#09090b]/50 p-1.5 rounded-xl border border-white/5">
        <DurationControl />
        <div className="w-px h-5 bg-white/10 mx-1"></div>
        <FormatSwitcher />
        <div className="w-px h-5 bg-white/10 mx-1"></div>
        <UndoRedo />
      </div>

      <div className="flex items-center gap-3">
        <SaveTemplateButton />
        <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
        <RenderButton />
      </div>
    </div>
  );
}
