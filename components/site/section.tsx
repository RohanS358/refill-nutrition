import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** paper (default) | dark (Deep Ink chapter) */
  tone?: "paper" | "dark";
  /** default section rhythm | dense (stats, tickers) */
  density?: "default" | "dense";
  /** adds a top hairline across the full bleed */
  ruled?: boolean;
  className?: string;
};

/** Section rhythm primitive — docs/spacing-system.md. */
export function Section({
  children,
  id,
  tone = "paper",
  density = "default",
  ruled = true,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        tone === "dark" ? "bg-ink-deep text-background" : "bg-background text-foreground",
        ruled && (tone === "dark" ? "border-t border-line-dark" : "border-t border-border"),
        className,
      )}
    >
      <div
        className={cn(
          "shell",
          density === "dense" ? "py-16 md:py-24" : "py-24 md:py-32 lg:py-40",
        )}
      >
        {children}
      </div>
    </section>
  );
}
