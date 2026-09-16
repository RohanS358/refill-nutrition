"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  assertAdmin,
  checkCredentials,
  createSession,
  destroySession,
} from "@/lib/cms/auth";
import {
  readOverrides,
  writeOverrides,
  resetOverrides,
  setPath,
} from "@/lib/cms/store";
import {
  productFamilies,
  expertiseDomains,
  evidenceDecks,
  ranges,
  type ProductFamily,
} from "@/lib/products";
import { milestones, statistics } from "@/lib/timeline";
import { solutions } from "@/lib/solutions";
import { brochures, type Brochure } from "@/lib/brochures";
import { saveUpload, deleteUpload } from "@/lib/cms/uploads";

/**
 * Defaults for collections the visual editor can deep-edit via "col:" keys.
 * On the first deep edit a collection is copied from its code default into
 * the override file, then patched in place (copy-on-write).
 */
const collectionDefaults: Record<string, unknown> = {
  products: productFamilies,
  expertise: expertiseDomains,
  timeline: milestones,
  stats: statistics,
  solutions,
  evidence: evidenceDecks,
  ranges,
  brochures,
};

function revalidateSite() {
  revalidatePath("/", "layout");
}

/** contentEditable innerText → single-line text (keys edit inline spans). */
function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export type LoginState = { error: string | null };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!checkCredentials(username, password)) {
    return { error: "Invalid credentials. Try again." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await assertAdmin();
  await destroySession();
  redirect("/admin/login");
}

/**
 * Publish a batch of visual-editor edits. Plain keys land in the flat text
 * map; "col:<name>.<path>" keys are patched into the named collection.
 */
export async function saveTexts(changes: Record<string, string>): Promise<void> {
  await assertAdmin();
  const overrides = await readOverrides();
  for (const [key, raw] of Object.entries(changes)) {
    const value = cleanText(raw);
    if (key.startsWith("col:")) {
      const [name, ...path] = key.slice(4).split(".");
      const defaults = collectionDefaults[name];
      if (!defaults || path.length === 0) continue;
      const effective = structuredClone(overrides.collections[name] ?? defaults);
      setPath(effective, path, value);
      overrides.collections[name] = effective;
    } else {
      overrides.texts[key] = value;
    }
  }
  await writeOverrides(overrides);
  revalidateSite();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Replace the whole product catalogue (admin products CRUD). */
export async function saveProducts(families: ProductFamily[]): Promise<void> {
  await assertAdmin();
  const cleaned = families
    .filter((f) => f.name.trim().length > 0)
    .map((f, i) => ({
      ...f,
      id: f.id || slugify(f.name),
      index: String(i + 1).padStart(2, "0"),
      compounds: f.compounds.filter((c) => c.label.trim().length > 0),
      applications: f.applications.map((a) => a.trim()).filter(Boolean),
      claims: f.claims?.map((c) => c.trim()).filter(Boolean),
      directions: f.directions?.map((d) => d.trim()).filter(Boolean),
      references: f.references?.map((r) => r.trim()).filter(Boolean),
      perTin: f.perTin?.filter((m) => m.label.trim().length > 0),
      nutrition: f.nutrition
        ? {
            ...f.nutrition,
            rows: f.nutrition.rows.filter((r) => r.nutrient.trim().length > 0),
          }
        : undefined,
    }));
  const overrides = await readOverrides();
  overrides.collections.products = cleaned;
  await writeOverrides(overrides);
  revalidateSite();
}

/** Site identity settings — stored as text overrides on "site.*" keys. */
export async function saveSettings(formData: FormData): Promise<void> {
  await assertAdmin();
  const fields: Record<string, string> = {
    "site.email": String(formData.get("email") ?? ""),
    "site.phone": String(formData.get("phone") ?? ""),
    "site.city": String(formData.get("city") ?? ""),
    "site.country": String(formData.get("country") ?? ""),
    "site.coordinates": String(formData.get("coordinates") ?? ""),
    "footer.tagline": String(formData.get("footerTagline") ?? ""),
    "footer.motto": String(formData.get("footerMotto") ?? ""),
  };
  const overrides = await readOverrides();
  for (const [key, value] of Object.entries(fields)) {
    const cleaned = cleanText(value);
    if (cleaned) overrides.texts[key] = cleaned;
    else delete overrides.texts[key]; // empty field = back to the code default
  }
  await writeOverrides(overrides);
  revalidateSite();
}

/** Danger zone: drop every override and return the site to code defaults. */
export async function resetAllContent(): Promise<void> {
  await assertAdmin();
  await resetOverrides();
  revalidateSite();
}


/**
 * Upload one product image (PNG/JPG/WebP, max 2 MB). Returns the public URL
 * for the caller to store in the product's `image` field.
 */
export async function uploadImage(formData: FormData): Promise<
  { ok: true; url: string } | { ok: false; error: string }
> {
  await assertAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false, error: "No file received." };
  return saveUpload(file);
}

/** Remove an uploaded image that is no longer referenced. */
export async function removeImage(url: string): Promise<void> {
  await assertAdmin();
  await deleteUpload(url);
  revalidateSite();
}

/** Replace the brochure shelf (admin brochures CRUD). */
export async function saveBrochures(items: Brochure[]): Promise<void> {
  await assertAdmin();
  const cleaned = items
    .filter((b) => b.title.trim().length > 0)
    .map((b) => ({
      ...b,
      id: b.id || slugify(b.title),
      pages: b.pages.map((p) => p.trim()).filter(Boolean),
    }))
    .filter((b) => b.pages.length > 0);
  const overrides = await readOverrides();
  overrides.collections.brochures = cleaned;
  await writeOverrides(overrides);
  revalidateSite();
}
