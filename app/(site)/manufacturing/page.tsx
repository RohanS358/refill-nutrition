import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { StatBlock } from "@/components/site/stat-block";
import { Reveal, Draw } from "@/components/motion/reveal";
import { Blueprint } from "@/components/gfx/blueprint";
import { T } from "@/components/cms/t";
import { text } from "@/lib/cms/content";

export const metadata: Metadata = {
  alternates: { canonical: "/manufacturing" },
  title: "Manufacturing Vision",
  description:
    "Our long-term commitment: a nutraceutical manufacturing facility in Nepal for quality assurance, self-reliance, employment and industry growth.",
};

const pillars = [
  {
    index: "01",
    title: "Quality assurance",
    body: "Production under internationally recognized quality systems — the standard is global even when the address is local. Certification targets (GMP, ISO) are part of the facility plan, not an afterthought.",
  },
  {
    index: "02",
    title: "Self-reliance",
    body: "Critical nutrition should not depend entirely on imports. Domestic production shortens supply chains for the hospitals that can least afford disruption.",
  },
  {
    index: "03",
    title: "Employment & skills",
    body: "A facility is a school: production, quality control, regulatory affairs, and R&D roles that build Nepal's pharmaceutical-grade workforce.",
  },
  {
    index: "04",
    title: "Industry growth",
    body: "One credible domestic manufacturer raises the ceiling for the whole nutraceutical and healthcare sector — suppliers, logistics, and standards mature together.",
  },
];

export default async function ManufacturingPage() {
  const statLabels = await Promise.all([
    text("manufacturing.stats.0", "Facility planned"),
    text("manufacturing.stats.1", "Strategic returns"),
    text("manufacturing.stats.2", "Commitment"),
  ]);

  return (
    <>
      <PageHero
        ck="manufacturing.hero"
        eyebrow="Manufacturing vision"
        title="The facility we are building toward."
        lead="As part of its long-term strategic vision, Refill Enterprises aspires to establish a state-of-the-art manufacturing facility within Nepal. This page is that commitment, in public."
        meta={[
          { label: "Status", value: "Planned" },
          { label: "Location", value: "Nepal" },
          { label: "Scope", value: "Nutraceutical production" },
          { label: "Standard", value: "International QA" },
        ]}
      />

      <Section>
        <SectionHeading
        ck="manufacturing.s1"
          index="01"
          eyebrow="The concept"
          title="Drawn first. Then built."
        />
        <div className="mt-16 md:mt-24">
          <Draw>
            <Blueprint className="mx-auto max-w-4xl text-primary" />
          </Draw>
          <T
            k="manufacturing.figcaption"
            as="p"
            className="text-data mt-6 text-center text-muted-foreground"
          >
            Fig. 01 — Concept plan, future Refill production facility. Illustrative.
          </T>
        </div>
      </Section>

      <Section>
        <SectionHeading
        ck="manufacturing.s2"
          index="02"
          eyebrow="Why it matters"
          title="Four returns on one facility."
        />
        <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.index} delay={i * 90} className="flex">
              <div className="w-full bg-background p-8 md:p-14">
                <p aria-hidden="true" className="text-data text-primary">
                  {pillar.index}
                </p>
                <h3 className="text-title mt-6">
                  <T k={`manufacturing.pillars.${i}.title`}>{pillar.title}</T>
                </h3>
                <T
                  k={`manufacturing.pillars.${i}.body`}
                  as="p"
                  className="mt-4 max-w-md leading-relaxed text-muted-foreground"
                >
                  {pillar.body}
                </T>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section density="dense">
        <Reveal>
          <StatBlock
            stats={[
              { value: 1, label: statLabels[0], labelKey: "manufacturing.stats.0" },
              { value: 4, label: statLabels[1], labelKey: "manufacturing.stats.1" },
              { value: 100, label: statLabels[2], suffix: "%", labelKey: "manufacturing.stats.2" },
            ]}
            className="border border-border"
          />
        </Reveal>
      </Section>

      <CtaBand
        ck="manufacturing.cta"
        eyebrow="Partners & investors"
        title="Build it with us."
        body="We welcome conversations with partners who share the vision of domestic healthcare manufacturing in Nepal."
      />
    </>
  );
}
