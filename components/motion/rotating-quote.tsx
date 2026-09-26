"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, Stethoscope } from "lucide-react";

export type RotatingQuoteItem = {
  quote: string;
  name: string;
  meta: string;
  kind: "clinician" | "family";
  /** CMS keys so the visible quote stays editable in the visual editor. */
  quoteKey: string;
  nameKey: string;
};

/**
 * One quote at a time, cross-fading on a timer. No card, no fill — it sits
 * on the page like a caption. Pauses on hover/focus; holds still under
 * reduced motion.
 */
export function RotatingQuote({ items, interval = 5500 }: { items: RotatingQuoteItem[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => window.clearInterval(id);
  }, [paused, items.length, interval]);

  const t = items[i];
  if (!t) return null;
  const Icon = t.kind === "family" ? HeartHandshake : Stethoscope;

  return (
    <figure
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="w-full max-w-lg"
      aria-live="polite"
    >
      {/* key → remount → replay the fade for each new quote */}
      <div key={i} className="animate-[quote-in_600ms_cubic-bezier(0.22,1,0.36,1)_both]">
        <blockquote className="line-clamp-2 text-[0.95rem] leading-relaxed text-foreground/80" data-cms={t.quoteKey}>
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          <Icon size={14} className="text-primary" aria-hidden="true" />
          <span className="shrink-0 font-semibold text-foreground" data-cms={t.nameKey}>
            {t.name}
          </span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{t.meta}</span>
        </figcaption>
      </div>
      {items.length > 1 ? (
        <div className="mt-3 flex gap-1.5">
          {items.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show quote ${n + 1} of ${items.length}`}
              aria-current={n === i || undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? "w-5 bg-primary" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"}`}
            />
          ))}
        </div>
      ) : null}
    </figure>
  );
}
