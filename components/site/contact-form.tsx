"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site, contactList } from "@/lib/site";

type Field = "name" | "organization" | "email" | "message";

/**
 * Contact form island. No backend yet (docs/future-roadmap.md):
 * validates locally, then opens a prefilled email to the company.
 */
export function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<string>("");

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email))
      next.email = "Please enter a valid email address.";
    if (!values.message.trim()) next.message = "Please include a short message.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("");
      return;
    }
    const subject = encodeURIComponent(`Website enquiry — ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nOrganization: ${values.organization || "—"}\nEmail: ${values.email}\n\n${values.message}`,
    );
    // mailto takes a comma-separated recipient list natively.
    const recipients = contactList(site.email);
    window.location.href = `mailto:${recipients.join(",")}?subject=${subject}&body=${body}`;
    setStatus(
      "Your email app should open with the message prepared. If not, write to us directly at " +
        recipients.join(" or ") +
        ".",
    );
  };

  const inputClass =
    "w-full border border-border bg-card px-4 py-3.5 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-2";

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-eyebrow text-muted-foreground">
            Name *
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            className={`${inputClass} mt-3`}
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
          />
          {errors.name ? (
            <p id="cf-name-error" className="text-data mt-2 text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="cf-org" className="text-eyebrow text-muted-foreground">
            Organization
          </label>
          <input
            id="cf-org"
            name="organization"
            autoComplete="organization"
            className={`${inputClass} mt-3`}
            value={values.organization}
            onChange={set("organization")}
          />
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="cf-email" className="text-eyebrow text-muted-foreground">
          Email *
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          className={`${inputClass} mt-3`}
          value={values.email}
          onChange={set("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
        />
        {errors.email ? (
          <p id="cf-email-error" className="text-data mt-2 text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="mt-6">
        <label htmlFor="cf-message" className="text-eyebrow text-muted-foreground">
          Message *
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          className={`${inputClass} mt-3 resize-y`}
          value={values.message}
          onChange={set("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
        />
        {errors.message ? (
          <p id="cf-message-error" className="text-data mt-2 text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className="group mt-8 inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground"
      >
        Send message
        <ArrowUpRight
          size={18}
          strokeWidth={1.5}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
      <p aria-live="polite" className="text-data mt-4 text-muted-foreground">
        {status}
      </p>
    </form>
  );
}
