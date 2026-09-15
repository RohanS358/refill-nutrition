# Refill Enterprises — Brand Guidelines

> The single source of truth for how Refill Enterprises Pvt. Ltd. presents itself digitally.

## 1. Who we are

Refill Enterprises Pvt. Ltd. is a Nepali nutraceutical company (est. 2020) specializing in
**critical care nutrition** and **disease-specific metabolic formulations** — calcium,
amino acids, Omega-3 — plus medical devices for critical-care patient management, with a
planned expansion into sports nutrition and a long-term vision of domestic manufacturing.

## 2. Brand thesis

**"Precision is care."**

Every choice on this site must communicate that nutrition, done at clinical grade, is an
engineering discipline. We are not a wellness brand. We are not a hospital brochure.
We are a scientific manufacturer-in-the-making that treats a calcium ion with the same
seriousness a pharmaceutical company treats a molecule.

Visitors should immediately conclude:

- *modern* — the site behaves like a product built in the 2020s
- *scientific* — data, structure, and molecular geometry are the decoration
- *trustworthy* — restraint, precision, and evidence language
- *global* — Swiss-editorial composition, not local-template composition
- *invested in quality* — every detail is deliberate

## 3. Brand personality

| Trait | Expression | Never |
|---|---|---|
| Precise | hairline rules, tabular figures, numbered sections | decorative clutter |
| Calm | warm paper background, generous whitespace | loud gradients, glassmorphism |
| Evidence-led | claims tied to science language ("formulated", "clinical-grade") | miracle-cure tone |
| Ambitious | manufacturing vision, future portfolio treated as roadmap | vague "coming soon" filler |
| Nepali & global | "Kathmandu, Nepal" stated with pride in footer/contact | clichéd national imagery |

## 4. Voice & tone

- Sentences are short and declarative. "Formulated for recovery." not "We are passionate about…"
- Prefer nouns of science: *formulation, pathway, substrate, protocol, outcome*.
- Numbers are written precisely (Est. 2020, 4 product families, 100+ SKUs when true).
- Never overclaim clinical results. We *support* recovery; we do not *cure*.
- English is the primary language; keep sentences translatable.

## 5. Logo / wordmark

The supplied logo (`public/brand/logo.jpg`) is a horizontal lockup: a circular **R**
monogram, a vertical rule, then **REFILL** over the tagline **SUPPLEMENTING YOUR HEALTH**.
It is sliced at the rule into two assets, both served from `public/brand/`:

| Asset | Use |
|---|---|
| `logo-full.png` | Header from `sm` up, admin sign-in — the default lockup |
| `mark.png` | Phone header, and anywhere the lockup would be illegible |
| `icon.svg` | Favicon — the circular R redrawn as vector so it holds at 16–32px |

Both render through `components/site/logo.tsx` (`variant="full" | "mark"`), the single
place the asset lands. On Deep Ink surfaces pass `onDark` to invert it to paper-white.

**Tagline.** "Supplementing your health" is the brand line (`site.motto`) and belongs with
the mark and in the footer. It is *not* the page-title tagline — that remains
"Clinical nutrition, engineered." (`site.tagline`), which is also the homepage H1.

## 6. The one-accent rule

Refill Green (`#0E5F49`) is the only brand accent on clinical pages.
Pulse Lime (`#D7F94E`) exists **only** in the sports-nutrition context (preview section,
sports page) to signal the future consumer-facing energy of the brand. The two never
appear side by side at equal weight. See `color-system.md`.

**Logo blue is not an accent.** The supplied logo is blue (`--brand-blue: #2B3B88`,
deep end `#242E69`). It is deliberately *not* recolored to Refill Green — the mark
differentiates itself from the page. The blue is therefore reserved to the logo asset
alone: it never becomes a button, link, heading, or surface color. The one-accent rule
above is unchanged for everything that is not the mark.

## 7. Relationship to the design ecosystem

This site evolves an existing editorial design system (zero-radius surfaces, scroll
choreography, oversized display type, hairline structure). We keep its skeleton and
replace its soul: monochrome architecture → warm clinical science. See
`visual-language.md` and `decisions.md` (D-001).
