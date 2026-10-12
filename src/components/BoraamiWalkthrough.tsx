"use client";

import { useEffect, useRef, useState } from "react";
import Phone from "./Phone";
import { STEPS } from "./boraami";
import styles from "./BoraamiWalkthrough.module.css";

export default function BoraamiWalkthrough() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  // Motion 2 of 3: the last step whose top has crossed a trigger line picks the screen.
  // Desktop: the line is mid-viewport. Phones: the device is pinned at the top, so the
  // line sits halfway down the readable area under it.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const desktop = window.matchMedia("(min-width: 960px)").matches;
      const phoneBottom = phoneRef.current?.getBoundingClientRect().bottom ?? 0;
      const line = desktop ? window.innerHeight * 0.5 : phoneBottom + (window.innerHeight - phoneBottom) * 0.5;
      let next = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
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
    <div className={styles.stage}>
      <div className={styles.phoneWrap} ref={phoneRef}>
        <Phone className={styles.phone} sizes="(min-width: 960px) 300px, 42vw" screens={STEPS.map((s) => s.screen)} active={active} />
      </div>
      <ol className={styles.steps}>
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-index={i}
            data-active={i === active}
            className={styles.step}
          >
            {/* phones: each step shows its own screenshot instead of a pinned phone */}
            <div className={styles.stepPhone}>
              <Phone sizes="56vw" screens={[s.screen]} />
            </div>
            <h3>{s.title}</h3>
            <p className={styles.plain}>{s.plain}</p>
            <dl className={styles.split}>
              <div>
                <dt>Frontend</dt>
                <dd>{s.frontend}</dd>
              </div>
              <div>
                <dt>Backend</dt>
                <dd>{s.backend}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
