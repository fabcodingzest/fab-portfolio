import { ImageResponse } from "next/og";
import { OG, OG_SIZE, OgCta, ogFonts, ogPhone } from "@/og/shared";

/* Link preview for the home page. Built once at build time. Per CONTENT.md, numbers stay in the Boraami case study. */

export const alt = "Fabeha Rizvi (Fab), Frontend Engineer: web and cross-platform mobile apps with React and React Native";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const [fonts, phone] = await Promise.all([ogFonts(), ogPhone("screens/welcome.png")]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: OG.bg, color: OG.fg, fontFamily: "Instrument Sans", padding: "56px 72px", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, alignSelf: "flex-start", padding: "6px 18px", border: `2px solid ${OG.accent}80`, borderRadius: 999, color: OG.accent, fontSize: 22, fontWeight: 600 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: OG.accent }} />
            Open to full-time roles
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontFamily: "Bricolage", fontSize: 104, lineHeight: 0.95, letterSpacing: "-0.035em" }}>
            <span style={{ color: OG.accent }}>FRONTEND</span>
            <span>ENGINEER</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.4, color: OG.muted, maxWidth: 660 }}>
            Web and cross-platform mobile apps with React and React Native. Co-founder and frontend lead of Boraami, live on both app stores.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: "auto" }}>
            <OgCta>See my work</OgCta>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 22, color: OG.muted }}>
              <span style={{ color: OG.fg, fontWeight: 600 }}>Fabeha Rizvi (Fab)</span>
              <span>Delhi, India · fabcodingzest.com</span>
            </div>
          </div>
        </div>
        {phone}
      </div>
    ),
    { ...size, fonts },
  );
}
