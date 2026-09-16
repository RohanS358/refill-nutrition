import Image from "next/image";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { collection } from "@/lib/cms/content";
import { team as teamDefaults } from "@/lib/team";

/**
 * Chapter — the people behind the catalogue. Same hairline grid the
 * product and evidence chapters use; portraits are optional, so the
 * section reads correctly before any are uploaded.
 */
export async function Team() {
  const members = await collection("team", teamDefaults);

  return (
    <Section id="team">
      <SectionHeading
        index="10"
        ck="home.team"
        eyebrow="Our team"
        title="The people behind the protocol."
        lead="Clinical nutrition is a trust business. These are the people who own the evidence, the compliance, and the supply that hospitals depend on."
      />

      <ul className="mt-16 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
        {members.map((member, i) => (
          <Reveal as="li" key={member.id} delay={Math.min(i, 5) * 90} className="flex">
            <article className="flex w-full flex-col bg-card p-8 md:p-10">
              <div className="flex items-center gap-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-secondary">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt=""
                      width={128}
                      height={128}
                      sizes="64px"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span aria-hidden="true" className="text-data text-muted-foreground">
                      {member.initials ??
                        member.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                    </span>
                  )}
                </span>
                <span aria-hidden="true" className="text-data text-muted-foreground">
                  {member.index}
                </span>
              </div>

              <h3 className="text-title mt-8" data-cms={`col:team.${i}.name`}>
                {member.name}
              </h3>
              <p className="text-eyebrow mt-3 text-primary" data-cms={`col:team.${i}.role`}>
                {member.role}
              </p>
              <p
                className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground"
                data-cms={`col:team.${i}.focus`}
              >
                {member.focus}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
