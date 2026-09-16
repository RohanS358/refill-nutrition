// Innovation timeline — home chapter 06 and about page.
// TODO(content): confirm exact milestone years with the company.

export type Milestone = {
  year: string;
  title: string;
  body: string;
  state: "done" | "now" | "future";
};

export const milestones: Milestone[] = [
  {
    year: "2020",
    title: "Founded in Nepal",
    body: "Refill Enterprises Pvt. Ltd. established with a vision to enhance healthcare outcomes through nutritional science.",
    state: "done",
  },
  {
    year: "2021",
    title: "Critical care portfolio",
    body: "The progain enteral range reaches healthcare professionals — high-protein whey, low-protein renal and diabetic formulations.",
    state: "done",
  },
  {
    year: "2022",
    title: "Disease-specific formulations",
    body: "Portfolio deepens into hydrolysed peptide, paediatric and supplementation lines — Calcinine, Recal-M, Cardivit and Recure.",
    state: "done",
  },
  {
    year: "2023",
    title: "Medical devices & applications",
    body: "BAITONG ENFit-standard enteral delivery systems introduced through strategic partnership.",
    state: "done",
  },
  {
    year: "Now",
    title: "Sports nutrition in development",
    body: "A performance, recovery, and active-lifestyle portfolio being engineered on the same clinical foundation.",
    state: "now",
  },
  {
    year: "Next",
    title: "Manufacturing in Nepal",
    body: "A state-of-the-art domestic facility — quality assurance, self-reliance, employment, and a stronger Nepali healthcare industry.",
    state: "future",
  },
];

/** Company statistics — home chapter 10. Honest numbers only. */
export const statistics = [
  { value: 2020, label: "Established", format: "year" as const },
  { value: 11, label: "Products in the catalogue", suffix: "" },
  { value: 4, label: "Clinical ranges", suffix: "" },
  { value: 6, label: "Domains of expertise", suffix: "" },
  { value: 1, label: "Planned manufacturing facility", suffix: "" },
  { value: 100, label: "Commitment to evidence", suffix: "%" },
];
