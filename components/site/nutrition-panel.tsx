import type { NutrientRow } from "@/lib/products";

/**
 * The printed "Nutrition Information" panel, rebuilt as a hairline table.
 * Figures are transcribed from the brochures; see lib/products.ts.
 */
export function NutritionPanel({
  servingNote,
  rows,
  perTin,
}: {
  servingNote: string;
  rows: NutrientRow[];
  perTin?: { label: string; value: string }[];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-eyebrow text-muted-foreground">Nutrition information</h3>
        <p className="text-data text-muted-foreground">{servingNote}</p>
      </div>

      <table className="mt-5 w-full border-collapse text-left">
        <thead>
          <tr className="border-y border-border">
            <th scope="col" className="text-eyebrow py-3 pr-4 font-normal text-muted-foreground">
              Nutrient
            </th>
            <th scope="col" className="text-eyebrow py-3 pr-4 font-normal text-muted-foreground">
              Unit
            </th>
            <th
              scope="col"
              className="text-eyebrow py-3 pr-4 text-right font-normal text-muted-foreground"
            >
              Per 100 g
            </th>
            <th scope="col" className="text-eyebrow py-3 text-right font-normal text-muted-foreground">
              Per serving
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.nutrient} className="border-b border-border">
              <th scope="row" className="py-3 pr-4 text-sm font-normal">
                {r.nutrient}
              </th>
              <td className="text-data py-3 pr-4 text-muted-foreground">{r.unit}</td>
              <td className="text-data py-3 pr-4 text-right tabular-nums">{r.per100}</td>
              <td className="text-data py-3 text-right tabular-nums">{r.perServing}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {perTin ? (
        <dl className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {perTin.map((m) => (
            <div key={m.label} className="bg-card px-5 py-6">
              <dd className="text-[1.6rem] leading-none font-semibold tabular-nums">{m.value}</dd>
              <dt className="text-eyebrow mt-3 text-muted-foreground">{m.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
