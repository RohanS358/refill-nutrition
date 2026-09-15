import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, Draw } from "@/components/motion/reveal";
import { Pathway } from "@/components/gfx/pathway";
import { collection } from "@/lib/cms/content";
import { solutions as defaultSolutions, protocolSteps } from "@/lib/solutions";

/** Chapter 05 — sticky rail + scrolling solution panels. */
export async function Solutions() {
  const solutions = await collection("solutions", defaultSolutions);

  return (
    <Section id="solutions">
      <SectionHeading
        index="05"
        ck="home.solutions"
        eyebrow="Healthcare solutions"
        title="From formulation to bedside."
        lead="Nutrition only works when the whole pathway works — assessment, formulation, delivery, monitoring. We build for the pathway."
      />
      <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
        {/* Sticky rail */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Draw>
              <Pathway
                stages={protocolSteps.map((s) => s.title)}
                className="text-primary"
              />
            </Draw>
            <p className="text-data mt-6 text-muted-foreground">
              Fig. 01 — The clinical nutrition pathway, screen to recovery.
            </p>
          </div>
        </div>

        {/* Panels */}
        <div className="lg:col-span-7">
          {solutions.map((solution, i) => (
            <Reveal key={solution.id} delay={i * 90}>
              <article className="border-t border-border py-12 first:border-t-0 first:pt-0 md:py-16">
                <div className="flex items-baseline gap-6">
                  <span aria-hidden="true" className="text-data text-primary">
                    {solution.index}
                  </span>
                  <div className="flex-1">
                    <p
                      className="text-eyebrow text-muted-foreground"
                      data-cms={`col:solutions.${i}.eyebrow`}
                    >
                      {solution.eyebrow}
                    </p>
                    <h3 className="text-title mt-3">
                      <Link
                        href={solution.href}
                        className="group inline-flex items-center gap-3 hover:text-primary"
                      >
                        <span data-cms={`col:solutions.${i}.title`}>{solution.title}</span>
                        <ArrowUpRight
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        />
                      </Link>
                    </h3>
                    <p
                      className="mt-4 max-w-xl leading-relaxed text-muted-foreground"
                      data-cms={`col:solutions.${i}.summary`}
                    >
                      {solution.summary}
                    </p>
                    <dl className="mt-8 space-y-4">
                      {solution.points.map((point, pi) => (
                        <div
                          key={point.title}
                          className="grid gap-1 border-l border-border pl-5 md:grid-cols-[10rem_1fr] md:gap-6"
                        >
                          <dt
                            className="text-data font-semibold"
                            data-cms={`col:solutions.${i}.points.${pi}.title`}
                          >
                            {point.title}
                          </dt>
                          <dd
                            className="text-sm leading-relaxed text-muted-foreground"
                            data-cms={`col:solutions.${i}.points.${pi}.body`}
                          >
                            {point.body}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
