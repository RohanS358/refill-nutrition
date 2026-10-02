import Link from "next/link";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { T } from "@/components/cms/t";
import { collection } from "@/lib/cms/content";
import { banners as bannerDefaults } from "@/lib/banners";
import { allPhotos, unsplash, unsplashSet } from "@/lib/photos";

const tones = { sun: "bg-sun", mint: "bg-mint", sky: "bg-sky", blush: "bg-blush" } as const;

/**
 * Information banners — one headline fact, then friendly cards. Pastel
 * grounds with ink text, so they read the same in dark mode. Content lives
 * in lib/banners.ts and is editable in the visual editor ("col:banners.*").
 */
export async function GoodToKnow() {
  const [banners, photos] = await Promise.all([
    collection("banners", bannerDefaults),
    allPhotos(),
  ]);
  const [lead, ...cards] = banners;
  if (!lead) return null;
  const leadPhoto = photos[lead.photo];
  const k = (i: number, field: string) => `col:banners.${i}.${field}`;

  return (
    <section aria-labelledby="good-to-know" className="bg-background">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <h2 id="good-to-know" className="text-display max-w-3xl text-balance">
            <T k="home.gtk.title1">Good nutrition,</T>{" "}
            <T k="home.gtk.title2" className="text-primary">explained simply.</T>
          </h2>
        </Reveal>

        {/* Headline banner */}
        <Reveal delay={90} className="mt-12 md:mt-16">
          <div className={`grid overflow-hidden rounded-[2rem] ${tones[lead.tone]} text-ink-deep md:grid-cols-2`}>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold">
                <Lightbulb size={15} aria-hidden="true" />
                <span data-cms={k(0, "tag")}>{lead.tag}</span>
              </p>
              <p
                data-cms={k(0, "fact")}
                className="mt-6 text-balance text-[clamp(1.75rem,3.4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em]"
              >
                {lead.fact}
              </p>
              <p data-cms={k(0, "body")} className="mt-5 max-w-md text-lg leading-relaxed text-ink-deep/75">
                {lead.body}
              </p>
              <Link
                href={`/products/${lead.product}`}
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink-deep px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                <span data-cms={k(0, "cta")}>{lead.cta}</span>
                <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={unsplash(leadPhoto.id, 900, 700)}
              srcSet={unsplashSet(leadPhoto.id, 900, 700)}
              alt={leadPhoto.alt}
              loading="lazy"
              className="h-72 w-full object-cover md:h-full"
            />
          </div>
        </Reveal>

        {/* Cards */}
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {cards.map((c, j) => {
            const i = j + 1;
            const p = photos[c.photo];
            return (
              <Reveal as="li" key={c.id} delay={Math.min(j, 5) * 90} className="flex">
                <Link
                  href={`/products/${c.product}`}
                  className={`group flex w-full flex-col overflow-hidden rounded-[2rem] ${tones[c.tone]} text-ink-deep transition hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={unsplash(p.id, 600, 420)}
                      srcSet={unsplashSet(p.id, 600, 420)}
                      alt={p.alt}
                      loading="lazy"
                      className="aspect-[10/7] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p data-cms={k(i, "tag")} className="w-fit rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">
                      {c.tag}
                    </p>
                    <p data-cms={k(i, "fact")} className="mt-4 text-balance text-2xl font-bold leading-tight tracking-[-0.02em]">
                      {c.fact}
                    </p>
                    <p data-cms={k(i, "body")} className="mt-3 flex-1 text-ink-deep/70">
                      {c.body}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                      <span data-cms={k(i, "cta")}>{c.cta}</span>
                      <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
