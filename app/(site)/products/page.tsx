import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { NutritionPanel } from "@/components/site/nutrition-panel";
import { ProductMarquee } from "@/components/site/product-marquee";
import { collection } from "@/lib/cms/content";
import { T } from "@/components/cms/t";
import { productFamilies, ranges } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The Refill clinical catalogue — the progain enteral range, re-pro daily protein, Calcinine, Recal-M, Cardivit and Recure supplementation, and BAITONG enteral delivery devices.",
};

export default async function ProductsPage() {
  const families = await collection("products", productFamilies);

  return (
    <>
      <PageHero
        ck="products.hero"
        eyebrow="Products"
        title="The clinical catalogue."
        lead="Eleven products across four ranges, each built for a specific physiological job. Every figure on this page is transcribed from the product literature — dosing clarity, honest labels, clinical language."
        meta={[
          { label: "Products", value: String(families.length) },
          { label: "Ranges", value: String(ranges.length) },
          { label: "Audience", value: "Healthcare professionals" },
          { label: "Delivery", value: "Oral & enteral" },
        ]}
      />

      <Section density="dense">
        <ProductMarquee products={families} />
      </Section>

      {ranges.map((range) => {
        const inRange = families.filter((f) => f.range === range.id);
        if (!inRange.length) return null;

        return (
          <Section key={range.id} id={range.id}>
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-b border-border pb-8">
                <span aria-hidden="true" className="text-data text-muted-foreground">
                  {range.index}
                </span>
                <h2 className="text-display text-[clamp(1.9rem,3.4vw,3.1rem)]">{range.title}</h2>
                <p className="text-eyebrow text-primary">{range.eyebrow}</p>
              </div>
              <p className="text-lead mt-8 max-w-3xl text-muted-foreground">{range.summary}</p>
            </Reveal>

            {inRange.map((family) => {
              const index = families.findIndex((f) => f.id === family.id);

              return (
                <div
                  key={family.id}
                  id={family.id}
                  className="mt-20 scroll-mt-28 border-t border-border pt-16 md:mt-28 md:pt-20"
                >
                  <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Pack shot + identity */}
                    <div className="lg:col-span-4">
                      <Reveal>
                        <span aria-hidden="true" className="text-data text-muted-foreground">
                          {family.index} / {String(families.length).padStart(2, "0")}
                        </span>
                        {family.image ? (
                          <Parallax distance={26} className="mt-8">
                            <Image
                              src={family.image}
                              alt={family.name}
                              width={420}
                              height={520}
                              sizes="(max-width: 1024px) 60vw, 340px"
                              className="h-[260px] w-auto object-contain object-left md:h-[340px]"
                            />
                          </Parallax>
                        ) : null}
                        <h3
                          className="text-display mt-10 text-[clamp(1.8rem,3vw,2.7rem)]"
                          data-cms={`col:products.${index}.name`}
                        >
                          {family.name}
                        </h3>
                        {family.strapline ? (
                          <p className="mt-3 text-lg text-muted-foreground italic">
                            {family.strapline}
                          </p>
                        ) : null}
                        <p
                          className="text-eyebrow mt-4 text-primary"
                          data-cms={`col:products.${index}.category`}
                        >
                          {family.category}
                        </p>
                        <dl className="text-data mt-8 border-t border-border">
                          {family.pack ? (
                            <div className="flex justify-between gap-4 border-b border-border py-2.5">
                              <dt className="text-muted-foreground">Pack</dt>
                              <dd>{family.pack}</dd>
                            </div>
                          ) : null}
                          {family.flavour ? (
                            <div className="flex justify-between gap-4 border-b border-border py-2.5">
                              <dt className="text-muted-foreground">Flavour</dt>
                              <dd>{family.flavour}</dd>
                            </div>
                          ) : null}
                        </dl>
                      </Reveal>
                    </div>

                    {/* Detail */}
                    <div className="lg:col-span-8">
                      <Reveal delay={90}>
                        <p
                          className="text-lead max-w-2xl text-muted-foreground"
                          data-cms={`col:products.${index}.detail`}
                        >
                          {family.detail}
                        </p>
                      </Reveal>

                      <Reveal delay={180}>
                        <h4 className="text-eyebrow mt-14 text-muted-foreground">
                          Composition & characteristics
                        </h4>
                        <dl className="mt-4 border-t border-border">
                          {family.compounds.map((compound, ci) => (
                            <div
                              key={compound.label}
                              className="grid grid-cols-2 gap-6 border-b border-border py-4"
                            >
                              <dt
                                className="text-data font-semibold"
                                data-cms={`col:products.${index}.compounds.${ci}.label`}
                              >
                                {compound.label}
                              </dt>
                              <dd
                                className="text-data text-right text-muted-foreground"
                                data-cms={`col:products.${index}.compounds.${ci}.value`}
                              >
                                {compound.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </Reveal>

                      {family.claims?.length ? (
                        <Reveal delay={240}>
                          <h4 className="text-eyebrow mt-14 text-muted-foreground">
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
                        </Reveal>
                      ) : null}

                      {family.nutrition ? (
                        <Reveal delay={300}>
                          <div className="mt-14">
                            <NutritionPanel
                              servingNote={family.nutrition.servingNote}
                              rows={family.nutrition.rows}
                              perTin={family.perTin}
                            />
                          </div>
                        </Reveal>
                      ) : family.perTin ? (
                        <Reveal delay={300}>
                          <dl className="mt-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
                            {family.perTin.map((m) => (
                              <div key={m.label} className="bg-card px-5 py-6">
                                <dd className="text-[1.6rem] leading-none font-semibold tabular-nums">
                                  {m.value}
                                </dd>
                                <dt className="text-eyebrow mt-3 text-muted-foreground">
                                  {m.label}
                                </dt>
                              </div>
                            ))}
                          </dl>
                        </Reveal>
                      ) : null}

                      {family.directions?.length ? (
                        <Reveal delay={330}>
                          <h4 className="text-eyebrow mt-14 text-muted-foreground">
                            Directions for use
                          </h4>
                          <ol className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
                            {family.directions.map((step, si) => (
                              <li key={step} className="bg-card p-6">
                                <span
                                  aria-hidden="true"
                                  className="text-data block text-primary"
                                >
                                  {String(si + 1).padStart(2, "0")}
                                </span>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                  {step}
                                </p>
                              </li>
                            ))}
                          </ol>
                        </Reveal>
                      ) : null}

                      <Reveal delay={360}>
                        <h4 className="text-eyebrow mt-14 text-muted-foreground">
                          Clinical applications
                        </h4>
                        <ul className="mt-4 flex flex-wrap gap-3">
                          {family.applications.map((application, ai) => (
                            <li
                              key={application}
                              className="text-data border border-border bg-card px-4 py-2.5"
                              data-cms={`col:products.${index}.applications.${ai}`}
                            >
                              {application}
                            </li>
                          ))}
                        </ul>
                      </Reveal>

                      {family.suggestedUse ? (
                        <Reveal delay={390}>
                          <p className="text-data mt-12 max-w-2xl border-l-2 border-primary bg-card p-5 text-muted-foreground">
                            <span className="text-eyebrow block text-foreground">Suggested use</span>
                            <span className="mt-2 block leading-relaxed">{family.suggestedUse}</span>
                          </p>
                        </Reveal>
                      ) : null}

                      {family.references?.length ? (
                        <Reveal delay={420}>
                          <details className="mt-10 border-t border-border pt-6">
                            <summary className="text-eyebrow cursor-pointer text-muted-foreground">
                              References ({family.references.length})
                            </summary>
                            <ol className="mt-4 space-y-2">
                              {family.references.map((ref, ri) => (
                                <li
                                  key={ref}
                                  className="text-data flex gap-3 text-muted-foreground"
                                >
                                  <span aria-hidden="true">{ri + 1}.</span>
                                  <span>{ref}</span>
                                </li>
                              ))}
                            </ol>
                          </details>
                        </Reveal>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </Section>
        );
      })}

      <Section density="dense">
        <T
          k="products.disclaimer"
          as="p"
          className="text-data mx-auto max-w-3xl text-center text-muted-foreground"
        >
          Figures and claims reproduce the printed product literature. Nutritional supplements are
          not for medicinal use. For the use of a Registered Medical Practitioner, Hospital or
          Laboratory only. For SKU-level dosing, registration and availability, contact our team.
        </T>
      </Section>

      <CtaBand
        ck="products.cta"
        eyebrow="Availability"
        title="Ask about SKUs and supply."
        body="For hospital procurement, distribution, and detailed product specifications, our team responds quickly."
      />
    </>
  );
}
