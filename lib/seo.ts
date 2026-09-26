import type { Metadata } from "next";
import { site } from "./site";

/**
 * Full metadata for one page. Next replaces (not merges) a page's openGraph
 * and twitter objects, so every page builds its own — otherwise shares of
 * /about would carry the home page's title, URL and card.
 */
export function pageMeta({
  title,
  description,
  path,
  image = "/og.png",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Share image — the brand card unless a page has its own. */
  image?: string;
  /** Use the title as-is instead of appending the site name. */
  absoluteTitle?: boolean;
}): Metadata {
  const full = absoluteTitle ? title : `${title} — ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.legalName,
      locale: "en_US",
      url: path,
      title: full,
      description,
      images: [image === "/og.png" ? { url: image, width: 1200, height: 630, alt: full } : { url: image, alt: full }],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [image],
    },
  };
}
