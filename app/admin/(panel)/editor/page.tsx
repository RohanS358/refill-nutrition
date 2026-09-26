import { VisualEditor } from "@/components/cms/visual-editor";
import { collection } from "@/lib/cms/content";
import { productFamilies } from "@/lib/products";

const editableRoutes = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Compare products", href: "/products/compare" },
  { label: "Brochures", href: "/brochures" },
  { label: "Solutions", href: "/solutions" },
  { label: "Critical Care Nutrition", href: "/solutions/critical-care-nutrition" },
  { label: "Medical Devices", href: "/solutions/medical-devices" },
  { label: "Research", href: "/research" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default async function AdminEditorPage() {
  // Each product page too — labels edited on one apply to all of them.
  const families = await collection("products", productFamilies);
  const productRoutes = families.map((p) => ({ label: `Product — ${p.name}`, href: `/products/${p.id}` }));
  return <VisualEditor routes={[...editableRoutes, ...productRoutes]} />;
}
