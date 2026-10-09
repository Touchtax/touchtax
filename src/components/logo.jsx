import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 place-items-center rounded-2xl bg-ink text-base font-bold tracking-[-0.03em] text-zest",
        className
      )}
    >
      Tt
    </span>
  );
}

export function Logo({ className, onClick, showTagline = true }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("flex items-center gap-2.5 rounded-lg text-foreground no-underline", className)}
    >
      <LogoMark />
      <span className="flex flex-col leading-[1.05]">
        <span className="text-[19px] font-semibold tracking-[-0.015em]">TouchTax</span>
        {showTagline && (
          <span className="text-[10px] tracking-[0.16em] text-foreground/70 uppercase">Accountants</span>
        )}
      </span>
    </Link>
  );
}
