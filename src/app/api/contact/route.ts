/*
  Contact form endpoint. Validates the message, then forwards it to a Google
  Apps Script web app that appends a row to a Google Sheet and emails Fab.
  Setup: scripts/contact-sheet.gs and .env.example.
*/

const LIMITS = { name: 100, email: 200, message: 5000 };
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort per-instance rate limit; enough to stop a casual flood.
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Invalid request.");
  }

  // Honeypot: real visitors never see this field. Pretend success for bots.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) return fail(400, "Please fill in your name, email and message.");
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return fail(400, "That message is too long. Please shorten it or email me directly.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(400, "Please enter a valid email address.");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) return fail(429, "Too many messages. Please try again in a few minutes.");

  const url = process.env.CONTACT_WEBHOOK_URL;
  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error("contact: CONTACT_WEBHOOK_URL or CONTACT_WEBHOOK_SECRET is not set");
    return fail(503, "The form isn't set up yet. Please email me directly.");
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, name, email, message }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) throw new Error(`webhook responded ${res.status}: ${data?.error ?? "no JSON body"}`);
  } catch (err) {
    console.error("contact: forwarding failed", err);
    return fail(502, "Couldn't send your message. Please email me directly.");
  }

  return Response.json({ ok: true });
}
