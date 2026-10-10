/**
 * Hero copy defaults — a plain module so both the server page (CMS
 * resolution) and the hero import it.
 */
export const heroDefaults = {
  line1: "Nutrition that brings you",
  line2: "back home",
  lead: "Clinical nutrition that helps patients leave the ward stronger.",
  cta1: "Explore products",
  cta2: "Find your formula",
};

export type HeroCopy = typeof heroDefaults;
