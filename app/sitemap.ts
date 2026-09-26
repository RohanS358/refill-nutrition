import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { productFamilies } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
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
    // One entry per product: each is its own indexable page.
    ...productFamilies.map((p) => `/products/${p.id}`),
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route.startsWith("/products/") 
          ? 0.7
          : route.startsWith("/solutions") || route === "/products"
            ? 0.8
            : 0.6,
  }));
}
