import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Draw } from "@/components/motion/reveal";
import { Blueprint } from "@/components/gfx/blueprint";
import { T } from "@/components/cms/t";

const commitments = [
  { index: "A", title: "Quality assurance", body: "Domestic production under international quality standards." },
  { index: "B", title: "Self-reliance", body: "Reducing import dependence for critical nutrition in Nepal." },
  { index: "C", title: "Employment", body: "Skilled jobs in production, quality control, and R&D." },
  { index: "D", title: "Industry growth", body: "A foundation for Nepal's nutraceutical and healthcare sector." },
];

/** Chapter 09 — the manufacturing vision as a blueprint. */
export async function Manufacturing() {
  return (
    <Section id="manufacturing">
      <SectionHeading
        index="09"
        ck="home.manufacturing"
        eyebrow="Future manufacturing"
        title="Made in Nepal, to a global standard."
        lead="Our long-term commitment: a state-of-the-art manufacturing facility on Nepali soil — drawn here first, then built."
      />
      <div className="mt-16 grid items-start gap-16 md:mt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Draw>
            <Blueprint className="text-primary" />
          </Draw>
          <p className="text-data mt-6 text-muted-foreground">
            Fig. 02 — Concept plan, future Refill production facility. Status: planned.
          </p>
        </div>
        <div className="lg:col-span-5">
          <ul>
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.index} delay={i * 90}>
                <div className="grid grid-cols-[2rem_1fr] gap-4 border-t border-border py-6">
                  <span aria-hidden="true" className="text-data text-primary">
                    {c.index}
                  </span>
                  <div>
                    <h3 className="text-title">
                      <T k={`home.manufacturing.commitments.${i}.title`}>{c.title}</T>
                    </h3>
                    <T
                      k={`home.manufacturing.commitments.${i}.body`}
                      as="p"
                      className="mt-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      {c.body}
                    </T>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={360}>
            <Link
              href="/manufacturing"
              className="group text-eyebrow mt-10 inline-flex items-center gap-2 text-primary"
            >
              The manufacturing vision
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
