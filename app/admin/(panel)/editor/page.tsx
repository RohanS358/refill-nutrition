import { VisualEditor } from "@/components/cms/visual-editor";

const editableRoutes = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Critical Care Nutrition", href: "/solutions/critical-care-nutrition" },
  { label: "Medical Devices", href: "/solutions/medical-devices" },
  { label: "Research", href: "/research" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function AdminEditorPage() {
  return <VisualEditor routes={editableRoutes} />;
}
