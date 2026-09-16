import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Molecule } from "@/components/gfx/molecule";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

// Global 404 sits outside the (site) route group, so it carries its own chrome.
export default function NotFound() {
  return (
    <>
      <Header />
      <NotFoundBody />
      <Footer />
    </>
  );
}

function NotFoundBody() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-background">
      <div className="shell py-32">
        <div className="flex items-center gap-4">
          <Molecule variant="metabolic" className="h-14 w-14 text-primary" />
          <p className="text-eyebrow text-muted-foreground">Error 404 · Compound not found</p>
        </div>
        <h1 className="text-display-xl mt-8 max-w-4xl text-balance">
          This page never made it past formulation<span className="text-primary">.</span>
        </h1>
        <p className="text-lead mt-8 max-w-xl text-muted-foreground">
          The address may have changed, or the page was withdrawn from the catalogue.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground"
          >
            Back to home
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border border-foreground px-8 py-4 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
          >
            View products
          </Link>
        </div>
      </div>
    </main>
  );
}
