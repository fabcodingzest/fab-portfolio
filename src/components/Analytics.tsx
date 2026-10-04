"use client";

import { useEffect } from "react";
import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";

/*
  Google Analytics 4. Only loads when NEXT_PUBLIC_GA_ID is set (in Netlify's environment
  variables), so local development and builds without an ID send nothing.

  Besides page views, any link or button with data-track="event_name" sends that event
  when clicked, with its data-label (if any) attached. The contact form sends
  "contact_submit" itself after a successful send.
*/
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function track(name: string, params?: Record<string, string>) {
  if (!GA_ID) return;
  sendGAEvent("event", name, params ?? {});
}

export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const label = el.dataset.label;
      track(el.dataset.track!, label ? { label } : undefined);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null;
}
