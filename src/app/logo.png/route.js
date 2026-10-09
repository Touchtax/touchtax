import { ImageResponse } from "next/og";
import { LogoMarkImage } from "@/lib/brand-images";

// Stable, unhashed logo URL (/logo.png) referenced by the schema.org Organization markup.
const SIZE = 512;

export function GET() {
  return new ImageResponse(<LogoMarkImage size={SIZE} />, { width: SIZE, height: SIZE });
}
