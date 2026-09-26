// Run: npx tsx lib/catalogue.test.ts
import assert from "node:assert";
import { productFamilies } from "./products";
import {
  applicationKey,
  applications,
  filterProducts,
  matchesQuery,
  relatedProducts,
} from "./catalogue";

// "Geriatric" and "Geriatrics" are the same indication.
assert.equal(applicationKey("Geriatrics"), applicationKey("Geriatric"));
assert.equal(applicationKey("  Oncology "), "oncology");

const apps = applications(productFamilies);
assert.ok(apps.length > 0, "catalogue should expose indications");
assert.ok(
  apps.every((a) => a.count <= productFamilies.length),
  "an indication cannot be held by more products than exist",
);
// Normalised, so the singular/plural pair collapses to one chip.
assert.equal(apps.filter((a) => a.key === "geriatric").length, 1);
assert.deepEqual([...apps].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label)), apps);

// Search reaches composition, not just the name.
const magnesium = productFamilies.filter((p) => matchesQuery(p, "magnesium"));
assert.ok(magnesium.length > 0, "should find products containing magnesium");
assert.ok(
  magnesium.some((p) => !/magnesium/i.test(p.name)),
  "search must reach compounds, not only product names",
);

// Extra terms narrow the result set.
const broad = filterProducts(productFamilies, { query: "protein" });
const narrow = filterProducts(productFamilies, { query: "protein renal" });
assert.ok(narrow.length <= broad.length);
assert.equal(filterProducts(productFamilies, { query: "" }).length, productFamilies.length);
assert.equal(filterProducts(productFamilies, { query: "zzzzz" }).length, 0);

// Filters compose.
const enteral = filterProducts(productFamilies, { range: "enteral" });
assert.ok(enteral.length > 0 && enteral.every((p) => p.range === "enteral"));
const onc = filterProducts(productFamilies, { application: "oncology" });
assert.ok(onc.length > 0 && onc.every((p) => p.applications.some((a) => applicationKey(a) === "oncology")));

// Related products never include self, respect the limit, and stay non-empty.
for (const p of productFamilies) {
  const rel = relatedProducts(p, productFamilies);
  assert.ok(!rel.some((r) => r.id === p.id), `${p.id} related to itself`);
  assert.ok(rel.length <= 3);
  assert.ok(rel.length > 0, `${p.id} has no related products`);
}

console.log(`ok — ${productFamilies.length} products, ${apps.length} indications`);
