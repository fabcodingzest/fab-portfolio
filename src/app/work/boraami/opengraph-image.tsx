import { ImageResponse } from "next/og";
import { STATS } from "@/components/boraami";
import { OG, OG_SIZE, OgCta, ogFonts, ogPhone } from "@/og/shared";

/* Link preview for /work/boraami (LinkedIn, Slack, WhatsApp...). Built once at build time. */

export const alt = "Boraami case study by Fab: a social app for the BTS fan community, live on the App Store and Google Play";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const [fonts, phone] = await Promise.all([ogFonts(), ogPhone("screens/boraline.png")]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: OG.bg, color: OG.fg, fontFamily: "Instrument Sans", padding: "56px 72px", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", padding: "6px 18px", border: `2px solid ${OG.accent}80`, borderRadius: 999, color: OG.accent, fontSize: 22, fontWeight: 600 }}>
            Case study · Live on both app stores
          </div>
          <div style={{ marginTop: 18, fontFamily: "Bricolage", fontSize: 120, lineHeight: 1, letterSpacing: "-0.035em" }}>BORAAMI</div>
          <div style={{ marginTop: 16, fontSize: 28, lineHeight: 1.35, color: OG.muted, maxWidth: 640 }}>
            A social app for the BTS fan community, from its first commit to both app stores.
          </div>
          <div style={{ display: "flex", gap: 44, marginTop: 30 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "Bricolage", fontSize: 48, lineHeight: 1, color: OG.accent, letterSpacing: "-0.035em" }}>{s.value}</div>
                <div style={{ marginTop: 6, fontSize: 20, color: OG.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: "auto" }}>
            <OgCta>Read the case study</OgCta>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 22, color: OG.muted }}>
              <span style={{ color: OG.fg, fontWeight: 600 }}>Fabeha Rizvi (Fab)</span>
              <span>Frontend Engineer</span>
            </div>
          </div>
        </div>
        {phone}
      </div>
    ),
    { ...size, fonts },
  );
}
