import { Fragment, useMemo, useState } from "react";
import { ChevronDown, Search, Star, X } from "lucide-react";
import { publications, type Publication } from "../data/publications";

const GROUP_ORDER = ["preprints", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2015"];
const TXT = {
  en: {
    preprints: "Preprints",
    filter: "Filter publications",
    placeholder: "Filter by title, author, venue or year",
    clear: "Clear filter",
    selected: "Selected",
    count: (n: number, total: number) => `${n} of ${total} papers`,
    none: (q: string) => `No publications match “${q}”.`,
    show: (n: number, g: string) => `Show ${n} ${n === 1 ? "paper" : "papers"} from ${g}`,
    accepted: " · Accepted",
  },
  zh: {
    preprints: "预印本",
    filter: "筛选论文",
    placeholder: "按标题、作者、会议或年份筛选",
    clear: "清除筛选",
    selected: "精选",
    count: (n: number, total: number) => `${n} / ${total} 篇`,
    none: (q: string) => `没有与“${q}”匹配的论文。`,
    show: (n: number, g: string) => `展开 ${g} 的 ${n} 篇论文`,
    accepted: " · 已接收",
  },
};
type T = (typeof TXT)["en"];
const ME = "Chaoyun Zhang";
// Short pill labels keep the link column to one tidy row.
const SHORT: Record<string, string> = { Documentation: "Docs", YouTube: "Video", HuggingFace: "HF", Website: "Site", Leaderboard: "Board" };

function Authors({ text }: { text: string }) {
  const parts = text.split(ME);
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <b className="font-semibold text-gray-800 underline decoration-accent decoration-2 underline-offset-2">{ME}</b>}
        </Fragment>
      ))}
    </>
  );
}

function PubRow({ p, t }: { p: Publication; t: T }) {
  return (
    <li className="group relative isolate py-5 before:absolute before:-inset-x-4 before:inset-y-1.5 before:-z-10 before:rounded-xl before:bg-white before:opacity-0 before:shadow-card before:transition-opacity before:duration-300 hover:before:opacity-100">
      <div className="grid gap-x-6 gap-y-3 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <h4 className="text-[16.5px] font-semibold leading-snug tracking-[-0.012em] text-gray-900 transition-colors group-hover:text-accent-deep">
            {p.selected && (
              <span className="chip mr-2 -translate-y-0.5 align-middle">
                <Star size={10} className="fill-current" /> {t.selected}
              </span>
            )}
            {p.selected ? " " : ""}
            {p.title}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
            <Authors text={p.authors} />
          </p>
          <p className="mt-1 text-[13px] font-medium text-accent-ink">
            {p.venue} ({p.year}){p.accepted ? t.accepted : ""}
          </p>
        </div>
        {p.links.length > 0 && (
          <div className="flex flex-wrap content-start gap-1.5 md:max-w-[240px] md:justify-end">
            {p.links.map((l) => (
              <a
                key={l.label + l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="surface whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent-ink transition hover:border-accent hover:text-accent-deep"
              >
                {SHORT[l.label] ?? l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function Publications({ lang = "en" }: { lang?: "en" | "zh" }) {
  const t = TXT[lang];
  const label = (g: string) => (g === "preprints" ? t.preprints : g);
  const [query, setQuery] = useState("");
  const [onlySelected, setOnlySelected] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(GROUP_ORDER.map((g) => [g, !(g === "preprints" || g === "2026")])),
  );

  const q = query.trim().toLowerCase();
  const filtering = q.length > 0 || onlySelected;
  const groups = useMemo(() => {
    const match = (p: Publication) =>
      (!onlySelected || p.selected) &&
      (!q || `${p.title} ${p.authors} ${p.venue} ${p.year}`.toLowerCase().includes(q));
    return GROUP_ORDER.map((g) => ({ g, items: publications.filter((p) => p.group === g && match(p)) })).filter(
      (x) => x.items.length > 0,
    );
  }, [q, onlySelected]);
  const shown = groups.reduce((n, x) => n + x.items.length, 0);
  const toggle = (g: string) => setCollapsed((c) => ({ ...c, [g]: !c[g] }));

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{t.filter}</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className="w-full rounded-lg border border-hairline bg-white py-2.5 shadow-[inset_0_1px_2px_rgb(19_78_70/0.06)] pl-9 pr-9 text-sm text-gray-700 placeholder:text-gray-500 outline-hidden transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t.clear}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={14} />
            </button>
          )}
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-pressed={onlySelected}
            onClick={() => setOnlySelected((v) => !v)}
            className={`inline-flex min-h-[42px] items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 text-sm font-medium transition ${
              onlySelected ? "border-accent-ink bg-accent-ink text-white" : "border-hairline bg-white text-gray-600 hover:border-accent hover:text-accent-ink"
            }`}
          >
            <Star size={14} className={onlySelected ? "fill-current" : ""} /> {t.selected}
          </button>
          <span className="pub-count t-meta whitespace-nowrap" aria-live="polite">
            {t.count(shown, publications.length)}
          </span>
        </div>
      </div>

      {groups.length === 0 && <p className="py-6 text-gray-500">{t.none(query)}</p>}

      <div>
        {groups.map(({ g, items }) => {
          const open = filtering || !collapsed[g];
          return (
            <section key={g} className="border-t border-hairline md:grid md:grid-cols-[150px_minmax(0,1fr)] md:gap-8">
              {/* Year rail: sticks under the nav while its papers scroll by */}
              <div className="sticky top-[var(--nav-h)] z-10 -mx-5 bg-paper/90 px-5 backdrop-blur-sm md:static md:mx-0 md:bg-transparent md:px-0 md:backdrop-blur-none">
                <button
                  type="button"
                  onClick={() => toggle(g)}
                  aria-expanded={open}
                  className="group flex w-full items-center gap-2 py-4 text-left md:sticky md:top-[calc(var(--nav-h)+16px)] md:py-6"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-gray-900 transition-colors group-hover:text-accent-ink md:text-[1.625rem]">
                    {label(g)}
                  </h3>
                  <span className="t-meta">{items.length}</span>
                  <ChevronDown size={18} className={`ml-auto text-gray-500 transition-transform duration-300 md:ml-0 ${open ? "" : "-rotate-90"}`} />
                </button>
              </div>
              {open ? (
                <ol className="divide-y divide-hairline pb-4 md:py-2">
                  {items.map((p) => (
                    <PubRow key={p.title} p={p} t={t} />
                  ))}
                </ol>
              ) : (
                <button
                  type="button"
                  onClick={() => toggle(g)}
                  className="mb-4 text-left text-sm text-gray-500 transition-colors hover:text-accent-ink md:mb-0 md:py-7"
                >
                  {t.show(items.length, label(g))}
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
