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
  { k: "OSWorld 2.0", v: 66.8, tag: "partial*" },
];

/** Nano / Mini / Pro switcher. Bar length is the score on a 0–100 axis. */
export default function ModelBench() {
  const [sel, setSel] = useState(2);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const m = MODELS[sel];

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div role="tablist" aria-label="NorthCUA model size" className="inline-flex rounded-lg border border-hairline bg-white p-1">
            {MODELS.map((x, i) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={i === sel}
                onClick={() => setSel(i)}
                className={`min-w-[64px] px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  i === sel ? "bg-accent-ink text-white shadow-sm" : "text-gray-600 hover:text-accent-deep"
                }`}
              >
                {x.id}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800 tabular-nums">{m.size}</span>
            <span className="mx-1.5 text-gray-300">/</span>
            {m.note}
          </p>
        </div>

        <div className="space-y-5" role="tabpanel" aria-label={`NorthCUA-${m.id} scores`}>
          {Object.entries(m.scores).map(([k, v]) => (
            <div key={k}>
              <div className="flex items-baseline justify-between text-sm mb-2">
                <span className="text-gray-600">{k}</span>
                <span className="font-semibold text-gray-800 tabular-nums">{v.toFixed(1)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-accent/10 overflow-hidden">
                <div
                  className="bar-fill h-full rounded-full bg-gradient-to-r from-accent-soft to-accent-ink"
                  style={{ transform: `scaleX(${inView ? v / 100 : 0})` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-gray-500 leading-relaxed">
          Scores (%) of RL checkpoints, from the technical report under its reported settings.{" "}
          <a href={m.hf} target="_blank" rel="noopener noreferrer" className="text-accent-ink underline-offset-2 hover:underline">
            NorthCUA-{m.id} on Hugging Face
          </a>
        </p>
      </div>

      <div className="lg:border-l lg:border-hairline lg:pl-8">
        <p className="text-sm font-semibold text-gray-800 mb-4">Pro, grounding and long horizon</p>
        <dl className="divide-y divide-hairline">
          {PRO_EXTRA.map((g) => (
            <div key={g.k} className="flex items-baseline justify-between py-3">
              <dt className="text-sm text-gray-600">
                {g.k} <span className="text-xs text-gray-400">{g.tag}</span>
              </dt>
              <dd className="text-2xl font-semibold tracking-tight text-gray-800 tabular-nums">{g.v.toFixed(1)}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          SFT marks SFT checkpoints. *OSWorld 2.0 is the average partial score over 108 tasks, not full-task success.
        </p>
      </div>
    </div>
  );
}
