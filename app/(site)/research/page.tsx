import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal, Draw } from "@/components/motion/reveal";
import { Helix } from "@/components/gfx/helix";
import { T } from "@/components/cms/t";

export const metadata: Metadata = {
  alternates: { canonical: "/research" },
  title: "Research & Innovation",
  description:
    "Our research philosophy: evidence before everything, disease-specific by default, clinician-aligned, and measured in outcomes.",
};

const methods = [
  {
    index: "01",
    title: "Literature first",
    body: "Every formulation starts in the clinical literature — meta-analyses, guidelines (ESPEN, ASPEN), and disease-specific evidence set the spec before any ingredient is sourced.",
  },
  {
    index: "02",
    title: "Formulation as engineering",
    body: "Bioavailability, substrate ratios, osmolality, tolerance — the variables are quantified, then locked. A spec that cannot be defended is not produced.",
  },
  {
    index: "03",
    title: "Clinician feedback loops",
    body: "Products live in wards, not slide decks. We iterate with the professionals who prescribe, dose, and observe — their protocols are our test bench.",
  },
  {
    index: "04",
    title: "Technology for measurement",
    body: "Devices and applications close the loop: delivery is controlled, tolerance is observed, outcomes are recorded. Nutrition therapy that isn't measured is guesswork.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        ck="research.hero"
        tone="dark"
        eyebrow="Research & innovation"
        title="Evidence is the ingredient we never substitute."
        lead="We are a science company that happens to sell products. The research philosophy below governs everything in the catalogue — and everything that will ever join it."
        meta={[
          { label: "Standard", value: "Evidence-based" },
          { label: "References", value: "Clinical guidelines" },
          { label: "Method", value: "Formulate · Test · Measure" },
          { label: "Loop", value: "Clinician feedback" },
        ]}
      />

      <Section tone="dark" ruled={false} className="border-t border-line-dark">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
        ck="research.s1"
              index="01"
              eyebrow="Method"
              title="How a Refill product earns its label."
              tone="dark"
            />
            <ol className="mt-14">
              {methods.map((method, i) => (
                <Reveal as="li" key={method.index} delay={Math.min(i, 3) * 90}>
                  <div className="grid gap-4 border-t border-line-dark py-8 md:grid-cols-[4rem_16rem_1fr] md:gap-8 md:py-10">
                    <span aria-hidden="true" className="text-data text-green-soft">
                      {method.index}
                    </span>
                    <h3 className="text-title text-background">
                      <T k={`research.methods.${i}.title`}>{method.title}</T>
                    </h3>
                    <T
                      k={`research.methods.${i}.body`}
                      as="p"
                      className="text-sm leading-relaxed text-paper-dim"
                    >
                      {method.body}
                    </T>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="hidden justify-center lg:col-span-5 lg:flex">
            <Draw className="sticky top-32 h-[36rem]">
              <Helix className="h-full text-green-soft" />
            </Draw>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
        ck="research.s2"
          index="02"
          eyebrow="Innovation agenda"
          title="Where the research goes next."
        />
        <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
          {[
            {
              title: "Deeper disease specificity",
              body: "Expanding metabolic profiles beyond renal, hepatic, and glycaemic states.",
            },
            {
              title: "Sports performance science",
              body: "Translating critical-care recovery science into the performance and recovery portfolio.",
            },
            {
              title: "Manufacturing R&D",
              body: "Process and quality research to prepare the future Nepali facility for international standards.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="flex">
              <div className="w-full bg-background p-8 md:p-10">
                <p aria-hidden="true" className="text-data text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-title mt-6">
                  <T k={`research.agenda.${i}.title`}>{item.title}</T>
                </h3>
                <T
                  k={`research.agenda.${i}.body`}
                  as="p"
                  className="mt-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {item.body}
                </T>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        ck="research.cta"
        eyebrow="Collaborate"
        title="Research with us."
        body="Clinicians, institutions, and partners interested in clinical nutrition research — we want to hear from you."
      />
    </>
  );
}
