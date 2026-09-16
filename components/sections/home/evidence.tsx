import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { evidenceDecks as evidenceDefaults } from "@/lib/products";
import { collection } from "@/lib/cms/content";

/**
 * Chapter — the clinical burden the portfolio answers to, taken from the
 * CKD, liver and I.C.O.N.S. evidence decks.
 */
export async function Evidence() {
  const evidenceDecks = await collection("evidence", evidenceDefaults);

  return (
    <Section id="evidence" tone="dark">
      <SectionHeading
        index="05"
        tone="dark"
        ck="home.evidence"
        eyebrow="Clinical evidence"
        title="The case the formulations answer to."
        lead="Figures reproduced from the evidence decks that accompany our literature — the burden of disease that defines what a nutrition protocol has to do."
      />

      <div className="mt-16 grid gap-px bg-line-dark md:mt-24 lg:grid-cols-3">
        {evidenceDecks.map((deck, i) => (
          <Reveal key={deck.id} delay={i * 90} className="flex">
            <article className="flex w-full flex-col bg-ink-deep p-8 md:p-10">
              <span aria-hidden="true" className="text-data text-paper-dim">
                {deck.index}
              </span>
              <h3 className="text-title mt-8 text-background">{deck.title}</h3>
              <p className="text-eyebrow mt-3 text-green-soft">{deck.subtitle}</p>

              <dl className="mt-8 border-t border-line-dark">
                {deck.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-5 border-b border-line-dark py-3.5"
                  >
                    <dd className="text-[1.35rem] leading-none font-semibold tabular-nums text-background">
                      {s.value}
                    </dd>
                    <dt className="text-data max-w-[62%] text-right text-paper-dim">{s.label}</dt>
                  </div>
                ))}
              </dl>

              <ul className="mt-8 flex-1 space-y-3">
                {deck.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-paper-dim">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-green-soft"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
