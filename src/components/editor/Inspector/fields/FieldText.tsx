"use client";

export default function FieldText({
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
        className="border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
