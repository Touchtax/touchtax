import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CONTACT_INFO, SERVE_HREF, SERVICES, SITE } from "@/lib/site-data";

const heading = "text-xs tracking-[0.1em] text-foreground/70 uppercase";
const link = "w-fit text-[15px] text-foreground no-underline transition-colors hover:text-brand-700";

const COMPANY = [
  ["Home", "/"],
  ["Who we serve", SERVE_HREF],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1200px] px-[clamp(20px,4vw,40px)] pb-10">
      <Separator />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 gap-y-10 py-10">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-semibold tracking-[-0.02em]">{SITE.name}</span>
          <span className="text-[15px] text-muted-foreground">
            {SITE.summary}
          </span>
        </div>
        <nav aria-label="Services" className="flex flex-col gap-2">
          <span className={heading}>Services</span>
          {SERVICES.map((c) => (
            <Link key={c.key} href={c.href} className={link}>
              {c.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Company" className="flex flex-col gap-2">
          <span className={heading}>Company</span>
          {COMPANY.map(([label, href]) => (
            <Link key={href} href={href} className={link}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2">
          <span className={heading}>Get in touch</span>
          {CONTACT_INFO.map((ci) =>
            ci.href ? (
              <a key={ci.label} href={ci.href} className={link}>
                {ci.value}
              </a>
            ) : (
              <span key={ci.label} className="text-[15px]">
                {ci.value}
              </span>
            )
          )}
        </div>
      </div>
      <p className="text-[13px] text-foreground/70">© {SITE.copyrightYear} {SITE.name}. All rights reserved.</p>
    </footer>
  );
}
