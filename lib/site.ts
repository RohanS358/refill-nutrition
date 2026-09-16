// Company constants and navigation — the single source of truth for
// brand facts (docs/content-strategy.md). Copy edits happen here.

export const site = {
  name: "Refill Enterprises",
  legalName: "Refill Enterprises Pvt. Ltd.",
  tagline: "Clinical nutrition, engineered.",
  /** Brand line from the logo lockup — pairs with the mark, not a page headline. */
  motto: "Supplementing your health",
  description:
    "Nepali clinical nutrition company: the progain enteral range for ICU, renal, diabetic and paediatric care, plus supplementation and ENFit enteral delivery.",
  founded: 2020,
  country: "Nepal",
  city: "Kathmandu",
  /** Street address as printed on the brochure back cover. */
  address: "Dillibazar, Kathmandu, Nepal",
  coordinates: "27.7172° N, 85.3240° E",
  /** Exim code printed on the literature — used in the org schema. */
  eximCode: "6098774290146NP",
  // TODO(content): confirm the production domain before launch.
  url: "https://refillenterprises.com",
  email: "refillenterprises@gmail.com",
  phone: "+977-1-5918273",
} as const;

export type NavItem = {
  label: string;
  href: string;
  hint?: string;
};

/** Primary header navigation (desktop). */
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Brochures", href: "/brochures" },
  { label: "Solutions", href: "/solutions" },
  { label: "Research", href: "/research" },
  { label: "Manufacturing", href: "/manufacturing" },
];

/** Full indexed navigation (mobile menu + footer). */
export const fullNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", hint: "Vision · Mission · Values" },
  { label: "Products", href: "/products", hint: "Eleven products, four ranges" },
  { label: "Brochures", href: "/brochures", hint: "The printed literature" },
  { label: "Solutions", href: "/solutions", hint: "Nutrition · Devices" },
  { label: "Research", href: "/research", hint: "Evidence philosophy" },
  { label: "Manufacturing", href: "/manufacturing", hint: "The facility vision" },
  { label: "Careers", href: "/careers", hint: "Join the work" },
  { label: "Contact", href: "/contact", hint: "Kathmandu, Nepal" },
];

/** Routes that open with a Deep Ink hero — the header inverts on them until scrolled. */
export const darkHeroRoutes = ["/", "/research"];

export const footerColumns: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Portfolio",
    items: [
      { label: "Products", href: "/products" },
      { label: "Brochures", href: "/brochures" },
      { label: "Critical Care Nutrition", href: "/solutions/critical-care-nutrition" },
      { label: "Medical Devices", href: "/solutions/medical-devices" },
    ],
  },
];
