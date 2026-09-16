import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { text } from "@/lib/cms/content";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "./eyebrow";

/**
 * Closing call-to-action — home chapter 11 and the tail of every page.
 * Default ck "cta" means pages sharing the default copy share the edit.
 */
export async function CtaBand({
  eyebrow = "Work with us",
  title = "Let's engineer better outcomes.",
  body = "Hospitals, clinicians, and distribution partners — talk to us about clinical nutrition, devices, and what comes next.",
  ck = "cta",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  ck?: string;
}) {
  const [eyebrowText, titleText, bodyText] = await Promise.all([
    text(`${ck}.eyebrow`, eyebrow),
    text(`${ck}.title`, title),
    text(`${ck}.body`, body),
  ]);

  return (
    <section aria-labelledby="cta-heading" className="border-t border-border bg-background">
      <div className="shell py-24 md:py-32 lg:py-40">
        <Reveal>
          <Eyebrow>
            <span data-cms={`${ck}.eyebrow`}>{eyebrowText}</span>
          </Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <h2
            id="cta-heading"
            className="text-display-xl mt-8 max-w-5xl text-balance"
            data-cms={`${ck}.title`}
          >
            {titleText}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="text-lead mt-8 max-w-2xl text-muted-foreground" data-cms={`${ck}.body`}>
            {bodyText}
          </p>
        </Reveal>
        <Reveal delay={270}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground focus-visible:outline-2"
            >
              Contact us
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 border border-foreground px-8 py-4 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2"
            >
              View products
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
