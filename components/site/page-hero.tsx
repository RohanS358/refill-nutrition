import { cn } from "@/lib/utils";
import { text } from "@/lib/cms/content";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "paper" | "dark";
  /** Optional data strip rendered under the hairline, e.g. facts/meta. */
  meta?: { label: string; value: string }[];
  children?: React.ReactNode;
  className?: string;
  /** CMS key prefix — makes this hero editable in the admin. */
  ck?: string;
};

/** Sub-page opener: eyebrow · display-xl title · lead · hairline · meta row. */
export async function PageHero({
  eyebrow,
  title,
  lead,
  tone = "paper",
  meta,
  children,
  className,
  ck,
}: PageHeroProps) {
  const dark = tone === "dark";

  const [eyebrowText, titleText, leadText] = ck
    ? await Promise.all([
        text(`${ck}.eyebrow`, eyebrow),
        text(`${ck}.title`, title),
        lead ? text(`${ck}.lead`, lead) : Promise.resolve(lead),
      ])
    : [eyebrow, title, lead];

  const metaItems =
    ck && meta?.length
      ? await Promise.all(
          meta.map(async (m, i) => ({
            label: await text(`${ck}.meta.${i}.label`, m.label),
            value: await text(`${ck}.meta.${i}.value`, m.value),
          })),
        )
      : meta;

  return (
    <header
      className={cn(
        dark ? "bg-ink-deep text-background" : "bg-background text-foreground",
        className,
      )}
    >
      <div className="shell pb-16 pt-36 md:pb-24 md:pt-44">
        <Reveal>
          <Eyebrow className={dark ? "text-green-soft" : undefined}>
            <span data-cms={ck ? `${ck}.eyebrow` : undefined}>{eyebrowText}</span>
          </Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <h1
            className="text-display-xl mt-6 max-w-5xl text-balance md:mt-8"
            data-cms={ck ? `${ck}.title` : undefined}
          >
            {titleText}
          </h1>
        </Reveal>
        {leadText ? (
          <Reveal delay={180}>
            <p
              className={cn(
                "text-lead mt-8 max-w-2xl",
                dark ? "text-paper-dim" : "text-muted-foreground",
              )}
              data-cms={ck ? `${ck}.lead` : undefined}
            >
              {leadText}
            </p>
          </Reveal>
        ) : null}
        {children}
        {metaItems?.length ? (
          <Reveal delay={270}>
            <dl
              className={cn(
                "mt-16 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-6 md:grid-cols-4",
                dark ? "border-line-dark" : "border-border",
              )}
            >
              {metaItems.map((m, i) => (
                <div key={m.label}>
                  <dt
                    className={cn(
                      "text-eyebrow",
                      dark ? "text-paper-dim" : "text-muted-foreground",
                    )}
                    data-cms={ck ? `${ck}.meta.${i}.label` : undefined}
                  >
                    {m.label}
                  </dt>
                  <dd
                    className="text-data mt-2"
                    data-cms={ck ? `${ck}.meta.${i}.value` : undefined}
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
