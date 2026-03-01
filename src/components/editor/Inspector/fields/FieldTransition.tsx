"use client";

import FieldSelect from "./FieldSelect";
import FieldNumber from "./FieldNumber";

type TransitionValue =
  | { type: "none" }
  | { type: "fade"; duration: number }
  | { type: "slideUp"; duration: number; distance: number }
  | { type: "slideDown"; duration: number; distance: number }
  | { type: "slideLeft"; duration: number; distance: number }
  | { type: "slideRight"; duration: number; distance: number }
  | { type: "blur"; duration: number; from: number }
  | { type: "zoom"; duration: number; from: number };

export default function FieldTransition({
  label,
  value,
  onChange,
}: {
  label: string;
  value: TransitionValue | undefined;
  onChange: (v: TransitionValue) => void;
}) {
  const v = value ?? { type: "none" };

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-950 p-3 space-y-3">
      <div className="text-xs font-medium">{label}</div>

      <FieldSelect
        label="Type"
        value={v.type}
        options={[
          { label: "None", value: "none" },
          { label: "Fade", value: "fade" },
          { label: "Slide Up", value: "slideUp" },
          { label: "Slide Down", value: "slideDown" },
          { label: "Slide Left", value: "slideLeft" },
          { label: "Slide Right", value: "slideRight" },
          { label: "Blur", value: "blur" },
          { label: "Zoom", value: "zoom" },
        ]}
        onChange={(type) => {
          if (type === "none") return onChange({ type: "none" });
          if (type === "fade") return onChange({ type: "fade", duration: 12 });
          if (type === "slideUp") return onChange({ type: "slideUp", duration: 12, distance: 80 });
          if (type === "slideDown") return onChange({ type: "slideDown", duration: 12, distance: 80 });
          if (type === "slideLeft") return onChange({ type: "slideLeft", duration: 12, distance: 120 });
          if (type === "slideRight") return onChange({ type: "slideRight", duration: 12, distance: 120 });
          if (type === "blur") return onChange({ type: "blur", duration: 12, from: 16 });
          if (type === "zoom") return onChange({ type: "zoom", duration: 12, from: 0.9 } as any);
        }}
      />

      {v.type !== "none" ? (
        <FieldNumber
          label="Duration (frames)"
          value={(v as any).duration ?? 12}
          onChange={(d) => onChange({ ...(v as any), duration: d })}
        />
      ) : null}

      {v.type === "slideUp" || v.type === "slideDown" || v.type === "slideLeft" || v.type === "slideRight" ? (
        <FieldNumber
          label="Distance (px)"
          value={(v as any).distance ?? 100}
          onChange={(d) => onChange({ ...(v as any), distance: d })}
        />
      ) : null}

      {v.type === "zoom" || v.type === "blur" ? (
        <FieldNumber
          label={v.type === "zoom" ? "From scale" : "From blur (px)"}
          value={(v as any).from ?? (v.type === "zoom" ? 0.9 : 16)}
          onChange={(d) => onChange({ ...(v as any), from: d })}
        />
      ) : null}
    </div>
  );
}
