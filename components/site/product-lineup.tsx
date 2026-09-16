"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ProductFamily } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * The catalogue as one arranged group shot: packs share a baseline and
 * overlap, tall ones set back, short ones brought forward — the way a
 * product family is photographed together.
 *
 * The arrangement is derived, not hand-placed: order comes from display
 * height and the overlap is a negative margin, so adding a product
 * re-composes the group on its own.
 */
export function ProductLineup({ products }: { products: ProductFamily[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const shots = products.filter((p) => p.image);

  // Tallest toward the centre, shorter toward the edges, so no pack hides
  // behind a taller neighbour. Ties break on id so server and client agree.
  const arranged: ProductFamily[] = [];
  [...shots]
    .sort((a, b) => (b.scale ?? 1) - (a.scale ?? 1) || a.id.localeCompare(b.id))
    .forEach((p, i) => (i % 2 === 0 ? arranged.push(p) : arranged.unshift(p)));

  const focus = hovered ? shots.find((p) => p.id === hovered) : undefined;

  return (
    <div>
      <div
        className="flex w-full items-end justify-center pt-6"
        onPointerLeave={() => setHovered(null)}
      >
        {arranged.map((p, i) => {
          const dimmed = hovered !== null && hovered !== p.id;
          const active = hovered === p.id;
          const scale = p.scale ?? 1;

          return (
            <motion.div
              key={p.id}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : Math.min(i, 8) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              onPointerEnter={() => setHovered(p.id)}
              // Shorter packs stack in front; the hovered one comes to the top.
              style={{ zIndex: active ? 40 : Math.round((1 - scale) * 20) + 1 }}
              className="group relative min-w-0 flex-1"
            >
              <Link
                href={`/products#${p.id}`}
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered(null)}
                aria-label={`${p.name} — ${p.category}`}
                className="block focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span className="flex h-[clamp(150px,20vw,460px)] items-end justify-center">
                  <Image
                    src={p.image!}
                    alt={p.name}
                    width={520}
                    height={660}
                    sizes="(max-width: 640px) 34vw, (max-width: 1024px) 26vw, 420px"
                    // scale equalises packs cropped at different aspect
                    // ratios, so the group reads as one photograph.
                    style={{ maxHeight: `${scale * 100}%` }}
                    className={cn(
                      "pack-shot w-auto max-w-[112%] origin-bottom object-contain transition-all duration-500",
                      active && "-translate-y-4 scale-[1.05]",
                      dimmed ? "opacity-30 saturate-50" : "opacity-100",
                    )}
                  />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* The shelf the group stands on. */}
      <div className="border-t border-border" />

      {/* Reserved height so hovering never shifts the layout below. */}
      <div className="mt-8 min-h-[5.5rem] text-center">
        {focus ? (
          <>
            <p className="text-title text-[1.15rem]">{focus.name}</p>
            <p className="text-eyebrow mt-1.5 text-primary">{focus.category}</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-balance text-muted-foreground">
              {focus.summary}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
