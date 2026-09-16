import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { protocolSteps } from "@/lib/solutions";
import { productFamilies } from "@/lib/products";
import { Molecule } from "@/components/gfx/molecule";
import { T } from "@/components/cms/t";
import { collection } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Critical Care Nutrition",
  description:
    "Nutritional therapy engineered for intensive care: assessment-led, disease-specific formulations supporting recovery when metabolic demands are most extreme.",
};

export default async function CriticalCareNutritionPage() {
  const all = await collection("products", productFamilies);
  // The ICU-facing subset — the enteral range plus the antioxidant adjunct.
  const ccIds = ["progain-hp", "progain-peptide", "progain-dm", "progain-lp", "cardivit", "gravity-set-bag"];
  const families = ccIds
    .map((id) => all.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <PageHero
        ck="ccn.hero"
        eyebrow="Solutions · 01"
        title="Critical care nutrition."
        lead="In the ICU, feeding strategy is part of the treatment plan. We formulate for altered metabolism — hypercatabolism, organ dysfunction, fluid restriction — so nutrition supports the outcome instead of complicating it."
        meta={[
          { label: "Setting", value: "ICU · HDU · Recovery wards" },
          { label: "Approach", value: "Disease-specific" },
          { label: "Delivery", value: "Oral & enteral" },
          { label: "Users", value: "Clinical teams" },
        ]}
      />

      {/* Protocol */}
      <Section>
        <SectionHeading
        ck="ccn.s1"
          index="01"
          eyebrow="The protocol"
          title="Five steps, closed loop."
          lead="Our products and devices map onto the standard clinical nutrition workflow — so adopting them changes nothing about how your team works, only how well it is supplied."
        />
        <ol className="mt-16 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 md:mt-24 lg:grid-cols-5">
          {protocolSteps.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 90} className="flex">
              <div className="w-full bg-background p-6 md:p-8">
                <p aria-hidden="true" className="text-data text-primary">
                  {step.step}
                </p>
                <h3 className="text-title mt-6">
                  <T k={`ccn.protocol.${i}.title`}>{step.title}</T>
                </h3>
                <T
                  k={`ccn.protocol.${i}.body`}
                  as="p"
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {step.body}
                </T>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Formulations used */}
      <Section>
        <SectionHeading
        ck="ccn.s2"
          index="02"
          eyebrow="Formulations"
          title="What the protocol draws on."
        />
        <div className="mt-16 border-t border-border">
          {families.map((family) => {
            const i = all.findIndex((f) => f.id === family.id);
            return (
            <Reveal key={family.id}>
              <Link
                href={`/products#${family.id}`}
                className="group flex items-center gap-6 border-b border-border py-6 transition-colors hover:bg-card md:gap-10 md:py-8"
              >
                {family.image ? (
                  <Image
                    src={family.image}
                    alt=""
                    width={64}
                    height={80}
                    sizes="64px"
                    className="h-16 w-auto shrink-0 object-contain transition-transform duration-500 group-hover:-translate-y-1"
                  />
                ) : (
                  <Molecule variant={family.molecule} className="h-12 w-12 shrink-0 text-primary" />
                )}
                <span className="text-title flex-1" data-cms={`col:products.${i}.name`}>
                  {family.name}
                </span>
                <span
                  className="text-data hidden text-muted-foreground md:block"
                  data-cms={`col:products.${i}.category`}
                >
                  {family.category}
                </span>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                />
              </Link>
            </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand
        ck="ccn.cta"
        eyebrow="For clinical teams"
        title="Bring the protocol to your unit."
        body="We work directly with hospitals and clinicians on formularies, protocols, and supply."
      />
    </>
  );
}
