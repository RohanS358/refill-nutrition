import Link from "next/link";
import { site, footerColumns } from "@/lib/site";
import { text } from "@/lib/cms/content";

/** Deep Ink mega-footer: giant wordmark, sitemap, coordinates. */
export async function Footer() {
  const [tagline, motto, email, city, country, coordinates] = await Promise.all([
    text(
      "footer.tagline",
      "Clinical nutrition, engineered for recovery — from Nepal, for better healthcare outcomes.",
    ),
    text("footer.motto", "Precision is care."),
    text("site.email", site.email),
    text("site.city", site.city),
    text("site.country", site.country),
    text("site.coordinates", site.coordinates),
  ]);

  return (
    <footer className="border-t border-line-dark bg-ink-deep text-background">
      <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
        {/* Giant wordmark */}
        <div className="border-b border-line-dark py-16 md:py-20">
          <p
            aria-hidden="true"
            className="select-none text-[clamp(4rem,14vw,13rem)] font-extrabold leading-[0.85] tracking-[-0.05em]"
          >
            REFILL
          </p>
          <p className="text-eyebrow mt-4 text-green-soft">{site.motto}</p>
          <p className="text-eyebrow mt-6 text-paper-dim">
            {site.legalName} · Est. {site.founded} · {city}, {country}
          </p>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <p className="text-lead max-w-sm text-balance" data-cms="footer.tagline">
              {tagline}
            </p>
            <address className="text-data mt-8 space-y-2 not-italic text-paper-dim">
              <p>{city}, {country}</p>
              <p data-cms="site.coordinates">{coordinates}</p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="underline decoration-line-dark underline-offset-4 transition-colors hover:text-background hover:decoration-green-soft"
                >
                  {email}
                </a>
              </p>
            </address>
          </div>
          {footerColumns.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="md:col-span-3 md:col-start-auto"
            >
              <h2 className="text-eyebrow text-green-soft">{col.heading}</h2>
              <ul className="mt-6 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-paper-dim transition-colors hover:text-background"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Base bar */}
        <div className="flex flex-col gap-4 border-t border-line-dark py-8 text-xs text-paper-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-eyebrow" data-cms="footer.motto">{motto}</p>
          <a
            href="#content"
            className="underline decoration-line-dark underline-offset-4 transition-colors hover:text-background"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
