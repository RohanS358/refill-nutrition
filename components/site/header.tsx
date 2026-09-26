"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { fullNav, darkHeroRoutes, type NavItem } from "@/lib/site";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { Tc } from "@/components/cms/texts-context";

export type MegaMenuRange = {
  id: string;
  index: string;
  title: string;
  /** CMS key for the range title (visual editor). */
  titleKey: string;
  products: { id: string; name: string; category: string; image?: string; nameKey: string }[];
};

type HeaderNavItem = NavItem & { key: string };

const PRODUCTS_HREF = "/products";

/**
 * Editorial hairline header: transparent over the hero, paper + blur +
 * rule once scrolled. "Products" opens a mega menu — the whole bar grows
 * downward to hold every range and product. Mobile: full-screen Deep Ink
 * indexed menu with the same catalogue folded under Products.
 */
export function Header({
  nav,
  menu,
  contactLabel,
}: {
  nav: HeaderNavItem[];
  menu: MegaMenuRange[];
  contactLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Mega menu: close on Escape or a click outside the header.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        megaTriggerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [megaOpen]);

  // Scroll lock + focus management for the overlay menu.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Pages that open on Deep Ink need paper-colored header content until scrolled.
  const darkTop =
    !scrolled &&
    !megaOpen &&
    darkHeroRoutes.some((route) => (route === "/" ? pathname === "/" : pathname.startsWith(route)));

  const linkClass = (active: boolean) =>
    cn(
      "text-sm font-medium transition-colors",
      darkTop ? "text-paper-dim hover:text-background" : "text-muted-foreground hover:text-foreground",
      active &&
        (darkTop
          ? "text-background underline decoration-green-soft decoration-2 underline-offset-8"
          : "text-foreground underline decoration-primary decoration-2 underline-offset-8"),
    );

  const productCount = menu.reduce((n, r) => n + r.products.length, 0);

  return (
    <>
      {/* Dims the page while the mega menu is open. */}
      <div
        aria-hidden="true"
        onClick={() => setMegaOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-ink-deep/30 backdrop-blur-[2px] transition-opacity duration-300",
          megaOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,box-shadow] duration-300",
          megaOpen
            ? "border-b border-border bg-background text-foreground shadow-2xl shadow-ink-deep/10"
            : scrolled
              ? "border-b border-border bg-background/85 text-foreground backdrop-blur-md"
              : "border-b border-transparent bg-transparent",
          darkTop && "text-background",
        )}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <Logo onDark={darkTop} />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) =>
              item.href === PRODUCTS_HREF ? (
                <button
                  key={item.href}
                  ref={megaTriggerRef}
                  type="button"
                  onClick={() => setMegaOpen((o) => !o)}
                  aria-expanded={megaOpen}
                  aria-controls="products-menu"
                  className={cn(
                    linkClass(isActive(item.href) || megaOpen),
                    "inline-flex items-center gap-1",
                  )}
                >
                  <span data-cms={item.key}>{item.label}</span>
                  <ChevronDown
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={cn("transition-transform duration-300", megaOpen && "rotate-180")}
                  />
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={linkClass(isActive(item.href))}
                >
                  <span data-cms={item.key}>{item.label}</span>
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "hidden px-5 py-2.5 text-sm font-semibold transition-colors lg:inline-flex",
                darkTop
                  ? "bg-background text-foreground hover:bg-green-soft"
                  : "bg-foreground text-background hover:bg-primary",
              )}
            >
              <span data-cms="nav.contact">{contactLabel}</span>
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mega menu — the bar grows downward (0fr → 1fr) to make room. */}
        <div
          id="products-menu"
          className={cn(
            "hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid",
            megaOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          inert={!megaOpen}
        >
          <div className="overflow-hidden">
            <div className="shell max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-border pb-8 pt-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10">
                {menu.map((range) => (
                  <section key={range.id} aria-labelledby={`mm-${range.id}`}>
                    <Link
                      href={`/products?range=${range.id}`}
                      className="group flex items-baseline gap-3 border-b border-border pb-3"
                    >
                      <span className="text-data text-primary">{range.index}</span>
                      <span
                        id={`mm-${range.id}`}
                        data-cms={range.titleKey}
                        className="flex-1 text-sm font-bold leading-snug group-hover:text-primary"
                      >
                        {range.title}
                      </span>
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </Link>
                    <ul className="mt-3 space-y-1">
                      {range.products.map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/products/${p.id}`}
                            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-secondary"
                          >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary group-hover:bg-card">
                              {p.image ? (
                                <Image
                                  src={p.image}
                                  alt=""
                                  width={40}
                                  height={44}
                                  className="h-10 w-auto object-contain"
                                />
                              ) : null}
                            </span>
                            <span className="min-w-0">
                              <span data-cms={p.nameKey} className="block text-sm font-semibold">
                                {p.name}
                              </span>
                              <span className="block truncate text-xs text-muted-foreground">
                                {p.category}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-foreground"
                >
                  <Tc k="nav.mega.all">All products</Tc> ({productCount})
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="/products/compare"
                  className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-foreground"
                >
                  <Tc k="nav.mega.compare">Compare products</Tc>
                </Link>
                <Link
                  href="/brochures"
                  className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-foreground"
                >
                  <Tc k="nav.mega.brochures">Brochures</Tc>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen indexed menu */}
      {open ? (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-[60] flex flex-col bg-ink-deep text-background lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-12">
            <Logo onDark />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center"
            >
              <X size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <nav
            aria-label="Site"
            className="flex-1 overflow-y-auto border-t border-line-dark px-5 pb-12 md:px-12"
          >
            <ul>
              {fullNav.map((item, i) => (
                <li key={item.href} className="border-b border-line-dark">
                  {item.href === PRODUCTS_HREF ? (
                    // Products folds open to the full catalogue, by range.
                    <details className="group/products">
                      <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5 [&::-webkit-details-marker]:hidden">
                        <span aria-hidden="true" className="text-data text-green-soft">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-title flex-1 font-semibold">{item.label}</span>
                        <ChevronDown
                          size={18}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="self-center text-paper-dim transition-transform group-open/products:rotate-180"
                        />
                      </summary>
                      <div className="space-y-6 pb-6 pl-10">
                        <Link href="/products" className="text-sm font-semibold text-green-soft">
                          All products →
                        </Link>
                        {menu.map((range) => (
                          <div key={range.id}>
                            <p className="text-eyebrow text-paper-dim">{range.title}</p>
                            <ul className="mt-2 space-y-1">
                              {range.products.map((p) => (
                                <li key={p.id}>
                                  <Link
                                    href={`/products/${p.id}`}
                                    className="block py-1.5 text-base font-medium hover:text-green-soft"
                                  >
                                    {p.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="group flex items-baseline gap-5 py-5"
                    >
                      <span aria-hidden="true" className="text-data text-green-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-title flex-1 font-semibold group-hover:text-green-soft">
                        {item.label}
                      </span>
                      {item.hint ? (
                        <span className="text-data hidden text-paper-dim sm:block">{item.hint}</span>
                      ) : null}
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="self-center text-paper-dim"
                      />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
