// What clinicians and families say — the hero strip and home chapter 09.
// TODO(content): these are placeholder quotes. Replace with real, attributed
// testimonials (with the person's consent) before launch — Content studio →
// Testimonials.

export type Testimonial = {
  id: string;
  /** clinician = doctors, dietitians, nurses; family = patients and carers. */
  kind: "clinician" | "family";
  quote: string;
  name: string;
  role: string;
  /** Institution or city — keep it to what the person agreed to publish. */
  place: string;
  /** Product the quote is about, if any — links to its page. */
  product?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "icu-dietitian",
    kind: "clinician",
    quote:
      "In the ICU the question is never just calories — it's protein the gut will actually tolerate. Having a 100% whey, high-protein option made locally has changed how early we can start feeding.",
    name: "Clinical Dietitian",
    role: "Intensive Care Unit",
    place: "Tertiary hospital, Kathmandu",
    product: "progain-hp",
  },
  {
    id: "nephrologist",
    kind: "clinician",
    quote:
      "Renal patients need restraint as much as nutrition. A low-protein formula with the electrolyte profile printed plainly makes the prescribing conversation much simpler.",
    name: "Consultant Nephrologist",
    role: "Renal Unit",
    place: "Kathmandu",
    product: "progain-lp",
  },
  {
    id: "endocrinologist",
    kind: "clinician",
    quote:
      "Glycaemic control and adequate nutrition usually pull in opposite directions. The low-GI formulation lets us stop choosing between them.",
    name: "Endocrinologist",
    role: "Diabetes Clinic",
    place: "Lalitpur",
    product: "progain-dm",
  },
  {
    id: "paediatrician",
    kind: "clinician",
    quote:
      "Parents ask what is in the tin. The team came with the evidence, the labelling and the answers — that is rare.",
    name: "Paediatrician",
    role: "Paediatric Ward",
    place: "Bhaktapur",
    product: "progain-junior",
  },
  {
    id: "daughter-carer",
    kind: "family",
    quote:
      "After Aama's surgery she could barely eat. Two weeks on progain-hp and she was asking for dal bhat again.",
    name: "Daughter & carer",
    role: "Family",
    place: "Pokhara",
    product: "progain-hp",
  },
  {
    id: "dialysis-patient",
    kind: "family",
    quote:
      "On dialysis you worry about everything you eat. This is one thing I don't have to second-guess.",
    name: "Dialysis patient",
    role: "Patient",
    place: "Kathmandu",
    product: "progain-lp",
  },
  {
    id: "parent",
    kind: "family",
    quote:
      "Our son has allergies, so finding something complete he could keep down felt impossible. Now it's part of his morning.",
    name: "Parent",
    role: "Family",
    place: "Chitwan",
    product: "progain-junior",
  },
  {
    id: "son-carer",
    kind: "family",
    quote:
      "Buwa's doctor suggested progain-dm. Now breakfast is the one thing on his plate we don't argue about.",
    name: "Son & carer",
    role: "Family",
    place: "Butwal",
    product: "progain-dm",
  },
];
