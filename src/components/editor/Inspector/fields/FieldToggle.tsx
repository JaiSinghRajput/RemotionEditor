"use client";
export default function FieldToggle({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <div className="text-xs font-medium">{label}</div>
        {description ? (
          <div className="text-[11px] opacity-60">{description}</div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full border transition ${
          value
            ? "bg-emerald-500/90 border-emerald-400/40"
            : "bg-neutral-800 border-white/10"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
            value ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
