import { collection } from "@/lib/cms/content";
import { testimonials } from "@/lib/testimonials";
import { productFamilies } from "@/lib/products";
import { TestimonialsEditor } from "@/components/cms/testimonials-editor";

export default async function AdminTestimonialsPage() {
  const [items, families] = await Promise.all([
    collection("testimonials", testimonials),
    collection("products", productFamilies),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-8 py-12 lg:px-12">
      <p className="text-eyebrow text-primary">Testimonials</p>
      <h1 className="text-display mt-4">What people say.</h1>
      <p className="text-lead mt-4 max-w-2xl text-muted-foreground">
        Quotes from clinicians and families. All of them scroll along the bottom of the home
        hero; the first four clinician quotes also fill the testimonials chapter. Only publish
        quotes you have the person&apos;s permission to use.
      </p>
      <TestimonialsEditor
        initial={items}
        products={families.map((p) => ({ id: p.id, name: p.name }))}
      />
    </div>
  );
}
