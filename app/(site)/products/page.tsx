import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { ProductDetail } from "@/components/site/product-detail";
import { ProductMarquee } from "@/components/site/product-marquee";
import { collection } from "@/lib/cms/content";
import { T } from "@/components/cms/t";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The Refill clinical catalogue — the progain enteral range, re-pro daily protein, Calcinine, Recal-M, Cardivit and Recure supplementation, and BAITONG enteral delivery devices.",
};

export default async function ProductsPage() {
  const families = await collection("products", productFamilies);
  const ranges = await collection("ranges", rangeDefaults);

  return (
    <>
      <PageHero
        ck="products.hero"
        eyebrow="Products"
        title="The clinical catalogue."
        lead="Eleven products across four ranges. Every figure is transcribed from the product literature — open any entry for its full composition, nutrition panel and references."
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
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                <span aria-hidden="true" className="text-data text-muted-foreground">
                  {range.index}
                </span>
                <h2 className="text-display text-[clamp(1.9rem,3.4vw,3.1rem)]">{range.title}</h2>
                <p className="text-eyebrow text-primary">{range.eyebrow}</p>
              </div>
              <p className="text-lead mt-6 max-w-3xl text-muted-foreground">{range.summary}</p>
            </Reveal>

            <div className="mt-12 border-t border-border md:mt-16">
              {inRange.map((family) => (
                <ProductDetail
                  key={family.id}
                  family={family}
                  ci={families.findIndex((f) => f.id === family.id)}
                />
              ))}
            </div>
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
