import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { collection } from "@/lib/cms/content";
import { testimonials as testimonialDefaults } from "@/lib/testimonials";

/**
 * Chapter 09 — the clinicians' side. One quote set large on the dark
 * chapter, the rest on the hairline grid below it.
 */
export async function Testimonials() {
  // Clinicians only here (families appear in the hero strip). Keep each
  // item's position in the full list so its CMS key stays correct.
  const all = await collection("testimonials", testimonialDefaults);
  const [lead, ...rest] = all
    .map((t, idx) => ({ t, idx }))
    .filter(({ t }) => t.kind !== "family")
    .slice(0, 4);
  if (!lead) return null;

  return (
    <Section id="testimonials" tone="dark">
      <SectionHeading
        index="03"
        ck="home.testimonials"
        tone="dark"
        eyebrow="From the ward"
        title="Trusted at the bedside."
      />

      <Reveal as="figure" delay={120} className="mt-16 md:mt-24 lg:ml-[calc(2/12*100%)]">
        <span aria-hidden="true" className="block text-[7rem] font-extrabold leading-[0.6] text-green-soft">
          &ldquo;
        </span>
        <blockquote
          className="mt-4 max-w-5xl text-balance text-[clamp(1.75rem,3.6vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.025em]"
          data-cms={`col:testimonials.${lead.idx}.quote`}
        >
          {lead.t.quote}
        </blockquote>
        <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line-dark pt-6">
          <Attribution t={lead.t} i={lead.idx} />
        </figcaption>
      </Reveal>

      {rest.length ? (
        <ul className={`mt-16 grid grid-cols-1 gap-px border border-line-dark bg-line-dark md:mt-24 ${rest.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {rest.map(({ t, idx }, i) => (
            <Reveal as="li" key={t.id} delay={Math.min(i, 5) * 90} className="flex">
              <figure className="flex w-full flex-col bg-ink-deep p-8 md:p-10">
                <blockquote
                  className="flex-1 text-lg leading-relaxed text-background/90"
                  data-cms={`col:testimonials.${idx}.quote`}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line-dark pt-5">
                  <Attribution t={t} i={idx} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

function Attribution({ t, i }: { t: (typeof testimonialDefaults)[number]; i: number }) {
  return (
    <>
      <span className="flex-1">
        <span className="block font-semibold" data-cms={`col:testimonials.${i}.name`}>
          {t.name}
        </span>
        <span className="text-data mt-1 block text-paper-dim">
          <span data-cms={`col:testimonials.${i}.role`}>{t.role}</span> ·{" "}
          <span data-cms={`col:testimonials.${i}.place`}>{t.place}</span>
        </span>
      </span>
      {t.product ? (
        <Link
          href={`/products/${t.product}`}
          className="group text-eyebrow inline-flex items-center gap-1.5 text-green-soft transition-colors hover:text-background"
        >
          {t.product.replace("-", " ")}
          <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </>
  );
}
