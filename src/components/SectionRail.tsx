"use client";

import { useEffect, useState } from "react";
import styles from "./SectionRail.module.css";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Boraami" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "next", label: "Next role" },
  { id: "contact", label: "Contact" },
];

/* Wide screens only: a slim progress line on the left showing which section you're in. */
export default function SectionRail() {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className={styles.rail} aria-label="Sections" data-visible={active !== null}>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.fill} style={{ transform: `scaleY(${progress})` }} />
      </span>
      <ol>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} data-active={s.id === active} aria-current={s.id === active ? "true" : undefined}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
