// The clinical catalogue — transcribed from the Refill product brochures
// (public/images/*.ai). Nutrition figures, claims and references are taken
// verbatim from the printed literature; edit here, not in components.

export type Compound = {
  label: string;
  value: string;
};

/** A row of the printed "Nutrition Information" panel. */
export type NutrientRow = {
  nutrient: string;
  unit: string;
  per100: string;
  perServing: string;
};

export type ProductFamily = {
  id: string;
  index: string;
  name: string;
  /** Sub-brand line as printed on the pack, e.g. "Whey… for good heal". */
  strapline?: string;
  category: string;
  molecule: "calcium" | "amino" | "omega" | "metabolic";
  /** Range this SKU belongs to — drives catalogue grouping. */
  range: RangeId;
  summary: string;
  detail: string;
  compounds: Compound[];
  applications: string[];
  /** Transparent product render extracted from the brochure artwork. */
  image?: string;
  pack?: string;
  flavour?: string;
  /** Printed nutrition panel, when the brochure carries one. */
  nutrition?: {
    servingNote: string;
    rows: NutrientRow[];
  };
  /** Per-tin macro wheel printed on the brochures. */
  perTin?: { label: string; value: string }[];
  /** Claims as printed, each with its brochure reference marker. */
  claims?: string[];
  directions?: string[];
  suggestedUse?: string;
  references?: string[];
};

export type RangeId = "enteral" | "daily" | "tablets" | "devices";

export type Range = {
  id: RangeId;
  index: string;
  title: string;
  eyebrow: string;
  summary: string;
};

/** The four ranges the printed portfolio actually divides into. */
export const ranges: Range[] = [
  {
    id: "enteral",
    index: "01",
    title: "Enteral & Specialised Nutrition",
    eyebrow: "progain range",
    summary:
      "Food for special dietary purpose — disease-specific powders for intensive care, renal, diabetic, paediatric and malabsorptive states.",
  },
  {
    id: "daily",
    index: "02",
    title: "Daily Protein Nutrition",
    eyebrow: "re-pro",
    summary:
      "Assured daily protein with vital nutrients, for acute illness and general weakness outside the critical-care setting.",
  },
  {
    id: "tablets",
    index: "03",
    title: "Tablets & Syrups",
    eyebrow: "Supplement range",
    summary:
      "Calcium, antioxidant and curcumin supplementation in tablet and syrup form — bone health, cardiovascular and oncology support.",
  },
  {
    id: "devices",
    index: "04",
    title: "Medical Devices",
    eyebrow: "BAITONG",
    summary:
      "ENFit-standard enteral delivery systems — continuous feeding sets engineered to eliminate Luer misconnection.",
  },
];

export const productFamilies: ProductFamily[] = [
  {
    id: "progain-hp",
    index: "01",
    name: "progain-hp",
    strapline: "Whey… for good heal",
    category: "Protein 100% Whey",
    molecule: "amino",
    range: "enteral",
    image: "/products/progain-hp.webp",
    pack: "400 g jar",
    flavour: "Vanilla",
    summary:
      "100% whey protein at 42% concentration for faster recovery in the critically ill — where a patient can lose up to 1 kg of lean body mass a day.",
    detail:
      "Critically ill patients can lose up to 1 kg of lean body mass daily, and that loss is associated with increased mortality. Progain-HP delivers 100% whey at 42% high-quality protein, enriched with 10% soluble dietary fibre and 26 vitamins and minerals, for the hypermetabolic states that drive decreased immunity, increased weakness and delayed recovery.",
    compounds: [
      { label: "Protein (per 100 g)", value: "42 g — 100% whey" },
      { label: "Leucine / BCAA", value: "14% / 26%" },
      { label: "Soluble dietary fibre", value: "10%" },
      { label: "Vitamins & minerals", value: "26" },
    ],
    applications: [
      "Intensive care",
      "Surgery",
      "Neurology",
      "Oncology",
      "Gastroenterology",
      "Geriatrics",
      "Pregnancy & lactation",
    ],
    nutrition: {
      servingNote: "Per serving = 25 g (2 scoops)",
      rows: [
        { nutrient: "Energy", unit: "kcal", per100: "364", perServing: "87" },
        { nutrient: "Protein", unit: "g", per100: "42", perServing: "10.50" },
        { nutrient: "Fat", unit: "g", per100: "3", perServing: "0.75" },
        { nutrient: "Carbohydrates", unit: "g", per100: "41", perServing: "10.25" },
        { nutrient: "Dietary fibre", unit: "g", per100: "10", perServing: "2.5" },
      ],
    },
    perTin: [
      { label: "Energy (kcal)", value: "1456" },
      { label: "Protein (g)", value: "168" },
      { label: "Carbs (g)", value: "164" },
      { label: "Lipid (g)", value: "12" },
    ],
    claims: [
      "Early high protein intake was associated with lower mortality — 37%",
      "Rich source of leucine (14%) and BCAAs (26%)",
      "Rapid digestion & absorption",
      "Increases blood levels of EAAs and creates muscle protein",
      "Sugar free, suitable for diabetes",
    ],
    directions: [
      "Take 60–100 ml warm water in a glass",
      "Add 2 scoops (25 g) of Progain-HP powder, add sugar to taste",
      "Stir until dissolved completely",
    ],
    suggestedUse:
      "For management of dietary requirement in intensive care, surgery, neurology, oncology, gastroenterology, geriatrics, pregnancy and lactation.",
    references: [
      "J Anesth Crit Care Open Access 2016, 6(1): 00213",
      "CN Vol.17 No.2 May 2017; p45–p47",
      "JAMDA 14 (2013) 542EFF9",
      "Annals of Intensive Care (2015) 5:11",
    ],
  },
  {
    id: "progain-lp",
    index: "02",
    name: "progain-lp",
    strapline: "Balanced nutrition for renal care",
    category: "Low Protein Powder",
    molecule: "metabolic",
    range: "enteral",
    image: "/products/progain-lp.webp",
    pack: "400 g jar",
    flavour: "Creamy Vanilla",
    summary:
      "A tailored pack for the nutritional need of CKD patients — calorie-dense, low in protein, potassium and phosphorus.",
    detail:
      "Chronic kidney disease ranks as the 8th leading cause of death, with CKD stage 1–5 prevalence at 17.2% of the urban population. Progain-LP is built for pre-dialysis renal care: 2 kcal/ml calorie density with low electrolyte and low protein loading, free from vitamins A and K, enriched with fibre and FOS.",
    compounds: [
      { label: "Calorie density", value: "2 kcal/ml" },
      { label: "Protein (per 100 g)", value: "9.00 g" },
      { label: "Protein : Fat : Carb", value: "18 : 41 : 41" },
      { label: "Vitamins A & K", value: "free from" },
    ],
    applications: ["Chronic kidney disease", "Pre-dialysis renal care", "Low-GI diets"],
    nutrition: {
      servingNote: "Per serving = 21 g",
      rows: [
        { nutrient: "Energy", unit: "kcal", per100: "474", perServing: "99.5" },
        { nutrient: "Protein", unit: "g", per100: "9.00", perServing: "1.89" },
        { nutrient: "Fat", unit: "g", per100: "22.0", perServing: "4.62" },
        { nutrient: "Cholesterol", unit: "mg", per100: "10.0", perServing: "2.10" },
        { nutrient: "Carbohydrate", unit: "g", per100: "60.0", perServing: "12.6" },
        { nutrient: "Sugar (sucrose)", unit: "g", per100: "0.00", perServing: "0.00" },
      ],
    },
    perTin: [
      { label: "Energy (kcal)", value: "1920" },
      { label: "Protein (g)", value: "36" },
      { label: "Carbs (g)", value: "267" },
      { label: "Lipid (g)", value: "82" },
    ],
    claims: [
      "Low potassium — prevents adverse outcomes such as mortality and ESRD",
      "Low protein — reduces relative risk of initiating dialysis by 31%, occurrence of renal death by 32%",
      "Low phosphorus — reduces vascular stiffening",
      "FOS decreases uraemic toxin production",
      "Transfat free, gluten free, sucrose free",
    ],
    directions: [
      "For 60 ml and 120 kcal, take 40 ml of fresh boiled and cooled water",
      "Add 25 g (2 heaped spoons) of Progain-LP powder",
      "Stir thoroughly and consume immediately",
    ],
    suggestedUse:
      "Kidney disease (pre-dialysis). For oral use: 4–5 servings/day. For supplemental use: 1–3 servings per day.",
    references: [
      "BMC Nephrol. 2016; 17: 76",
      "Semin Dial. 2015 Mar; 28(2): 159-168",
      "Kidney International; Volume 88, Issue 5, November 2015, Pages 958-966",
      "Miner Electrolyte Metab. 1999 Jul-Dec; 25(4-6):349-51",
    ],
  },
  {
    id: "progain-dm",
    index: "03",
    name: "progain-dm",
    strapline: "The perfect fit for diabetic patients",
    category: "Nutritionally Balanced Meal Replacement for Diabetics",
    molecule: "metabolic",
    range: "enteral",
    image: "/products/progain-dm.webp",
    pack: "400 g jar",
    flavour: "Vanilla",
    summary:
      "A low-glycaemic meal replacement with prebiotic FOS, formulated for diabetes and stress-induced hyperglycaemia.",
    detail:
      "Diabetes-specific formulae improved glycaemic control compared with standard formulas. Progain-DM pairs a low glycaemic index and load with the highest dietary fibre in the range at 14 g/100 g, 34 micronutrients, and MUFA and omega-3 fatty acids.",
    compounds: [
      { label: "Protein (per 100 g)", value: "20 g" },
      { label: "Dietary fibre", value: "14 g / 100 g" },
      { label: "Omega-3 (α-linolenic)", value: "633 mg / 100 g" },
      { label: "Micronutrients", value: "34" },
    ],
    applications: [
      "Diabetes mellitus",
      "Stress-induced hyperglycaemia",
      "Intensive care",
      "Surgery",
      "Neurology",
      "Oncology",
      "Gastroenterology",
    ],
    nutrition: {
      servingNote: "Per serving = 50 g (4 level scoops)",
      rows: [
        { nutrient: "Energy", unit: "kcal", per100: "431", perServing: "215.50" },
        { nutrient: "Protein", unit: "g", per100: "20", perServing: "10" },
        { nutrient: "Fat", unit: "g", per100: "14", perServing: "7" },
        { nutrient: "Omega 3 (α-linolenic) fat", unit: "mg", per100: "633", perServing: "316.50" },
        { nutrient: "Trans fat", unit: "g", per100: "0", perServing: "0" },
        { nutrient: "Carbohydrate", unit: "g", per100: "60", perServing: "30" },
        { nutrient: "Dietary fibre", unit: "g", per100: "10", perServing: "5" },
        { nutrient: "Fructo-oligosaccharides (FOS)", unit: "g", per100: "4", perServing: "2" },
      ],
    },
    perTin: [
      { label: "Energy (kcal)", value: "1724" },
      { label: "Protein (g)", value: "80" },
      { label: "Carbs (g)", value: "240" },
      { label: "Lipid (g)", value: "56" },
    ],
    claims: [
      "Reduces HbA1c (8.2% to 5.8%)",
      "Reduces CV complications",
      "71% reduced requirement for insulin",
      "Reduces risk of infection and improves glycaemic control in high-risk ICU patients",
      "Sucrose free, cholesterol free, fibre rich",
    ],
    directions: [
      "To prepare a feed, take 200 ml of cold potable water in a glass",
      "Add 50 g of Progain-DM powder (4 level scoops)",
      "Stir until dissolved completely",
    ],
    suggestedUse:
      "For management of dietary requirement in stress-induced hyperglycaemia, diabetes mellitus, intensive care, surgery, neurology, oncology, gastroenterology.",
    references: [
      "Diabetol Metab Syndr (2017) 9:8",
      "Lancet Diabetes Endocrinol. 2017 Aug;5(8):585-596",
      "Diabetes Care 28:2267-2279, 2005",
      "Critical Care (2015) 19:390",
    ],
  },
  {
    id: "progain-peptide",
    index: "04",
    name: "progain-peptide",
    strapline: "Complete Elemental Nutrition Formula",
    category: "Hydrolyzed Whey Protein",
    molecule: "amino",
    range: "enteral",
    image: "/products/progain-peptide.webp",
    pack: "400 g jar",
    flavour: "Vanilla",
    summary:
      "Hydrolysed whey protein for better absorption and recovery, at 1 kcal/ml elemental calorie density.",
    detail:
      "A complete elemental formula built on hydrolysed whey — pre-digested protein for compromised absorption. Lactose free, transfat free and gluten free, with BCAA and L-carnitine at 1 kcal/ml.",
    compounds: [
      { label: "Protein (per 100 g)", value: "21 g — hydrolysed whey" },
      { label: "Calorie density", value: "1 kcal/ml" },
      { label: "Contains", value: "BCAA & L-Carnitine" },
      { label: "Added sugar", value: "0" },
    ],
    applications: [
      "Intensive care",
      "Surgery",
      "Neurology",
      "Geriatric",
      "Gastroenterology",
      "Oncology",
    ],
    nutrition: {
      servingNote: "Per serving = 25 g (2 scoops)",
      rows: [
        { nutrient: "Energy", unit: "kcal", per100: "498", perServing: "124" },
        { nutrient: "Protein", unit: "g", per100: "21", perServing: "5.25" },
        { nutrient: "Fat", unit: "g", per100: "24", perServing: "6" },
        { nutrient: "Carbohydrates", unit: "g", per100: "50", perServing: "12.50" },
        { nutrient: "Added sugar", unit: "g", per100: "0", perServing: "0" },
      ],
    },
    perTin: [
      { label: "Energy (kcal)", value: "1992" },
      { label: "Protein (g)", value: "84" },
      { label: "Carbs (g)", value: "200" },
      { label: "Lipid (g)", value: "96" },
    ],
    claims: [
      "Hydrolysed whey protein for better absorption & recovery",
      "1 kcal/ml calorie density",
      "Contains BCAA & L-Carnitine",
      "Lactose free, transfat free, gluten free",
    ],
    directions: [
      "To prepare a feed take 100 ml of cold potable water in a glass",
      "Add 25 g of progain powder (2 scoops)",
      "Stir until dissolved completely",
    ],
    suggestedUse:
      "Intensive care, surgery, neurology, geriatric, gastroenterology, oncology.",
  },
  {
    id: "progain-junior",
    index: "05",
    name: "progain junior — Kidz",
    strapline: "Imagine what every kid can be?",
    category: "A Complete Nutrition for Children",
    molecule: "amino",
    range: "enteral",
    image: "/products/progain-junior.webp",
    pack: "200 g jar",
    flavour: "Vanilla · Premium Chocolate",
    summary:
      "A hypoallergenic, amino-acid-based paediatric formula for brain, cognition and physical growth from 1 year.",
    detail:
      "Daily meals often lack enough protein, fibre, DHA and other nutrients. Progain Junior meets the extra nutritional need of a child's plate with 34 vital nutrients, DHA and choline for brain and cognition, and the protein and micronutrients that influence height and bone mineral density.",
    compounds: [
      { label: "Protein (per tin)", value: "28 g" },
      { label: "Vital nutrients", value: "34" },
      { label: "Enriched with", value: "Taurine, Choline, Lactoferrin, FOS, probiotics" },
      { label: "Age", value: "1+ years" },
    ],
    applications: ["Brain & cognition development", "Height & physical growth", "Bone health"],
    perTin: [
      { label: "Energy (kcal)", value: "992" },
      { label: "Protein (g)", value: "28" },
      { label: "Carbs (g)", value: "120" },
      { label: "Lipid (g)", value: "40" },
    ],
    claims: [
      "DHA improves measures of school performance including learning ability, reading and spelling",
      "Choline increases memory capacity and plays a central role in memory & learning",
      "Protein intake helps increase height at a mean rate of 0.5 cm every 4 weeks",
      "Calcium has a positive effect on total body BMC and upper limb BMD",
      "Gluten free, lactose free, hypoallergenic",
    ],
    suggestedUse: "Dosage — 2 to 3 servings per day or as suggested by physician.",
    references: [
      "Nutrients. 2013 Jul; 5(7): 2777-2810",
      "Neurosci Biobehav Rev. 2003 Sep; 27(4):385-99",
      "Journal of Human Nutrition and Dietetics; Volume 28, Issue 6, pages 623-635",
      "BMJ 2011; 342",
    ],
  },
  {
    id: "re-pro",
    index: "06",
    name: "re-pro",
    strapline: "Assured Protein with Vital Nutrients",
    category: "Daily protein supplement",
    molecule: "amino",
    range: "daily",
    image: "/products/re-pro.webp",
    pack: "200 g tin",
    flavour: "Vanilla",
    summary:
      "Highest-quality soy protein at 32 g per 100 g, fortified with 26 vitamins, minerals and fibre — for strength, immunity and vitality.",
    detail:
      "For assured daily protein requirements outside the critical-care setting. Re-Pro is a sugar-free soy protein supplement carrying EPA and DHA alongside 26 vitamins and minerals, indicated in acute illness and general weakness.",
    compounds: [
      { label: "Protein (per 100 g)", value: "32 g — soy" },
      { label: "EPA / DHA", value: "40 mg / 200 mg per 100 g" },
      { label: "Vitamins & minerals", value: "26" },
      { label: "Sugar (sucrose)", value: "0" },
    ],
    applications: ["Acute illness", "General weakness", "Daily protein supplementation"],
    nutrition: {
      servingNote: "Per serving = 25 g (2 scoops)",
      rows: [
        { nutrient: "Energy", unit: "kcal", per100: "365", perServing: "91.25" },
        { nutrient: "Protein", unit: "g", per100: "32", perServing: "8.00" },
        { nutrient: "Carbohydrate", unit: "g", per100: "57", perServing: "14.25" },
        { nutrient: "Sugar (sucrose)", unit: "g", per100: "0", perServing: "0.00" },
        { nutrient: "Dietary fibre", unit: "g", per100: "2", perServing: "0.50" },
        { nutrient: "Fat", unit: "g", per100: "1", perServing: "0.25" },
        { nutrient: "EPA", unit: "mg", per100: "40", perServing: "10" },
        { nutrient: "DHA", unit: "mg", per100: "200", perServing: "50" },
      ],
    },
    perTin: [
      { label: "Energy (kcal)", value: "730" },
      { label: "Protein (g)", value: "64" },
      { label: "Carbs (g)", value: "114" },
      { label: "Lipid (g)", value: "02" },
    ],
    claims: [
      "Highest quality soy protein",
      "32 g of protein per 100 g powder",
      "Fortified with 26 vitamins, minerals & fibre",
      "Sugar free",
    ],
    directions: [
      "Take a mug of lukewarm or cold milk (150 ml)",
      "Add 2 scoops of Re-Pro powder (25 g)",
      "Upon reconstitution, stir well until dissolved and use promptly",
    ],
    suggestedUse: "For management of dietary requirement in acute illness and general weakness.",
  },
  {
    id: "calcinine",
    index: "07",
    name: "Calcinine",
    category: "Calcium Carbonate, Vitamin D3, Magnesium, Cyanocobalamin & Zinc Sulphate Tablets",
    molecule: "calcium",
    range: "tablets",
    image: "/products/calcinine.webp",
    pack: "30 tablets",
    summary:
      "1250 mg calcium carbonate with D3, magnesium, B12 and zinc — bone, joint and neuroregeneration support in one tablet.",
    detail:
      "A five-component tablet built around 1250 mg calcium carbonate, equivalent to 500 mg elemental calcium at 50% RDA, with 800 IU vitamin D3 and cyanocobalamin at 600% RDA for neuroregeneration and neuronal lipid production.",
    compounds: [
      { label: "Calcium carbonate", value: "1250 mg" },
      { label: "Eq. elemental calcium", value: "500 mg — 50% RDA" },
      { label: "Vitamin D3", value: "800 IU — 133% RDA" },
      { label: "Magnesium", value: "340 mg — 54% RDA" },
      { label: "Cyanocobalamin", value: "15 mcg — 600% RDA" },
      { label: "Zinc", value: "10 mg — 58% RDA" },
    ],
    applications: ["Bone & joint health", "Neuroregeneration", "Muscle & nerve function", "Immunity"],
    claims: [
      "Promotes bones & joints health",
      "Helps in neuroregeneration & neuronal lipid production",
      "Helps in smooth functioning of muscles & nerves",
      "Boosts immunity",
    ],
    suggestedUse: "Nutritional supplement. Not for medicinal use.",
  },
  {
    id: "recal-m",
    index: "08",
    name: "Recal-M",
    strapline: "Calcium from the natural source",
    category: "Milk Calcium, Vitamin D3 & Zinc Sulphate Tablets",
    molecule: "calcium",
    range: "tablets",
    image: "/products/recal-m.webp",
    pack: "60 tablets",
    summary:
      "Milk-derived calcium with D3 and zinc, for osteoporosis, osteoarthritis, fracture recovery and pregnancy.",
    detail:
      "Calcium from the natural source — 600 mg milk calcium equivalent to 240 mg elemental calcium, paired with 400 IU vitamin D3 at 67% RDA and zinc sulphate.",
    compounds: [
      { label: "Milk calcium", value: "600 mg" },
      { label: "Eq. elemental calcium", value: "240 mg — 24% RDA" },
      { label: "Vitamin D3", value: "400 IU — 67% RDA" },
      { label: "Zinc sulphate", value: "10 mg" },
    ],
    applications: [
      "Osteoporosis",
      "Osteoarthritis",
      "Bone fracture",
      "Hypocalcemia",
      "Joint pain",
      "Pregnancy & lactation",
    ],
    suggestedUse: "Nutritional supplement. Not for medicinal use.",
  },
  {
    id: "cardivit",
    index: "09",
    name: "Cardivit",
    strapline: "Cardivit for healthy life",
    category: "Green Tea, Grape Seed, Sitosterol, Omega 3, Zinc & Selenium Tablets",
    molecule: "omega",
    range: "tablets",
    image: "/products/cardivit.webp",
    pack: "1 × 10 tablets",
    summary:
      "A triple-antioxidant tablet with omega-3, sitosterol and selenium — cardiovascular, neurological and oncology support.",
    detail:
      "Green tea extract, grape seed extract and sitosterol combined with 200 mg omega-3 fatty acid, zinc sulphate and sodium selenite. Indicated across cardiovascular disease, type 2 diabetes and neurodegenerative disease, and used to reduce the neurotoxicity and nephrotoxicity of chemotherapy.",
    compounds: [
      { label: "Omega 3 fatty acid", value: "200 mg" },
      { label: "Green tea extract", value: "150 mg" },
      { label: "Grapeseed extract", value: "100 mg" },
      { label: "Sitosterol", value: "49 mg" },
      { label: "Zinc sulphate", value: "10 mg" },
      { label: "Sodium selenite", value: "40 mcg" },
    ],
    applications: ["Neurology", "Cardiology", "Endocrinology", "Oncology", "Rheumatology"],
    claims: [
      "Cardiovascular disease, type 2 diabetes, neurodegeneration",
      "Anti-inflammatory agent, triple antioxidant effect",
      "Reduces oxidative stress, helps in anorexia, boosts immunity",
      "Reduces neurotoxicity & nephrotoxicity of chemotherapy",
    ],
    suggestedUse: "Nutritional supplement. Not for medicinal use.",
  },
  {
    id: "recure",
    index: "10",
    name: "Recure",
    category: "Curcumin Ext., Lycopene & Piperine Syrup",
    molecule: "metabolic",
    range: "tablets",
    image: "/products/recure.webp",
    pack: "100 ml syrup",
    summary:
      "95% curcumin extract with lycopene and piperine — anti-inflammatory and antioxidant support for chronically ill patients.",
    detail:
      "A syrup formulation carrying 95% curcumin extract with lycopene and piperine at 10% each per 5 ml, indicated to reduce CRP levels, minimise chemotherapy-related side effects and enhance quality of life in chronically ill patients.",
    compounds: [
      { label: "Curcumin Ex. 95%", value: "500 kcal per 5 ml" },
      { label: "Lycopene 10%", value: "10 mg per 5 ml" },
      { label: "Piperine 10%", value: "10 mg per 5 ml" },
    ],
    applications: ["Oncology", "Cardiovascular disease", "Alzheimer's", "Diabetes mellitus"],
    nutrition: {
      servingNote: "Approximate values per 5 ml",
      rows: [
        { nutrient: "Curcumin Ex. 95%", unit: "kcal", per100: "—", perServing: "500" },
        { nutrient: "Lycopene 10%", unit: "mg", per100: "—", perServing: "10" },
        { nutrient: "Piperine 10%", unit: "mg", per100: "—", perServing: "10" },
      ],
    },
    claims: [
      "Anti-inflammatory effect, reduces CRP levels",
      "Anti-oxidant effect",
      "Eases thermal hyperalgesia in diabetes mellitus",
      "Minimizes chemotherapy related side effects",
      "Enhances the quality of life in chronically ill patients",
      "Helps in patients with CVD, Alzheimer's, cancer",
    ],
    suggestedUse: "Nutritional supplement. Not for medicinal use.",
  },
  {
    id: "gravity-set-bag",
    index: "11",
    name: "BAITONG Gravity Set Bag",
    strapline: "Safety without compromise",
    category: "Continuous enteral feeding set",
    molecule: "metabolic",
    range: "devices",
    image: "/products/gravity-set-bag.webp",
    pack: "1.2 / 1.5 litre feeding bag",
    summary:
      "An ENFit-standard gravity feeding set that physically prevents misconnection with IV lines.",
    detail:
      "Enteral misconnections can result in life-threatening events. The BAITONG gravity set bag adopts the ENFit standard, whose geometry eliminates Luer misconnection with IV lines, and supports the continuous feeding that ESPEN and ASPEN guidelines confirm.",
    compounds: [
      { label: "Feeding bag", value: "1.2 / 1.5 litre" },
      { label: "Connector standard", value: "ENFit" },
      { label: "Ports", value: "Closable funnel, extra medication port" },
      { label: "Flow control", value: "Roller clamp & drip chamber" },
    ],
    applications: ["Continuous enteral feeding", "ICU & ward nutrition delivery"],
    claims: [
      "Improves nutrient absorption",
      "Reduces risk of vomiting, aspiration and diarrhoea",
      "Reduces bacterial translocation",
      "Preferred by nurses and paramedical staff",
      "Prevents mis-connection with IV lines",
    ],
    references: [
      "Steevens EC, Lipscomb AF, Poole GV, Sacks GS. Nutr Clin Pract 2002; 17(2):118-22",
      "Guenter P, Hicks RW, Simmons D, et al. Jt Comm J Qual Patient Saf 2008; 34(5):285-92",
    ],
  },
];

export type ExpertiseDomain = {
  index: string;
  title: string;
  body: string;
};

/** Expertise domains — home chapter 03. */
export const expertiseDomains: ExpertiseDomain[] = [
  {
    index: "01",
    title: "Critical Care Nutrition",
    body: "Nutritional therapy for intensive care, where a patient can lose up to 1 kg of lean body mass a day. Whey and hydrolysed-peptide formulations matched to hypermetabolic states.",
  },
  {
    index: "02",
    title: "Renal Nutrition",
    body: "CKD ranks as the 8th leading cause of death. Calorie-dense, low-protein and low-electrolyte formulations for the pre-dialysis patient.",
  },
  {
    index: "03",
    title: "Diabetic & Metabolic Nutrition",
    body: "Diabetes-specific formulae improve glycaemic control over standard formulas — low-GI substrates with prebiotic FOS and omega-3.",
  },
  {
    index: "04",
    title: "Oncology Nutrition Support",
    body: "80% of cancer patients develop malnutrition and 40% die from it. I.C.O.N.S. protocols pair energy and protein targets with antioxidant supplementation.",
  },
  {
    index: "05",
    title: "Bone Health & Supplementation",
    body: "Calcium systems from carbonate and milk-derived sources with D3, magnesium, B12 and zinc co-factors.",
  },
  {
    index: "06",
    title: "Enteral Delivery Devices",
    body: "ENFit-standard feeding systems that eliminate Luer misconnection — the delivery half of a nutrition protocol.",
  },
];

/** Clinical evidence decks that back the portfolio (brochure sections). */
export type EvidenceDeck = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  points: string[];
  references?: string[];
};

export const evidenceDecks: EvidenceDeck[] = [
  {
    id: "ckd",
    index: "01",
    title: "The rising burden of CKD",
    subtitle: "Chronic kidney disease and nutritional intervention",
    stats: [
      { value: "8th", label: "leading cause of death (GBD study)" },
      { value: "17.2%", label: "CKD stage 1–5 in urban population" },
      { value: "16.1%", label: "incidence of AKI in ICU" },
      { value: "61%", label: "of ESKD patients not on any form of RRT" },
    ],
    points: [
      "Correction of uraemic metabolic disturbances",
      "Prevention of electrolyte disturbances",
      "Attenuation of CKD progression",
      "To prevent under-nutrition",
    ],
    references: [
      "Lancet Glob Health. 2017 Jan;5(1):e14-e15",
      "Indian J Nephrol. 2014 Jul-Aug;24(4): 214-221",
      "Indian J Crit Care Med 2016;20:332-6",
      "Clinical Nutrition (2006) 25,295-310",
    ],
  },
  {
    id: "liver",
    index: "02",
    title: "Liver disease and malnutrition",
    subtitle: "10% to 100% of patients with liver disease suffer from malnutrition",
    stats: [
      { value: "20–100%", label: "alcoholic liver disease" },
      { value: "40%", label: "primary biliary cirrhosis" },
      { value: "12%", label: "chronic hepatitis" },
      { value: "2×", label: "increased mortality in hospitalised patients" },
    ],
    points: [
      "Nutritional therapy, particularly BCAA supplementation, is an attractive concept in the prevention and treatment of complications",
      "BCAA-enriched formulae in patients with chronic liver disease as nutritional therapy (oral / enteral route)",
      "Longer hospital stays without intervention",
    ],
    references: [
      "J. Nutr. January 2006; Vol.136; No. 1; 295S-298S",
      "Clinical Gastroenterology and Hepatology 2012;10:117-125",
      "ESPEN — espen.info/documents/Liver.pdf",
    ],
  },
  {
    id: "icons",
    index: "03",
    title: "I.C.O.N.S.",
    subtitle: "Improved Cancer Outcome with Nutrition Support",
    stats: [
      { value: "80%", label: "of cancer patients develop malnutrition" },
      { value: "40%", label: "of cancer patients die from malnutrition" },
      { value: "80%", label: "with advanced cancer suffer from anorexia" },
      { value: "2–2.5", label: "g/kg/day protein requirement" },
    ],
    points: [
      "Immune suppression and hyper-catabolism are frequently associated with malignancy",
      "Delivery of optimum nutrients is an issue",
      "Energy requirement 2000 kcal; glutamine 18–30 g/day",
    ],
    references: [
      "Arens J. Bodoky G, Bozzetti F, et al. ESPEN Guidelines on Enteral Nutrition: Non-surgical oncology. Clin Nutr 2006; 25(2): 245-59",
      "Mantovani G, Maccio A, Massa E, Madeddu C. Drugs 2001-61-499-514",
    ],
  },
];
