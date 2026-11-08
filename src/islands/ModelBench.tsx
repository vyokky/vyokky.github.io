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
const TXT = {
  en: {
    family: "Model family",
    dense: "dense",
    active: "active",
    hf: (id: string) => `NorthCUA-${id} on Hugging Face`,
    pro: "NorthCUA-Pro · grounding & long horizon",
    partial: "partial",
    note: "Scores (%) from the technical report under its reported settings; bars are RL checkpoints, SFT marks SFT checkpoints, OSWorld 2.0 is the average partial score.",
    sizeAria: "NorthCUA model size",
    scoresAria: (id: string) => `NorthCUA-${id} scores`,
  },
  zh: {
    family: "模型家族",
    dense: "稠密",
    active: "激活",
    hf: (id: string) => `在 Hugging Face 查看 NorthCUA-${id}`,
    pro: "NorthCUA-Pro · 定位与长程任务",
    partial: "部分得分",
    note: "分数（%）来自技术报告的评测设置；条形为 RL 检查点，SFT 表示 SFT 检查点，OSWorld 2.0 为平均部分得分。",
    sizeAria: "NorthCUA 模型规模",
    scoresAria: (id: string) => `NorthCUA-${id} 分数`,
  },
};

export default function ModelBench({ lang = "en" }: { lang?: "en" | "zh" }) {
  const t = TXT[lang];
  const [sel, setSel] = useState(2);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const m = MODELS[sel];

  return (
    <div ref={ref}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-800">{t.family}</p>
        <div role="tablist" aria-label={t.sizeAria} className="inline-flex rounded-lg border border-hairline bg-white/80 p-1 shadow-[inset_0_1px_2px_rgb(19_78_70/0.08)]">
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

      <div className="space-y-4" role="tabpanel" aria-label={t.scoresAria(m.id)}>
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
        <span className="font-semibold tabular-nums text-gray-700">{m.size}</span> {m.note === "dense" ? t.dense : m.note.replace("active", t.active)} ·{" "}
        <a href={m.hf} target="_blank" rel="noopener noreferrer" className="text-accent-ink underline-offset-2 hover:underline">
          {t.hf(m.id)}
        </a>
      </p>

      <div className="mt-5 border-t border-hairline pt-4">
        <p className="t-meta mb-2">{t.pro}</p>
        <dl className="grid grid-cols-3 gap-3">
          {PRO_EXTRA.map((g) => (
            <div key={g.k} className="flex flex-col-reverse justify-end">
              <dt className="text-[11px] leading-snug text-gray-500">
                {g.k} <span className="text-gray-400">{g.tag === "partial" ? t.partial : g.tag}</span>
              </dt>
              <dd className="text-xl font-semibold tracking-tight tabular-nums text-gray-900">{g.v.toFixed(1)}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-gray-500">{t.note}</p>
    </div>
  );
}
