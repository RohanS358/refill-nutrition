// The printed literature, as web-optimised spreads. Source artwork lives in
// public/images/*.ai; public/brochures holds the derived WebP.

export type Brochure = {
  id: string;
  title: string;
  /** Product or deck this spread belongs to. */
  subject: string;
  pages: string[];
};

const spread = (name: string) => `/brochures/${name}.webp`;
const thumb = (name: string) => `/brochures/${name}-thumb.webp`;

export const brochures: Brochure[] = [
  {
    id: "progain-hp",
    title: "progain-hp",
    subject: "Protein 100% Whey",
    pages: [spread("progain-hp-1"), spread("progain-hp-2")],
  },
  {
    id: "progain-lp",
    title: "progain-lp",
    subject: "Low Protein Powder",
    pages: [spread("progain-lp-1"), spread("progain-lp-2")],
  },
  {
    id: "progain-dm",
    title: "progain-dm",
    subject: "Meal Replacement for Diabetics",
    pages: [spread("progain-dm-1"), spread("progain-dm-2")],
  },
  {
    id: "progain-peptide",
    title: "progain-peptide",
    subject: "Complete Elemental Nutrition",
    pages: [spread("progain-peptide-1")],
  },
  {
    id: "progain-junior",
    title: "progain junior — Kidz",
    subject: "Complete Nutrition for Children",
    pages: [spread("progain-junior-1"), spread("progain-junior-2")],
  },
  {
    id: "re-pro",
    title: "re-pro",
    subject: "Assured Protein with Vital Nutrients",
    pages: [spread("re-pro-1")],
  },
  {
    id: "calcinine",
    title: "Calcinine",
    subject: "Calcium, D3, Magnesium, B12 & Zinc",
    pages: [spread("calcinine-1")],
  },
  {
    id: "recal-m",
    title: "Recal-M",
    subject: "Milk Calcium, D3 & Zinc",
    pages: [spread("recal-m-1")],
  },
  {
    id: "cardivit",
    title: "Cardivit",
    subject: "Triple antioxidant with Omega 3",
    pages: [spread("cardivit-1")],
  },
  {
    id: "recure",
    title: "Recure",
    subject: "Curcumin, Lycopene & Piperine Syrup",
    pages: [spread("recure-1")],
  },
  {
    id: "gravity-set-bag",
    title: "BAITONG Gravity Set Bag",
    subject: "Continuous enteral feeding",
    pages: [spread("gravity-set-bag-1")],
  },
  {
    id: "evidence-ckd",
    title: "Burden of CKD",
    subject: "Clinical evidence",
    pages: [spread("evidence-ckd")],
  },
  {
    id: "evidence-liver",
    title: "Liver disease & malnutrition",
    subject: "Clinical evidence",
    pages: [spread("evidence-liver")],
  },
  {
    id: "evidence-icons",
    title: "I.C.O.N.S.",
    subject: "Clinical evidence",
    pages: [spread("evidence-icons")],
  },
];

export const brochureThumb = thumb;
