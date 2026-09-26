import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { collection } from "@/lib/cms/content";
import { milestones as defaultMilestones } from "@/lib/timeline";
import { cn } from "@/lib/utils";

/** Chapter 06 — the trajectory, ruled like a lab log. */
export async function Timeline() {
  const milestones = await collection("timeline", defaultMilestones);

  return (
    <Section id="timeline">
      <SectionHeading
        index="06"
        ck="home.timeline"
        eyebrow="Innovation timeline"
        title="A short history, a long plan."
        lead="Founded in 2020 with a clinical portfolio first — every step since has been toward the same destination: manufacturing in Nepal."
      />
      <ol className="mt-16 md:mt-24">
        {milestones.map((m, i) => (
          <Reveal as="li" key={m.year + m.title} delay={Math.min(i, 4) * 90}>
            <div
              className={cn(
                "group grid gap-4 border-t border-border py-8 md:grid-cols-12 md:gap-8 md:py-10",
                i === milestones.length - 1 && "border-b",
              )}
            >
              <div className="flex items-center gap-4 md:col-span-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 border border-primary transition-colors",
                    m.state === "done" && "bg-primary",
                    m.state === "now" && "bg-background ring-2 ring-primary ring-offset-2 ring-offset-background",
                    m.state === "future" && "border-dashed",
                  )}
                />
                <span
                  className="text-display text-[clamp(1.5rem,2.5vw,2.25rem)] tabular-nums"
                  data-cms={`col:timeline.${i}.year`}
                >
                  {m.year}
                </span>
              </div>
              <h3 className="text-title md:col-span-4" data-cms={`col:timeline.${i}.title`}>
                {m.title}
              </h3>
              <p
                className="leading-relaxed text-muted-foreground md:col-span-5"
                data-cms={`col:timeline.${i}.body`}
              >
                {m.body}
              </p>
              <p className="text-eyebrow text-muted-foreground md:col-span-1 md:text-right">
                {m.state === "done" ? "Done" : m.state === "now" ? "Active" : "Planned"}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
