"use client";

import { useEffect, useState } from "react";
import styles from "./HeroVisual.module.css";

/* Token kinds map to syntax colours in the CSS module. */
type Kind = "kw" | "id" | "str" | "fn" | "tag" | "attr" | "prop" | "num" | "p";
type Line = [Kind, string][];
type Snippet = { file: string; lang: string; langClass: string; lines: Line[]; term: [Kind, string][] };

const SNIPPETS: Snippet[] = [
  {
    file: "profile.ts",
    lang: "TypeScript",
    langClass: "ts",
    lines: [
      [["kw", "const "], ["id", "fab"], ["p", " = {"]],
      [["prop", "  role"], ["p", ": "], ["str", '"Frontend engineer"'], ["p", ","]],
      [["prop", "  stack"], ["p", ": ["], ["str", '"React"'], ["p", ", "], ["str", '"TS"'], ["p", ", "], ["str", '"Node"'], ["p", "],"]],
      [["prop", "  basedIn"], ["p", ": "], ["str", '"Delhi, India"'], ["p", ","]],
      [["p", "};"]],
    ],
    term: [["fn", "➜ "], ["id", "boraami "], ["p", "git:(main) ✓"]],
  },
  {
    file: "PostCard.tsx",
    lang: "React Native",
    langClass: "rn",
    lines: [
      [["p", "<"], ["tag", "View"], ["attr", " style"], ["p", "={styles.card}>"]],
      [["p", "  <"], ["tag", "Avatar"], ["attr", " user"], ["p", "={author} />"]],
      [["p", "  <"], ["tag", "Text"], ["p", ">{post.body}</"], ["tag", "Text"], ["p", ">"]],
      [["p", "  <"], ["tag", "LikeButton"], ["attr", " optimistic"], ["p", " />"]],
      [["p", "</"], ["tag", "View"], ["p", ">"]],
    ],
    term: [["fn", "➜ "], ["p", "eas build "], ["attr", "--platform all"]],
  },
  {
    file: "index.html",
    lang: "HTML",
    langClass: "html",
    lines: [
      [["p", "<"], ["tag", "main"], ["attr", " class"], ["p", "="], ["str", '"hello"'], ["p", ">"]],
      [["p", "  <"], ["tag", "h1"], ["p", ">Hi, I'm Fab</"], ["tag", "h1"], ["p", ">"]],
      [["p", "  <"], ["tag", "p"], ["p", ">I build for web</"], ["tag", "p"], ["p", ">"]],
      [["p", "  <"], ["tag", "p"], ["p", ">and for mobile.</"], ["tag", "p"], ["p", ">"]],
      [["p", "</"], ["tag", "main"], ["p", ">"]],
    ],
    term: [["fn", "✓ "], ["p", "served on "], ["id", "localhost:3000"]],
  },
  {
    file: "styles.css",
    lang: "CSS",
    langClass: "css",
    lines: [
      [["fn", ".card"], ["p", " {"]],
      [["prop", "  display"], ["p", ": "], ["kw", "flex"], ["p", ";"]],
      [["prop", "  gap"], ["p", ": "], ["num", "12px"], ["p", ";"]],
      [["prop", "  border-radius"], ["p", ": "], ["num", "16px"], ["p", ";"]],
      [["prop", "  color"], ["p", ": "], ["str", "#b48bff"], ["p", "; }"]],
    ],
    term: [["fn", "✓ "], ["p", "0 problems, light + dark"]],
  },
  {
    file: "server.js",
    lang: "Node.js",
    langClass: "node",
    lines: [
      [["id", "router"], ["p", "."], ["fn", "post"], ["p", "("], ["str", '"/posts"'], ["p", ", auth,"]],
      [["kw", "  async "], ["p", "(req, res) => {"]],
      [["kw", "    const "], ["id", "post"], ["p", " = "], ["kw", "await "], ["fn", "save"], ["p", "(req);"]],
      [["p", "    res."], ["fn", "status"], ["p", "("], ["num", "201"], ["p", ")."], ["fn", "json"], ["p", "(post);"]],
      [["p", "});"]],
    ],
    term: [["fn", "✓ "], ["p", "API listening on "], ["num", ":8080"]],
  },
];

const SHOW_MS = 3600;
const FADE_MS = 350;

/* Decorative code-editor monitor for the hero. Cycles through snippets from across the stack. */
export default function HeroVisual() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setFading(true);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % SNIPPETS.length);
        setFading(false);
      }, FADE_MS);
    }, SHOW_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, []);

  const s = SNIPPETS[index];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.monitor}>
        <div className={styles.screen}>
          <div className={styles.bar}>
            <div className={styles.dots}>
              <span />
              <span />
              <span />
            </div>
            <span className={styles.file} data-fading={fading}>
              {s.file}
            </span>
            <span className={`${styles.lang} ${styles[s.langClass]}`} data-fading={fading}>
              {s.lang}
            </span>
          </div>
          <div className={styles.body} data-fading={fading}>
            <pre className={styles.code}>
              {s.lines.map((line, i) => (
                <span key={i} className={styles.line}>
                  <span className={styles.ln}>{i + 1}</span>
                  {line.map(([k, t], j) => (
                    <span key={j} className={styles[k]}>
                      {t}
                    </span>
                  ))}
                </span>
              ))}
            </pre>
            <p className={styles.term}>
              {s.term.map(([k, t], j) => (
                <span key={j} className={styles[k]}>
                  {t}
                </span>
              ))}
            </p>
          </div>
          <div className={styles.progress}>
            {SNIPPETS.map((x, i) => (
              <span key={x.file} data-active={i === index} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.stand} />
      <div className={styles.base} />

      <span className={`${styles.badge} ${styles.codeBadge}`}>
        <svg viewBox="0 0 24 24">
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
        </svg>
      </span>
      <span className={`${styles.badge} ${styles.phone}`}>
        <svg viewBox="0 0 24 24">
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M11 18.5h2" />
        </svg>
      </span>
      <span className={`${styles.badge} ${styles.coffee}`}>
        <svg viewBox="0 0 24 24">
          <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9ZM16 11h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3M11 3v3M14 3v3" />
        </svg>
      </span>
    </div>
  );
}
