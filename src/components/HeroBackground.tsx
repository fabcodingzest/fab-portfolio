"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroBackground.module.css";

/*
  Hero background: a slow starfield (a nod to Boraami's night sky) mixed with faint
  code symbols. Each particle has a depth, so moving the cursor shifts near ones more
  than far ones (a light 3D parallax), and particles close to the cursor link up.

  Kept cheap: particle count scales with area, it pauses when the hero is off screen
  or the tab is hidden, and with reduced motion it draws one still frame.
*/

const GLYPHS = ["</>", "{ }", "=>", "( )", "[ ]", "&&", "//", "++"];

type Particle = { x: number; y: number; z: number; vx: number; vy: number; glyph?: string; tw: number };

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let color = "180, 139, 255";
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };

    const readColor = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
      if (m) color = `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.max(28, Math.round((w * h) / 9000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.25 + Math.random() * 0.75,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        glyph: Math.random() < 0.2 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : undefined,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      // ease the parallax toward the cursor
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const px = mouse.x - w / 2;
      const py = mouse.y - h / 2;

      const pts = particles.map((p) => ({ p, x: p.x - px * p.z * 0.09, y: p.y - py * p.z * 0.09 }));

      // faint links between nearby particles, brighter near the cursor
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        if (a.p.glyph) continue;
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          if (b.p.glyph) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 140) continue;
          let alpha = (1 - d / 140) * 0.28 * Math.min(a.p.z, b.p.z);
          if (mouse.active) {
            const dm = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y);
            if (dm < 200) alpha += (1 - dm / 200) * 0.5;
          }
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const { p, x, y } of pts) {
        const twinkle = 0.6 + 0.4 * Math.sin(t * 0.0016 + p.tw);
        if (p.glyph) {
          ctx.font = `${Math.round(12 + p.z * 10)}px ui-monospace, Menlo, Consolas, monospace`;
          ctx.fillStyle = `rgba(${color}, ${(0.2 + p.z * 0.32) * twinkle})`;
          ctx.fillText(p.glyph, x, y);
        } else {
          ctx.fillStyle = `rgba(${color}, ${(0.35 + p.z * 0.6) * twinkle})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.9 + p.z * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
    };

    let frame = 0;
    let running = false;
    const loop = (t: number) => {
      step();
      draw(t);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    readColor();
    resize();
    draw(0);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.active = mouse.ty >= 0 && mouse.ty <= rect.height;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.tx = w / 2;
      mouse.ty = h / 2;
    };
    mouse.x = mouse.tx = w / 2;
    mouse.y = mouse.ty = h / 2;

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    const themeObserver = new MutationObserver(() => {
      readColor();
      if (reduced) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onResize = () => {
      resize();
      draw(0);
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
