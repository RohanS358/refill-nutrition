"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import type { Brochure } from "@/lib/brochures";

/**
 * Brochure shelf + lightbox. Spreads open in an overlay with keyboard
 * paging; the grid itself is static so nothing animates unprompted.
 */
export function BrochureViewer({ brochures }: { brochures: Brochure[] }) {
  const [open, setOpen] = useState<{ b: number; p: number } | null>(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);

  const page = useCallback(
    (dir: -1 | 1) =>
      setOpen((cur) => {
        if (!cur) return cur;
        const flat = brochures.flatMap((b, bi) => b.pages.map((_, pi) => ({ b: bi, p: pi })));
        const at = flat.findIndex((f) => f.b === cur.b && f.p === cur.p);
        const next = flat[(at + dir + flat.length) % flat.length];
        return next;
      }),
    [brochures],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") page(1);
      if (e.key === "ArrowLeft") page(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, page]);

  const current = open ? brochures[open.b] : null;

  return (
    <>
      <ul className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {brochures.map((b, bi) => (
          <li key={b.id} className="bg-card">
            <button
              type="button"
              onClick={() => setOpen({ b: bi, p: 0 })}
              className="group block w-full text-left"
            >
              <span className="relative block overflow-hidden bg-secondary">
                <Image
                  // Committed spreads ship a -thumb variant; admin uploads
                  // don't, so fall back to the full-size page.
                  src={
                    b.pages[0].startsWith("/brochures/")
                      ? b.pages[0].replace(".webp", "-thumb.webp")
                      : b.pages[0]
                  }
                  alt={`${b.title} brochure`}
                  width={560}
                  height={396}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute right-4 bottom-4 flex items-center gap-2 bg-ink-deep/85 px-3 py-2 text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand size={14} strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-eyebrow">View</span>
                </span>
              </span>
              <span className="block p-6 md:p-8">
                <span className="text-title block text-[1.15rem]">{b.title}</span>
                <span className="text-eyebrow mt-2 block text-muted-foreground">{b.subject}</span>
                <span className="text-data mt-4 block text-muted-foreground">
                  {b.pages.length} {b.pages.length === 1 ? "spread" : "spreads"}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title} brochure`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 flex flex-col bg-ink-deep/97 p-4 md:p-8"
            onClick={close}
          >
            <div className="flex shrink-0 items-center justify-between text-background">
              <div>
                <p className="text-title text-[1.1rem]">{current.title}</p>
                <p className="text-eyebrow mt-1 text-paper-dim">
                  {current.subject} · {open.p + 1} / {current.pages.length}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close brochure"
                className="p-3 transition-opacity hover:opacity-70"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div
              className="flex min-h-0 flex-1 items-center justify-center py-6"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={`${open.b}-${open.p}`}
                initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={current.pages[open.p]}
                  alt={`${current.title} — spread ${open.p + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            <div
              className="flex shrink-0 items-center justify-center gap-px bg-line-dark"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => page(-1)}
                aria-label="Previous spread"
                className="bg-ink-deep p-4 text-background transition-colors hover:bg-line-dark"
              >
                <ArrowLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => page(1)}
                aria-label="Next spread"
                className="bg-ink-deep p-4 text-background transition-colors hover:bg-line-dark"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
