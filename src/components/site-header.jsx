"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ChatCircleTextIcon,
  HouseIcon,
  InfoIcon,
  ListIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
  SquaresFourIcon,
  StackIcon,
  UsersThreeIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Logo, LogoMark } from "@/components/logo";
import { EASE } from "@/components/motion";
import { cn } from "@/lib/utils";
import {
  ABOUT_LINKS,
  AUDIENCES,
  CONTACT_INFO,
  PHONE,
  PRIMARY_NAVIGATION,
  SERVE_HREF,
  SERVICES,
  SITE,
} from "@/lib/site-data";

const subtleLink =
  "py-[3px] text-[15px] text-foreground/80 no-underline transition-colors hover:text-brand-700 focus-visible:text-brand-700";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef(null);
  const [menu, setMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 bg-white/85 backdrop-blur-md backdrop-saturate-[1.8] transition-shadow duration-300",
        (scrolled || menu) && "shadow-[0_1px_2px_rgb(9_9_11/0.06)]"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center gap-6 px-[clamp(20px,4vw,40px)]">
        <Logo className="mr-4" />

        <NavigationMenu
          value={menu}
          onValueChange={setMenu}
          delay={80}
          closeDelay={120}
          className="hidden max-w-none flex-1 justify-start lg:flex"
          positionerProps={{
            anchor: headerRef,
            sideOffset: 0,
            positionMethod: "fixed",
            collisionPadding: 0,
          }}
          popupClassName="w-(--anchor-width) rounded-none border-t bg-background shadow-[0_24px_48px_-12px_rgb(9_9_11/0.22)] ring-0 data-ending-style:scale-100 data-starting-style:scale-100 data-starting-style:-translate-y-2"
        >
          <NavigationMenuList className="gap-1">
            {PRIMARY_NAVIGATION.map((item) => (
              <NavigationMenuItem key={item.key} value={item.key}>
                <NavigationMenuTrigger
                  onClick={(event) => {
                    // Clicking a trigger goes to its page instead of toggling the panel.
                    event.preventBaseUIHandler?.();
                    setMenu(null);
                    router.push(item.href);
                  }}
                  className={cn(
                    "h-10 bg-transparent px-3 text-[15px] font-medium hover:bg-brand-500/10 focus:bg-brand-500/10 data-popup-open:bg-brand-500/10 data-popup-open:text-brand-700 data-popup-open:hover:bg-brand-500/10",
                    item.page && pathname === item.page && "text-brand-700"
                  )}
                >
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-(--anchor-width) p-0 data-ending-style:data-activation-direction=left:translate-x-[6%] data-ending-style:data-activation-direction=right:translate-x-[-6%] data-starting-style:data-activation-direction=left:translate-x-[-6%] data-starting-style:data-activation-direction=right:translate-x-[6%]">
                  <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,40px)] pt-10 pb-12">
                    <MegaPanel which={item.key} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <a
            href={PHONE.href}
            className="flex items-center gap-1.5 rounded-md text-[15px] text-foreground no-underline hover:text-brand-700"
          >
            <PhoneIcon weight="duotone" className="size-[18px] text-brand" />
            {PHONE.display}
          </a>
          <Link href="/contact" className={buttonVariants({ size: "lg", className: "h-10 px-4 text-[15px]" })}>
            Book a consultation
          </Link>
        </div>

        <Button
          variant="outline"
          size="icon-xl"
          className="ml-auto lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <ListIcon weight="duotone" className="size-[22px]" />
        </Button>
      </div>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}

/* ---------- Desktop mega-menu panels ---------- */

function PanelLink({ href, className, children }) {
  return (
    <NavigationMenuLink
      closeOnClick
      render={<Link href={href} />}
      className={cn("rounded-md p-0 hover:bg-transparent focus:bg-transparent", className)}
    >
      {children}
    </NavigationMenuLink>
  );
}

function MegaPanel({ which }) {
  if (which === "services") {
    return (
      <div className="grid grid-cols-[240px_repeat(4,minmax(0,1fr))] gap-6">
        <FeatureTile
          tone="brand"
          icon={StackIcon}
          title="Every service, one practice"
          text="Twenty services across accounting, tax, advisory and property."
          cta="View all services"
          href="/services"
        />
        {SERVICES.map((c) => (
          <div key={c.key} className="flex flex-col gap-2">
            <PanelLink
              href={c.href}
              className="mb-1 gap-2 text-base font-semibold text-foreground hover:text-brand-700"
            >
              <c.icon weight="duotone" className="size-5 text-brand" />
              {c.title}
            </PanelLink>
            {c.items.map((it) => (
              <PanelLink key={it.name} href={c.href} className={subtleLink}>
                {it.name}
              </PanelLink>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (which === "serve") {
    return (
      <div className="grid grid-cols-[240px_repeat(4,minmax(0,1fr))] gap-6">
        <FeatureTile
          tone="zest"
          icon={UsersThreeIcon}
          title="Who we serve"
          text="Individuals, businesses, property owners and specialist professions."
          cta="See who we help"
          href={SERVE_HREF}
        />
        {AUDIENCES.map((a) => (
          <div key={a.title} className="flex flex-col gap-2">
            <span className="mb-1 flex items-center gap-2 text-base font-semibold">
              <a.icon weight="duotone" className="size-5 text-brand" />
              {a.title}
            </span>
            {a.items.map((name) => (
              <PanelLink key={name} href={SERVE_HREF} className={subtleLink}>
                {name}
              </PanelLink>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (which === "about") {
    return (
      <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-2xl leading-[1.15] font-semibold tracking-[-0.03em]">
            An independent accounting practice in {SITE.areaServed}
          </span>
          <span className="text-[15px] text-muted-foreground">
            Who we are, how we work and what you can expect from us.
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ABOUT_LINKS.map((l) => (
            <PanelLink
              key={l.label}
              href={l.href}
              className="flex-col items-start gap-1.5 rounded-2xl p-4 text-foreground hover:bg-foreground/6 focus:bg-foreground/6"
            >
              <l.icon weight="duotone" className="size-6 text-brand" />
              <span className="text-base font-semibold">{l.label}</span>
              <span className="text-sm text-muted-foreground">{l.sub}</span>
            </PanelLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.3fr)] items-start gap-6">
      {CONTACT_INFO.map((ci) => {
        const body = (
          <>
            <ci.icon weight="duotone" className="size-6 text-brand" />
            <span className="text-xs tracking-[0.1em] text-foreground/70 uppercase">{ci.label}</span>
            <span className="text-[17px] font-semibold">{ci.value}</span>
          </>
        );
        return ci.href ? (
          <NavigationMenuLink
            key={ci.label}
            href={ci.href}
            className="flex-col items-start gap-1.5 p-0 text-foreground hover:bg-transparent hover:text-brand-700 focus:bg-transparent"
          >
            {body}
          </NavigationMenuLink>
        ) : (
          <div key={ci.label} className="flex flex-col gap-1.5">
            {body}
          </div>
        );
      })}
      <div className="flex flex-col gap-2 rounded-2xl bg-brand-100 p-5">
        <span className="text-lg font-semibold">Free initial consultation</span>
        <span className="text-sm text-brand-900">
          Tell us about your situation and we’ll recommend the right support.
        </span>
        <NavigationMenuLink
          closeOnClick
          render={<Link href="/contact" />}
          className={buttonVariants({ size: "lg", className: "mt-1 self-start px-4 hover:bg-brand-600 focus:bg-primary" })}
        >
          Get in touch
        </NavigationMenuLink>
      </div>
    </div>
  );
}

function FeatureTile({ tone, icon: Icon, title, text, cta, href }) {
  const zest = tone === "zest";
  return (
    <div className={cn("flex flex-col gap-2 rounded-2xl px-5 py-7", zest ? "bg-zest-100" : "bg-brand-100")}>
      <Icon weight="duotone" className={cn("size-[30px]", zest ? "text-zest-700" : "text-brand-700")} />
      <span className="mt-2 text-xl leading-tight font-semibold tracking-[-0.02em]">{title}</span>
      <span className={cn("text-sm", zest ? "text-zest-900" : "text-brand-900")}>{text}</span>
      <PanelLink
        href={href}
        className={cn(
          "group/cta mt-auto gap-1.5 pt-4 text-sm font-semibold",
          zest ? "text-zest-700" : "text-brand-700"
        )}
      >
        {cta}
        <ArrowRightIcon weight="duotone" className="transition-transform group-hover/cta:translate-x-0.5" />
      </PanelLink>
    </div>
  );
}

/* ---------- Mobile drill-down menu ---------- */

function mobileView(top) {
  const next = (label, sub, icon, key) => ({ label, sub, icon, next: key });
  const link = (label, sub, icon, href) => ({ label, sub, icon, href });

  if (top === "root")
    return {
      eyebrow: "Menu",
      title: "How can we help?",
      rows: [
        link("Home", "", HouseIcon, "/"),
        next("Services", "4 practice areas", StackIcon, "services"),
        next("Who we serve", "Individuals, businesses, property, specialists", UsersThreeIcon, "serve"),
        next("About", "Our practice and approach", InfoIcon, "about"),
        next("Contact", "Call, email or send a message", ChatCircleTextIcon, "contact"),
      ],
    };
  if (top === "services")
    return {
      eyebrow: "Menu / Services",
      title: "Services",
      intro: "Accounting, tax, advisory and property support.",
      rows: [
        link("All services", "Overview of everything we do", SquaresFourIcon, "/services"),
        ...SERVICES.map((c) => next(c.title, `${c.items.length} services`, c.icon, `svc:${c.key}`)),
      ],
    };
  if (top.startsWith("svc:")) {
    const c = SERVICES.find((x) => `svc:${x.key}` === top);
    return {
      eyebrow: "Services",
      title: c.title,
      intro: c.blurb,
      rows: c.items.map((it) => link(it.name, it.desc, null, c.href)),
    };
  }
  if (top === "serve")
    return {
      eyebrow: "Menu / Who we serve",
      title: "Who we serve",
      intro: "Support tailored to how your income is structured.",
      rows: AUDIENCES.map((a) => next(a.title, a.items.join(", "), a.icon, `aud:${a.title}`)),
    };
  if (top.startsWith("aud:")) {
    const a = AUDIENCES.find((x) => `aud:${x.title}` === top);
    return { eyebrow: "Who we serve", title: a.title, rows: a.items.map((name) => link(name, "", null, SERVE_HREF)) };
  }
  if (top === "about")
    return {
      eyebrow: "Menu / About",
      title: `About ${SITE.shortName}`,
      rows: ABOUT_LINKS.map((l) => link(l.label, l.sub, l.icon, l.href)),
    };
  return {
    eyebrow: "Menu / Contact",
    title: "Contact",
    intro: "Free initial consultation for new clients.",
    rows: [
      ...CONTACT_INFO.filter((ci) => ci.href).map((ci) => link(ci.value, ci.label, ci.icon, ci.href)),
      link("Send a message", "Use our enquiry form", PaperPlaneTiltIcon, "/contact"),
    ],
  };
}

const BACK_LABELS = { root: "Menu", services: "Services", serve: "Who we serve" };

const slide = {
  enter: (dir) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir * -48, opacity: 0 }),
};

function MobileMenu({ open, onOpenChange }) {
  const [stack, setStack] = useState(["root"]);
  const [dir, setDir] = useState(1);
  const top = stack[stack.length - 1];
  const view = mobileView(top);

  const setOpen = (value) => {
    onOpenChange(value);
    if (!value) setStack(["root"]);
  };
  const push = (key) => {
    setDir(1);
    setStack((s) => [...s, key]);
  };
  const back = () => {
    setDir(-1);
    setStack((s) => s.slice(0, -1));
  };

  const rowClass =
    "flex min-h-16 w-full items-center gap-3.5 border-b py-3 text-left text-foreground no-underline transition-colors active:bg-brand-500/10";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 border-0 bg-background data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <div className="flex h-[72px] flex-none items-center gap-2 px-5">
          {stack.length > 1 ? (
            <Button variant="ghost" className="h-11 gap-1 px-2 text-base" onClick={back}>
              <CaretLeftIcon weight="duotone" className="size-[18px]" />
              {BACK_LABELS[stack[stack.length - 2]] ?? "Back"}
            </Button>
          ) : (
            <span className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-[19px] font-semibold tracking-[-0.015em]">{SITE.shortName}</span>
            </span>
          )}
          <Button
            variant="outline"
            size="icon-xl"
            className="ml-auto"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <XIcon weight="duotone" className="size-5" />
          </Button>
        </div>

        <div className="relative flex-1 overflow-x-hidden overflow-y-auto px-5 pt-6 pb-10">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={top}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: EASE }}
            >
              <span className="block text-xs tracking-[0.12em] text-foreground/70 uppercase">{view.eyebrow}</span>
              <SheetTitle className="mt-2 text-[34px] leading-[1.1] font-semibold tracking-[-0.035em]">
                {view.title}
              </SheetTitle>
              {view.intro ? (
                <SheetDescription className="mt-2 text-base text-muted-foreground">{view.intro}</SheetDescription>
              ) : (
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              )}

              <div className="mt-6 flex flex-col border-t">
                {view.rows.map((r) => {
                  const inner = (
                    <>
                      {r.icon && <r.icon weight="duotone" className="size-6 flex-none text-brand" />}
                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className="text-[19px] leading-tight font-semibold">{r.label}</span>
                        {r.sub && <span className="text-sm text-foreground/70">{r.sub}</span>}
                      </span>
                      {r.next ? (
                        <CaretRightIcon weight="duotone" className="size-[18px] text-foreground/60" />
                      ) : (
                        <ArrowRightIcon weight="duotone" className="size-[18px] text-foreground/60" />
                      )}
                    </>
                  );
                  if (r.next)
                    return (
                      <button key={r.label} type="button" className={rowClass} onClick={() => push(r.next)}>
                        {inner}
                      </button>
                    );
                  const external = !r.href.startsWith("/");
                  return external ? (
                    <a key={r.label} href={r.href} className={rowClass}>
                      {inner}
                    </a>
                  ) : (
                    <Link key={r.label} href={r.href} className={rowClass} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-none flex-col gap-2 px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={buttonVariants({ size: "xl", className: "h-12 text-base" })}
          >
            Book a consultation
          </Link>
          <a
            href={PHONE.href}
            className={buttonVariants({ variant: "outline", size: "xl", className: "h-12 text-base" })}
          >
            <PhoneIcon weight="duotone" />
            {PHONE.display}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
