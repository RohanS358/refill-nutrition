import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand } from "@/components/site/cta-band";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { StatBlock } from "@/components/site/stat-block";
import { Reveal } from "@/components/motion/reveal";
import { HexRing } from "@/components/gfx/hex-ring";
import { T } from "@/components/cms/t";
import { collection } from "@/lib/cms/content";
import { site } from "@/lib/site";
import { statistics } from "@/lib/timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Refill Enterprises Pvt. Ltd. — a Nepali nutraceutical company (est. 2020) dedicated to critical care nutrition, disease-specific metabolic formulations, and better patient outcomes.",
};

const missionPoints = [
  "Provide evidence-based nutritional and healthcare solutions.",
  "Improve patient outcomes and quality of life.",
  "Support healthcare professionals with innovative products.",
  "Introduce advanced medical devices and applications.",
  "Build local manufacturing capability in Nepal.",
  "Expand into sports nutrition.",
];

const values = [
  {
    title: "Precision",
    body: "Formulation is engineering. Doses, ratios, and claims are exact or they are not made.",
  },
  {
    title: "Evidence",
    body: "Clinical literature decides the portfolio. Marketing follows science, never the reverse.",
  },
  {
    title: "Care",
    body: "Behind every protocol is a patient. We formulate for recovery, rehabilitation, and dignity.",
  },
  {
    title: "Ambition",
    body: "From distribution to domestic manufacturing — we build capability, not just catalogue.",
  },
];

export default async function AboutPage() {
  const stats = await collection("stats", statistics);

  return (
    <>
      <PageHero
        ck="about.hero"
        eyebrow="About Refill Enterprises"
        title="A young company with a clinical spine."
        lead="Founded in 2020 and headquartered in Nepal, Refill Enterprises exists to bring critical-care-grade nutritional science to the healthcare professionals and patients who need it."
        meta={[
          { label: "Established", value: String(site.founded) },
          { label: "Headquarters", value: `${site.city}, ${site.country}` },
          { label: "Field", value: "Nutraceuticals · Medical devices" },
          { label: "Focus", value: "Critical care nutrition" },
        ]}
      />

      {/* Story */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              index="01"
              ck="about.story"
              eyebrow="Who we are"
              title="Dynamic, emerging, and deliberately specialized."
            />
            <Reveal delay={180}>
              <div className="mt-12 max-w-2xl space-y-6 leading-relaxed text-muted-foreground">
                <T k="about.story.p1" as="p">
                  Refill Enterprises Pvt. Ltd. is a nutraceutical company dedicated to serving the growing needs of healthcare professionals and patients with high-quality, science-based products in clinical and critical care nutrition — the progain enteral range for intensive care, renal, diabetic and paediatric states, re-pro daily protein, and calcium, antioxidant and curcumin supplementation designed to support recovery, rehabilitation, and overall patient well-being.
                </T>
                <T k="about.story.p2" as="p">
                  Beyond nutraceuticals, we introduce BAITONG ENFit-standard enteral delivery systems used exclusively in critical care nutrition — bridging the gap between modern healthcare technology and patient-centered nutritional care through strategic partnerships.
                </T>
                <T k="about.story.p3" as="p">
                  Next: a sports nutrition portfolio built on the same clinical foundation, and — as our long-term commitment — a state-of-the-art manufacturing facility in Nepal that strengthens domestic healthcare capability, quality assurance, self-reliance, and employment.
                </T>
              </div>
            </Reveal>
          </div>
          <div className="hidden items-start justify-center pt-24 lg:col-span-5 lg:flex">
            <HexRing className="max-w-sm text-primary" />
          </div>
        </div>
      </Section>

      {/* Vision / Mission spread */}
      <Section>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
          <div className="bg-background p-8 md:p-14">
            <Reveal>
              <p className="text-eyebrow text-primary">Vision</p>
              <T
                k="about.vision"
                as="p"
                className="text-display mt-8 text-balance text-[clamp(1.75rem,3vw,2.75rem)]"
              >
                To become a leading nutraceutical and healthcare solutions company — recognized for innovation, quality, and commitment to improving lives through advanced nutritional science.
              </T>
            </Reveal>
          </div>
          <div className="bg-background p-8 md:p-14">
            <Reveal delay={90}>
              <p className="text-eyebrow text-primary">Mission</p>
              <ul className="mt-8">
                {missionPoints.map((point, i) => (
                  <li
                    key={point}
                    className="flex items-baseline gap-5 border-t border-border py-4 first:border-t-0"
                  >
                    <span aria-hidden="true" className="text-data text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <T k={`about.mission.${i}`} className="leading-relaxed">
                      {point}
                    </T>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading
          index="02"
          ck="about.values"
          eyebrow="Values"
          title="What we refuse to compromise."
        />
        <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 90} className="bg-background">
              <div className="h-full p-8 md:p-10">
                <p aria-hidden="true" className="text-data text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-title mt-6">
                  <T k={`about.values.${i}.title`}>{value.title}</T>
                </h3>
                <T
                  k={`about.values.${i}.body`}
                  as="p"
                  className="mt-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {value.body}
                </T>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Numbers */}
      <Section density="dense">
        <Reveal>
          <StatBlock
            stats={stats.map((s, i) => ({ ...s, labelKey: `col:stats.${i}.label` }))}
            className="border border-border"
          />
        </Reveal>
      </Section>

      <CtaBand
        ck="about.cta"
        eyebrow="Meet us"
        title="See what precision looks like."
        body="Clinicians and partners — we're glad to walk you through the portfolio and the plan."
      />
    </>
  );
}
