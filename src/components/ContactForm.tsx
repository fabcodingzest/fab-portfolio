"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Couldn't send your message. Please email me directly.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : String(err) });
    }
  }

  if (status.state === "sent") {
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>Message sent.</p>
        <p>Thanks for writing. I&rsquo;ll reply to the email you gave.</p>
        <button type="button" className="link" onClick={() => setStatus({ state: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={100} />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={5} required maxLength={5000} />
      </label>
      {/* honeypot: hidden from people, bots fill it in */}
      <label className={styles.trap} aria-hidden="true">
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className={styles.actions}>
        <button type="submit" className="button" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
        {status.state === "error" && (
          <p className={styles.error} role="alert">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
