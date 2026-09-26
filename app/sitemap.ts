import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { collection } from "@/lib/cms/content";
import { productFamilies } from "@/lib/products";

const pages = [
  "",
  "/about",
  "/products",
  "/products/compare",
  "/brochures",
  "/solutions",
  "/solutions/critical-care-nutrition",
  "/solutions/medical-devices",
  "/research",
  "/manufacturing",
  "/careers",
  "/contact",
];

const priority = (route: string) =>
  route === "" ? 1 : route.startsWith("/solutions") || route === "/products" ? 0.8 : 0.6;

// Reads the admin-edited catalogue, so products added in the content studio
// are submitted to search engines without a code change.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const families = await collection("products", productFamilies);
  const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

  return [
    ...pages.map((route) => ({
      url: `${site.url}${route}`,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: priority(route),
    })),
    // One entry per product — each is its own indexable page, with its pack shot.
    ...families.map((p) => ({
      url: `${site.url}/products/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(p.image ? { images: [abs(p.image)] } : {}),
    })),
  ];
}
