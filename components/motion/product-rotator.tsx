"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export interface RotatorItem {
  image: string;
  title: string;
  href: string;
}

// Each pack gets its own soft colour glow.
const TONES = ["bg-mint", "bg-sky", "bg-sun"];

/** One pack at a time on a tinted stage, gently floating; thumbnails jump to a pack. */
export function ProductRotator({ items, interval = 4000, className = "" }: { items: RotatorItem[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [paused, items.length, interval]);

  const cur = items[i];

  return (
    <div
      className={`flex flex-col items-center gap-5 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-0 w-full flex-1">
        {/* Soft colour glow behind the pack */}
        {items.map((p, n) => (
          <div
            key={p.href}
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 aspect-square h-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-700 ${TONES[n % TONES.length]} ${n === i ? "!opacity-35" : ""}`}
          />
        ))}
        {items.map((p, n) => (
          <Link
            key={p.href}
            href={p.href}
            aria-label={p.title}
            aria-hidden={n !== i}
            tabIndex={n === i ? 0 : -1}
            className={`absolute inset-0 flex items-center justify-center px-[10%] py-[4%] transition-all duration-700 ease-out ${n === i ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.title}
              loading={n === 0 ? "eager" : "lazy"}
              draggable={false}
              style={{ animation: "pack-float 6s ease-in-out infinite" }}
              className="pack-float h-full w-full object-contain drop-shadow-[0_24px_28px_rgba(20,40,30,0.28)]"
            />
          </Link>
        ))}
        {/* Ground shadow */}
        <div aria-hidden="true" className="absolute inset-x-[28%] bottom-[2%] h-3 rounded-[50%] bg-ink-deep/15 blur-md" />
      </div>

      <Link href={cur.href} className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-md ring-1 ring-foreground/5 transition hover:-translate-y-0.5">
        {cur.title}
        <span className="inline-flex items-center gap-0.5 text-primary">
          View <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>

      <div className="flex max-w-full flex-wrap justify-center gap-2">
        {items.map((p, n) => (
          <button
            key={p.href}
            type="button"
            aria-label={`Show ${p.title}`}
            onClick={() => setI(n)}
            className={`h-10 w-10 overflow-hidden rounded-xl bg-white p-1 ring-1 transition ${n === i ? "ring-2 ring-primary" : "opacity-60 ring-foreground/10 hover:opacity-100"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" loading="lazy" draggable={false} className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
