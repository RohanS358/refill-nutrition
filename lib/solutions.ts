// Solution areas and their page content. TODO(content): validate clinical
// claims and device descriptions with the company before launch.

export type Solution = {
  id: string;
  index: string;
  href: string;
  title: string;
  eyebrow: string;
  summary: string;
  points: { title: string; body: string }[];
};

export const solutions: Solution[] = [
  {
    id: "critical-care-nutrition",
    index: "01",
    href: "/solutions/critical-care-nutrition",
    title: "Critical Care Nutrition",
    eyebrow: "Clinical nutrition",
    summary:
      "Nutritional therapy engineered for intensive care — supporting recovery when the body's metabolic demands are at their most extreme.",
    points: [
      {
        title: "Assessment-led",
        body: "Formulations selected against the patient's metabolic state — hypercatabolism, organ dysfunction, fluid restriction.",
      },
      {
        title: "Disease-specific",
        body: "progain-lp for renal, progain-dm for glycaemic control, progain-hp and peptide for hypercatabolic states — instead of one-size-fits-all feeding.",
      },
      {
        title: "Recovery-oriented",
        body: "Substrates for tissue repair, immune competence, and lean-mass preservation across the rehabilitation arc.",
      },
    ],
  },
  {
    id: "medical-devices",
    index: "02",
    href: "/solutions/medical-devices",
    title: "Medical Devices & Applications",
    eyebrow: "Healthcare technology",
    summary:
      "BAITONG ENFit-standard enteral delivery systems — continuous feeding sets engineered so a feeding line cannot be connected to an IV, introduced through strategic partnership.",
    points: [
      {
        title: "Delivery systems",
        body: "1.2/1.5 litre gravity sets with roller-clamp drip control, closable funnel and dedicated medication port.",
      },
      {
        title: "Monitoring & management",
        body: "Healthcare applications that keep nutritional therapy measurable and accountable.",
      },
      {
        title: "Partnership model",
        body: "Global technology, introduced and supported locally — bridging modern healthcare technology and patient-centred care.",
      },
    ],
  },
];

/** Protocol steps for the critical-care page pathway diagram. */
export const protocolSteps = [
  { step: "01", title: "Screen", body: "Nutritional risk identified on admission." },
  { step: "02", title: "Assess", body: "Metabolic state, organ function, and requirements quantified." },
  { step: "03", title: "Formulate", body: "Disease-specific formulation matched to the assessment." },
  { step: "04", title: "Deliver", body: "Oral or enteral delivery with device-supported precision." },
  { step: "05", title: "Monitor", body: "Outcomes tracked; formulation adjusted as the patient recovers." },
] as const;

/** Device capability grid for the medical-devices page — BAITONG gravity set. */
export const deviceCapabilities = [
  {
    title: "Continuous enteral feeding",
    body: "Gravity-driven delivery over a controlled drip rate — the feeding pattern ESPEN and ASPEN guidelines confirm, improving nutrient absorption and reducing vomiting, aspiration and diarrhoea.",
  },
  {
    title: "ENFit misconnection safety",
    body: "Enteral misconnections can result in life-threatening events. The ENFit connector geometry physically eliminates Luer misconnection with IV lines.",
  },
  {
    title: "Ward-ready handling",
    body: "Closable funnel, 1.2/1.5 litre bag, extra medication port and roller clamp — preferred by nurses and paramedical staff.",
  },
  {
    title: "Infection control",
    body: "A closed, single-use delivery path that reduces bacterial translocation compared with open feeding.",
  },
] as const;
