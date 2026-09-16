import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { IndexRow } from "@/components/site/index-row";
import { Reveal } from "@/components/motion/reveal";
import { T } from "@/components/cms/t";
import { text } from "@/lib/cms/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Careers",
  description:
    "Join Refill Enterprises — help build Nepal's clinical nutrition and future manufacturing capability.",
};

const principles = [
  {
    title: "Science over hierarchy",
    body: "The best evidence wins the argument, whoever brings it.",
  },
  {
    title: "Build capability",
    body: "Every role feeds the long game: domestic manufacturing and a stronger healthcare industry.",
  },
  {
    title: "Clinical empathy",
    body: "We work close to hospitals — precision here translates to patient outcomes there.",
  },
];

const disciplines = [
  {
    index: "01",
    title: "Clinical & scientific affairs",
    body: "Formulation research, literature review, clinician education, and evidence documentation.",
  },
  {
    index: "02",
    title: "Sales & hospital partnerships",
    body: "Working with clinical teams, pharmacies, and procurement across Nepal.",
  },
  {
    index: "03",
    title: "Regulatory & quality",
    body: "Registrations, quality systems, and the groundwork for future GMP manufacturing.",
  },
  {
    index: "04",
    title: "Operations & supply chain",
    body: "Cold-chain-aware logistics and reliable supply into critical-care settings.",
  },
];

export default async function CareersPage() {
  const email = await text("site.email", site.email);
  const rows = await Promise.all(
    disciplines.map(async (d, i) => ({
      ...d,
      title: await text(`careers.disciplines.${i}.title`, d.title),
    })),
  );

  return (
    <>
      <PageHero
        ck="careers.hero"
        eyebrow="Careers"
        title="Do the most careful work of your career."
        lead="We are a small, serious team building clinical nutrition — and eventually manufacturing — in Nepal. If precision is your temperament, you will feel at home."
        meta={[
          { label: "Base", value: `${site.city}, ${site.country}` },
          { label: "Team", value: "Small & senior-minded" },
          { label: "Stage", value: "Growing" },
          { label: "Horizon", value: "Manufacturing-bound" },
        ]}
      />

      <Section>
        <SectionHeading
        ck="careers.s1"
          index="01"
          eyebrow="How we work"
          title="Three working principles."
        />
        <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 90} className="flex">
              <div className="w-full bg-background p-8 md:p-10">
                <p aria-hidden="true" className="text-data text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-title mt-6">
                  <T k={`careers.principles.${i}.title`}>{principle.title}</T>
                </h3>
                <T
                  k={`careers.principles.${i}.body`}
                  as="p"
                  className="mt-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {principle.body}
                </T>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
        ck="careers.s2"
          index="02"
          eyebrow="Where you could fit"
          title="Disciplines we hire for."
          lead="Openings are published here as they arise. Strong speculative applications in these areas are always read."
        />
        <Reveal delay={180} className="mt-16">
          <div>
            {rows.map((discipline, i) => (
              <IndexRow
                key={discipline.index}
                index={discipline.index}
                title={discipline.title}
                titleKey={`careers.disciplines.${i}.title`}
              >
                <T k={`careers.disciplines.${i}.body`} as="p">
                  {discipline.body}
                </T>
                <p className="text-data mt-4">
                  <a
                    href={`mailto:${email}?subject=Application%20—%20${encodeURIComponent(discipline.title)}`}
                    className="text-primary underline underline-offset-4"
                  >
                    Apply speculatively →
                  </a>
                </p>
              </IndexRow>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBand
        ck="careers.cta"
        eyebrow="Introduce yourself"
        title="No perfect role listed? Write anyway."
        body="Tell us what you would make more precise. The best colleagues usually arrive before the job description does."
      />
    </>
  );
}
