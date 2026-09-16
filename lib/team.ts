// The people behind the company — home chapter and the about page.
// TODO(content): replace with real names, roles and portraits before launch;
// every field here is editable from the admin (Content studio → Team).

export type TeamMember = {
  id: string;
  index: string;
  name: string;
  role: string;
  /** One line on what they own. Keep it factual, not a bio. */
  focus: string;
  /** Optional portrait — square crop reads best. Uploadable from the admin. */
  image?: string;
  /** Optional initials fallback when no portrait is set. */
  initials?: string;
};

export const team: TeamMember[] = [
  {
    id: "managing-director",
    index: "01",
    name: "Managing Director",
    role: "Leadership",
    focus:
      "Sets the clinical direction of the portfolio and holds the relationships with hospitals and prescribing clinicians.",
    initials: "MD",
  },
  {
    id: "clinical-lead",
    index: "02",
    name: "Clinical Lead",
    role: "Nutrition science",
    focus:
      "Owns formulation evidence — matching every product to the guideline and the metabolic state it is meant to serve.",
    initials: "CL",
  },
  {
    id: "regulatory-quality",
    index: "03",
    name: "Regulatory & Quality",
    role: "Compliance",
    focus:
      "Registration, labelling and quality assurance across the catalogue, from import documentation to shelf.",
    initials: "RQ",
  },
  {
    id: "sales-distribution",
    index: "04",
    name: "Sales & Distribution",
    role: "Commercial",
    focus:
      "Hospital procurement, distributor partnerships and the field team that details the literature.",
    initials: "SD",
  },
  {
    id: "medical-devices",
    index: "05",
    name: "Medical Devices",
    role: "Technology",
    focus:
      "Device selection, clinical onboarding and training for the enteral delivery range.",
    initials: "MD",
  },
  {
    id: "operations",
    index: "06",
    name: "Operations",
    role: "Supply chain",
    focus:
      "Import, warehousing and stock continuity — so a ward never waits on a formulation.",
    initials: "OP",
  },
];
