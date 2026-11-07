import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "../lib/hooks";

type Props = { to: number; suffix?: string; duration?: number; decimals?: number; className?: string };

/** Counts from 0 to `to` once visible. Renders the final value immediately for reduced motion. */
export default function CountUp({ to, suffix = "", duration = 1400, decimals = 0, className = "" }: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  const shown = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={`${to.toLocaleString("en-US")}${suffix}`}>
      {shown}
      {suffix}
    </span>
  );
}
