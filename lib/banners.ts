// Information banners on the home page ("Good nutrition, explained simply").
// Facts are lifted from the product summaries in lib/products.ts — keep them
// in step if a formulation changes. Every field is editable in the visual
// editor; photos are swapped under Content studio → Photos.

import type { PhotoSlot } from "@/lib/photos";

export type Banner = {
  id: string;
  tag: string;
  fact: string;
  body: string;
  /** Product the banner links to. */
  product: string;
  cta: string;
  photo: PhotoSlot;
  tone: "sun" | "mint" | "sky" | "blush";
};

/** First banner is the wide headline one; the rest are cards. */
export const banners: Banner[] = [
  {
    id: "critical-care",
    tag: "Did you know?",
    fact: "A critically ill patient can lose up to 1 kg of muscle a day.",
    body: "That's why progain-hp packs 42% protein from 100% whey — so recovery can start while it matters most.",
    product: "progain-hp",
    cta: "Meet progain-hp",
    photo: "clinician",
    tone: "sun",
  },
  {
    id: "kidney",
    tag: "Kidney care",
    fact: "Calories up. Protein, potassium & phosphorus down.",
    body: "A tailored pack for people living with CKD.",
    product: "progain-lp",
    cta: "progain-lp",
    photo: "elderSmiling",
    tone: "mint",
  },
  {
    id: "diabetes",
    tag: "Diabetes",
    fact: "A full meal that's gentle on blood sugar.",
    body: "Low glycaemic, with prebiotic FOS for the gut.",
    product: "progain-dm",
    cta: "progain-dm",
    photo: "dalBhat",
    tone: "sky",
  },
  {
    id: "kids",
    tag: "Little ones",
    fact: "Complete nutrition for growing kids, from age 1.",
    body: "Hypoallergenic and amino-acid based, for brain and body.",
    product: "progain-junior",
    cta: "progain junior",
    photo: "girlSmiling",
    tone: "blush",
  },
];
