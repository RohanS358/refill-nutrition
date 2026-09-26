# SEO Strategy

## Technical

- Per-route `metadata` exports: unique `title` (template: `%s — Refill Enterprises`),
  ≤ 160-char descriptions written for clinicians/procurement, canonical URLs via
  `metadataBase` — the production domain `https://refillenterprises.com.np`,
  set once as `site.url` in `lib/site.ts`.
- `app/sitemap.ts` (all 11 routes) and `app/robots.ts` (allow all, sitemap ref).
- OpenGraph/Twitter cards on every route; OG image is generated brand typography
  (roadmap item: `opengraph-image.tsx`).
- JSON-LD `Organization` schema in the root layout (name, foundingDate 2020,
  address country NP, contactPoint), extended with per-page types later
  (`Product`, `JobPosting`).
- Server-rendered HTML for all content (RSC), semantic headings (one `h1`/page,
  ordered `h2/h3`), descriptive link text — no "click here".

## Keyword territory

Primary: *critical care nutrition Nepal, clinical nutrition company Nepal,
nutraceutical company Nepal*. Secondary: *disease-specific metabolic nutrition,
amino acid formulation, omega-3 clinical, calcium supplement manufacturer, medical
devices Nepal*. Future: *sports nutrition Nepal*.

Mapping: each solution/product page owns one primary phrase in its `h1`, title tag,
and first paragraph; the home page owns the brand + category head terms.

## Performance = ranking

Core Web Vitals targets in `implementation-plan.md` (LCP < 1.8s: text-based hero, no
hero imagery, preloaded single font; CLS ≈ 0: reserved space, `once` reveals; INP:
tiny client islands). `images.unoptimized` remains acceptable while the site ships
zero raster images; revisit if photography ever lands (`decisions.md` D-007).
