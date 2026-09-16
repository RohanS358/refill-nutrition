import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { deviceCapabilities } from "@/lib/solutions";
import { Parallax } from "@/components/motion/parallax";
import { productFamilies } from "@/lib/products";
import { T } from "@/components/cms/t";

export const metadata: Metadata = {
  title: "Medical Devices & Applications",
  description:
    "Advanced medical devices and healthcare applications used exclusively in critical care nutrition and patient management, introduced through strategic partnerships.",
};

export default function MedicalDevicesPage() {
  const device = productFamilies.find((p) => p.id === "gravity-set-bag");

  return (
    <>
      <PageHero
        ck="devices.hero"
        eyebrow="Solutions · 02"
        title="Devices that keep nutrition honest."
        lead="Formulation is only half the therapy. Our devices and healthcare applications make delivery precise and outcomes measurable — technology in service of the feeding protocol, nothing else."
        meta={[
          { label: "Scope", value: "Critical-care nutrition" },
          { label: "Model", value: "Strategic partnerships" },
          { label: "Type", value: "Devices & digital apps" },
          { label: "Support", value: "Local, clinical-grade" },
        ]}
      />

      <Section>
        <SectionHeading
        ck="devices.s1"
          index="01"
          eyebrow="Capabilities"
          title="Four jobs, done precisely."
          lead="Every device or application we introduce must earn its place at the bedside by making nutritional therapy more controlled, more visible, or more accountable."
        />
        <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border md:mt-24 md:grid-cols-2">
          {deviceCapabilities.map((capability, i) => (
            <Reveal key={capability.title} delay={i * 90} className="flex">
              <div className="w-full bg-background p-8 md:p-14">
                <p aria-hidden="true" className="text-data text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-title mt-6">
                  <T k={`devices.capabilities.${i}.title`}>{capability.title}</T>
                </h3>
                <T
                  k={`devices.capabilities.${i}.body`}
                  as="p"
                  className="mt-4 max-w-md leading-relaxed text-muted-foreground"
                >
                  {capability.body}
                </T>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {device ? (
        <Section id="gravity-set-bag">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Parallax distance={24}>
                  <Image
                    src={device.image!}
                    alt={device.name}
                    width={520}
                    height={520}
                    sizes="(max-width: 1024px) 70vw, 420px"
                    className="h-[280px] w-auto object-contain object-left md:h-[380px]"
                  />
                </Parallax>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={90}>
                <p className="text-eyebrow text-primary">{device.category}</p>
                <h2 className="text-display mt-4 text-[clamp(1.9rem,3.4vw,3rem)]">
                  {device.name}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground italic">{device.strapline}</p>
                <p className="text-lead mt-8 max-w-2xl text-muted-foreground">{device.detail}</p>
              </Reveal>
              <Reveal delay={180}>
                <dl className="mt-12 border-t border-border">
                  {device.compounds.map((c) => (
                    <div
                      key={c.label}
                      className="grid grid-cols-2 gap-6 border-b border-border py-4"
                    >
                      <dt className="text-data font-semibold">{c.label}</dt>
                      <dd className="text-data text-right text-muted-foreground">{c.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
        ck="devices.s2"
              index="02"
              eyebrow="The partnership model"
              title="Global technology, introduced responsibly."
            />
            <Reveal delay={180}>
              <div className="mt-10 max-w-2xl space-y-6 leading-relaxed text-muted-foreground">
                <T k="devices.model.p1" as="p">
                  We select devices and applications through strategic partnerships with established manufacturers — then take responsibility for what matters locally: clinical onboarding, training, protocol fit, and ongoing support.
                </T>
                <T k="devices.model.p2" as="p">
                  The result is that hospitals in Nepal get access to modern critical-care nutrition technology without gambling on unsupported imports.
                </T>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={270}>
              <ul className="border-t border-border">
                {[
                  ["Selection", "Evidence and bedside utility, not novelty"],
                  ["Introduction", "Clinical onboarding and training included"],
                  ["Integration", "Fits existing feeding protocols"],
                  ["Support", "Local accountability for uptime"],
                ].map(([title, body], i) => (
                  <li
                    key={title}
                    className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-4"
                  >
                    <span className="text-data font-semibold">
                      <T k={`devices.model.rows.${i}.title`}>{title}</T>
                    </span>
                    <span className="text-data text-muted-foreground">
                      <T k={`devices.model.rows.${i}.body`}>{body}</T>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        ck="devices.cta"
        eyebrow="For hospitals"
        title="Evaluate a device with us."
        body="Talk to us about pilots, protocol fit, and training for your unit."
      />
    </>
  );
}
