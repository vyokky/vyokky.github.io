import { useEffect, useRef, useState } from "react";

// Stage copy paraphrases the public NorthCUA project page and technical report.
const STEPS = [
  {
    k: "Harness",
    d: "One execution base for desktop and web. Each attempt binds the request, input files and initial environment; the agent keeps screenshots, action history and useful context over long tasks; the outcome is checked while the workspace is still alive.",
    tags: ["Prepare", "Execute", "Check", "Preserve", "Release"],
  },
  {
    k: "Experience flywheel",
    d: "Three routes start from an intent, an environment or a verifier, and bind request, workspace and acceptance check into an executable task. Assessed trajectories are curated; hard tasks are collected with reusable skills and verified milestones.",
    tags: ["Task construction", "Trajectory curation", "Reusable skills", "Verified milestones"],
  },
  {
    k: "Staged learning",
    d: "Broad GUI mid-training, verified long-horizon SFT, then joint desktop and web reinforcement learning: isolated environments produce fresh attempts, verifiers score them, and GRPO compares attempts that share a request, initial state and verifier.",
    tags: ["GUI mid-training", "Long-horizon SFT", "Desktop + web RL"],
  },
  {
    k: "Stronger policies",
    d: "Updated policies go back to real software for the next round of practice. NorthCUA-Ultrafast adds a choice head that selects finite actions directly and keeps generation for open-ended output.",
    tags: ["Nano 9B", "Mini 35B", "Pro 397B", "Ultrafast"],
  },
];

const R = 112;
const C = 150;
const CIRC = 2 * Math.PI * R;

function nodePos(i: number) {
  const ang = -Math.PI / 2 + (i * Math.PI) / 2;
  return { x: C + R * Math.cos(ang), y: C + R * Math.sin(ang) };
}

function Ring({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  const progress = (active + 1) / STEPS.length;
  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full"
      role="img"
      aria-label={`The NorthCUA experience loop, stage ${active + 1} of 4: ${STEPS[active].k}`}
    >
      <defs>
        <radialGradient id="loopGlow">
          <stop offset="0%" stopColor="#70c1b3" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#70c1b3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r={R + 26} fill="none" stroke="#70c1b3" strokeOpacity="0.12" />
      <circle cx={C} cy={C} r={R - 26} fill="none" stroke="#70c1b3" strokeOpacity="0.12" />
      <circle cx={C} cy={C} r={R} fill="none" stroke="#70c1b3" strokeOpacity="0.45" strokeWidth="1.2" className="loop-path" />
      {/* progress arc: how far round the loop the reader has scrolled */}
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="#2a7a6e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC * (1 - progress)}
        transform={`rotate(-90 ${C} ${C})`}
        style={{ transition: "stroke-dashoffset .9s cubic-bezier(.16,1,.3,1)" }}
      />
      {/* travelling signal: rotates to the active stage */}
      <g style={{ transform: `rotate(${active * 90}deg)`, transformOrigin: `${C}px ${C}px`, transition: "transform .9s cubic-bezier(.16,1,.3,1)" }}>
        <circle cx={C} cy={C - R} r="22" fill="url(#loopGlow)" />
      </g>
      {STEPS.map((s, i) => {
        const { x, y } = nodePos(i);
        const on = i === active;
        const done = i < active;
        return (
          <g key={s.k} onClick={() => onPick(i)} style={{ cursor: "pointer" }}>
            <circle
              cx={x}
              cy={y}
              r={on ? 18 : 14}
              fill={on ? "#2a7a6e" : done ? "#e3f4f1" : "#ffffff"}
              stroke={on || done ? "#2a7a6e" : "#70c1b3"}
              strokeWidth="1.4"
              style={{ transition: "all .5s cubic-bezier(.16,1,.3,1)" }}
            />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill={on ? "#f4fbf9" : "#2a7a6e"} style={{ transition: "fill .4s ease", pointerEvents: "none" }}>
              {i + 1}
            </text>
          </g>
        );
      })}
      <text x={C} y={C - 8} textAnchor="middle" fontSize="12" fill="#6b7280">
        experience
      </text>
      <text x={C} y={C + 12} textAnchor="middle" fontSize="13" fontWeight="600" fill="#2a7a6e">
        into capability
      </text>
    </svg>
  );
}

/**
 * Scroll narrative (after ThreeUI "Diagnostics Panel / Flowing Mesh"): the ring stays pinned while the
 * four stages scroll past; the stage crossing the middle of the viewport lights up and the progress arc
 * advances. Click a node to jump to its stage. Reduced motion: same states, no transitions.
 */
export default function ExperienceLoop() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => {
    setActive(i);
    refs.current[i]?.scrollIntoView({ block: "center" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
      <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)] lg:self-start">
        <div className="mx-auto max-w-[220px] lg:max-w-none">
          <Ring active={active} onPick={pick} />
        </div>
        <p className="mt-4 hidden text-center text-sm text-gray-500 lg:block">
          Stage <span className="font-semibold text-accent-ink tabular-nums">{active + 1}</span> of 4 ·{" "}
          <span className="text-gray-700">{STEPS[active].k}</span>
        </p>
      </div>

      <ol className="space-y-4 lg:space-y-6 lg:py-6">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <li
              key={s.k}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-step={i}
              className={`rounded-xl border p-5 md:p-6 transition-all duration-500 lg:min-h-[34vh] ${
                on ? "border-accent/50 bg-white shadow-card" : "border-hairline bg-white/50"
              }`}
            >
              <p className="flex items-baseline gap-3">
                <span className={`text-sm font-semibold tabular-nums transition-colors ${on ? "text-accent-ink" : "text-gray-400"}`}>
                  0{i + 1}
                </span>
                <span className={`text-xl font-semibold tracking-tight transition-colors ${on ? "text-gray-800" : "text-gray-500"}`}>{s.k}</span>
              </p>
              <p className={`mt-3 leading-relaxed transition-colors ${on ? "text-gray-600" : "text-gray-500"}`}>{s.d}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                      on ? "border-accent/40 bg-accent/10 text-accent-ink" : "border-hairline text-gray-500"
                    }`}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
