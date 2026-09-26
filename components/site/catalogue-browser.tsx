"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { ProductFamily, Range, RangeId } from "@/lib/products";
import { applications, filterProducts } from "@/lib/catalogue";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { Tc, useText } from "@/components/cms/texts-context";

/**
 * The catalogue as a searchable, filterable grid — the three discovery
 * paths in one surface: type a name or ingredient, pick a range, or pick
 * the indication you are treating.
 *
 * Eleven products is small enough to filter in the browser, so this needs
 * no API, no query-param round trip and no loading state.
 */
export function CatalogueBrowser({
  products,
  ranges,
  /** Preselected filters from ?range= / ?for= — read on the server so this
      page stays static rather than bailing out to client-side rendering. */
  initialRange,
  initialApplication,
}: {
  products: ProductFamily[];
  ranges: Range[];
  initialRange?: RangeId;
  initialApplication?: string;
}) {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState<RangeId | "all">(initialRange ?? "all");
  const [application, setApplication] = useState<string | undefined>(initialApplication);

  const indications = useMemo(() => applications(products), [products]);
  const results = useMemo(
    () => filterProducts(products, { query, range, application }),
    [products, query, range, application],
  );

  const filtered = query !== "" || range !== "all" || application !== undefined;
  const clear = () => {
    setQuery("");
    setRange("all");
    setApplication(undefined);
  };

  const searchPlaceholder = useText("catalogue.search.placeholder", "Search by name, ingredient or indication");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <label className="relative min-w-0 flex-1 basis-72">
          <Tc k="catalogue.search.label" className="sr-only">Search the catalogue</Tc>
          <Search
            size={17}
            strokeWidth={1.5}
            aria-hidden="true"
            className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full border border-border bg-card py-3.5 pr-4 pl-11 text-sm outline-none transition-colors focus:border-primary"
          />
        </label>

        <p aria-live="polite" className="text-data text-muted-foreground">
          {results.length} of {products.length} products
        </p>

        {filtered ? (
          <button
            type="button"
            onClick={clear}
            className="text-eyebrow inline-flex items-center gap-2 text-primary transition-colors hover:text-foreground"
          >
            <X size={14} strokeWidth={1.75} aria-hidden="true" />
            Clear
          </button>
        ) : null}
      </div>

      {/* Range — the printed portfolio's own division. */}
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
        <FilterChip active={range === "all"} onClick={() => setRange("all")}>
          <Tc k="catalogue.allRanges">All ranges</Tc>
        </FilterChip>
        {ranges.map((r) => (
          <FilterChip key={r.id} active={range === r.id} onClick={() => setRange(r.id)}>
            <span className="text-primary">{r.index}</span> {r.title}
          </FilterChip>
        ))}
      </div>

      {/* Indication — "what am I treating", straight from the product tags. */}
      <div className="mt-5 border-t border-border pt-5">
        <Tc k="catalogue.filterIndication" as="p" className="text-eyebrow text-muted-foreground">Filter by clinical indication</Tc>
        <div className="mt-4 flex flex-wrap gap-2">
          {indications.map((a) => (
            <button
              key={a.key}
              type="button"
              onClick={() =>
                setApplication((current) => (current === a.key ? undefined : a.key))
              }
              aria-pressed={application === a.key}
              className={cn(
                "text-data border px-3.5 py-2 transition-colors",
                application === a.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {a.label}
              <span className="ml-2 opacity-60 tabular-nums">{a.count}</span>
            </button>
          ))}
        </div>
      </div>

      {results.length ? (
        <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {results.map((family) => (
            <ProductCard
              key={family.id}
              family={family}
              ci={products.findIndex((p) => p.id === family.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 border border-border bg-card p-12 text-center md:mt-16">
          <Tc k="catalogue.empty.title" as="p" className="text-title">No products match that search.</Tc>
          <Tc k="catalogue.empty.body" as="p" className="mt-3 text-sm text-muted-foreground">
            Try an ingredient, a product name, or a clinical indication.
          </Tc>
          <button
            type="button"
            onClick={clear}
            className="text-eyebrow mt-6 inline-flex items-center gap-2 text-primary transition-colors hover:text-foreground"
          >
            <Tc k="catalogue.clear">Clear filters</Tc>
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "text-eyebrow transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
