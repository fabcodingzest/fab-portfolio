import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { STATS } from "@/components/boraami";

/* Link preview for /work/boraami (LinkedIn, Slack, WhatsApp...). Built once at build time. */

export const alt = "Boraami case study by Fab: a social app for the BTS fan community, live on the App Store and Google Play";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const here = join(process.cwd(), "src/app/work/boraami");

// dark theme colours from globals.css
const BG = "#1b1a1f";
const FG = "#ededee";
const MUTED = "#9a99a2";
const ACCENT = "#b48bff";

export default async function Image() {
  const [display, sans, sansBold, shot] = await Promise.all([
    readFile(join(here, "fonts/Bricolage-ExtraBold.ttf")),
    readFile(join(here, "fonts/InstrumentSans-Regular.ttf")),
    readFile(join(here, "fonts/InstrumentSans-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/screens/boraline.png")),
  ]);
  const screen = `data:image/png;base64,${shot.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BG, color: FG, fontFamily: "Instrument Sans", padding: "64px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", padding: "6px 18px", border: `2px solid ${ACCENT}80`, borderRadius: 999, color: ACCENT, fontSize: 22, fontWeight: 600 }}>
            Case study · Live on both app stores
          </div>
          <div style={{ marginTop: 22, fontFamily: "Bricolage", fontSize: 128, lineHeight: 1, letterSpacing: "-0.035em" }}>BORAAMI</div>
          <div style={{ marginTop: 20, fontSize: 30, lineHeight: 1.35, color: MUTED, maxWidth: 640 }}>
            A social app for the BTS fan community, from its first commit to both app stores.
          </div>
          <div style={{ display: "flex", gap: 48, marginTop: "auto" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "Bricolage", fontSize: 52, lineHeight: 1, color: ACCENT, letterSpacing: "-0.035em" }}>{s.value}</div>
                <div style={{ marginTop: 6, fontSize: 20, color: MUTED }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 22, color: MUTED }}>
            <span style={{ color: FG, fontWeight: 600 }}>Fab</span>
            <span style={{ margin: "0 10px" }}>·</span>
            Frontend Engineer, co-founder and frontend lead
          </div>
        </div>

        {/* phone, cropped by the bottom edge */}
        <div style={{ display: "flex", width: 300, height: 652, marginTop: 6, padding: 8, borderRadius: 44, background: "#2b2a31", boxShadow: "0 0 0 2px #3a3940" }}>
          <img src={screen} width={284} height={617} style={{ borderRadius: 36, objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Instrument Sans", data: sans, weight: 400, style: "normal" },
        { name: "Instrument Sans", data: sansBold, weight: 600, style: "normal" },
      ],
    },
  );
}
