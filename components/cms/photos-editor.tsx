"use client";

import { useState, useTransition } from "react";
import { savePhotos } from "@/app/admin/actions";
import type { Photo } from "@/lib/photos";
import { ImageField } from "./image-field";

const inputClass =
  "mt-1.5 w-full border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";

/** Unsplash ids are stored bare; show them as a real URL in the editor. */
const toUrl = (id: string) =>
  id.startsWith("photo-") || id.startsWith("flagged/")
    ? `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`
    : id;

export function PhotosEditor({
  slots,
  defaults,
}: {
  slots: { slot: string; label: string; photo: Photo }[];
  defaults: Record<string, Photo>;
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(slots.map((s) => [s.slot, s.photo])) as Record<string, Photo>,
  );
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const update = (slot: string, patch: Partial<Photo>) => {
    setValues((v) => ({ ...v, [slot]: { ...v[slot], ...patch } }));
    setDirty(true);
    setSaved(false);
  };

  const save = () =>
    startTransition(async () => {
      // Only store slots that differ from the code default.
      const changed = Object.fromEntries(
        Object.entries(values).filter(
          ([slot, p]) => p.id !== defaults[slot].id || p.alt !== defaults[slot].alt,
        ),
      );
      await savePhotos(changed);
      setDirty(false);
      setSaved(true);
    });

  return (
    <div className="mt-10">
      <ul className="grid gap-6 md:grid-cols-2">
        {slots.map(({ slot, label }) => {
          const p = values[slot];
          const isDefault = p.id === defaults[slot].id && p.alt === defaults[slot].alt;
          return (
            <li key={slot} className="border border-border bg-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold">{label}</p>
                {!isDefault ? (
                  <button
                    type="button"
                    onClick={() => update(slot, defaults[slot])}
                    className="text-data text-muted-foreground hover:text-foreground"
                  >
                    Reset
                  </button>
                ) : null}
              </div>
              <div className="mt-4">
                <ImageField
                  label="Photo"
                  value={toUrl(p.id)}
                  onChange={(url) => update(slot, { id: url ?? defaults[slot].id })}
                />
              </div>
              <label className="mt-4 block">
                <span className="text-eyebrow text-muted-foreground">Description (alt text)</span>
                <input
                  value={p.alt}
                  onChange={(e) => update(slot, { alt: e.target.value })}
                  className={inputClass}
                />
              </label>
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-0 mt-8 flex items-center justify-end gap-4 border-t border-border bg-background py-4">
        <p aria-live="polite" className="text-data text-muted-foreground">
          {saved ? "Saved — the site is updated." : dirty ? "Unsaved changes" : ""}
        </p>
        <button
          type="button"
          onClick={save}
          disabled={!dirty || pending}
          className="bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground disabled:opacity-40"
        >
          {pending ? "Saving…" : "Save photos"}
        </button>
      </div>
    </div>
  );
}
