import { ArrowUpRight, FileText, Github, Globe, Layers } from "lucide-react";
import ExperienceLoop from "./ExperienceLoop";
import ModelBench from "./ModelBench";
import Reveal from "./Reveal";
import { trackPointer } from "../lib/hooks";

const LINKS = [
  { label: "Technical report", href: "https://arxiv.org/abs/2611.02102", icon: FileText, primary: true },
  { label: "Project page", href: "https://beipo.top/blog/northcua/en/", icon: Globe },
  { label: "Models", href: "https://huggingface.co/beipo-ai", icon: Layers },
  { label: "Code", href: "https://github.com/beipo-ai/NorthCUA", icon: Github },
];

// Spec band: three facts, each with its source qualification spelled out.
const FACTS = [
  {
    big: "Open-source SOTA",
    small: "among open-source models under the reported settings, in GUI grounding, desktop execution and web interaction",
  },
  {
    big: "9B to 397B",
    small: "three open models: Nano (dense), Mini (3B active) and Pro (17B active), built on Qwen3.5",
  },
  {
    big: "2.3×",
    small: "lower mean task time with NorthCUA-Ultrafast (pre-RL Nano, 320 fixed successful WebArena-Verified tasks, 60.6% vs 64.2% success)",
  },
];

export default function NorthCUASpotlight() {
  return (
    <Reveal as="section" id="northcua" className="mb-20">
      <h2 className="text-2xl font-bold tracking-tight text-gray-800 mb-6 pb-2 border-b-2 border-accent">Spotlight: NorthCUA</h2>

      <div className="beam-border shadow-lift">
        <div className="relative overflow-clip rounded-[15px] bg-white">
          <div aria-hidden="true" className="dot-grid absolute inset-0" />
          <div aria-hidden="true" className="absolute -top-28 -right-28 h-80 w-80 rounded-full bg-accent-soft/20 blur-3xl" />

          <div className="relative p-6 sm:p-8 md:p-12">
            {/* Masthead */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-ink">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                Open source, Nov 2026
              </span>
              <span>Project lead · co-first author · core contributor</span>
            </div>

            <h3 className="mt-5 text-5xl md:text-6xl font-bold tracking-[-0.035em] leading-[0.95] text-gray-800">
              North<span className="text-accent">CUA</span>
            </h3>
            <p className="mt-3 text-lg md:text-xl text-gray-600 tracking-tight">
              Turbocharging Computer-Use Agents through Experience at Scale
            </p>
            <p className="mt-6 max-w-[68ch] text-gray-600 leading-relaxed">
              NorthCUA is an experience-driven computer-use agent system that turns natural-language goals into work across
              desktop applications and the web. I lead it from zero to one at <strong className="text-gray-800">Beipo</strong>:
              a <strong className="text-gray-800">unified harness</strong> that executes, verifies and preserves long-horizon
              tasks, an <strong className="text-gray-800">experience flywheel</strong> that turns weak spots into
              high-value training data, and <strong className="text-gray-800">staged post-training</strong> that turns that
              experience into stronger policies.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {LINKS.map(({ label, href, icon: Icon, primary }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    primary
                      ? "bg-accent-ink text-white shadow-card hover:bg-accent-deep"
                      : "border border-accent/50 bg-white/80 text-accent-ink hover:border-accent hover:bg-accent/10"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                  <ArrowUpRight size={14} className="opacity-70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>

            {/* Spec band */}
            <dl className="mt-10 grid border-y border-hairline md:grid-cols-3 md:divide-x md:divide-hairline">
              {FACTS.map((f, i) => (
                <div key={f.big} className={`py-5 md:px-6 ${i === 0 ? "md:pl-0" : ""} ${i > 0 ? "border-t border-hairline md:border-t-0" : ""}`}>
                  <dt className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-gray-800">{f.big}</dt>
                  <dd className="mt-1.5 text-sm text-gray-500 leading-relaxed">{f.small}</dd>
                </div>
              ))}
            </dl>

            {/* How it learns: scroll narrative, ring pinned while the stages pass */}
            <div className="mt-14">
              <h4 className="text-2xl font-semibold tracking-tight text-gray-800">How it learns</h4>
              <p className="mt-1 mb-8 text-gray-500">One loop, from executing real tasks to training on what they taught. Scroll through it.</p>
              <ExperienceLoop />
            </div>

            {/* Model family */}
            <div className="glow-card mt-14 rounded-xl border border-hairline bg-white/80 p-5 md:p-7" onPointerMove={trackPointer}>
              <h4 className="text-2xl font-semibold tracking-tight text-gray-800">Model family</h4>
              <p className="mt-1 mb-6 text-sm text-gray-500">Switch sizes to compare scores on the same three benchmarks.</p>
              <ModelBench />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
