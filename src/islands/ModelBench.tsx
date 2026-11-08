import { useState } from "react";
import { useInView } from "../lib/hooks";

// Public numbers from the NorthCUA technical report (arXiv 2611.02102, p.65) and the model cards.
const MODELS = [
  {
    id: "Nano",
    size: "9B",
    note: "dense",
    scores: { "OSWorld-Verified": 78.9, "WebArena-Verified": 67.2, "WebTestBench F1": 48.0 },
    hf: "https://huggingface.co/beipo-ai/NorthCUA-Nano",
  },
  {
    id: "Mini",
    size: "35B",
    note: "3B active",
    scores: { "OSWorld-Verified": 85.3, "WebArena-Verified": 70.4, "WebTestBench F1": 54.4 },
    hf: "https://huggingface.co/beipo-ai/NorthCUA-Mini",
  },
  {
    id: "Pro",
    size: "397B",
    note: "17B active",
    scores: { "OSWorld-Verified": 88.6, "WebArena-Verified": 73.9, "WebTestBench F1": 60.3 },
    hf: "https://huggingface.co/beipo-ai/NorthCUA-Pro",
  },
] as const;

const PRO_EXTRA = [
  { k: "ScreenSpot-Pro", v: 93.3, tag: "SFT" },
  { k: "OSWorld-G", v: 91.0, tag: "SFT" },
  { k: "OSWorld 2.0", v: 66.8, tag: "partial" },
];

/** Nano / Mini / Pro switcher. Bar length is the score on a 0–100 axis. */
export default function ModelBench() {
  const [sel, setSel] = useState(2);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const m = MODELS[sel];

  return (
    <div ref={ref}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-800">Model family</p>
        <div role="tablist" aria-label="NorthCUA model size" className="inline-flex rounded-lg border border-hairline bg-white/80 p-1 shadow-[inset_0_1px_2px_rgb(19_78_70/0.08)]">
          {MODELS.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={i === sel}
              onClick={() => setSel(i)}
              className={`min-w-[56px] rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                i === sel ? "btn-primary" : "text-gray-600 hover:text-accent-deep"
              }`}
            >
              {x.id}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4" role="tabpanel" aria-label={`NorthCUA-${m.id} scores`}>
        {Object.entries(m.scores).map(([k, v]) => (
          <div key={k}>
            <div className="mb-1.5 flex items-baseline justify-between text-sm">
              <span className="text-gray-600">{k}</span>
              <span className="font-semibold tabular-nums text-gray-800">{v.toFixed(1)}</span>
            </div>
            <div className="bar-track h-1.5 overflow-hidden rounded-full bg-accent/10">
              <div
                className="bar-fill h-full rounded-full bg-linear-to-r from-accent-soft to-accent-ink"
                style={{ transform: `scaleX(${inView ? v / 100 : 0})` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        <span className="font-semibold tabular-nums text-gray-700">{m.size}</span> {m.note} ·{" "}
        <a href={m.hf} target="_blank" rel="noopener noreferrer" className="text-accent-ink underline-offset-2 hover:underline">
          NorthCUA-{m.id} on Hugging Face
        </a>
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-hairline pt-4">
        {PRO_EXTRA.map((g) => (
          <div key={g.k} className="flex flex-col-reverse">
            <dt className="text-[11px] leading-tight text-gray-500">
              Pro · {g.k} <span className="text-gray-400">{g.tag}</span>
            </dt>
            <dd className="text-xl font-semibold tracking-tight tabular-nums text-gray-800">{g.v.toFixed(1)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[11px] leading-relaxed text-gray-500">
        Scores (%) from the technical report under its reported settings; bars are RL checkpoints, SFT marks SFT checkpoints,
        OSWorld 2.0 is the average partial score.
      </p>
    </div>
  );
}
