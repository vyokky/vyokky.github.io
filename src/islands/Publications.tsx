import { Fragment, useMemo, useState } from "react";
import { ChevronDown, Search, Star, X } from "lucide-react";
import { publications, type Publication } from "../data/publications";

const GROUP_ORDER = ["preprints", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2015"];
const GROUP_LABEL: Record<string, string> = { preprints: "Preprints" };
const ME = "Chaoyun Zhang";

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

function PubRow({ p }: { p: Publication }) {
  return (
    <li className="group -mx-3 rounded-xl px-3 py-5 transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-card">
      <div className="grid gap-x-6 gap-y-3 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <h4 className="text-[17px] font-semibold leading-snug text-gray-800 transition-colors group-hover:text-accent-deep">
            {p.selected && (
              <span className="mr-2 inline-flex -translate-y-0.5 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 align-middle text-[11px] font-medium text-accent-ink">
                <Star size={10} className="fill-current" /> Selected
              </span>
            )}
            {p.title}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
            <Authors text={p.authors} />
          </p>
          <p className="mt-1 text-sm font-medium text-accent-ink">
            {p.venue} ({p.year}){p.accepted ? " · Accepted" : ""}
          </p>
        </div>
        {p.links.length > 0 && (
          <div className="flex flex-wrap content-start gap-2 md:max-w-[220px] md:justify-end">
            {p.links.map((l) => (
              <a
                key={l.label + l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="surface whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium text-accent-ink transition hover:border-accent hover:text-accent-deep"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function Publications() {
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
          <span className="sr-only">Filter publications</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title, author, venue or year"
            className="w-full rounded-lg border border-hairline bg-white py-2.5 shadow-[inset_0_1px_2px_rgb(19_78_70/0.06)] pl-9 pr-9 text-sm text-gray-700 placeholder:text-gray-500 outline-hidden transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear filter"
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
            <Star size={14} className={onlySelected ? "fill-current" : ""} /> Selected
          </button>
          <span className="pub-count whitespace-nowrap text-sm text-gray-500 tabular-nums" aria-live="polite">
            {shown} of {publications.length} papers
          </span>
        </div>
      </div>

      {groups.length === 0 && <p className="py-6 text-gray-500">No publications match “{query}”.</p>}

      <div>
        {groups.map(({ g, items }) => {
          const open = filtering || !collapsed[g];
          return (
            <section key={g} className="border-t border-hairline md:grid md:grid-cols-[150px_minmax(0,1fr)] md:gap-8">
              {/* Year rail: sticks under the nav while its papers scroll by */}
              <div className="sticky top-[var(--nav-h)] z-10 -mx-4 bg-paper/90 px-4 backdrop-blur-sm md:static md:mx-0 md:bg-transparent md:px-0 md:backdrop-blur-none">
                <button
                  type="button"
                  onClick={() => toggle(g)}
                  aria-expanded={open}
                  className="group flex w-full items-center gap-2 py-4 text-left md:sticky md:top-[calc(var(--nav-h)+16px)] md:py-6"
                >
                  <h3 className="text-xl font-bold tracking-tight text-gray-800 transition-colors group-hover:text-accent-ink md:text-2xl">
                    {GROUP_LABEL[g] ?? g}
                  </h3>
                  <span className="text-sm text-gray-500 tabular-nums">{items.length}</span>
                  <ChevronDown size={18} className={`ml-auto text-gray-500 transition-transform duration-300 md:ml-0 ${open ? "" : "-rotate-90"}`} />
                </button>
              </div>
              {open ? (
                <ol className="divide-y divide-hairline pb-4 md:py-2">
                  {items.map((p) => (
                    <PubRow key={p.title} p={p} />
                  ))}
                </ol>
              ) : (
                <button
                  type="button"
                  onClick={() => toggle(g)}
                  className="mb-4 text-left text-sm text-gray-500 transition-colors hover:text-accent-ink md:mb-0 md:py-7"
                >
                  Show {items.length} {items.length === 1 ? "paper" : "papers"} from {GROUP_LABEL[g] ?? g}
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
