import { text } from "@/lib/cms/content";
import { site } from "@/lib/site";
import { saveSettings } from "@/app/admin/actions";

const inputClass =
  "mt-2 w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

export default async function AdminSettingsPage() {
  const values = {
    email: await text("site.email", site.email),
    phone: await text("site.phone", site.phone),
    city: await text("site.city", site.city),
    country: await text("site.country", site.country),
    coordinates: await text("site.coordinates", site.coordinates),
    footerTagline: await text(
      "footer.tagline",
      "Clinical nutrition, engineered for recovery — from Nepal, for better healthcare outcomes.",
    ),
    footerMotto: await text("footer.motto", "Precision is care."),
  };

  const fields: { name: keyof typeof values; label: string; hint?: string }[] = [
    {
      name: "email",
      label: "Contact email",
      hint: "Separate multiple addresses with commas",
    },
    { name: "phone", label: "Phone", hint: "Separate multiple numbers with commas" },
    { name: "city", label: "City" },
    { name: "country", label: "Country" },
    { name: "coordinates", label: "Coordinates", hint: "Shown in the footer and contact page" },
    { name: "footerTagline", label: "Footer tagline" },
    { name: "footerMotto", label: "Footer motto" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-8 py-12 lg:px-12">
      <p className="text-eyebrow text-primary">Settings</p>
      <h1 className="text-display mt-4">Site identity.</h1>
      <p className="text-lead mt-4 max-w-2xl text-muted-foreground">
        Contact details and recurring copy. Clearing a field returns it to the
        default written in code.
      </p>

      <form action={saveSettings} className="mt-12 space-y-6">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="text-eyebrow text-muted-foreground">
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type="text"
              defaultValue={values[f.name]}
              className={inputClass}
            />
            {f.hint ? (
              <p className="text-data mt-1.5 text-muted-foreground">{f.hint}</p>
            ) : null}
          </div>
        ))}
        <button
          type="submit"
          className="bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground"
        >
          Save settings
        </button>
      </form>
    </div>
  );
}
