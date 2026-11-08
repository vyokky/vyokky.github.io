import { useEffect, useRef } from "react";
import { useReducedMotion } from "../lib/hooks";

/**
 * Thin-stroke node network for the hero band (after ThreeUI "Constellation Field —
 * Interface Lines / Connectivity Graph", re-drawn in plain Canvas 2D for a light page).
 * - drifts slowly, links fade with distance, small signals travel along links
 * - the pointer joins the graph and gently pushes nodes aside
 * - pauses off-screen / in background tabs; one static frame for reduced motion
 */
export default function NetworkField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    type Signal = { a: number; b: number; t: number; speed: number };
    let nodes: Node[] = [];
    let signals: Signal[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let linkDist = 120;
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let nextSignal = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const seed = () => {
      const area = w * h;
      const count = Math.max(22, Math.min(78, Math.round(area / 15000)));
      linkDist = w < 640 ? 96 : 124;
      nodes = Array.from({ length: count }, () => {
        const a = Math.random() * Math.PI * 2;
        const s = 0.06 + Math.random() * 0.12;
        return { x: Math.random() * w, y: Math.random() * h, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: 0.9 + Math.random() * 1.1 };
      });
      signals = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width));
      const nh = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const changed = Math.abs(nw - w) > 40 || Math.abs(nh - h) > 40 || nodes.length === 0;
      w = nw;
      h = nh;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (changed) seed();
      draw(0);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const step = Math.min(dt, 48) / 16.67;

      for (const n of nodes) {
        if (step > 0) {
          if (pointer.active) {
            const dx = n.x - pointer.x;
            const dy = n.y - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 140 * 140 && d2 > 1) {
              const f = (1 - Math.sqrt(d2) / 140) * 0.06;
              n.vx += (dx / Math.sqrt(d2)) * f;
              n.vy += (dy / Math.sqrt(d2)) * f;
            }
          }
          // ease back to cruising speed
          const sp = Math.hypot(n.vx, n.vy);
          if (sp > 0.35) {
            n.vx *= 0.96;
            n.vy *= 0.96;
          }
          n.x += n.vx * step;
          n.y += n.vy * step;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      // links
      ctx.lineWidth = 0.7;
      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.42;
            ctx.strokeStyle = `rgba(79,165,151,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            links.push([i, j]);
          }
        }
        if (pointer.active) {
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (d < 170) {
            ctx.strokeStyle = `rgba(79,165,151,${((1 - d / 170) * 0.55).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(79,165,151,0.75)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // signals travelling along links
      if (step > 0) {
        nextSignal -= dt;
        if (nextSignal <= 0 && links.length && signals.length < 4) {
          const [a, b] = links[Math.floor(Math.random() * links.length)];
          signals.push({ a, b, t: 0, speed: 0.0011 + Math.random() * 0.0008 });
          nextSignal = 650 + Math.random() * 900;
        }
        signals = signals.filter((s) => {
          s.t += s.speed * dt;
          const A = nodes[s.a];
          const B = nodes[s.b];
          if (!A || !B || s.t >= 1 || Math.hypot(A.x - B.x, A.y - B.y) > linkDist) return false;
          const x = A.x + (B.x - A.x) * s.t;
          const y = A.y + (B.y - A.y) * s.t;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
          g.addColorStop(0, "rgba(112,193,179,0.95)");
          g.addColorStop(1, "rgba(112,193,179,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
      }
    };

    const frame = (now: number) => {
      const dt = now - last;
      last = now;
      draw(dt);
      if (running) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => (visible && !document.hidden ? start() : stop());

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    // skip the <astro-island> wrapper: pointer events over the hero content land on its parent
    let host = canvas.parentElement;
    while (host && host.tagName === "ASTRO-ISLAND") host = host.parentElement;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    if (!reduced) {
      host?.addEventListener("pointermove", onMove);
      host?.addEventListener("pointerleave", onLeave);
    }
    sync();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
