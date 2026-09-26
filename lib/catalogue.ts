// Catalogue helpers — discovery logic over the product data in products.ts.
// Everything here derives from fields the brochures already carry; nothing
// is invented. No prices, ratings or stock exist in this catalogue: these
// products are labelled for practitioner, hospital and laboratory use, and
// the conversion action is an enquiry, not a checkout.

import type { ProductFamily, RangeId } from "./products";

/**
 * Applications are authored per product and drift in number
 * ("Geriatric" / "Geriatrics"), so they are normalised for grouping while
 * the printed label is kept for display.
 */
export function applicationKey(application: string): string {
  return application.trim().toLowerCase().replace(/s$/, "");
}

/** Every distinct indication in the catalogue, most-used first. */
export function applications(
  products: ProductFamily[],
): { key: string; label: string; count: number }[] {
  const seen = new Map<string, { label: string; count: number }>();
  for (const p of products) {
    // A product tagged "Geriatric" and "Geriatrics" must only count once.
    const keysInProduct = new Set(p.applications.map(applicationKey));
    for (const application of p.applications) {
      const key = applicationKey(application);
      if (!keysInProduct.delete(key)) continue;
      const hit = seen.get(key);
      if (hit) hit.count += 1;
      else seen.set(key, { label: application, count: 1 });
    }
  }
  return [...seen.entries()]
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/**
 * The text a product should be findable by: name, category, range,
 * indications and composition — so "magnesium" finds the tablet that
 * lists magnesium as a compound, not just one with it in the title.
 */
export function searchText(p: ProductFamily): string {
  return [
    p.name,
    p.strapline,
    p.category,
    p.summary,
    p.detail,
    p.flavour,
    p.pack,
    ...p.applications,
    ...p.compounds.flatMap((c) => [c.label, c.value]),
    ...(p.claims ?? []),
    ...(p.nutrition?.rows.map((r) => r.nutrient) ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/** All query words must appear, so extra words narrow rather than widen. */
export function matchesQuery(p: ProductFamily, query: string): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = searchText(p);
  return terms.every((t) => haystack.includes(t));
}

export type CatalogueFilter = {
  query?: string;
  range?: RangeId | "all";
  application?: string;
};

export function filterProducts(
  products: ProductFamily[],
  { query = "", range = "all", application }: CatalogueFilter,
): ProductFamily[] {
  return products.filter((p) => {
    if (range !== "all" && p.range !== range) return false;
    if (application && !p.applications.some((a) => applicationKey(a) === application))
      return false;
    return matchesQuery(p, query);
  });
}

/**
 * Products a clinician looking at this one would reasonably weigh against
 * it: shared indications first (the actual decision), then same-range
 * siblings, so the list is never empty.
 */
export function relatedProducts(
  product: ProductFamily,
  all: ProductFamily[],
  limit = 3,
): ProductFamily[] {
  const own = new Set(product.applications.map(applicationKey));
  return all
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      p,
      shared: p.applications.filter((a) => own.has(applicationKey(a))).length,
      sameRange: p.range === product.range ? 1 : 0,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared || b.sameRange - a.sameRange || a.p.name.localeCompare(b.p.name),
    )
    .slice(0, limit)
    .map((c) => c.p);
}
