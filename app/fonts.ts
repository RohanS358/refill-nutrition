import localFont from "next/font/local";
import { Caveat } from "next/font/google";

// Plus Jakarta Sans — the only typeface on the site (docs/typography.md, D-008).
// Variable weight axis 200–800; hierarchy comes from weight/size/tracking.
export const jakarta = localFont({
  src: "../public/fonts/PlusJakartaSans-VariableFont_wght.ttf",
  weight: "200 800",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-jakarta",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

// Handwriting accent — used for one highlighted phrase in the home hero only.
export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-caveat",
});
