"use client";

import { useState, useTransition } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import { saveTestimonials } from "@/app/admin/actions";
import type { Testimonial } from "@/lib/testimonials";

const inputClass =
  "mt-1.5 w-full border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";
const labelClass = "text-eyebrow text-muted-foreground";

const empty = (): Testimonial => ({
  id: "",
  kind: "family",
  quote: "",
  name: "",
  role: "",
  place: "",
});

export function TestimonialsEditor({
  initial,
  products,
}: {
  initial: Testimonial[];
  products: { id: string; name: string }[];
}) {
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const touch = () => {
    setDirty(true);
    setSaved(false);
  };
  const update = (i: number, patch: Partial<Testimonial>) => {
    setItems((xs) => xs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
    touch();
  };
  const move = (i: number, dir: -1 | 1) => {
    setItems((xs) => {
      const next = [...xs];
      const j = i + dir;
      if (j < 0 || j >= next.length) return xs;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    touch();
  };
  const remove = (i: number) => {
    setItems((xs) => xs.filter((_, j) => j !== i));
    touch();
  };
  const save = () =>
    startTransition(async () => {
      await saveTestimonials(items);
      setDirty(false);
      setSaved(true);
    });

  return (
    <div className="mt-10">
      <div className="space-y-4">
        {items.map((t, i) => (
          <details key={i} open={t.quote === ""} className="border border-border bg-card">
            <summary className="flex cursor-pointer items-center gap-4 px-5 py-4">
              <span className="text-data text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold text-ink-deep ${t.kind === "family" ? "bg-blush" : "bg-sky"}`}
              >
                {t.kind === "family" ? "Family" : "Clinician"}
              </span>
              <span className="flex-1 truncate text-sm font-semibold">
                {t.name || "New testimonial"}
                <span className="ml-2 font-normal text-muted-foreground">{t.quote.slice(0, 60)}</span>
              </span>
              <span className="flex items-center gap-1">
                <button type="button" onClick={(e) => (e.preventDefault(), move(i, -1))} aria-label="Move up" className="p-1.5 text-muted-foreground hover:text-foreground">
                  <ChevronUp size={16} aria-hidden="true" />
                </button>
                <button type="button" onClick={(e) => (e.preventDefault(), move(i, 1))} aria-label="Move down" className="p-1.5 text-muted-foreground hover:text-foreground">
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                <button type="button" onClick={(e) => (e.preventDefault(), remove(i))} aria-label="Delete testimonial" className="p-1.5 text-muted-foreground hover:text-red-700">
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </span>
            </summary>

            <div className="grid gap-4 border-t border-border px-5 py-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className={labelClass}>Quote</span>
                <textarea
                  value={t.quote}
                  onChange={(e) => update(i, { quote: e.target.value })}
                  rows={3}
                  className={inputClass}
                />
              </label>
              <label>
                <span className={labelClass}>Who</span>
                <select
                  value={t.kind}
                  onChange={(e) => update(i, { kind: e.target.value as Testimonial["kind"] })}
                  className={inputClass}
                >
                  <option value="clinician">Clinician (doctor, dietitian, nurse)</option>
                  <option value="family">Family (patient or carer)</option>
                </select>
              </label>
              <label>
                <span className={labelClass}>Name</span>
                <input value={t.name} onChange={(e) => update(i, { name: e.target.value })} className={inputClass} />
              </label>
              <label>
                <span className={labelClass}>Role</span>
                <input value={t.role} onChange={(e) => update(i, { role: e.target.value })} className={inputClass} />
              </label>
              <label>
                <span className={labelClass}>Place</span>
                <input value={t.place} onChange={(e) => update(i, { place: e.target.value })} className={inputClass} />
              </label>
              <label className="md:col-span-2">
                <span className={labelClass}>Product (optional)</span>
                <select
                  value={t.product ?? ""}
                  onChange={(e) => update(i, { product: e.target.value || undefined })}
                  className={inputClass}
                >
                  <option value="">None</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </details>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setItems((xs) => [...xs, empty()]);
          touch();
        }}
        className="mt-4 inline-flex items-center gap-2 border border-dashed border-border px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
      >
        <Plus size={16} aria-hidden="true" />
        Add testimonial
      </button>

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
          {pending ? "Saving…" : "Save testimonials"}
        </button>
      </div>
    </div>
  );
}
