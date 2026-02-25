"use client";

import UploadAssetButton from "./UploadAssetButton";
import AssetGrid from "./AssetGrid";

export default function AssetPanel() {
  return (
    <div className="p-4 border-b border-white/15 bg-neutral-800/50">
      <div className="text-sm font-semibold mb-3 text-white/90">📁 Assets</div>
      <UploadAssetButton />
      <AssetGrid />
    </div>
  );
}
