import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal, Draw } from "@/components/motion/reveal";
import { Pathway } from "@/components/gfx/pathway";
import { collection } from "@/lib/cms/content";
import { solutions as defaultSolutions, protocolSteps } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Two solution areas, one pathway: critical care nutrition and the medical devices & healthcare applications that deliver it.",
};

export default async function SolutionsPage() {
  const solutions = await collection("solutions", defaultSolutions);

  return (
    <>
      <PageHero
        ck="solutions.hero"
        eyebrow="Solutions"
        title="Built for the whole pathway."
        lead="Clinical nutrition fails at the weakest link — assessment, formulation, delivery, or monitoring. Our two solution areas exist so no link is weak."
      />

      <Section>
        <Draw>
          <Pathway
            stages={protocolSteps.map((s) => s.title)}
            className="max-h-72 w-full text-primary"
          />
        </Draw>
        <p className="text-data mt-6 text-muted-foreground">
          Fig. 01 — The clinical nutrition pathway, screen to recovery.
        </p>

        <div className="mt-16 grid gap-px border border-border bg-border md:mt-24 lg:grid-cols-2">
          {solutions.map((solution, i) => (
            <Reveal key={solution.id} delay={i * 90} className="flex">
              <article className="group relative flex w-full flex-col bg-background p-8 transition-colors hover:bg-card md:p-14">
                <span aria-hidden="true" className="text-data text-primary">
                  {solution.index}
                </span>
                <p
                  className="text-eyebrow mt-6 text-muted-foreground"
                  data-cms={`col:solutions.${i}.eyebrow`}
                >
                  {solution.eyebrow}
                </p>
                <h2 className="text-display mt-4 text-[clamp(1.75rem,2.6vw,2.5rem)]">
                  <Link href={solution.href} className="after:absolute after:inset-0">
                    <span data-cms={`col:solutions.${i}.title`}>{solution.title}</span>
                  </Link>
                </h2>
                <p
                  className="mt-6 max-w-xl flex-1 leading-relaxed text-muted-foreground"
                  data-cms={`col:solutions.${i}.summary`}
                >
                  {solution.summary}
                </p>
                <span className="text-eyebrow mt-10 inline-flex items-center gap-2 text-primary">
                  Explore
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand ck="solutions.cta" />
    </>
  );
}
