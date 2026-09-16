import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { StatBlock } from "@/components/site/stat-block";
import { Reveal } from "@/components/motion/reveal";
import { collection } from "@/lib/cms/content";
import { statistics } from "@/lib/timeline";

/** Chapter 11 — honest numbers on hairlines. */
export async function Stats() {
  const stats = await collection("stats", statistics);

  return (
    <Section id="stats" density="dense">
      <SectionHeading
        index="11"
        ck="home.stats"
        eyebrow="Company statistics"
        title="Where we stand."
      />
      <Reveal delay={180} className="mt-16">
        <StatBlock
          stats={stats.map((s, i) => ({
            value: s.value,
            label: s.label,
            labelKey: `col:stats.${i}.label`,
            suffix: "suffix" in s ? s.suffix : undefined,
            format: "format" in s ? s.format : "plain",
          }))}
          className="border border-border"
        />
      </Reveal>
    </Section>
  );
}
