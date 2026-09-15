import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  link?: boolean;
  /** "responsive" = mark on phones, full lockup from sm up. */
  variant?: "responsive" | "full" | "mark";
  /** Invert to paper-white over Deep Ink surfaces. */
  onDark?: boolean;
};

/**
 * Brand lockup — the single place the logo asset lands
 * (docs/brand-guidelines.md §5). Sliced from public/brand/logo.jpg.
 */
export function Logo({
  className,
  link = true,
  variant = "responsive",
  onDark = false,
}: LogoProps) {
  const tint = onDark ? "brightness-0 invert" : undefined;

  const markImg = (
    <Image
      src="/brand/mark.png"
      alt="Refill Enterprises"
      width={868}
      height={868}
      sizes="40px"
      className={cn(
        "h-9 w-9 object-contain md:h-10 md:w-10",
        variant === "responsive" && "sm:hidden",
        tint,
      )}
    />
  );

  const fullImg = (
    <Image
      src="/brand/logo-full.png"
      alt="Refill Enterprises — Supplementing your health"
      width={2998}
      height={868}
      sizes="(max-width: 640px) 160px, 220px"
      className={cn(
        "h-8 w-auto object-contain md:h-9",
        variant === "responsive" && "hidden sm:block",
        tint,
      )}
    />
  );

  const inner = (
    <span className={cn("inline-flex items-center", className)}>
      {variant !== "full" ? markImg : null}
      {variant !== "mark" ? fullImg : null}
    </span>
  );

  if (!link) return inner;
  return (
    <Link href="/" aria-label="Refill Enterprises — home" className="focus-visible:outline-2">
      {inner}
    </Link>
  );
}
