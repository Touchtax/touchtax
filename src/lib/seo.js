import { FAQS, SERVICES, SITE } from "@/lib/site-data";

export const absoluteUrl = (path = "/") => new URL(path, `${SITE.url}/`).toString();

const ORG_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

/**
 * Per-page metadata. Page-level `openGraph`/`twitter` objects replace the layout's
 * rather than merging with them, so the shared fields are repeated here.
 */
export function pageMetadata({ title, description, path }) {
  const ogTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const image = { width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` };
  return {
    // Omit `title` entirely on the home page so the layout's default title applies.
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url: path,
      title: ogTitle,
      description,
      images: [{ url: "/opengraph-image", type: "image/png", ...image }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [{ url: "/twitter-image", ...image }],
      ...(SITE.social.twitterHandle && { site: SITE.social.twitterHandle, creator: SITE.social.twitterHandle }),
    },
  };
}

/* ---------- JSON-LD (schema.org) ---------- */

const sameAs = () =>
  Object.entries(SITE.social)
    .filter(([key, value]) => key !== "twitterHandle" && value)
    .map(([, value]) => value);

function postalAddress() {
  const a = SITE.address;
  return {
    "@type": "PostalAddress",
    ...(a.streetAddress && { streetAddress: a.streetAddress }),
    addressLocality: a.locality,
    ...(a.region && { addressRegion: a.region }),
    ...(a.postalCode && { postalCode: a.postalCode }),
    addressCountry: a.country,
  };
}

/** Site-wide graph: the business itself plus the website. Rendered once in the root layout. */
export function organizationSchema() {
  const { contact } = SITE;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "@id": ORG_ID,
        name: SITE.name,
        alternateName: SITE.shortName,
        description: SITE.description,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/logo.png"),
        image: absoluteUrl("/opengraph-image"),
        telephone: contact.phoneE164,
        email: contact.email,
        priceRange: SITE.priceRange,
        address: postalAddress(),
        areaServed: { "@type": "City", name: SITE.areaServed },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: contact.hours.days,
          opens: contact.hours.opens,
          closes: contact.hours.closes,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: contact.phoneE164,
          email: contact.email,
          areaServed: SITE.address.country,
          availableLanguage: ["English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Accounting and tax services",
          itemListElement: SERVICES.map((c) => ({
            "@type": "OfferCatalog",
            name: c.title,
            itemListElement: c.items.map((it) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: it.name, description: it.desc },
            })),
          })),
        },
        ...(sameAs().length && { sameAs: sameAs() }),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE.name,
        url: absoluteUrl("/"),
        inLanguage: SITE.language,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** A WebPage-type node with breadcrumbs; `type` can be AboutPage, ContactPage, CollectionPage… */
export function webPageSchema({ type = "WebPage", name, description, path, crumbs = [] }) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name,
        description,
        inLanguage: SITE.language,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
      },
      ...(crumbs.length
        ? [
            {
              "@type": "BreadcrumbList",
              itemListElement: trail.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.name,
                item: absoluteUrl(c.path),
              })),
            },
          ]
        : []),
    ],
  };
}

export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} services`,
    itemListElement: SERVICES.flatMap((c) => c.items.map((it) => ({ ...it, category: c.title, key: c.key }))).map(
      (it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: it.name,
          description: it.desc,
          category: it.category,
          url: absoluteUrl(`/services#svc-${it.key}`),
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "City", name: SITE.areaServed },
        },
      })
    ),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
