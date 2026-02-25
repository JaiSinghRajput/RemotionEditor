"use client";

import { useState } from "react";

export type InspectorTabKey = "properties" | "animation";

export default function InspectorTabs({
  onTabChange,
  defaultTab = "properties",
}: {
  onTabChange: (tab: InspectorTabKey) => void;
  defaultTab?: InspectorTabKey;
}) {
  const [active, setActive] = useState<InspectorTabKey>(defaultTab);

  function setTab(tab: InspectorTabKey) {
    setActive(tab);
    onTabChange(tab);
  }

  return (
    <div className="flex gap-2 border-b pb-2 mb-4">
      <button
        type="button"
        onClick={() => setTab("properties")}
        className={`px-3 py-1.5 rounded text-sm border ${
          active === "properties" ? "bg-black text-white" : "bg-white"
        }`}
      >
        Properties
      </button>

      <button
        type="button"
        onClick={() => setTab("animation")}
        className={`px-3 py-1.5 rounded text-sm border ${
          active === "animation" ? "bg-black text-white" : "bg-white"
        }`}
      >
        Animation
      </button>
    </div>
  );
}
