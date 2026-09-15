// Company constants and navigation — the single source of truth for
// brand facts (docs/content-strategy.md). Copy edits happen here.

export const site = {
  name: "Refill Enterprises",
  legalName: "Refill Enterprises Pvt. Ltd.",
  tagline: "Clinical nutrition, engineered.",
  /** Brand line from the logo lockup — pairs with the mark, not a page headline. */
  motto: "Supplementing your health",
  description:
    "Refill Enterprises Pvt. Ltd. is a Nepali nutraceutical company specializing in critical care nutrition, disease-specific metabolic formulations, and advanced medical devices — with a roadmap toward sports nutrition and domestic manufacturing.",
  founded: 2020,
  country: "Nepal",
  city: "Kathmandu",
  coordinates: "27.7172° N, 85.3240° E",
  // TODO(content): confirm final production domain and contact details.
  url: "https://refillenterprises.com",
  email: "info@refillenterprises.com",
  phone: "+977-1-XXXXXXX",
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
  { label: "Solutions", href: "/solutions" },
  { label: "Research", href: "/research" },
  { label: "Manufacturing", href: "/manufacturing" },
];

/** Full indexed navigation (mobile menu + footer). */
export const fullNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", hint: "Vision · Mission · Values" },
  { label: "Products", href: "/products", hint: "Four clinical families" },
  { label: "Solutions", href: "/solutions", hint: "Nutrition · Devices" },
  { label: "Research", href: "/research", hint: "Evidence philosophy" },
  { label: "Manufacturing", href: "/manufacturing", hint: "The facility vision" },
  { label: "Sports Nutrition", href: "/sports-nutrition", hint: "Coming soon" },
  { label: "Careers", href: "/careers", hint: "Join the work" },
  { label: "Contact", href: "/contact", hint: "Kathmandu, Nepal" },
];

/** Routes that open with a Deep Ink hero — the header inverts on them until scrolled. */
export const darkHeroRoutes = ["/", "/research", "/sports-nutrition"];

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
      { label: "Critical Care Nutrition", href: "/solutions/critical-care-nutrition" },
      { label: "Medical Devices", href: "/solutions/medical-devices" },
      { label: "Sports Nutrition", href: "/sports-nutrition" },
    ],
  },
];
