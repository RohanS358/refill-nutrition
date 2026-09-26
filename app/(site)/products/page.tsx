import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { CatalogueBrowser } from "@/components/site/catalogue-browser";
import { ProductMarquee } from "@/components/site/product-marquee";
import { collection } from "@/lib/cms/content";
import { T } from "@/components/cms/t";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";
import { applications } from "@/lib/catalogue";
import { productSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";

export const metadata: Metadata = {
  title: "Products",
  alternates: { canonical: "/products" },
  description:
    "Search the clinical catalogue by name, ingredient or indication: the progain enteral range, re-pro daily protein, Calcinine, Recal-M, Cardivit, Recure and BAITONG enteral delivery sets.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string; for?: string }>;
}) {
  const [{ range, for: indication }, families, ranges] = await Promise.all([
    searchParams,
    collection("products", productFamilies),
    collection("ranges", rangeDefaults),
  ]);
  const initialRange = ranges.find((r) => r.id === range)?.id;
  // Only honour an indication the catalogue actually carries.
  const initialApplication = indication
    ? applications(families).find((a) => a.key === indication)?.key
    : undefined;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
          ...families.map(productSchema),
        ]}
      />
      <PageHero
        ck="products.hero"
        eyebrow="Products"
        title="The clinical catalogue."
        lead="Eleven products across four ranges. Search by name, ingredient or indication — every figure is transcribed from the product literature."
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

      <Section id="catalogue">
        <CatalogueBrowser products={families} ranges={ranges} initialRange={initialRange} initialApplication={initialApplication} />
        <Link
          href="/products/compare"
          className="text-eyebrow group mt-12 inline-flex items-center gap-2 text-primary transition-colors hover:text-foreground"
        >
          <T k="products.compare.cta">Compare products side by side</T>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
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
