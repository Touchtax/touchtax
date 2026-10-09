import { SERVICES, SITE } from "@/lib/site-data";

const { brand, ink, accent } = SITE.theme;

/** Square logo mark (used for favicon, Apple icon and the schema.org logo). */
export function LogoMarkImage({ size }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ink,
        color: accent,
        borderRadius: size * 0.22,
        fontSize: size * 0.46,
        fontWeight: 700,
        letterSpacing: "-0.04em",
      }}
    >
      {SITE.logoMark}
    </div>
  );
}

/** 1200×630 social card. */
export function SocialCard() {
  const host = new URL(SITE.url).host;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#fafafa",
        backgroundColor: ink,
        backgroundImage: `radial-gradient(60% 80% at 90% 0%, ${brand}aa, transparent 70%), radial-gradient(40% 60% at 0% 100%, ${accent}33, transparent 70%)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "#ffffff",
            color: ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          {SITE.logoMark}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 36, fontWeight: 700 }}>{SITE.shortName}</span>
          <span style={{ fontSize: 16, letterSpacing: 4, textTransform: "uppercase", color: "#a1a1aa" }}>
            {SITE.descriptor}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span style={{ fontSize: 26, color: accent, fontWeight: 600 }}>{SITE.tagline}</span>
        <span style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 1000 }}>
          {SITE.description}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {SERVICES.map((s) => (
            <span
              key={s.key}
              style={{
                fontSize: 20,
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              {s.short}
            </span>
          ))}
        </div>
        <span style={{ fontSize: 22, color: "#a1a1aa" }}>{host}</span>
      </div>
    </div>
  );
}
