"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { primaryNav, fullNav, darkHeroRoutes } from "@/lib/site";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

/**
 * Editorial hairline header: transparent over the hero, paper + blur +
 * rule once scrolled. Mobile: full-screen Deep Ink indexed menu.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
    darkHeroRoutes.some((route) => (route === "/" ? pathname === "/" : pathname.startsWith(route)));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-300",
          scrolled
            ? "border-b border-border bg-background/85 text-foreground backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
          darkTop && "text-background",
        )}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <Logo onDark={darkTop} />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors",
                  darkTop
                    ? "text-paper-dim hover:text-background"
                    : "text-muted-foreground hover:text-foreground",
                  isActive(item.href) &&
                    (darkTop
                      ? "text-background underline decoration-green-soft decoration-2 underline-offset-8"
                      : "text-foreground underline decoration-primary decoration-2 underline-offset-8"),
                )}
              >
                {item.label}
              </Link>
            ))}
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
              Contact
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
                      <span className="text-data hidden text-paper-dim sm:block">
                        {item.hint}
                      </span>
                    ) : null}
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="self-center text-paper-dim"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
