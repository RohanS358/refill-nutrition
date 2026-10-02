/**
 * Hero copy defaults — a plain module so both the server page (CMS
 * resolution) and the hero import it.
 */
export const heroDefaults = {
  line1: "Better nutrition,",
  line2: "happier recoveries",
  lead: "Clinical nutrition helping people in the ICU, on the renal ward and at the family table get stronger, sooner.",
  cta1: "Explore products",
  cta2: "Find your formula",
};

export type HeroCopy = typeof heroDefaults;
