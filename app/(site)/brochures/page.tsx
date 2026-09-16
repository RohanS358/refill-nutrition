import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { BrochureViewer } from "@/components/site/brochure-viewer";
import { brochures } from "@/lib/brochures";

export const metadata: Metadata = {
  title: "Brochures",
  description:
    "The printed Refill product literature — product spreads and clinical evidence decks for the progain range, supplementation line and enteral devices.",
};

export default function BrochuresPage() {
  const spreads = brochures.reduce((n, b) => n + b.pages.length, 0);

  return (
    <>
      <PageHero
        ck="brochures.hero"
        eyebrow="Literature"
        title="The printed record."
        lead="Every product spread and clinical evidence deck we put in front of clinicians, as published. Open any card to read the full artwork."
        meta={[
          { label: "Documents", value: String(brochures.length) },
          { label: "Spreads", value: String(spreads) },
          { label: "Audience", value: "Registered practitioners" },
          { label: "Format", value: "A3 landscape" },
        ]}
      />

      <Section>
        {/* Not wrapped in Reveal: its transform would make the lightbox's
            position:fixed resolve against the wrapper, not the viewport. */}
        <BrochureViewer brochures={brochures} />
        <Reveal delay={90}>
          <p className="text-data mt-12 max-w-2xl text-muted-foreground">
            For the use of a Registered Medical Practitioner, Hospital or Laboratory only.
            Nutritional supplements are not for medicinal use.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        ck="brochures.cta"
        eyebrow="Detailing"
        title="Need printed copies?"
        body="We supply full-resolution literature and detailing material to hospitals, distributors and field teams."
      />
    </>
  );
}
