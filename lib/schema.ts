// JSON-LD structured data. Search engines use this to understand who the
// company is and what it sells; it drives knowledge panels and rich results.
// Every value here must be a fact we can defend — schema markup that
// misrepresents the business is a manual-action risk, not a growth hack.

import { site } from "./site";
import type { ProductFamily } from "./products";

/** The company itself — emitted once, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    slogan: site.motto,
    foundingDate: String(site.founded),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dillibazar",
      addressLocality: site.city,
      addressCountry: "NP",
    },
    areaServed: {
      "@type": "Country",
      name: site.country,
    },
    knowsAbout: [
      "Critical care nutrition",
      "Enteral nutrition",
      "Renal nutrition",
      "Diabetic nutrition",
      "Paediatric nutrition",
      "Clinical supplementation",
    ],
  };
}

/** The site, so search engines can attach a sitelinks search box later. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}

/**
 * One product. Nutrition figures come straight from the printed literature,
 * so the markup matches what a clinician reads on the pack.
 */
export function productSchema(p: ProductFamily) {
  const energy = p.nutrition?.rows.find((r) => /energy/i.test(r.nutrient));
  const protein = p.nutrition?.rows.find((r) => /^protein/i.test(r.nutrient));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${site.url}/products#${p.id}`,
    name: p.name,
    category: p.category,
    description: p.summary,
    ...(p.image ? { image: `${site.url}${p.image}` } : {}),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": `${site.url}/#organization` },
    ...(p.nutrition
      ? {
          nutrition: {
            "@type": "NutritionInformation",
            servingSize: p.nutrition.servingNote,
            ...(energy ? { calories: `${energy.perServing} kcal` } : {}),
            ...(protein ? { proteinContent: `${protein.perServing} g` } : {}),
          },
        }
      : {}),
  };
}

/** Breadcrumbs so search results show the path, not just the URL. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}
