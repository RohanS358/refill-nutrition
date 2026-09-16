"use client";

import { Plus, X } from "lucide-react";

/** Editable list of plain strings — claims, directions, references. */
export function StringList({
  label,
  items,
  onChange,
  placeholder,
  rows = 2,
}: {
  label: string;
  items: string[] | undefined;
  onChange: (next: string[] | undefined) => void;
  placeholder?: string;
  rows?: number;
}) {
  const list = items ?? [];

  const set = (next: string[]) => onChange(next.length ? next : undefined);

  return (
    <div>
      <label className="text-eyebrow text-muted-foreground">{label}</label>
      <div className="mt-1.5 space-y-2">
        {list.map((item, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              rows={rows}
              value={item}
              placeholder={placeholder}
              onChange={(e) => set(list.map((v, j) => (j === i ? e.target.value : v)))}
              className="flex-1 border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="button"
              aria-label={`Remove item ${i + 1}`}
              onClick={() => set(list.filter((_, j) => j !== i))}
              className="self-start px-2 py-2 text-muted-foreground hover:text-red-700"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => set([...list, ""])}
          className="text-eyebrow inline-flex items-center gap-1.5 text-primary"
        >
          <Plus size={14} strokeWidth={2} aria-hidden="true" /> Add
        </button>
      </div>
    </div>
  );
}
