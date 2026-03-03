"use client";

import UploadAssetButton from "./UploadAssetButton";
import AssetGrid from "./AssetGrid";

export default function AssetPanel() {
  return (
    <div className="p-4 border-b border-white/5">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Assets</span>
      </div>
      <UploadAssetButton />
      <AssetGrid />
    </div>
  );
}
