"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import type { ProductFamily, Range } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Tc } from "@/components/cms/texts-context";

/** Read a printed nutrition row by name, so a missing panel shows "—". */
function perServing(p: ProductFamily, pattern: RegExp): string | undefined {
  const row = p.nutrition?.rows.find((r) => pattern.test(r.nutrient));
  return row ? `${row.perServing} ${row.unit}`.trim() : undefined;
}

/**
 * Side-by-side comparison on the attributes a clinician actually decides
 * on. Every row is a field the brochure prints — there are no prices,
 * ratings or scores in this catalogue, and none are invented here.
 */
export function CompareTable({
  products,
  ranges,
}: {
  products: ProductFamily[];
  ranges: Range[];
}) {
  // Opens on the enteral range: the largest family and the usual comparison.
  const [selected, setSelected] = useState<string[]>(() =>
    products.filter((p) => p.range === "enteral").slice(0, 3).map((p) => p.id),
  );

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );

  const chosen = products.filter((p) => selected.includes(p.id));

  const rows: { label: string; value: (p: ProductFamily) => string | undefined }[] = [
    { label: "Range", value: (p) => ranges.find((r) => r.id === p.range)?.title },
    { label: "Category", value: (p) => p.category },
    { label: "Pack", value: (p) => p.pack },
    { label: "Flavour", value: (p) => p.flavour },
    { label: "Serving", value: (p) => p.nutrition?.servingNote },
    { label: "Energy / serving", value: (p) => perServing(p, /energy/i) },
    { label: "Protein / serving", value: (p) => perServing(p, /^protein/i) },
    { label: "Composition", value: (p) => p.compounds.map((c) => `${c.label} ${c.value}`).join(" · ") },
    { label: "Indications", value: (p) => p.applications.join(" · ") },
    { label: "Directions", value: (p) => p.suggestedUse ?? p.directions?.join(" ") },
  ];

  return (
    <div>
      <Tc k="compare.select" as="p" className="text-eyebrow text-muted-foreground">Select products to compare</Tc>
      <div className="mt-4 flex flex-wrap gap-2">
        {products.map((p) => {
          const active = selected.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggle(p.id)}
              aria-pressed={active}
              className={cn(
                "text-data inline-flex items-center gap-2 border px-3.5 py-2 transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {active ? <Check size={13} strokeWidth={2} aria-hidden="true" /> : null}
              {p.name}
            </button>
          );
        })}
      </div>

      {chosen.length ? (
        // The table is wider than a phone; it scrolls in its own box so the
        // page body never scrolls sideways.
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse">
            <caption className="sr-only">
              Comparison of {chosen.map((p) => p.name).join(", ")}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-40 border-b border-border p-0 text-left align-bottom">
                  <Tc k="compare.attribute" className="text-eyebrow text-muted-foreground">Attribute</Tc>
                </th>
                {chosen.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className="border-b border-border p-0 pb-6 pl-6 text-left align-bottom"
                  >
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt=""
                        width={160}
                        height={200}
                        sizes="120px"
                        className="pack-shot mb-4 h-24 w-auto object-contain object-left"
                      />
                    ) : null}
                    <Link
                      href={`/products/${p.id}`}
                      className="text-title block text-[1.1rem] transition-colors hover:text-primary"
                    >
                      {p.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                // A row no selected product prints is noise — drop it.
                if (!chosen.some((p) => row.value(p))) return null;
                return (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="text-eyebrow border-b border-border py-5 pr-6 text-left align-top text-muted-foreground"
                    >
                      {row.label}
                    </th>
                    {chosen.map((p) => (
                      <td
                        key={p.id}
                        className="text-data border-b border-border py-5 pl-6 align-top leading-relaxed"
                      >
                        {row.value(p) ?? <span className="text-muted-foreground">—</span>}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Tc k="compare.empty" as="p" className="text-lead mt-12 text-muted-foreground">
          Select two or more products above to compare their figures.
        </Tc>
      )}
    </div>
  );
}
