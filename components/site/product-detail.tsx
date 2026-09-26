"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import type { ProductFamily } from "@/lib/products";
import { ProductBody } from "./product-body";
import { cn } from "@/lib/utils";

/**
 * One catalogue entry: always-visible summary row, detail on demand.
 * The pack shot sticks beside the detail while it is open, so the product
 * stays in view while the clinician reads its figures.
 */
export function ProductDetail({
  family,
  /** Position in the products collection — keeps CMS keys stable. */
  ci,
}: {
  family: ProductFamily;
  ci: number;
}) {
  const [open, setOpen] = useState(false);
  // Clipping is dropped after the expand tween so sticky can work.
  const [settled, setSettled] = useState(false);
  const reduced = useReducedMotion();
  const panelId = `${family.id}-detail`;

  // A deep link (/products#progain-hp) should land on an open entry.
  useEffect(() => {
    const sync = () => {
      if (decodeURIComponent(window.location.hash.slice(1)) === family.id) {
        setOpen(true);
        setSettled(false);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [family.id]);

  return (
    <div id={family.id} className="scroll-mt-28 border-b border-border">
      {/* Summary row — always visible */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setSettled(false);
        }}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[4.5rem_1fr_auto] items-center gap-5 py-6 text-left transition-colors hover:bg-card md:grid-cols-[6rem_minmax(0,20rem)_1fr_auto] md:gap-8 md:py-8"
      >
        {family.image ? (
          <Image
            src={family.image}
            alt=""
            width={140}
            height={170}
            sizes="140px"
            className="pack-shot h-16 w-auto justify-self-center object-contain transition-transform duration-500 group-hover:-translate-y-1 md:h-24"
          />
        ) : (
          <span />
        )}

        <span className="min-w-0">
          <span className="text-title block text-balance" data-cms={`col:products.${ci}.name`}>
            {family.name}
          </span>
          <span
            className="text-eyebrow mt-2 block text-primary"
            data-cms={`col:products.${ci}.category`}
          >
            {family.category}
          </span>
        </span>

        <span className="hidden text-sm leading-relaxed text-muted-foreground md:block">
          {family.summary}
        </span>

        <span
          aria-hidden="true"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:text-primary",
            open && "rotate-45 border-primary text-primary",
          )}
        >
          <Plus size={18} strokeWidth={1.5} />
        </span>
      </button>

      {/* Detail — on demand */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            // overflow clipping is only needed while the height tweens; a
            // non-visible overflow on this ancestor would otherwise break
            // position:sticky on the pack-shot column.
            onAnimationComplete={() => setSettled(true)}
            style={{ overflow: settled ? "visible" : "hidden" }}
          >
            <ProductBody family={family} ci={ci} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
