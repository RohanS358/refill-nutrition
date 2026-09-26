import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { CompareTable } from "@/components/site/compare-table";
import { T } from "@/components/cms/t";
import { collection } from "@/lib/cms/content";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";

export const metadata: Metadata = {
  title: "Compare products",
  alternates: { canonical: "/products/compare" },
  description:
    "Compare the Refill clinical catalogue side by side — pack size, flavour, composition, energy and protein per serving, and clinical indications.",
};

export default async function ComparePage() {
  const [families, ranges] = await Promise.all([
    collection("products", productFamilies),
    collection("ranges", rangeDefaults),
  ]);

  return (
    <>
      <PageHero
        ck="compare.hero"
        eyebrow="Compare"
        title="Side by side."
        lead="Pick the products under consideration and read their figures against each other — pack, composition, nutrition and indications, all transcribed from the printed literature."
      />

      <Section>
        <CompareTable products={families} ranges={ranges} />
      </Section>

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
