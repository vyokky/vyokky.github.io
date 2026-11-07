/**
 * Progressive enhancement for the static page. Everything here is optional:
 * the HTML reads complete without it. Native CSS scroll-driven animations do the heavy lifting
 * where the browser supports them; this file only fills the gaps.
 */

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
const SDA = CSS.supports("animation-timeline: view()");

/* Section reveal fallback (browsers without scroll-driven animations). */
if (!SDA && !REDUCED && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
}

/* Reading progress + timeline fill fallback. */
if (!SDA) {
  const bar = document.querySelector<HTMLElement>(".progress-bar");
  const tl = document.querySelector<HTMLElement>(".timeline");
  let raf = 0;
  const update = () => {
    raf = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar?.style.setProperty("--progress", String(max > 0 ? Math.min(1, scrollY / max) : 0));
    if (tl) {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      tl.style.setProperty("--tl", String(REDUCED ? 1 : p));
    }
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  update();
}

/* Scroll spy: highlight the nav item of the section under the reading band. */
{
  const links = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>("[data-spy]").forEach((a) => links.set(a.hash.slice(1), a));
  const sections = [...links.keys()].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  const visible = new Set<string>();
  const paint = () => {
    const current = sections.find((s) => visible.has(s.id))?.id;
    links.forEach((a, id) => {
      const on = id === current;
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
      a.dataset.active = on ? "true" : "false";
    });
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      }
      paint();
    },
    // a thin band just under the nav: the section crossing it is "current"
    { rootMargin: "-90px 0px -70% 0px", threshold: 0 },
  );
  sections.forEach((s) => io.observe(s));
}

/* Cursor glow on cards, via one delegated listener. */
if (FINE && !REDUCED) {
  addEventListener(
    "pointermove",
    (e) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".glow-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}
