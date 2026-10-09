import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container, Eyebrow, Lead, PageTitle } from "@/components/page-parts";
import { Reveal } from "@/components/motion";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <Container className="py-[clamp(72px,10vw,140px)]">
      <Reveal>
        <Eyebrow>404</Eyebrow>
        <PageTitle className="max-w-[18ch]">We couldn’t find that page</PageTitle>
        <Lead className="mt-4 max-w-[46ch]">
          The page may have moved. Head back to the homepage or get in touch and we’ll point you in the right
          direction.
        </Lead>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className={buttonVariants({ size: "xl" })}>
            Back to home
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "outline", size: "xl", className: "bg-white" })}>
            Contact us
          </Link>
        </div>
      </Reveal>
    </Container>
  );
}
