import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { CarouselLink } from "@/components/site/product-carousel";
import { ProductLineup } from "@/components/site/product-lineup";
import { Reveal } from "@/components/motion/reveal";
import { collection } from "@/lib/cms/content";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";

/** Chapter 04 — the catalogue as a draggable pack-shot carousel. */
export async function FeaturedProducts() {
  const families = await collection("products", productFamilies);
  const ranges = await collection("ranges", rangeDefaults);

  return (
    <Section id="products">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          index="04"
          ck="home.products"
          eyebrow="The catalogue"
          title="Eleven products. Four ranges."
          className="flex-1 basis-full lg:basis-auto"
        />
      </div>

      <Reveal>
        <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-y border-border py-5">
          {ranges.map((r) => (
            <li key={r.id} className="text-eyebrow text-muted-foreground">
              <span className="text-primary">{r.index}</span>{" "}
              <a href={`/products#${r.id}`} className="transition-colors hover:text-foreground">
                {r.title}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Full-bleed: the shelf breaks the shell gutters so the packs run
          edge to edge — products are the page's headline act. */}
      <Reveal delay={90} className="mt-16 md:mt-20">
        <div className="bleed">
          <ProductLineup products={families} />
        </div>
      </Reveal>

      <Reveal delay={180}>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          <CarouselLink href="/products">Full product overview</CarouselLink>
          <CarouselLink href="/brochures">Read the brochures</CarouselLink>
        </div>
      </Reveal>
    </Section>
  );
}
