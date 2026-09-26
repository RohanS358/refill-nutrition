import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { IndexRow } from "@/components/site/index-row";
import { Reveal } from "@/components/motion/reveal";
import { collection } from "@/lib/cms/content";
import { expertiseDomains } from "@/lib/products";

/** Chapter 03 — six domains as an editorial index. */
/** `index` continues the host page's chapter numbering; omit for none. */
export async function Expertise({ index }: { index?: string } = {}) {
  const domains = await collection("expertise", expertiseDomains);

  return (
    <Section id="expertise">
      <SectionHeading
        index={index}
        ck="home.expertise"
        eyebrow="Core expertise"
        title="Six domains. One discipline."
        lead="Everything we make sits on the same foundation: clinical evidence, metabolic precision, and respect for the people who prescribe and depend on it."
      />
      <Reveal delay={180} className="mt-16 md:mt-24">
        <div>
          {domains.map((domain, i) => (
            <IndexRow
              key={domain.index}
              index={domain.index}
              title={domain.title}
              titleKey={`col:expertise.${i}.title`}
              defaultOpen={domain.index === "01"}
            >
              <p data-cms={`col:expertise.${i}.body`}>{domain.body}</p>
            </IndexRow>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
