import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Draw } from "@/components/motion/reveal";
import { Helix } from "@/components/gfx/helix";
import { T } from "@/components/cms/t";

const principles = [
  {
    index: "01",
    title: "Evidence before everything",
    body: "A formulation ships when the science supports it — not when the market asks for it.",
  },
  {
    index: "02",
    title: "Disease-specific by default",
    body: "Renal is not hepatic. Hypercatabolic is not maintenance. Specificity is the product.",
  },
  {
    index: "03",
    title: "Clinician-aligned",
    body: "We build for the people writing the protocols: dosing clarity, honest labels, clinical language.",
  },
  {
    index: "04",
    title: "Outcomes, measured",
    body: "Devices and applications exist so that nutritional therapy is tracked, not assumed.",
  },
];

/** Chapter 08 — dark chapter: the research philosophy, helix drawn on scroll. */
export async function Research() {
  return (
    <Section id="research" tone="dark">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            index="08"
            ck="home.research"
            eyebrow="Research philosophy"
            title="Science is the supply chain."
            tone="dark"
          />
          <Reveal delay={180}>
            <blockquote className="mt-12 max-w-xl border-l border-green-soft pl-6">
              <T
                k="home.research.quote"
                as="p"
                className="text-lead text-paper-dim"
              >
                “In critical care, nutrition is not a side note to treatment. It is treatment. We formulate accordingly.”
              </T>
            </blockquote>
          </Reveal>
          <div className="mt-14 grid gap-px bg-line-dark sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.index} delay={i * 90} className="bg-ink-deep">
                <div className="h-full py-6 pr-6 sm:p-6">
                  <p aria-hidden="true" className="text-data text-green-soft">
                    {p.index}
                  </p>
                  <h3 className="text-title mt-3 text-background">
                    <T k={`home.research.principles.${i}.title`}>{p.title}</T>
                  </h3>
                  <T
                    k={`home.research.principles.${i}.body`}
                    as="p"
                    className="mt-3 text-sm leading-relaxed text-paper-dim"
                  >
                    {p.body}
                  </T>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={270}>
            <Link
              href="/research"
              className="group text-eyebrow mt-12 inline-flex items-center gap-2 text-green-soft"
            >
              Our research approach
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>
        <div className="hidden justify-center lg:col-span-5 lg:flex">
          <Draw className="h-full max-h-[40rem]">
            <Helix className="h-full text-green-soft" />
          </Draw>
        </div>
      </div>
    </Section>
  );
}
