"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { usePrefersReducedMotion } from "@/components/motion/use-in-view";
import { Ticker } from "@/components/site/ticker";
import { site } from "@/lib/site";

const tickerItems = [
  "Critical Care Nutrition",
  "100% Whey · 42% Protein",
  "Renal · Low Protein",
  "Diabetic · Low GI",
  "Hydrolysed Peptide",
  "Paediatric Nutrition",
  "ENFit Enteral Delivery",
  `Est. ${site.founded} — ${site.city}`,
  "Evidence-Based",
] as const;

import { heroDefaults, type HeroCopy } from "./hero-copy";

/**
 * Chapter 01 — scroll scene. The photograph drifts under a Deep Ink
 * scrim and the statement holds the screen, then hands over to the ticker.
 */
export function Hero({ copy = heroDefaults }: { copy?: HeroCopy }) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  const p = reduced ? 0 : progress;
  const textOpacity = Math.max(0, 1 - p * 1.6);
  const textShift = p * -40;
  const fieldShift = p * -80;
  const fieldScale = 1 + p * 0.06;

  return (
    <section aria-label="Introduction">
      <div ref={ref} className="relative h-[175vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-ink-deep text-background">
          {/* Background photograph */}
          <div
            aria-hidden="true"
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translateY(${fieldShift}px) scale(${fieldScale})` }}
          >
            <Image
              src="/images/background.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[78%_30%] grayscale-[35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/75 to-ink-deep/45" />
          </div>

          <div
            className="relative mx-auto flex w-full max-w-[88rem] flex-1 flex-col justify-center px-5 pt-16 will-change-transform md:px-12 md:pt-20 lg:px-20"
            style={{ opacity: textOpacity, transform: `translateY(${textShift}px)` }}
          >
            <p className="text-eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-paper-dim">
              <span className="text-green-soft">{site.legalName}</span>
              <span aria-hidden="true">·</span>
              <span>Est. {site.founded}</span>
              <span aria-hidden="true">·</span>
              <span>{site.country}</span>
            </p>

            <h1 className="text-display-xl mt-8 max-w-6xl">
              <span className="block">
                <span
                  data-cms="home.hero.line1"
                  className="flex flex-wrap gap-x-[0.22em]"
                >
                  {copy.line1.split(" ").map((word, i) => (
                    <span
                      key={word + i}
                      className="animate-rise-in inline-block"
                      style={{ animationDelay: `${120 + i * 90}ms` }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span className="flex flex-wrap items-baseline">
                <span
                  data-cms="home.hero.line2"
                  className="inline-flex flex-wrap gap-x-[0.22em]"
                >
                  {copy.line2.split(" ").map((word, i) => (
                    <span
                      key={word + i}
                      className="animate-rise-in inline-block"
                      style={{ animationDelay: `${300 + i * 90}ms` }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
                <span
                  aria-hidden="true"
                  className="animate-rise-in text-green-soft"
                  style={{ animationDelay: "390ms" }}
                >
                  .
                </span>
              </span>
            </h1>

            <p className="text-lead mt-8 max-w-xl text-paper-dim" data-cms="home.hero.lead">
              {copy.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-green-soft"
              >
                <span data-cms="home.hero.cta1">{copy.cta1}</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/solutions/critical-care-nutrition"
                className="inline-flex items-center gap-3 border border-background px-7 py-4 text-sm font-semibold transition-colors hover:bg-background hover:text-foreground"
              >
                <span data-cms="home.hero.cta2">{copy.cta2}</span>
              </Link>
            </div>
          </div>

          {/* Data strip */}
          <div
            className="relative mx-auto w-full max-w-[88rem] px-5 pb-8 md:px-12 lg:px-20"
            style={{ opacity: textOpacity }}
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line-dark pt-6 md:grid-cols-4">
              {copy.strip.map((item, i) => (
                <div key={item.label}>
                  <p className="text-eyebrow text-paper-dim" data-cms={`home.hero.strip.${i}.label`}>
                    {item.label}
                  </p>
                  <p className="text-data mt-2 text-background" data-cms={`home.hero.strip.${i}.value`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-eyebrow mt-6 flex items-center gap-2 text-paper-dim">
              <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
              Scroll
            </p>
          </div>
        </div>
      </div>

      <Ticker items={tickerItems} />
    </section>
  );
}
