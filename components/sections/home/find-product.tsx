import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { collection } from "@/lib/cms/content";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";
import { applications } from "@/lib/catalogue";
import { T } from "@/components/cms/t";

/**
 * Chapter 02 — the three ways into the catalogue: by range, by clinical
 * indication, or by search. The homepage's job is to get a reader to the
 * right product, so this sits directly under the shelf.
 */
export async function FindProduct() {
  const [families, ranges] = await Promise.all([
    collection("products", productFamilies),
    collection("ranges", rangeDefaults),
  ]);

  // The indications held by the most products — the ones worth surfacing
  // on the homepage rather than the full list.
  const topIndications = applications(families).slice(0, 12);

  return (
    <Section id="find">
      <SectionHeading
        index="02"
        ck="home.find"
        eyebrow="Find a product"
        title="Three ways in."
        lead="Browse the four ranges, start from the condition you are treating, or search the catalogue by name or ingredient."
      />

      <Reveal delay={90} className="mt-16 md:mt-20">
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {ranges.map((range) => {
            const count = families.filter((f) => f.range === range.id).length;
            return (
              <Link
                key={range.id}
                href={`/products?range=${range.id}`}
                className="group flex flex-col bg-card p-8 transition-colors hover:bg-background md:p-10"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span aria-hidden="true" className="text-data text-primary">
                    {range.index}
                  </span>
                  <span className="text-data text-muted-foreground">
                    {count} {count === 1 ? "product" : "products"}
                  </span>
                </div>
                <h3 className="text-title mt-6 text-balance">{range.title}</h3>
                <p className="text-eyebrow mt-3 text-primary">{range.eyebrow}</p>
                <p className="mt-5 flex-1 leading-relaxed text-muted-foreground">
                  {range.summary}
                </p>
                <span className="text-eyebrow mt-8 inline-flex items-center gap-2 text-primary">
                  <T k="home.find.browse">Browse the range</T>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Reveal>

      {/* By indication — the clinician's actual starting question. */}
      <Reveal delay={180} className="mt-12 md:mt-16">
        <div className="border-t border-border pt-8">
          <T k="home.find.indication" as="h3" className="text-eyebrow text-muted-foreground">Start from the indication</T>
          <ul className="mt-5 flex flex-wrap gap-2">
            {topIndications.map((a) => (
              <li key={a.key}>
                <Link
                  href={`/products?for=${encodeURIComponent(a.key)}#catalogue`}
                  className="text-data inline-flex items-center gap-2 border border-border bg-card px-3.5 py-2 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {a.label}
                  <span className="opacity-60 tabular-nums">{a.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/products"
            className="text-eyebrow group mt-8 inline-flex items-center gap-2 text-primary transition-colors hover:text-foreground"
          >
            <T k="home.find.search">Search the full catalogue</T>
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
