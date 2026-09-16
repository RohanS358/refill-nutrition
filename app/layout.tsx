import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { jakarta } from "./fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "critical care nutrition",
    "clinical nutrition Nepal",
    "nutraceutical company Nepal",
    "disease-specific metabolic nutrition",
    "enteral nutrition Nepal",
    "whey protein clinical",
    "renal nutrition CKD",
    "diabetic meal replacement",
    "calcium supplements",
    "ENFit enteral feeding",
    "medical devices Nepal",
  ],
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
