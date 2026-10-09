import { Card } from "@/components/ui/card";
import { ConsultationForm } from "@/components/consultation-form";
import { Container, Eyebrow, Lead, PageTitle } from "@/components/page-parts";
import { Stagger, StaggerItem } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { CONTACT_INFO, SITE } from "@/lib/site-data";
import { pageMetadata, webPageSchema } from "@/lib/seo";

const DESCRIPTION = `Call, email or send ${SITE.name} a message to book a free initial consultation. Office hours ${SITE.contact.hours.display}.`;

export const metadata = pageMetadata({ title: "Contact", description: DESCRIPTION, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "ContactPage",
          name: `Contact | ${SITE.name}`,
          description: DESCRIPTION,
          path: "/contact",
          crumbs: [{ name: "Contact", path: "/contact" }],
        })}
      />
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(40px,6vw,96px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
        <Stagger onMount>
          <StaggerItem>
            <Eyebrow>Contact</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <PageTitle>Let’s talk about your accounts</PageTitle>
          </StaggerItem>
          <StaggerItem>
            <Lead className="mt-4 max-w-[46ch] text-lg leading-[1.6]">
              Send us a message, call the office or book a free initial consultation. We’ll recommend the right service
              and give you a clear quote.
            </Lead>
          </StaggerItem>
          <div className="mt-10 flex flex-col gap-6">
            {CONTACT_INFO.map((ci) => {
              const body = (
                <>
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 transition-transform duration-300 group-hover:scale-105">
                    <ci.icon weight="duotone" className="size-6 text-brand-700" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs tracking-[0.1em] text-foreground/70 uppercase">{ci.label}</span>
                    <span className="text-lg font-semibold group-hover:text-brand-700">{ci.value}</span>
                  </span>
                </>
              );
              const cls = "group grid w-fit grid-cols-[48px_1fr] items-center gap-3 text-foreground no-underline";
              return (
                <StaggerItem key={ci.label}>
                  {ci.href ? (
                    <a href={ci.href} className={cls}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </StaggerItem>
              );
            })}
          </div>
        </Stagger>

        <Stagger onMount delay={0.2}>
          <StaggerItem>
            <Card className="gap-0 rounded-2xl bg-muted p-[clamp(24px,3vw,36px)] shadow-[0_24px_48px_-12px_rgb(9_9_11/0.22)] ring-border">
              <ConsultationForm variant="contact" />
            </Card>
          </StaggerItem>
        </Stagger>
      </Container>
    </>
  );
}
