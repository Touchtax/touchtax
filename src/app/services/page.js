import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Eyebrow, Lead, PageTitle } from "@/components/page-parts";
import { HoverLift, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { SERVICES, SITE } from "@/lib/site-data";
import { pageMetadata, servicesSchema, webPageSchema } from "@/lib/seo";

const DESCRIPTION = `Accounting & compliance, tax, business advisory and property services from ${SITE.name} in ${SITE.areaServed}. One named accountant handles your affairs end to end.`;

export const metadata = pageMetadata({ title: "Services", description: DESCRIPTION, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: `Services | ${SITE.name}`,
          description: DESCRIPTION,
          path: "/services",
          crumbs: [{ name: "Services", path: "/services" }],
        })}
      />
      <JsonLd data={servicesSchema()} />
      <Container className="pt-[clamp(48px,7vw,96px)] pb-10">
        <Stagger onMount>
          <StaggerItem>
            <Eyebrow>Services</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <PageTitle className="max-w-[16ch]">Accounting, tax and advisory under one roof</PageTitle>
          </StaggerItem>
          <StaggerItem>
            <Lead className="mt-4 max-w-[56ch] text-[19px] leading-[1.6]">
              Choose a single service or combine them. Every client works with a named accountant who handles their
              affairs end to end.
            </Lead>
          </StaggerItem>
          <StaggerItem className="mt-6 flex flex-wrap gap-2">
            {SERVICES.map((c) => (
              <Link
                key={c.key}
                href={c.href}
                className={buttonVariants({ variant: "outline", size: "xl", className: "h-[42px] bg-white" })}
              >
                <c.icon weight="duotone" className="text-brand" />
                {c.title}
              </Link>
            ))}
          </StaggerItem>
        </Stagger>
      </Container>

      {SERVICES.map((c) => (
        <Container
          key={c.key}
          id={`svc-${c.key}`}
          className="flex scroll-mt-24 flex-wrap gap-x-[clamp(40px,6vw,96px)] gap-y-10 py-[clamp(48px,6vw,80px)]"
        >
          <Reveal className="flex max-w-[380px] flex-[1_1_280px] flex-col gap-2">
            <span className="flex items-center gap-2.5 text-[13px] tracking-[0.1em] text-foreground/70">
              <c.icon weight="duotone" className="size-7 text-brand" />
              {c.num} / {String(SERVICES.length).padStart(2, "0")}
            </span>
            <h2 className="mt-2 text-[clamp(28px,3vw,36px)] leading-[1.1]">{c.title}</h2>
            <p className="text-[17px] text-muted-foreground">{c.blurb}</p>
            <Link
              href="/contact"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "group mt-1 -ml-2.5 self-start px-2.5 text-[15px] text-brand-700 hover:bg-brand-500/10 hover:text-brand-700",
              })}
            >
              Get a quote
              <ArrowRightIcon weight="duotone" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Stagger
            className="grid flex-[2_1_480px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3"
            stagger={0.06}
          >
            {c.items.map((it) => (
              <StaggerItem key={it.name} className="flex">
                <HoverLift className="flex w-full">
                  <Card className="w-full gap-1.5 rounded-2xl p-5 ring-border transition-shadow duration-300 hover:shadow-[0_6px_20px_-4px_rgb(9_9_11/0.12)]">
                    <CardTitle className="text-lg font-semibold tracking-[-0.02em]">{it.name}</CardTitle>
                    <CardDescription className="text-[15px]">{it.desc}</CardDescription>
                  </Card>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      ))}
      <div className="h-[clamp(24px,4vw,48px)]" />
    </>
  );
}
