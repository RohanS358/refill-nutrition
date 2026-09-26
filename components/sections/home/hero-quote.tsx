import { RotatingQuote } from "@/components/motion/rotating-quote";
import { collection } from "@/lib/cms/content";
import { testimonials as testimonialDefaults } from "@/lib/testimonials";

/** The hero's low-profile voice line: doctors and families, one at a time. */
export async function HeroQuote() {
  const items = await collection("testimonials", testimonialDefaults);
  return (
    <RotatingQuote
      items={items.map((t, i) => ({
        quote: t.quote,
        name: t.name,
        meta: `${t.role} · ${t.place}`,
        kind: t.kind ?? "clinician",
        quoteKey: `col:testimonials.${i}.quote`,
        nameKey: `col:testimonials.${i}.name`,
      }))}
    />
  );
}
