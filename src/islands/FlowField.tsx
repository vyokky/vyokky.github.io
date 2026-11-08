import { useEffect, useRef } from "react";
import { useReducedMotion } from "../lib/hooks";

/**
 * Faint teal streamlines for the footer (after ThreeUI "Portal Field · Flow Field").
 * Particles drift along a slowly changing angle field and leave fading trails.
 * Runs only while visible; reduced motion draws one still set of streamlines.
 */
export default function FlowField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = false;
    type P = { x: number; y: number; life: number };
    let ps: P[] = [];

    const angle = (x: number, y: number, t: number) =>
      (Math.sin(x * 0.0026 + t * 0.00011) + Math.cos(y * 0.0062 - t * 0.00009) + Math.sin((x + y) * 0.0013)) * Math.PI * 0.62;

    const spawn = (): P => ({ x: Math.random() * w, y: Math.random() * h, life: 120 + Math.random() * 260 });

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(80, Math.min(420, Math.round((w * h) / 950)));
      ps = Array.from({ length: n }, spawn);
      ctx.clearRect(0, 0, w, h);
      if (reduced) still();
    };

    const stroke = (a: number) => {
      ctx.strokeStyle = `rgba(42,122,110,${a})`;
      ctx.lineWidth = 0.8;
    };

    const still = () => {
      ctx.clearRect(0, 0, w, h);
      stroke(0.12);
      for (let i = 0; i < 90; i++) {
        let x = Math.random() * w;
        let y = Math.random() * h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let s = 0; s < 120; s++) {
          const a = angle(x, y, 0);
          x += Math.cos(a) * 1.4;
          y += Math.sin(a) * 1.4;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const frame = (t: number) => {
      // fade old trails toward transparent, so the footer background shows through
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.045)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      stroke(0.22);
      ctx.beginPath();
      for (const p of ps) {
        const a = angle(p.x, p.y, t);
        const nx = p.x + Math.cos(a) * 0.9;
        const ny = p.y + Math.sin(a) * 0.9;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        p.x = nx;
        p.y = ny;
        p.life -= 1;
        if (p.life <= 0 || p.x < -5 || p.x > w + 5 || p.y < -5 || p.y > h + 5) Object.assign(p, spawn());
      }
      ctx.stroke();
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

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
