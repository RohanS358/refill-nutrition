"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema } from "@/lib/schema";

// /products and /products/[id] emit their own trail; everything else gets one here.
const OWN_TRAIL = /^\/products(\/(?!compare$)[^/]+)?$/;

/** BreadcrumbList for every sub-page, derived from the URL path. */
export function BreadcrumbsLd() {
  const path = usePathname();
  if (path === "/" || OWN_TRAIL.test(path)) return null;

  const parts = path.split("/").filter(Boolean);
  const trail = [
    { name: "Home", path: "/" },
    ...parts.map((seg, i) => ({
      name: seg.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase()),
      path: "/" + parts.slice(0, i + 1).join("/"),
    })),
  ];
  return <JsonLd data={breadcrumbSchema(trail)} />;
}
