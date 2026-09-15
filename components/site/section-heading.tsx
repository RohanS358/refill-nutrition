import { cn } from "@/lib/utils";
import { text } from "@/lib/cms/content";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  /** Chapter index, e.g. "03" — rendered as decoration. */
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "paper" | "dark";
  className?: string;
  /** CMS key prefix — makes eyebrow/title/lead editable in the admin. */
  ck?: string;
};

/**
 * The section-opening pattern every chapter uses:
 * index number · eyebrow · display headline · optional lead.
 */
export async function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  tone = "paper",
  className,
  ck,
}: SectionHeadingProps) {
  const [eyebrowText, titleText, leadText] = ck
    ? await Promise.all([
        text(`${ck}.eyebrow`, eyebrow),
        text(`${ck}.title`, title),
        lead ? text(`${ck}.lead`, lead) : Promise.resolve(lead),
      ])
    : [eyebrow, title, lead];

  return (
    <div
      className={cn(
        "grid gap-6 lg:grid-cols-[minmax(11rem,2fr)_10fr]",
        className,
      )}
    >
      <div>
        <Reveal>
          <div className="flex items-baseline gap-4">
            {index ? (
              <span
                aria-hidden="true"
                className={cn(
                  "text-data",
                  tone === "dark" ? "text-paper-dim" : "text-muted-foreground",
                )}
              >
                {index}
              </span>
            ) : null}
            <Eyebrow className={tone === "dark" ? "text-green-soft" : undefined}>
              <span data-cms={ck ? `${ck}.eyebrow` : undefined}>{eyebrowText}</span>
            </Eyebrow>
          </div>
        </Reveal>
      </div>
      <div>
        <Reveal delay={90}>
          <h2
            className="text-display max-w-4xl text-balance"
            data-cms={ck ? `${ck}.title` : undefined}
          >
            {titleText}
          </h2>
        </Reveal>
        {leadText ? (
          <Reveal delay={180}>
            <p
              className={cn(
                "text-lead mt-6 max-w-2xl md:mt-8",
                tone === "dark" ? "text-paper-dim" : "text-muted-foreground",
              )}
              data-cms={ck ? `${ck}.lead` : undefined}
            >
              {leadText}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
