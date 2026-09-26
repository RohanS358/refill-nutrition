import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { ProductBody } from "@/components/site/product-body";
import { ProductCard } from "@/components/site/product-card";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { T } from "@/components/cms/t";
import { collection } from "@/lib/cms/content";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";
import { relatedProducts } from "@/lib/catalogue";
import { productSchema, breadcrumbSchema } from "@/lib/schema";

/** One page per product, so every entry is linkable, shareable and indexed. */
export async function generateStaticParams() {
  return productFamilies.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const families = await collection("products", productFamilies);
  const family = families.find((p) => p.id === id);
  if (!family) return {};

  return pageMeta({
    title: `${family.name} — ${family.category}`,
    description: family.summary,
    path: `/products/${family.id}`,
    ...(family.image ? { image: family.image } : {}),
  });
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [families, ranges] = await Promise.all([
    collection("products", productFamilies),
    collection("ranges", rangeDefaults),
  ]);

  const family = families.find((p) => p.id === id);
  if (!family) notFound();

  const ci = families.findIndex((p) => p.id === family.id);
  const range = ranges.find((r) => r.id === family.range);
  const related = relatedProducts(family, families);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: family.name, path: `/products/${family.id}` },
          ]),
          productSchema(family),
        ]}
      />

      {/* Identity first: what it is, what it treats — before any detail. */}
      <Section className="pt-28 md:pt-32" ruled={false}>
        <nav aria-label="Breadcrumb">
          <Link
            href="/products"
            className="text-eyebrow group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.75}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            <T k="product.back">All products</T>
          </Link>
        </nav>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <span aria-hidden="true" className="text-data text-muted-foreground">
            {family.index}
          </span>
          <h1 className="text-display text-[clamp(2rem,4vw,3.4rem)]" data-cms={`col:products.${ci}.name`}>
            {family.name}
          </h1>
          {range ? (
            <Link
              href={`/products?range=${range.id}`}
              className="text-eyebrow text-primary transition-colors hover:text-foreground"
            >
              {range.title}
            </Link>
          ) : null}
        </div>

        <p
          className="text-lead mt-6 max-w-3xl text-muted-foreground"
          data-cms={`col:products.${ci}.summary`}
        >
          {family.summary}
        </p>

        <div className="mt-10 border-t border-border pt-8">
          <ProductBody family={family} ci={ci} />
        </div>
      </Section>

      {related.length ? (
        <Section id="related">
          <Reveal>
            <h2 className="text-display text-[clamp(1.6rem,2.8vw,2.4rem)]">
              <T k="product.compare.title">Compare with related products</T>
            </h2>
            <p className="text-lead mt-4 max-w-2xl text-muted-foreground">
              Products sharing indications with {family.name}, so the alternatives are in
              view before a decision is made.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                family={p}
                ci={families.findIndex((f) => f.id === p.id)}
              />
            ))}
          </div>
          <Link
            href="/products/compare"
            className="text-eyebrow group mt-8 inline-flex items-center gap-2 text-primary transition-colors hover:text-foreground"
          >
            <T k="product.compare.cta">Compare the full catalogue side by side</T>
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Section>
      ) : null}

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
