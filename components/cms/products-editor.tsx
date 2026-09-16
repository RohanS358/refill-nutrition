"use client";

import { useState, useTransition } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, X } from "lucide-react";
import { saveProducts } from "@/app/admin/actions";
import type { ProductFamily } from "@/lib/products";

const inputClass =
  "mt-1.5 w-full border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";
const labelClass = "text-eyebrow text-muted-foreground";

const emptyFamily = (): ProductFamily => ({
  id: "",
  index: "",
  name: "",
  category: "",
  molecule: "metabolic",
  range: "enteral",
  summary: "",
  detail: "",
  compounds: [{ label: "", value: "" }],
  applications: [],
});

export function ProductsEditor({ initial }: { initial: ProductFamily[] }) {
  const [families, setFamilies] = useState<ProductFamily[]>(initial);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const update = (i: number, patch: Partial<ProductFamily>) => {
    setFamilies((fs) => fs.map((f, j) => (j === i ? { ...f, ...patch } : f)));
    setDirty(true);
    setSaved(false);
  };

  const move = (i: number, dir: -1 | 1) => {
    setFamilies((fs) => {
      const next = [...fs];
      const j = i + dir;
      if (j < 0 || j >= next.length) return fs;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setDirty(true);
    setSaved(false);
  };

  const remove = (i: number) => {
    setFamilies((fs) => fs.filter((_, j) => j !== i));
    setDirty(true);
    setSaved(false);
  };

  const save = () =>
    startTransition(async () => {
      await saveProducts(families);
      setDirty(false);
      setSaved(true);
    });

  return (
    <div className="mt-10">
      <div className="space-y-6">
        {families.map((family, i) => (
          <details
            key={i}
            open={family.name === ""}
            className="border border-border bg-card"
          >
            <summary className="flex cursor-pointer items-center gap-4 px-5 py-4">
              <span className="text-data text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm font-semibold">
                {family.name || "New product family"}
              </span>
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => (e.preventDefault(), move(i, -1))}
                  aria-label="Move up"
                  className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronUp size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => (e.preventDefault(), move(i, 1))}
                  aria-label="Move down"
                  className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronDown size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => (e.preventDefault(), remove(i))}
                  aria-label={`Delete ${family.name || "family"}`}
                  className="p-2 text-muted-foreground transition-colors hover:text-red-700"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </span>
            </summary>

            <div className="grid gap-5 border-t border-border p-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  value={family.name}
                  onChange={(e) => update(i, { name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <input
                  value={family.category}
                  onChange={(e) => update(i, { category: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Summary (cards)</label>
                <textarea
                  rows={2}
                  value={family.summary}
                  onChange={(e) => update(i, { summary: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Detail (products page)</label>
                <textarea
                  rows={3}
                  value={family.detail}
                  onChange={(e) => update(i, { detail: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Molecule mark</label>
                <select
                  value={family.molecule}
                  onChange={(e) =>
                    update(i, { molecule: e.target.value as ProductFamily["molecule"] })
                  }
                  className={inputClass}
                >
                  <option value="calcium">Calcium lattice</option>
                  <option value="amino">Amino chain</option>
                  <option value="omega">Omega curve</option>
                  <option value="metabolic">Metabolic ring</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Applications</label>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  {family.applications.map((app, ai) => (
                    <span
                      key={ai}
                      className="text-data inline-flex items-center gap-1.5 border border-border px-2.5 py-1"
                    >
                      {app}
                      <button
                        type="button"
                        aria-label={`Remove ${app}`}
                        onClick={() =>
                          update(i, {
                            applications: family.applications.filter((_, j) => j !== ai),
                          })
                        }
                        className="text-muted-foreground hover:text-red-700"
                      >
                        <X size={12} strokeWidth={2} />
                      </button>
                    </span>
                  ))}
                  <input
                    placeholder="Add + Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const v = e.currentTarget.value.trim();
                        if (v) {
                          update(i, { applications: [...family.applications, v] });
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                    className="w-32 border border-dashed border-border bg-transparent px-2.5 py-1 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Compound ledger</label>
                <div className="mt-1.5 space-y-2">
                  {family.compounds.map((c, ci) => (
                    <div key={ci} className="flex gap-2">
                      <input
                        value={c.label}
                        placeholder="Label — e.g. L-Leucine"
                        onChange={(e) =>
                          update(i, {
                            compounds: family.compounds.map((cc, j) =>
                              j === ci ? { ...cc, label: e.target.value } : cc,
                            ),
                          })
                        }
                        className="w-1/2 border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                      <input
                        value={c.value}
                        placeholder="Value — e.g. mTOR signalling"
                        onChange={(e) =>
                          update(i, {
                            compounds: family.compounds.map((cc, j) =>
                              j === ci ? { ...cc, value: e.target.value } : cc,
                            ),
                          })
                        }
                        className="flex-1 border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        aria-label="Remove compound"
                        onClick={() =>
                          update(i, {
                            compounds: family.compounds.filter((_, j) => j !== ci),
                          })
                        }
                        className="px-2 text-muted-foreground hover:text-red-700"
                      >
                        <X size={14} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      update(i, {
                        compounds: [...family.compounds, { label: "", value: "" }],
                      })
                    }
                    className="text-eyebrow inline-flex items-center gap-1.5 text-primary"
                  >
                    <Plus size={14} strokeWidth={2} aria-hidden="true" /> Add compound
                  </button>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => {
            setFamilies((fs) => [...fs, emptyFamily()]);
            setDirty(true);
            setSaved(false);
          }}
          className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
        >
          <Plus size={16} strokeWidth={1.5} aria-hidden="true" /> Add family
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!dirty || pending}
          className="bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground disabled:opacity-50"
        >
          {pending ? "Publishing…" : "Publish changes"}
        </button>
        <p aria-live="polite" className="text-data text-muted-foreground">
          {saved ? "Published — live on the site." : dirty ? "Unsaved changes" : ""}
        </p>
      </div>
    </div>
  );
}
