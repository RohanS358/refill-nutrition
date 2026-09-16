/**
 * Hero copy defaults — a plain module (no "use client") so both the server
 * page (CMS resolution) and the client hero can import it.
 */
export const heroDefaults = {
  line1: "Clinical nutrition,",
  line2: "engineered",
  lead: "Evidence-based critical care nutrition, disease-specific metabolic formulations, and the medical technology to deliver them — from Nepal, for better patient outcomes.",
  cta1: "Explore the portfolio",
  cta2: "Critical care nutrition",
  strip: [
    { label: "Specialty", value: "Clinical & critical care nutrition" },
    { label: "Portfolio", value: "11 products · 4 ranges" },
    { label: "Technology", value: "ENFit enteral delivery" },
    { label: "Next", value: "Domestic manufacturing" },
  ],
};

export type HeroCopy = typeof heroDefaults;
