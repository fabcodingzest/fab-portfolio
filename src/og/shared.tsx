import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Shared bits for the link-preview images (app/opengraph-image.tsx and per-page ones). */

export const OG_SIZE = { width: 1200, height: 630 };

// dark theme colours from globals.css
export const OG = { bg: "#1b1a1f", fg: "#ededee", muted: "#9a99a2", accent: "#b48bff", onAccent: "#1b1a1f" };

const root = process.cwd();

export async function ogFonts() {
  const [display, sans, sansBold] = await Promise.all(
    ["Bricolage-ExtraBold.ttf", "InstrumentSans-Regular.ttf", "InstrumentSans-SemiBold.ttf"].map((f) => readFile(join(root, "src/og/fonts", f))),
  );
  return [
    { name: "Bricolage", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Instrument Sans", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Sans", data: sansBold, weight: 600 as const, style: "normal" as const },
  ];
}

/* A screenshot from public/ in a phone frame, cropped by the bottom edge of the image.
   Awaited before rendering, since ImageResponse can't render async components. */
export async function ogPhone(src: string) {
  const shot = await readFile(join(root, "public", src));
  return (
    <div style={{ display: "flex", width: 300, height: 652, marginTop: 6, padding: 8, borderRadius: 44, background: "#2b2a31", boxShadow: "0 0 0 2px #3a3940" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
      <img src={`data:image/png;base64,${shot.toString("base64")}`} width={284} height={617} style={{ borderRadius: 36, objectFit: "cover" }} alt="" />
    </div>
  );
}

/* The "click me" pill: same shape as the site's main button. */
export function OgCta({ children }: { children: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 28px", borderRadius: 999, background: OG.accent, color: OG.onAccent, fontSize: 26, fontWeight: 600 }}>
      {children}
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={OG.onAccent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </div>
  );
}
