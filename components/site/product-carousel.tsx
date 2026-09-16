"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProductFamily } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Horizontal catalogue carousel — Embla (already a dependency) for the
 * drag/snap behaviour, hairline styling to match the product grids.
 */
export function ProductCarousel({ products }: { products: ProductFamily[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false, dragFree: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
  }, [embla, onSelect]);

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative min-w-0 shrink-0 grow-0 basis-[85%] border-l border-border pl-6 sm:basis-[55%] md:basis-[42%] md:pl-10 lg:basis-[30%]"
            >
              <div className="flex h-[240px] items-end justify-center md:h-[280px]">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={260}
                    height={330}
                    sizes="(max-width: 768px) 60vw, 260px"
                    className="h-full w-auto object-contain transition-transform duration-500 group-hover:-translate-y-2"
                  />
                ) : null}
              </div>
              <span aria-hidden="true" className="text-data mt-8 block text-muted-foreground">
                {p.index}
              </span>
              <h3 className="text-title mt-3">
                <Link
                  href={`/products#${p.id}`}
                  className="after:absolute after:inset-0 focus-visible:outline-2"
                >
                  {p.name}
                </Link>
              </h3>
              <p className="text-eyebrow mt-2 text-primary">{p.category}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" aria-hidden="true">
          {products.map((p, i) => (
            <span
              key={p.id}
              className={cn(
                "h-px w-8 transition-colors duration-300",
                i === selected ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>
        <div className="flex gap-px bg-border">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous products"
            className="bg-background p-4 text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:hover:bg-background"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            aria-label="Next products"
            className="bg-background p-4 text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:hover:bg-background"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Small inline link used under carousels. */
export function CarouselLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group text-eyebrow inline-flex items-center gap-2 text-primary">
      {children}
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
