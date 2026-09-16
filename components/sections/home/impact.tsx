"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { usePrefersReducedMotion } from "@/components/motion/use-in-view";
import { Eyebrow } from "@/components/site/eyebrow";

const manifesto =
  "Critical illness rewrites what the body needs. We exist for that moment — formulating evidence-based nutrition that supports recovery, rehabilitation, and quality of life when outcomes matter most.";

/**
 * Chapter 02 — the manifesto scroll scene. Words resolve from blur as
 * the reader scrolls (evolved from the ecosystem's philosophy section).
 */
export function Impact() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const words = manifesto.split(" ");
  const p = reduced ? 1 : progress;

  return (
    <section aria-labelledby="impact-heading">
      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="shell">
            <div className="flex items-baseline gap-4">
              <span aria-hidden="true" className="text-data text-muted-foreground">
                02
              </span>
              <Eyebrow>Scientific impact</Eyebrow>
            </div>
            <h2 id="impact-heading" className="sr-only">
              Scientific impact
            </h2>
            <p className="mt-10 max-w-4xl text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
              {words.map((word, i) => {
                const wordProgress = Math.max(0, Math.min(1, p * (words.length + 6) - i));
                return (
                  <span
                    key={i}
                    className="inline"
                    style={{
                      opacity: 0.12 + wordProgress * 0.88,
                      filter: wordProgress < 1 ? `blur(${(1 - wordProgress) * 10}px)` : undefined,
                    }}
                  >
                    {word}
                    {i < words.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </p>
            <p
              className="text-data mt-12 text-muted-foreground"
              style={{ opacity: Math.max(0, (p - 0.75) * 4) }}
            >
              — The reason Refill Enterprises exists
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
