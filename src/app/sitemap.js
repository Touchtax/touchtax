import { SITE } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/seo";

// Dates come from site.json: `new Date()` would break prerendering under Cache Components.
const lastModified = new Date(SITE.lastUpdated);

const ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
];

export default function sitemap() {
  return ROUTES.map(({ path, ...rest }) => ({ url: absoluteUrl(path), lastModified, ...rest }));
}
