import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Container({ as: Tag = "section", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1200px] px-[clamp(20px,4vw,40px)]", className)} {...props}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }) {
  return (
    <Badge variant="brand" className={className}>
      {children}
    </Badge>
  );
}

export function PageTitle({ className, children }) {
  return (
    <h1 className={cn("mt-3 text-[clamp(38px,5vw,60px)] leading-[1.05] tracking-[-0.025em]", className)}>
      {children}
    </h1>
  );
}

export function SectionTitle({ className, children }) {
  return <h2 className={cn("mt-2 text-[clamp(30px,3.4vw,42px)] leading-[1.1]", className)}>{children}</h2>;
}

export function Lead({ className, children }) {
  return <p className={cn("text-[17px] leading-[1.65] text-foreground/78", className)}>{children}</p>;
}
