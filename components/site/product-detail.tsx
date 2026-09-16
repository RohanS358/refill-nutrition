"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import type { ProductFamily } from "@/lib/products";
import { NutritionPanel } from "./nutrition-panel";
import { cn } from "@/lib/utils";

/**
 * One catalogue entry: always-visible summary row, detail on demand.
 * The pack shot sticks beside the detail while it is open, so the product
 * stays in view while the clinician reads its figures.
 */
export function ProductDetail({
  family,
  /** Position in the products collection — keeps CMS keys stable. */
  ci,
}: {
  family: ProductFamily;
  ci: number;
}) {
  const [open, setOpen] = useState(false);
  // Clipping is dropped after the expand tween so sticky can work.
  const [settled, setSettled] = useState(false);
  const reduced = useReducedMotion();
  const panelId = `${family.id}-detail`;

  // The figures worth keeping on screen: the per-tin macro wheel where the
  // brochure prints one, otherwise the first compounds from the pack.
  const keyFigures = (
    family.perTin?.length
      ? family.perTin
      : family.compounds.slice(0, 4).map((c) => ({ label: c.label, value: c.value }))
  ).slice(0, 4);

  // A deep link (/products#progain-hp) should land on an open entry.
  useEffect(() => {
    const sync = () => {
      if (decodeURIComponent(window.location.hash.slice(1)) === family.id) {
        setOpen(true);
        setSettled(false);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [family.id]);

  return (
    <div id={family.id} className="scroll-mt-28 border-b border-border">
      {/* Summary row — always visible */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setSettled(false);
        }}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[4.5rem_1fr_auto] items-center gap-5 py-6 text-left transition-colors hover:bg-card md:grid-cols-[6rem_minmax(0,20rem)_1fr_auto] md:gap-8 md:py-8"
      >
        {family.image ? (
          <Image
            src={family.image}
            alt=""
            width={140}
            height={170}
            sizes="140px"
            className="pack-shot h-16 w-auto justify-self-center object-contain transition-transform duration-500 group-hover:-translate-y-1 md:h-24"
          />
        ) : (
          <span />
        )}

        <span className="min-w-0">
          <span className="text-title block text-balance" data-cms={`col:products.${ci}.name`}>
            {family.name}
          </span>
          <span
            className="text-eyebrow mt-2 block text-primary"
            data-cms={`col:products.${ci}.category`}
          >
            {family.category}
          </span>
        </span>

        <span className="hidden text-sm leading-relaxed text-muted-foreground md:block">
          {family.summary}
        </span>

        <span
          aria-hidden="true"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:text-primary",
            open && "rotate-45 border-primary text-primary",
          )}
        >
          <Plus size={18} strokeWidth={1.5} />
        </span>
      </button>

      {/* Detail — on demand */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            // overflow clipping is only needed while the height tweens; a
            // non-visible overflow on this ancestor would otherwise break
            // position:sticky on the pack-shot column.
            onAnimationComplete={() => setSettled(true)}
            style={{ overflow: settled ? "visible" : "hidden" }}
          >
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
                        <dt className="text-muted-foreground">Pack</dt>
                        <dd className="text-right">{family.pack}</dd>
                      </div>
                    ) : null}
                    {family.flavour ? (
                      <div className="flex justify-between gap-4 border-b border-border py-2.5">
                        <dt className="text-muted-foreground">Flavour</dt>
                        <dd className="text-right">{family.flavour}</dd>
                      </div>
                    ) : null}
                    {family.applications.slice(0, 3).map((a) => (
                      <div key={a} className="flex justify-between gap-4 border-b border-border py-2.5">
                        <dt className="text-muted-foreground">Indication</dt>
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
                  Composition & characteristics
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
                      As printed on the literature
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
                    <h4 className="text-eyebrow mt-12 text-muted-foreground">Directions for use</h4>
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

                <h4 className="text-eyebrow mt-12 text-muted-foreground">Clinical applications</h4>
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
                    <span className="text-eyebrow block text-foreground">Suggested use</span>
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
