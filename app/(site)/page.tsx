import { Hero } from "@/components/sections/home/hero";
import { heroDefaults, type HeroCopy } from "@/components/sections/home/hero-copy";
import { Impact } from "@/components/sections/home/impact";
import { Expertise } from "@/components/sections/home/expertise";
import { FeaturedProducts } from "@/components/sections/home/featured-products";
import { Solutions } from "@/components/sections/home/solutions";
import { Evidence } from "@/components/sections/home/evidence";
import { Timeline } from "@/components/sections/home/timeline";
import { Research } from "@/components/sections/home/research";
import { Manufacturing } from "@/components/sections/home/manufacturing";
import { SportsPreview } from "@/components/sections/home/sports-preview";
import { Stats } from "@/components/sections/home/stats";
import { CtaBand } from "@/components/site/cta-band";
import { text } from "@/lib/cms/content";

export default async function Home() {
  // The hero is a client scroll scene, so its copy is resolved here.
  const heroCopy: HeroCopy = {
    line1: await text("home.hero.line1", heroDefaults.line1),
    line2: await text("home.hero.line2", heroDefaults.line2),
    lead: await text("home.hero.lead", heroDefaults.lead),
    cta1: await text("home.hero.cta1", heroDefaults.cta1),
    cta2: await text("home.hero.cta2", heroDefaults.cta2),
    strip: await Promise.all(
      heroDefaults.strip.map(async (item, i) => ({
        label: await text(`home.hero.strip.${i}.label`, item.label),
        value: await text(`home.hero.strip.${i}.value`, item.value),
      })),
    ),
  };

  return (
    <>
      <Hero copy={heroCopy} />
      <Impact />
      <Expertise />
      <FeaturedProducts />
      <Evidence />
      <Solutions />
      <Timeline />
      <Research />
      <Manufacturing />
      <SportsPreview />
      <Stats />
      <CtaBand />
    </>
  );
}
