import { Hero } from "@/components/sections/home/hero";
import { heroDefaults, type HeroCopy } from "@/components/sections/home/hero-copy";
import { GoodToKnow } from "@/components/sections/home/good-to-know";
import { StoryExpand } from "@/components/sections/home/story-expand";
import { Moments } from "@/components/sections/home/moments";
import { FindProduct } from "@/components/sections/home/find-product";
import { Expertise } from "@/components/sections/home/expertise";
import { Solutions } from "@/components/sections/home/solutions";
import { Evidence } from "@/components/sections/home/evidence";
import { Timeline } from "@/components/sections/home/timeline";
import { Research } from "@/components/sections/home/research";
import { Manufacturing } from "@/components/sections/home/manufacturing";
import { Testimonials } from "@/components/sections/home/testimonials";
import { Team } from "@/components/sections/home/team";
import { Stats } from "@/components/sections/home/stats";
import { CtaBand } from "@/components/site/cta-band";
import { text } from "@/lib/cms/content";

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
      <Expertise />
      <StoryExpand />
      <Evidence />
      <Solutions />
      <Timeline />
      <Research />
      <Manufacturing />
      <Testimonials />
      <Moments />
      <Team />
      <Stats />
      <CtaBand />
    </>
  );
}
