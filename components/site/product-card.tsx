import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductFamily } from "@/lib/products";
import { Molecule } from "@/components/gfx/molecule";
import { cn } from "@/lib/utils";
import { Tc } from "@/components/cms/texts-context";

/**
 * Product-family card: molecule mark, name, category, compound ledger.
 * Lives inside hairline grids (bg-border gap-px parents).
 */
export function ProductCard({
  family,
  className,
  ci,
}: {
  family: ProductFamily;
  className?: string;
  /** Position in the products collection — enables visual editing. */
  ci?: number;
}) {
  const key = (field: string) => (ci == null ? undefined : `col:products.${ci}.${field}`);
  return (
    <article className={cn("group relative flex flex-col bg-card p-8 md:p-10", className)}>
      <div className="flex items-start justify-between">
        <span aria-hidden="true" className="text-data text-muted-foreground">
          {family.index}
        </span>
        {family.image ? (
          <Image
            src={family.image}
            alt=""
            width={160}
            height={200}
            sizes="120px"
            className="pack-shot h-20 w-auto object-contain transition-transform duration-500 group-hover:-translate-y-1"
          />
        ) : (
          <Molecule
            variant={family.molecule}
            className="h-20 w-20 text-primary transition-transform duration-500 group-hover:-translate-y-1"
          />
        )}
      </div>
      <h3 className="text-title mt-8">
        <Link
          href={`/products/${family.id}`}
          className="after:absolute after:inset-0 focus-visible:outline-2"
        >
          <span data-cms={key("name")}>{family.name}</span>
        </Link>
      </h3>
      <p className="text-eyebrow mt-3 text-muted-foreground" data-cms={key("category")}>
        {family.category}
      </p>
      <p className="mt-5 leading-relaxed text-muted-foreground" data-cms={key("summary")}>
        {family.summary}
      </p>
      <dl className="mt-8 flex-1 border-t border-border">
        {family.compounds.slice(0, 3).map((c, j) => (
          <div
            key={c.label}
            className="text-data flex items-baseline justify-between gap-4 border-b border-border py-2.5"
          >
            <dt className="text-foreground" data-cms={key(`compounds.${j}.label`)}>
              {c.label}
            </dt>
            <dd className="text-right text-muted-foreground" data-cms={key(`compounds.${j}.value`)}>
              {c.value}
            </dd>
          </div>
        ))}
      </dl>
      <dl className="text-data mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-muted-foreground">
        {family.pack ? (
          <div className="flex gap-2">
            <Tc k="product.label.pack" as="dt">Pack</Tc>
            <dd className="text-foreground">{family.pack}</dd>
          </div>
        ) : null}
        {family.applications[0] ? (
          <div className="flex gap-2">
            <Tc k="product.label.indication" as="dt" className="sr-only">Indication</Tc>
            <dd className="text-foreground">{family.applications[0]}</dd>
          </div>
        ) : null}
      </dl>
      <span className="text-eyebrow mt-6 inline-flex items-center gap-2 text-primary">
        <Tc k="product.card.cta">View product</Tc>
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </article>
  );
}
