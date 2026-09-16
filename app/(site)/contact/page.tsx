import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { T } from "@/components/cms/t";
import { text } from "@/lib/cms/content";
import { site, contactList } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Contact Refill Enterprises Pvt. Ltd. — hospitals, clinicians, distributors, and partners. Kathmandu, Nepal.",
};

export default async function ContactPage() {
  const [email, phone, city, country, coordinates] = await Promise.all([
    text("site.email", site.email),
    text("site.phone", site.phone),
    text("site.city", site.city),
    text("site.country", site.country),
    text("site.coordinates", site.coordinates),
  ]);

  return (
    <>
      <PageHero
        ck="contact.hero"
        eyebrow="Contact"
        title="Talk to the team."
        lead="Hospital procurement, clinical questions, distribution, partnerships, careers — one inbox, read carefully."
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={90}>
              <div className="border border-border bg-card p-8 md:p-10">
                <h2 className="text-eyebrow text-primary">Coordinates</h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex items-start gap-4">
                    <MapPin size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">
                        {city}, {country}
                      </p>
                      <p className="text-data mt-1 text-muted-foreground" data-cms="site.coordinates">
                        {coordinates}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 text-primary" />
                    <div className="space-y-1.5">
                      {contactList(email).map((address) => (
                        <a
                          key={address}
                          href={`mailto:${address}`}
                          className="block text-sm font-semibold underline decoration-border underline-offset-4 hover:decoration-primary"
                        >
                          {address}
                        </a>
                      ))}
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 text-primary" />
                    <div className="space-y-1.5" data-cms="site.phone">
                      {contactList(phone).map((number) => (
                        <a
                          key={number}
                          href={`tel:${number.replace(/[^+\d]/g, "")}`}
                          className="block text-sm font-semibold underline decoration-border underline-offset-4 hover:decoration-primary"
                        >
                          {number}
                        </a>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <dl className="mt-8 border-t border-border">
                {[
                  ["Hospitals & clinicians", "Formulary, protocols, product specs"],
                  ["Distributors", "Territories and supply"],
                  ["Partners & investors", "Devices, research, manufacturing"],
                  ["Press", "Company information"],
                ].map(([audience, topic], i) => (
                  <div
                    key={audience}
                    className="grid grid-cols-2 gap-4 border-b border-border py-4"
                  >
                    <dt className="text-data font-semibold">
                      <T k={`contact.audiences.${i}.who`}>{audience}</T>
                    </dt>
                    <dd className="text-data text-muted-foreground">
                      <T k={`contact.audiences.${i}.topic`}>{topic}</T>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
