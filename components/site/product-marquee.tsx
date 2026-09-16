"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ProductFamily } from "@/lib/products";

/**
 * Continuous pack-shot marquee. Two identical tracks translate -50% so the
 * loop is seamless; pauses on hover and renders as a static row under
 * reduced motion (docs/animation-guidelines.md — the only infinite verb).
 */
export function ProductMarquee({ products }: { products: ProductFamily[] }) {
  const reduced = useReducedMotion();
  const shots = products.filter((p) => p.image);
  const track = [...shots, ...shots];

  return (
    <div className="marquee-mask group overflow-hidden py-4">
      <motion.div
        className="flex w-max items-end gap-12 md:gap-20"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 46, ease: "linear", repeat: Infinity }}
        style={{ animationPlayState: "running" }}
      >
        {track.map((p, i) => (
          <Link
            key={`${p.id}-${i}`}
            href={`/products#${p.id}`}
            aria-hidden={i >= shots.length}
            tabIndex={i >= shots.length ? -1 : undefined}
            className="flex shrink-0 flex-col items-center opacity-80 transition-opacity duration-300 hover:opacity-100"
          >
            <Image
              src={p.image!}
              alt={p.name}
              width={190}
              height={240}
              sizes="190px"
              className="h-[150px] w-auto object-contain md:h-[190px]"
            />
            <span className="text-eyebrow mt-5 text-muted-foreground">{p.name}</span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
