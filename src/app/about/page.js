import Link from "next/link";
import { CheckCircleIcon } from "@phosphor-icons/react/ssr";

import { buttonVariants } from "@/components/ui/button";
import { Container, Eyebrow, Lead, PageTitle } from "@/components/page-parts";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { APPROACH, EXPECT } from "@/lib/site-data";

export const metadata = {
  title: "About — TouchTax Accountants",
  description:
    "TouchTax Accountants is an independent London practice supporting self-employed people, growing companies, landlords and specialist professionals.",
};

export default function AboutPage() {
  return (
    <>
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-end gap-x-[clamp(40px,6vw,96px)] gap-y-10 pt-[clamp(48px,7vw,96px)] pb-[clamp(48px,6vw,80px)]">
        <Stagger onMount>
          <StaggerItem>
            <Eyebrow>About TouchTax</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <PageTitle>A London practice built around the people it serves</PageTitle>
          </StaggerItem>
        </Stagger>
        <Stagger onMount delay={0.2}>
          <StaggerItem>
            <Lead className="text-lg">
              TouchTax Accountants supports self-employed people, growing companies, landlords and specialist
              professionals with their accounts, tax and financial planning.
            </Lead>
          </StaggerItem>
          <StaggerItem>
            <Lead className="mt-3 text-lg">
              We combine modern cloud accounting with the attention of a smaller firm: one accountant who knows your
              situation and is easy to reach.
            </Lead>
          </StaggerItem>
        </Stagger>
      </Container>

      <Container id="approach" className="scroll-mt-24 py-[clamp(48px,6vw,80px)]">
        <Reveal>
          <h2 className="text-[clamp(28px,3vw,38px)]">Our approach</h2>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-6 gap-y-10" stagger={0.12}>
          {APPROACH.map((p) => (
            <StaggerItem key={p.title} className="flex flex-col gap-2">
              <p.icon weight="duotone" className="size-8 text-brand" />
              <h3 className="mt-2 text-[22px]">{p.title}</h3>
              <p className="text-base text-muted-foreground">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <Container
        id="expect"
        className="grid scroll-mt-24 grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-[clamp(40px,6vw,96px)] gap-y-10 pt-[clamp(48px,6vw,80px)] pb-[clamp(72px,9vw,120px)]"
      >
        <Reveal>
          <h2 className="text-[clamp(28px,3vw,38px)] leading-[1.1]">What to expect when you work with us</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className={buttonVariants({ size: "xl" })}>
              Book a consultation
            </Link>
            <Link href="/services" className={buttonVariants({ variant: "outline", size: "xl", className: "bg-white" })}>
              Our services
            </Link>
          </div>
        </Reveal>
        <Stagger className="flex flex-col gap-6" stagger={0.1}>
          {EXPECT.map((x) => (
            <StaggerItem key={x.title} className="grid grid-cols-[28px_1fr] gap-3">
              <CheckCircleIcon weight="duotone" className="size-[26px] text-brand" />
              <div>
                <h3 className="text-xl">{x.title}</h3>
                <p className="mt-1 text-base text-muted-foreground">{x.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </>
  );
}
