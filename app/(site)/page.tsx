import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/sections/home/hero";
import { heroDefaults, type HeroCopy } from "@/components/sections/home/hero-copy";
import { GoodToKnow } from "@/components/sections/home/good-to-know";
import { StoryExpand } from "@/components/sections/home/story-expand";
import { Moments } from "@/components/sections/home/moments";
import { FindProduct } from "@/components/sections/home/find-product";
import { Testimonials } from "@/components/sections/home/testimonials";
import { CtaBand } from "@/components/site/cta-band";
import { text } from "@/lib/cms/content";

// The home page is the one most people land on from search, so its title and
// description name what the company is and where: clinical nutrition, Nepal.
export const metadata: Metadata = pageMeta({
  title: "Refill Enterprises — Clinical Nutrition, Engineered",
  absoluteTitle: true,
  path: "/",
  description:
    "Clinical and critical care nutrition: the progain enteral range for ICU, renal, diabetic and paediatric care, supplements and ENFit feeding sets.",
});

export default async function Home() {
  const heroCopy: HeroCopy = {
    line1: await text("home.hero.line1", heroDefaults.line1),
    line2: await text("home.hero.line2", heroDefaults.line2),
    lead: await text("home.hero.lead", heroDefaults.lead),
    cta1: await text("home.hero.cta1", heroDefaults.cta1),
    cta2: await text("home.hero.cta2", heroDefaults.cta2),
  };

  return (
    <>
      <Hero copy={heroCopy} />
      <GoodToKnow />
      <FindProduct />
      <StoryExpand />
      <Testimonials />
      <Moments />
      <CtaBand />
    </>
  );
}
