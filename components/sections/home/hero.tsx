import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { DriftWall } from "@/components/motion/drift-wall";
import { collection, text } from "@/lib/cms/content";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";
import { allPhotos, unsplash } from "@/lib/photos";
import { T } from "@/components/cms/t";
import { HeroQuote } from "./hero-quote";
import { site } from "@/lib/site";
import { heroDefaults, type HeroCopy } from "./hero-copy";

const WALL_COLUMNS = 4;

/**
 * Chapter 01 — the whole range drifts across the page; the promise sits on the
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
  // DriftWall deals items round-robin (item i → column i % columns). With 11
  // packs over 4 columns the deal never lines up, so two passes give each
  // column ~6 different packs — mixed, and short enough to tilt cleanly.
  const wallItems = [...packs, ...packs];

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
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Top band: the copy and the drifting wall. The testimonial strip sits
          below it, outside the wall's box. */}
      <div className="relative">
        {/* Full-width drifting wall of packs, weighted right of the copy. */}
        <DriftWall
          items={wallItems}
          columns={WALL_COLUMNS}
          tileWidth={150}
          tileHeight={200}
          gap={26}
          radius={0}
          tilt={10}
          turn={-6}
          speed={30}
          parallax={0.5}
          lift={48}
          fade={0.35}
          dim={0.95}
          imageFit="contain"
          fit
          tileBg="transparent"
          overlayColor="transparent"
          className="!absolute inset-x-0 bottom-0 z-0 !h-[20rem] !w-auto sm:!h-[26rem] lg:!h-auto lg:inset-y-[4%] lg:left-[42%] lg:right-[2%]"
        />

        {/* Page-coloured fade so packs passing behind the copy don't fight it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_36%,transparent_52%)] max-lg:hidden"
        />

        <div className="shell pointer-events-none relative z-20 flex flex-col items-start pt-24 pb-[20rem] sm:pt-28 sm:pb-[27rem] lg:min-h-[100svh] lg:justify-center lg:pb-10">
          <p className="animate-rise-in pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm shadow-sm backdrop-blur">
            <Heart
              size={15}
              className="fill-coral text-coral"
              aria-hidden="true"
            />
            <T k="home.hero.badge">{`Trusted by hospitals`}</T>
          </p>

          <h1 className="mt-5 max-w-[11ch] sm:mt-7 text-balance text-[clamp(2.75rem,5.4vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
            <span className="animate-rise-in block" data-cms="home.hero.line1">
              {copy.line1}
            </span>
            <span
              className="animate-rise-in block"
              style={{ animationDelay: "120ms" }}
            >
              {/* Highlighter stroke that follows the words across a wrap. */}
              <span className="box-decoration-clone bg-[linear-gradient(transparent_60%,var(--sun)_60%,var(--sun)_90%,transparent_90%)] text-primary">
                <span data-cms="home.hero.line2">{copy.line2}</span>
                <span aria-hidden="true" className="text-foreground">
                  .
                </span>
              </span>
            </span>
          </h1>

          <p
            className="animate-rise-in mt-5 max-w-lg text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lead sm:mt-7"
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
            className="animate-rise-in mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 sm:mt-10 sm:gap-y-4"
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
    </section>
  );
}
