"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const NAV_HEIGHT = 64;

export default function Nav() {
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, show on scroll up (and always near the top). The current
  // offset is shared as --nav-offset so sticky things (the case study phone) can follow.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6 || y < 80) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-offset", hidden ? "0px" : `${NAV_HEIGHT}px`);
  }, [hidden]);

  return (
    <>
      <nav
        className={styles.nav}
        aria-label="Main"
        data-hidden={hidden}
        onFocus={() => setHidden(false)}
      >
        <div className={`container ${styles.inner}`}>
          <a href="#top" className={styles.brand} aria-label="Fabeha Rizvi, back to top">
            FR<span>.</span>
          </a>
          <ul className={styles.links}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <ThemeToggle />
            <a className={`button ${styles.resume}`} href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
