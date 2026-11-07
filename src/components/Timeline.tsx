import { useEffect, useRef, type ReactNode } from "react";
import Reveal from "./Reveal";
import { trackPointer, useReducedMotion } from "../lib/hooks";

export type TimelineItem = {
  title: string;
  org: ReactNode;
  period: string;
  current?: boolean;
  body?: ReactNode;
};

/** Vertical timeline; the accent line fills as the section scrolls past. */
export default function Timeline({ items }: { items: TimelineItem[] }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const fill = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      fill.current?.style.setProperty("transform", "scaleY(1)");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el || !fill.current) return;
      const r = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
      fill.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={wrap} className="relative pl-9 md:pl-11">
      <div aria-hidden="true" className="absolute left-[11px] md:left-[15px] top-3 bottom-3 w-px bg-hairline" />
      <div
        aria-hidden="true"
        ref={fill}
        className="timeline-progress absolute left-[11px] md:left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-accent to-accent-soft"
        style={{ transform: "scaleY(0)" }}
      />
      <div className="space-y-6">
        {items.map((it, i) => (
          <Reveal key={it.title + it.period} delay={i * 60} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-9 md:-left-11 top-6 flex h-[23px] w-[23px] md:h-[31px] md:w-[31px] items-center justify-center rounded-full border border-accent/60 bg-white"
            >
              <span className={`h-2 w-2 rounded-full bg-accent ${it.current ? "pulse-dot" : ""}`} />
            </span>
            <div className="glow-card bg-gray-50/80 border border-hairline p-6 rounded-xl transition-shadow duration-300 hover:shadow-card" onPointerMove={trackPointer}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold text-gray-800">{it.title}</h3>
                <span className="font-mono text-xs text-gray-500 tabular-nums">
                  {it.period}
                  {it.current && (
                    <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] tracking-wider text-accent-ink">NOW</span>
                  )}
                </span>
              </div>
              <p className="text-accent-ink font-medium">{it.org}</p>
              {it.body && <div className="text-gray-600 mt-2">{it.body}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
