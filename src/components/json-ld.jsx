/**
 * Renders schema.org structured data, following the Next.js JSON-LD guide:
 * a native <script> tag, with `<` escaped so the payload can't break out of it.
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
