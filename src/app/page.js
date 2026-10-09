import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarCheckIcon,
  CheckCircleIcon,
  CheckIcon,
  PhoneIcon,
  TrendUpIcon,
} from "@phosphor-icons/react/ssr";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ConsultationForm } from "@/components/consultation-form";
import { CountUp, Float, ImagePlaceholder, Marquee } from "@/components/home-sections";
import { Container, Eyebrow, Lead, SectionTitle } from "@/components/page-parts";
import { HoverLift, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { AUDIENCES, FAQS, FEATURES, PHONE, SERVICES, SOFTWARE, STATS, STEPS } from "@/lib/site-data";

export const metadata = {
  title: "TouchTax Accountants — London",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SoftwareMarquee />
      <ServicesOverview />
      <Feature feature={FEATURES[0]} chips={BOOKKEEPING_CHIPS} />
      <WhoWeServe />
      <Feature feature={FEATURES[1]} chips={TAX_CHIPS} reverse />
      <Stats />
      <WorkingWithUs />
      <Faq />
      <ClosingCta />
    </>
  );
}

function Hero() {
  return (
    <div className="px-[clamp(10px,1.5vw,20px)]">
      <div className="hero-surface mx-auto mt-2 max-w-[1440px] overflow-hidden rounded-[28px] text-zinc-50">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,6vw,88px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(64px,8vw,112px)]">
          <Stagger onMount stagger={0.1} delay={0.05}>
            <StaggerItem>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3.5 py-1.5 text-[13px] font-medium text-zinc-200">
                <span className="relative flex size-[7px]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-zest opacity-60" />
                  <span className="relative size-[7px] rounded-full bg-zest shadow-[0_0_0_4px_rgb(196_240_74/0.2)]" />
                </span>
                Accountants in London
              </span>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-6 text-[clamp(40px,5.4vw,66px)] leading-[1.04] tracking-[-0.025em] text-white">
                Clear accounts.{" "}
                <span className="font-serif font-normal tracking-[-0.01em] text-zest italic">Calm tax returns.</span>{" "}
                Advice you can act on.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-[50ch] text-[19px] leading-[1.6] text-zinc-400">
                TouchTax Accountants looks after bookkeeping, tax and business advice for individuals, companies and
                property investors across London.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-6 flex flex-wrap gap-2">
              {SERVICES.map((c) => (
                <Link
                  key={c.key}
                  href={c.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3.5 py-2 text-sm font-medium text-zinc-50 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-zest hover:bg-zest/12 hover:text-white"
                >
                  <c.icon weight="duotone" className="size-4 text-zest" />
                  {c.short}
                </Link>
              ))}
            </StaggerItem>
          </Stagger>

          <Stagger onMount delay={0.25}>
            <StaggerItem>
              <Card className="gap-0 rounded-2xl p-[clamp(24px,3vw,36px)] text-foreground shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] ring-0">
                <ConsultationForm variant="home" />
              </Card>
            </StaggerItem>
          </Stagger>
        </Container>
      </div>
    </div>
  );
}

function ServicesOverview() {
  return (
    <Container className="py-[clamp(48px,6vw,80px)]">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[620px]">
          <Eyebrow>Services</Eyebrow>
          <SectionTitle>Everything your finances need, in four practice areas</SectionTitle>
        </div>
        <Link href="/services" className={buttonVariants({ variant: "outline", size: "xl", className: "h-[42px] bg-white" })}>
          View all services
          <ArrowRightIcon weight="duotone" />
        </Link>
      </Reveal>

      <Stagger className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {SERVICES.map((c) => (
          <StaggerItem key={c.key} className="flex">
            <HoverLift className="flex w-full">
              <Link href={c.href} className="group flex w-full text-foreground no-underline">
                <Card className="w-full gap-3 rounded-2xl px-5 py-7 ring-border transition-shadow duration-300 group-hover:shadow-[0_6px_20px_-4px_rgb(9_9_11/0.12)]">
                  <c.icon weight="duotone" className="size-8 text-brand transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-[21px] leading-tight font-semibold tracking-[-0.03em]">{c.title}</span>
                  <span className="text-[15px] text-muted-foreground">{c.blurb}</span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {c.items.map((it) => (
                      <Badge key={it.name} variant="secondary" className="h-auto rounded-full px-2.5 py-0.5 text-xs">
                        {it.name}
                      </Badge>
                    ))}
                  </span>
                </Card>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}

function WhoWeServe() {
  return (
    <div className="px-[clamp(10px,1.5vw,20px)]">
      <Reveal className="mx-auto max-w-[1440px] rounded-[28px] bg-muted" y={40}>
        <Container id="serve" className="scroll-mt-24 py-[clamp(56px,7vw,96px)]">
          <div className="max-w-[620px]">
            <Eyebrow>Who we serve</Eyebrow>
            <SectionTitle>Specialist support for the way you earn</SectionTitle>
            <Lead className="mt-3">
              From sole traders to property companies, we tailor our work to how your income is structured.
            </Lead>
          </div>
          <Stagger className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-10">
            {AUDIENCES.map((a) => (
              <StaggerItem key={a.title} className="flex flex-col gap-2">
                <span className="grid size-12 place-items-center rounded-2xl bg-white shadow-[0_1px_2px_rgb(9_9_11/0.06)]">
                  <a.icon weight="duotone" className="size-[26px] text-brand-700" />
                </span>
                <h3 className="mt-2 mb-1 text-[22px]">{a.title}</h3>
                {a.items.map((name) => (
                  <span key={name} className="flex items-center gap-2 text-base">
                    <CheckIcon weight="duotone" className="text-brand" />
                    {name}
                  </span>
                ))}
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Reveal>
    </div>
  );
}

function WorkingWithUs() {
  return (
    <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(40px,6vw,96px)] pt-[clamp(48px,6vw,80px)] pb-[clamp(72px,9vw,120px)]">
      <Reveal>
        <Eyebrow>Working with TouchTax</Eyebrow>
        <SectionTitle>Accounting that keeps pace with your plans</SectionTitle>
        <Lead className="mt-4">
          Whether you are filing your first Self Assessment, running a growing limited company or building a property
          portfolio, we take care of the deadlines and paperwork so you can focus on the work itself.
        </Lead>
        <Lead className="mt-3">
          You get a dedicated accountant who knows your affairs, explains things in plain English and flags
          opportunities before year-end, not after.
        </Lead>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className={buttonVariants({ size: "xl" })}>
            Book a consultation
          </Link>
          <Link href="/about" className={buttonVariants({ variant: "outline", size: "xl", className: "bg-white" })}>
            About us
          </Link>
        </div>
      </Reveal>

      <Stagger className="flex flex-col gap-10 pt-2" stagger={0.14}>
        {STEPS.map((s) => (
          <StaggerItem key={s.n} className="grid grid-cols-[56px_1fr] items-start gap-4">
            <div className="grid size-14 place-items-center rounded-2xl bg-ink text-[22px] font-semibold text-zest tabular-nums">
              {s.n}
            </div>
            <div>
              <h3 className="text-[22px]">{s.title}</h3>
              <p className="mt-1 text-base text-muted-foreground">{s.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}

function SoftwareMarquee() {
  return (
    <section aria-label="Accounting software we work with" className="pt-[clamp(40px,5vw,64px)]">
      <Reveal>
        <p className="px-5 text-center text-sm font-medium tracking-[0.08em] text-muted-foreground uppercase">
          Fluent in the software you already use
        </p>
        <Marquee items={SOFTWARE} className="mx-auto mt-6 max-w-[1440px]" />
      </Reveal>
    </section>
  );
}

const BOOKKEEPING_CHIPS = [
  { icon: CheckCircleIcon, title: "Bank feed reconciled", sub: "142 transactions matched", pos: "top-[10%] left-0" },
  { icon: TrendUpIcon, title: "Profit this quarter", sub: "Up 18% on last year", pos: "right-0 bottom-[12%]" },
];

const TAX_CHIPS = [
  { icon: CalendarCheckIcon, title: "Self Assessment filed", sub: "6 weeks before deadline", pos: "top-[12%] right-0" },
  { icon: CheckCircleIcon, title: "Pension relief claimed", sub: "Higher-rate relief applied", pos: "bottom-[10%] left-0" },
];

function Feature({ feature, chips, reverse = false }) {
  return (
    <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(40px,6vw,96px)] py-[clamp(56px,7vw,104px)]">
      <Reveal className={reverse ? "relative lg:order-2" : "relative"} y={40}>
        <div className="px-[clamp(16px,4vw,40px)]">
          <ImagePlaceholder label={feature.imageLabel} className="aspect-[4/3.4]" />
        </div>
        {chips.map((chip, i) => (
          <Float key={chip.title} delay={0.3 + i * 0.6} className={`absolute ${chip.pos}`}>
            <div className="flex items-center gap-3 rounded-2xl bg-white py-3 pr-5 pl-3 shadow-[0_24px_48px_-12px_rgb(9_9_11/0.22)] ring-1 ring-border">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-100">
                <chip.icon weight="duotone" className="size-5 text-brand-700" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold">{chip.title}</span>
                <span className="text-xs text-muted-foreground">{chip.sub}</span>
              </span>
            </div>
          </Float>
        ))}
      </Reveal>
      <div>
        <Reveal>
          <Eyebrow>{feature.eyebrow}</Eyebrow>
          <SectionTitle>{feature.title}</SectionTitle>
          <Lead className="mt-4">{feature.text}</Lead>
        </Reveal>
        <Stagger className="mt-8 flex flex-col gap-6" stagger={0.12}>
          {feature.points.map((pt) => (
            <StaggerItem key={pt.title} className="grid grid-cols-[48px_1fr] gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-100">
                <pt.icon weight="duotone" className="size-6 text-brand-700" />
              </span>
              <div>
                <h3 className="text-lg">{pt.title}</h3>
                <p className="mt-0.5 text-[15px] text-muted-foreground">{pt.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Container>
  );
}

function Stats() {
  return (
    <div className="px-[clamp(10px,1.5vw,20px)]">
      <Reveal className="hero-surface mx-auto max-w-[1440px] overflow-hidden rounded-[28px] text-zinc-50" y={40}>
        <Container className="py-[clamp(56px,7vw,96px)]">
          <div className="max-w-[640px]">
            <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[13px] font-medium text-zinc-200">
              TouchTax at a glance
            </span>
            <h2 className="mt-3 text-[clamp(30px,3.4vw,42px)] leading-[1.1] text-white">
              A full-service practice with a{" "}
              <span className="font-serif font-normal tracking-[-0.01em] text-zest italic">personal touch</span>
            </h2>
          </div>
          <Stagger className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-10" stagger={0.1}>
            {STATS.map((st) => (
              <StaggerItem key={st.label} className="border-t border-white/14 pt-5">
                <CountUp
                  value={st.value}
                  prefix={st.prefix}
                  suffix={st.suffix}
                  className="block text-[clamp(44px,5vw,64px)] leading-none font-semibold tracking-[-0.04em] text-zest"
                />
                <p className="mt-3 max-w-[26ch] text-[15px] text-zinc-400">{st.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Reveal>
    </div>
  );
}

function Faq() {
  return (
    <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-[clamp(40px,6vw,96px)] gap-y-10 pb-[clamp(72px,9vw,120px)]">
      <Reveal className="lg:sticky lg:top-28">
        <Eyebrow>FAQs</Eyebrow>
        <SectionTitle>Questions we’re often asked</SectionTitle>
        <Lead className="mt-4">Can’t find what you’re looking for? Our team is happy to talk it through.</Lead>
        <Link href="/contact" className={buttonVariants({ variant: "outline", size: "xl", className: "mt-6 bg-white" })}>
          Ask us a question
          <ArrowRightIcon weight="duotone" />
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <Accordion defaultValue={[FAQS[0].q]} className="border-t">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-b">
              <AccordionTrigger className="gap-6 py-5 text-lg font-semibold tracking-[-0.02em] hover:text-brand-700 hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-brand">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Container>
  );
}

function ClosingCta() {
  return (
    <div className="px-[clamp(10px,1.5vw,20px)] pb-[clamp(48px,6vw,80px)]">
      <Reveal className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-brand text-white" y={40}>
        <div className="pointer-events-none absolute -top-24 -right-24 size-[420px] rounded-full bg-zest/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-[360px] rounded-full bg-brand-900/40 blur-3xl" />
        <Container className="relative flex flex-wrap items-end justify-between gap-8 py-[clamp(56px,7vw,96px)]">
          <div className="max-w-[640px]">
            <h2 className="text-[clamp(32px,4vw,52px)] leading-[1.05] text-white">
              Ready for <span className="font-serif font-normal tracking-[-0.01em] text-zest italic">calmer</span>{" "}
              accounts?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Book a free initial consultation and we’ll recommend the right support, with a clear quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={buttonVariants({
                size: "xl",
                className: "h-12 bg-white px-6 text-base text-brand-800 hover:bg-zest hover:text-ink",
              })}
            >
              Book a consultation
              <ArrowRightIcon weight="duotone" />
            </Link>
            <a
              href={PHONE.href}
              className={buttonVariants({
                variant: "outline",
                size: "xl",
                className: "h-12 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white",
              })}
            >
              <PhoneIcon weight="duotone" />
              {PHONE.display}
            </a>
          </div>
        </Container>
      </Reveal>
    </div>
  );
}
