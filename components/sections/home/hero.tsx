import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { ProductRotator } from "@/components/motion/product-rotator";
import { collection, text } from "@/lib/cms/content";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";
import { allPhotos, unsplash } from "@/lib/photos";
import { T } from "@/components/cms/t";
import { HeroQuote } from "./hero-quote";
import { site } from "@/lib/site";
import { heroDefaults, type HeroCopy } from "./hero-copy";

/**
 * Chapter 01 — the range shows one pack at a time; the promise sits on the
 * left. No panels, no fills: packs float on the page itself.
 */
export async function Hero({ copy = heroDefaults }: { copy?: HeroCopy }) {
  const [families, ranges, photos, chipLabels] = await Promise.all([
    collection("products", productFamilies),
    collection("ranges", rangeDefaults),
    allPhotos(),
    Promise.all([
      text("home.hero.chip.products", "products"),
      text("home.hero.chip.ranges", "therapy ranges"),
      text("home.hero.chip.founded", `est. in ${site.city}`),
    ]),
  ]);
  const faces = [
    photos.grandmotherSmiling,
    photos.womanSmiling,
    photos.toddlersInRed,
    photos.grandfatherSmiling,
  ];

  // Every pack with a shot goes on the wall, each linking to its page.
  const packs = families
    .filter((p) => p.image)
    .map((p) => ({
      image: p.image!,
      title: p.name,
      href: `/products/${p.id}`,
    }));
  const chips = [
    {
      value: String(families.length),
      label: chipLabels[0],
      key: "home.hero.chip.products",
      tone: "bg-mint",
    },
    {
      value: String(ranges.length),
      label: chipLabels[1],
      key: "home.hero.chip.ranges",
      tone: "bg-sky",
    },
    {
      value: String(site.founded),
      label: chipLabels[2],
      key: "home.hero.chip.founded",
      tone: "bg-sun",
    },
  ];

  return (
    <section
      aria-label="Introduction"
      className="relative isolate overflow-hidden bg-mint/40"
    >
      {/* Top band: the copy and the drifting wall. The testimonial strip sits
          below it, outside the wall's box. */}
      <div className="relative">
        
        {/* White product stage, cut from the copy by a diagonal. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-0 h-[25rem] bg-white [clip-path:polygon(0_14%,100%_0,100%_100%,0_100%)] sm:h-[29rem] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[54%] lg:[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
        />

        <ProductRotator
          items={packs}
          className="!absolute inset-x-0 bottom-0 z-0 h-[22rem] sm:h-[26rem] lg:top-[6%] lg:bottom-[4%] lg:left-[60%] lg:right-[6%] lg:h-auto"
        />

        <div className="shell pointer-events-none relative z-20 flex flex-col items-start pt-24 pb-[24rem] sm:pt-28 sm:pb-[28rem] lg:min-h-[100svh] lg:pb-10 lg:pt-28 lg:[&>*]:w-full lg:[&>*]:max-w-[min(38vw,34rem)]">
          {/* Message sits in the vertical middle of the hero: equal flex space above and below. */}
          <div className="hidden lg:block lg:flex-1" aria-hidden="true" />
          <div className="py-8">
          <h1 className="text-balance text-[clamp(3rem,5.4vw,5.75rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
            <span className="animate-rise-in block" data-cms="home.hero.line1">
              {copy.line1}
            </span>
            <span
              className="animate-rise-in block"
              style={{ animationDelay: "120ms" }}
            >
              {/* Highlighter stroke that follows the words across a wrap. */}
              <span className="font-[family-name:var(--font-caveat),cursive] text-[1.3em] font-bold tracking-normal box-decoration-clone bg-[linear-gradient(transparent_60%,var(--sun)_60%,var(--sun)_90%,transparent_90%)] text-primary">
                <span data-cms="home.hero.line2">{copy.line2}</span>
                <span aria-hidden="true" className="text-foreground">
                  .
                </span>
              </span>
            </span>
          </h1>
          </div>

          {/* Bottom half: everything else. */}
          <div className="flex flex-col items-start pb-4 lg:flex-1 lg:justify-start">
         

          <p
            className="animate-rise-in mt-5 max-w-md text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lead sm:mt-7"
            style={{ animationDelay: "240ms" }}
            data-cms="home.hero.lead"
          >
            {copy.lead}
          </p>

          <div
            className="animate-rise-in pointer-events-auto mt-7 grid w-full grid-cols-1 gap-2.5 sm:mt-9 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-5 py-3.5 text-sm sm:px-7 sm:py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-foreground"
            >
              <span data-cms="home.hero.cta1">{copy.cta1}</span>
              <ArrowUpRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="/solutions/critical-care-nutrition"
              className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-card/70 px-5 py-3.5 text-sm sm:px-7 sm:py-4 font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:border-foreground"
            >
              <span data-cms="home.hero.cta2">{copy.cta2}</span>
            </Link>
          </div>

          <div
            className="animate-rise-in mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-10 sm:gap-y-4"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {faces.map((f) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={f.id}
                    src={unsplash(f.id, 96, 96)}
                    alt=""
                    width={44}
                    height={44}
                    className="h-9 w-9 rounded-full border-2 border-background object-cover sm:h-11 sm:w-11"
                  />
                ))}
              </div>
              <p className="max-w-[11rem] text-sm leading-snug text-muted-foreground">
                <T k="home.hero.faces">
                  For patients, parents &amp; grandparents
                </T>
              </p>
            </div>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2">
              {chips.map((c) => (
                <li
                  key={c.label}
                  className={`rounded-full ${c.tone} px-3 py-1.5 text-xs text-ink-deep sm:px-4 sm:py-2 sm:text-sm`}
                >
                  <strong className="font-bold">{c.value}</strong>{" "}
                  <span data-cms={c.key}>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="animate-rise-in pointer-events-auto mt-6 sm:mt-8"
            style={{ animationDelay: "480ms" }}
          >
            <HeroQuote />
          </div>
                  </div>
        </div>
      </div>

    </section>
  );
}
