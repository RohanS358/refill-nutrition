import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/products",
    "/brochures",
    "/solutions",
    "/solutions/critical-care-nutrition",
    "/solutions/medical-devices",
    "/research",
    "/manufacturing",
    "/sports-nutrition",
    "/careers",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/solutions") || route === "/products" ? 0.8 : 0.6,
  }));
}
