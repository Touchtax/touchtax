import { ImageResponse } from "next/og";
import { SocialCard } from "@/lib/brand-images";
import { SITE } from "@/lib/site-data";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<SocialCard />, size);
}
