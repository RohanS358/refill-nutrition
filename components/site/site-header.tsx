import { primaryNav } from "@/lib/site";
import { collection, text } from "@/lib/cms/content";
import { productFamilies, ranges as rangeDefaults } from "@/lib/products";
import { Header, type MegaMenuRange } from "./header";

/** Server half of the header: resolves CMS nav labels and the product menu. */
export async function SiteHeader() {
  const [families, ranges, nav, contactLabel] = await Promise.all([
    collection("products", productFamilies),
    collection("ranges", rangeDefaults),
    // Nav labels are CMS texts ("nav.about", …) so the admin can rename them.
    Promise.all(
      primaryNav.map(async (item) => {
        const key = `nav.${item.label.toLowerCase()}`;
        return { ...item, key, label: await text(key, item.label) };
      }),
    ),
    text("nav.contact", "Contact"),
  ]);

  // The products mega menu: every range, with the products filed under it.
  const menu: MegaMenuRange[] = ranges.map((r, i) => ({
    id: r.id,
    index: r.index,
    title: r.title,
    titleKey: `col:ranges.${i}.title`,
    products: families
      .map((p, j) => ({ p, j }))
      .filter(({ p }) => p.range === r.id)
      .map(({ p, j }) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        image: p.image,
        nameKey: `col:products.${j}.name`,
      })),
  }));

  return <Header nav={nav} menu={menu} contactLabel={contactLabel} />;
}
