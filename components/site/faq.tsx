import { JsonLd } from "./json-ld";
import { Section } from "./section";

// Answers restate the printed literature and site copy — no new claims.
const faqs = [
  {
    q: "Who are Refill Enterprises' products for?",
    a: "For the use of a Registered Medical Practitioner, Hospital or Laboratory only. Nutritional supplements are not for medicinal use.",
  },
  {
    q: "What does the progain range cover?",
    a: "The progain enteral range serves ICU, renal, diabetic and paediatric care, alongside supplementation products and ENFit enteral delivery sets.",
  },
  {
    q: "Where is Refill Enterprises based?",
    a: "Refill Enterprises Pvt. Ltd. is a clinical nutrition company based in Dillibazar, Kathmandu, Nepal.",
  },
  {
    q: "How do I ask about SKUs, dosing or supply?",
    a: "Figures on this site reproduce the printed literature. For SKU-level dosing, registration, hospital procurement and distribution, contact our team through the contact page.",
  },
];

/** Visible FAQ with matching FAQPage markup. */
export function Faq() {
  return (
    <Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />
      <h2 className="text-display text-[clamp(1.6rem,2.8vw,2.4rem)]">Frequently asked questions</h2>
      <div className="mt-8 max-w-3xl divide-y divide-border border-y border-border">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group py-5">
            <summary className="cursor-pointer text-base font-semibold">{q}</summary>
            <p className="mt-3 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
