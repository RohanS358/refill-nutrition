import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollExpand } from "@/components/motion/scroll-expand";
import { T } from "@/components/cms/t";
import { text } from "@/lib/cms/content";
import { photo, unsplash } from "@/lib/photos";

/** A full-screen pause: the family table grows to fill the view on scroll. */
export async function StoryExpand() {
  const [img, title] = await Promise.all([
    photo("familyTable"),
    text("home.story.title", "From the ward to the family table"),
  ]);

  return (
    <section aria-label="Our purpose" className="bg-ink-deep">
      <ScrollExpand
        useWindowScroll
        src={unsplash(img.id, 1600)}
        srcSet={`${unsplash(img.id, 1000)} 1000w, ${unsplash(img.id, 1600)} 1600w, ${unsplash(img.id, 2400)} 2400w`}
        alt={img.alt}
        title={title}
        titleKey="home.story.title"
        scrollHint="Scroll"
        startWidth={46}
        startHeight={56}
        startRadius={32}
        overlayScrim={0.7}
      >
        {/* Dark layer behind the copy — it fades in with the text as the
            photo reaches full bleed, so the words always sit on shadow. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-deep/60" />
        <T k="home.story.eyebrow" as="p" className="rounded-full bg-sun px-4 py-1.5 text-sm font-semibold text-ink-deep">
          Why we do this
        </T>
        <T
          k="home.story.heading"
          as="h2"
          className="mt-6 max-w-4xl text-balance text-[clamp(2.25rem,5.5vw,5rem)] font-extrabold leading-[1] tracking-[-0.04em] text-white"
        >
          Nutrition that brings people home.
        </T>
        <T k="home.story.body" as="p" className="mt-6 max-w-xl text-lg text-white/90">
          Every formula we make has one job: help someone leave hospital stronger and get back to the people who love them.
        </T>
        <Link
          href="/about"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink-deep transition hover:-translate-y-0.5"
        >
          <T k="home.story.cta">Our story</T>
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </ScrollExpand>
    </section>
  );
}
