import { useEffect, useRef } from "react";
import { useReducedMotion } from "../lib/hooks";

/**
 * Breathing dot matrix for the NorthCUA card (after ThreeUI "Structure Flow · Dot Matrix" /
 * "Predictive Arc · Signal Particles"). Dots fade in from the top-right corner, breathe slowly,
 * light up around the pointer and ripple outward as it moves. Static for reduced motion.
 */
export default function DotField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    // the island wrapper (<astro-island>, display: contents) has no box and no content: listen on the card
    let host = canvas?.parentElement ?? null;
    while (host && host.tagName === "ASTRO-ISLAND") host = host.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 18;
    let w = 0;
    let h = 0;
    let dots: { x: number; y: number; base: number }[] = [];
    let raf = 0;
    let running = false;
    let visible = false;
    const pointer = { x: 0, y: 0, on: false };
    let ripples: { x: number; y: number; t0: number }[] = [];
    let lastRipple = 0;

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const reach = Math.hypot(w, h) * 0.78;
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const d = Math.hypot(w - x, y) / reach; // distance from the top-right corner
          dots.push({ x, y, base: Math.pow(Math.max(0, 1 - d), 1.5) * 0.55 });
        }
      }
      draw(performance.now());
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ripples = ripples.filter((r) => t - r.t0 < 1400);
      for (const d of dots) {
        let a = d.base * (reduced ? 1 : 0.78 + 0.22 * Math.sin(t * 0.0013 + (d.x + d.y) * 0.011));
        let boost = 0;
        if (pointer.on) {
          const dp = Math.hypot(d.x - pointer.x, d.y - pointer.y);
          if (dp < 120) boost += Math.pow(1 - dp / 120, 2) * 0.85;
        }
        for (const r of ripples) {
          const age = (t - r.t0) / 1400;
          const radius = age * 260;
          const dr = Math.abs(Math.hypot(d.x - r.x, d.y - r.y) - radius);
          if (dr < 22) boost += (1 - dr / 22) * (1 - age) * 0.7;
        }
        a = Math.min(1, a + boost);
        if (a < 0.03) continue;
        const s = 1 + boost * 1.3;
        ctx.fillStyle = `rgba(42,122,110,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, s, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (t: number) => {
      draw(t);
      if (running) raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      const want = visible && !document.hidden && !reduced;
      if (want && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!want && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reduced) return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = true;
      const now = performance.now();
      if (now - lastRipple > 650) {
        ripples.push({ x: pointer.x, y: pointer.y, t0: now });
        lastRipple = now;
      }
    };
    const onLeave = () => {
      pointer.on = false;
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
