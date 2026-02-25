"use client";

export default function FieldColor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <input
        type="color"
        className="border rounded p-1 h-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
