import { Heart } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { T } from "@/components/cms/t";
import { allPhotos, unsplash, unsplashSet, type Photo } from "@/lib/photos";

/** A bento of everyday moments — the reason behind the catalogue. */
export async function Moments() {
  const photos = await allPhotos();
  const tile = "overflow-hidden rounded-[1.75rem]";

  const Img = ({ p, w, h }: { p: Photo; w: number; h: number }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={unsplash(p.id, w, h)}
      srcSet={unsplashSet(p.id, w, h)}
      alt={p.alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
    />
  );

  return (
    <section aria-labelledby="moments" className="bg-background">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-sm font-semibold text-ink-deep">
            <Heart size={15} className="fill-current" aria-hidden="true" />
            <T k="home.moments.eyebrow">Everyday moments</T>
          </p>
          <h2 id="moments" className="text-display mt-6 max-w-3xl text-balance">
            <T k="home.moments.title">Strength for the moments that matter.</T>
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 md:mt-16 md:auto-rows-[13rem] md:grid-cols-4">
          <Reveal className={`${tile} col-span-2 row-span-2`}>
            <Img p={photos.motherBaby} w={900} h={900} />
          </Reveal>
          <Reveal delay={90} className={`${tile} flex flex-col justify-between bg-sun p-6 text-ink-deep`}>
            <T k="home.moments.stat1.value" className="text-5xl font-extrabold tracking-[-0.04em]">1 yr+</T>
            <T k="home.moments.stat1.label" className="text-sm font-medium">Paediatric formula for growing kids</T>
          </Reveal>
          <Reveal delay={180} className={`${tile} row-span-2`}>
            <Img p={photos.fatherAndDaughter} w={500} h={900} />
          </Reveal>
          <Reveal delay={270} className={tile}>
            <Img p={photos.foodSpread} w={500} h={420} />
          </Reveal>
          <Reveal className={tile}>
            <Img p={photos.boySmiling} w={500} h={420} />
          </Reveal>
          <Reveal delay={90} className={`${tile} flex flex-col justify-between bg-mint p-6 text-ink-deep`}>
            <T k="home.moments.stat2.value" className="text-5xl font-extrabold tracking-[-0.04em]">26</T>
            <T k="home.moments.stat2.label" className="text-sm font-medium">Vitamins &amp; minerals in progain-hp</T>
          </Reveal>
          <Reveal delay={180} className={`${tile} col-span-2`}>
            <Img p={photos.motherCooking} w={1000} h={420} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
