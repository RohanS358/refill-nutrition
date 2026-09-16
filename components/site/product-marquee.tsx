"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "motion/react";
import type { ProductFamily } from "@/lib/products";

/** px per second — slow enough to read the pack names. */
const SPEED = 42;

/**
 * Continuous pack-shot marquee. Two identical tracks translate by -50% so
 * the loop is seamless. Driven by a MotionValue rather than a keyframe
 * animation so hover/focus pauses hold position instead of snapping back;
 * renders as a static row under reduced motion.
 */
export function ProductMarquee({ products }: { products: ProductFamily[] }) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const shots = products.filter((p) => p.image);
  const track = [...shots, ...shots];

  useAnimationFrame((_, delta) => {
    if (reduced || paused) return;
    const half = (trackRef.current?.scrollWidth ?? 0) / 2;
    if (!half) return;
    // wrap on the half-way point: the second copy is identical, so the
    // reset is invisible.
    x.set((x.get() - (SPEED * delta) / 1000) % half);
  });

  return (
    <div className="marquee-mask overflow-hidden py-4">
      <motion.div
        ref={trackRef}
        className="flex w-max items-end gap-12 md:gap-20"
        style={reduced ? undefined : { x }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
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
              className="pack-shot h-[150px] w-auto object-contain md:h-[190px]"
            />
            <span className="text-eyebrow mt-5 text-muted-foreground">{p.name}</span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
