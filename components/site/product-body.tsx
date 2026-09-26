import Image from "next/image";
import type { ProductFamily } from "@/lib/products";
import { NutritionPanel } from "./nutrition-panel";
import { Tc } from "@/components/cms/texts-context";

/**
 * The full product record — composition, printed claims, nutrition panel,
 * directions, indications and references.
 *
 * Shared so the catalogue accordion and the product page render exactly
 * the same figures: one place to change what a product says about itself.
 */
export function ProductBody({
  family,
  /** Position in the products collection — keeps CMS keys stable. */
  ci,
}: {
  family: ProductFamily;
  ci: number;
}) {
  // The figures worth keeping on screen: the per-tin macro wheel where the
  // brochure prints one, otherwise the first compounds from the pack.
  const keyFigures = (
    family.perTin?.length
      ? family.perTin
      : family.compounds.slice(0, 4).map((c) => ({ label: c.label, value: c.value }))
  ).slice(0, 4);

  return (
    <div className="grid gap-10 pb-16 lg:grid-cols-12 lg:gap-16">
      {/* Sticky pack shot + the figures worth keeping on screen */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          {family.image ? (
            <Image
              src={family.image}
              alt={family.name}
              width={420}
              height={520}
              sizes="(max-width: 1024px) 55vw, 320px"
              className="pack-shot h-[200px] w-auto object-contain object-left md:h-[260px]"
            />
          ) : null}
          {family.strapline ? (
            <p className="mt-5 text-base text-muted-foreground italic">
              {family.strapline}
            </p>
          ) : null}

          {/* Headline figures — the numbers a clinician scans for. */}
          {keyFigures.length ? (
            <dl className="mt-6 grid grid-cols-2 gap-px border border-border bg-border">
              {keyFigures.map((f) => (
                <div key={f.label} className="bg-card px-4 py-4">
                  <dd className="text-[1.15rem] leading-none font-semibold tabular-nums">
                    {f.value}
                  </dd>
                  <dt className="text-eyebrow mt-2 text-muted-foreground">{f.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}

          <dl className="text-data mt-5 border-t border-border">
            {family.pack ? (
              <div className="flex justify-between gap-4 border-b border-border py-2.5">
                <Tc k="product.label.pack" as="dt" className="text-muted-foreground">Pack</Tc>
                <dd className="text-right">{family.pack}</dd>
              </div>
            ) : null}
            {family.flavour ? (
              <div className="flex justify-between gap-4 border-b border-border py-2.5">
                <Tc k="product.label.flavour" as="dt" className="text-muted-foreground">Flavour</Tc>
                <dd className="text-right">{family.flavour}</dd>
              </div>
            ) : null}
            {family.applications.slice(0, 3).map((a) => (
              <div key={a} className="flex justify-between gap-4 border-b border-border py-2.5">
                <Tc k="product.label.indication" as="dt" className="text-muted-foreground">Indication</Tc>
                <dd className="text-right">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Everything else */}
      <div className="lg:col-span-8">
        <p
          className="text-lead max-w-2xl text-muted-foreground"
          data-cms={`col:products.${ci}.detail`}
        >
          {family.detail}
        </p>

        <h4 className="text-eyebrow mt-12 text-muted-foreground">
          <Tc k="product.label.composition">Composition & characteristics</Tc>
        </h4>
        <dl className="mt-4 border-t border-border">
          {family.compounds.map((compound, i) => (
            <div
              key={compound.label}
              className="grid grid-cols-2 gap-6 border-b border-border py-4"
            >
              <dt
                className="text-data font-semibold"
                data-cms={`col:products.${ci}.compounds.${i}.label`}
              >
                {compound.label}
              </dt>
              <dd
                className="text-data text-right text-muted-foreground"
                data-cms={`col:products.${ci}.compounds.${i}.value`}
              >
                {compound.value}
              </dd>
            </div>
          ))}
        </dl>

        {family.claims?.length ? (
          <>
            <h4 className="text-eyebrow mt-12 text-muted-foreground">
              <Tc k="product.label.claims">As printed on the literature</Tc>
            </h4>
            <ul className="mt-4 border-t border-border">
              {family.claims.map((claim) => (
                <li
                  key={claim}
                  className="flex gap-4 border-b border-border py-3.5 text-sm leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-primary"
                  />
                  {claim}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {family.nutrition ? (
          <div className="mt-12">
            <NutritionPanel
              servingNote={family.nutrition.servingNote}
              rows={family.nutrition.rows}
              perTin={family.perTin}
            />
          </div>
        ) : family.perTin ? (
          <dl className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {family.perTin.map((m) => (
              <div key={m.label} className="bg-card px-5 py-6">
                <dd className="text-[1.6rem] leading-none font-semibold tabular-nums">
                  {m.value}
                </dd>
                <dt className="text-eyebrow mt-3 text-muted-foreground">{m.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}

        {family.directions?.length ? (
          <>
            <Tc k="product.label.directions" as="h4" className="text-eyebrow mt-12 text-muted-foreground">Directions for use</Tc>
            <ol className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
              {family.directions.map((step, i) => (
                <li key={step} className="bg-card p-6">
                  <span aria-hidden="true" className="text-data block text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </>
        ) : null}

        <Tc k="product.label.applications" as="h4" className="text-eyebrow mt-12 text-muted-foreground">Clinical applications</Tc>
        <ul className="mt-4 flex flex-wrap gap-3">
          {family.applications.map((application, i) => (
            <li
              key={application}
              className="text-data border border-border bg-card px-4 py-2.5"
              data-cms={`col:products.${ci}.applications.${i}`}
            >
              {application}
            </li>
          ))}
        </ul>

        {family.suggestedUse ? (
          <p className="text-data mt-10 max-w-2xl border-l-2 border-primary bg-card p-5 text-muted-foreground">
            <Tc k="product.label.suggestedUse" className="text-eyebrow block text-foreground">Suggested use</Tc>
            <span className="mt-2 block leading-relaxed">{family.suggestedUse}</span>
          </p>
        ) : null}

        {family.references?.length ? (
          <details className="mt-8 border-t border-border pt-5">
            <summary className="text-eyebrow cursor-pointer text-muted-foreground">
              References ({family.references.length})
            </summary>
            <ol className="mt-4 space-y-2">
              {family.references.map((ref, i) => (
                <li key={ref} className="text-data flex gap-3 text-muted-foreground">
                  <span aria-hidden="true">{i + 1}.</span>
                  <span>{ref}</span>
                </li>
              ))}
            </ol>
          </details>
        ) : null}
      </div>
    </div>
  );
}
