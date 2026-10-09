import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site-data";

export function LogoMark({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 place-items-center rounded-2xl bg-ink text-base font-bold tracking-[-0.03em] text-zest",
        className
      )}
    >
      {SITE.logoMark}
    </span>
  );
}

export function Logo({ className, onClick, showTagline = true }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE.name} home`}
      className={cn("flex items-center gap-2.5 rounded-lg text-foreground no-underline", className)}
    >
      <LogoMark />
      <span className="flex flex-col leading-[1.05]">
        <span className="text-[19px] font-semibold tracking-[-0.015em]">{SITE.shortName}</span>
        {showTagline && (
          <span className="text-[10px] tracking-[0.16em] text-foreground/70 uppercase">{SITE.descriptor}</span>
        )}
      </span>
    </Link>
  );
}
