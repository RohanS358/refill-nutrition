import React from "react";
import { site, contactList } from "@/lib/site";
import { SiteHeader } from "@/components/site/site-header";
import { TextsProvider } from "@/components/cms/texts-context";
import { getOverrides } from "@/lib/cms/content";
import { Footer } from "@/components/site/footer";
import { EditBridge } from "@/components/cms/edit-bridge";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  foundingDate: String(site.founded),
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "NP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: contactList(site.email),
    contactType: "customer service",
  },
};

/** Public-site chrome: skip link, header, footer, structured data. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { texts } = await getOverrides();
  return (
    <TextsProvider texts={texts}>
      <a
        href="#content"
        className="text-eyebrow fixed left-5 top-5 z-[100] -translate-y-24 bg-primary px-4 py-3 text-primary-foreground transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">{children}</main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <EditBridge />
    </TextsProvider>
  );
}
