import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Copy, CornerDownLeft, FileText, Hash, Languages, Search } from "lucide-react";
import { publications } from "../data/publications";
import { SECTION_IDS, UI, type Lang } from "../i18n";

/**
 * ⌘K / "/" command palette (after ThreeUI "Animated Top Dock · Command Bar").
 * Jump to sections, search every paper, switch language, copy the email, open profiles.
 * Opens from the keyboard or from any element with [data-palette-open].
 */

const EMAIL = "vyokky@163.com";
const TXT = {
  en: {
    placeholder: "Search sections, papers, links…",
    sections: "Sections",
    papers: "Papers",
    actions: "Actions",
    copyEmail: "Copy email address",
    copied: "Copied",
    switchLang: "阅读中文版",
    report: "NorthCUA technical report",
    empty: "Nothing matches",
    hints: ["navigate", "open", "close"],
    label: "Command palette",
    showInList: "Show in publication list",
  },
  zh: {
    placeholder: "搜索板块、论文、链接…",
    sections: "板块",
    papers: "论文",
    actions: "操作",
    copyEmail: "复制邮箱地址",
    copied: "已复制",
    switchLang: "Read in English",
    report: "NorthCUA 技术报告",
    empty: "没有匹配的结果",
    hints: ["选择", "打开", "关闭"],
    label: "命令面板",
    showInList: "在论文列表中显示",
  },
};

type Item = {
  key: string;
  group: "sections" | "papers" | "actions";
  title: string;
  sub?: string;
  search: string;
  icon: "hash" | "paper" | "lang" | "copy" | "link";
  run: () => void;
  external?: string;
};

export default function CommandPalette({ lang = "en" }: { lang?: Lang }) {
  const t = TXT[lang];
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const returnFocus = useRef<Element | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(0);
    setCopied(false);
    (returnFocus.current as HTMLElement | null)?.focus?.();
  }, []);

  const go = useCallback(
    (hash: string) => {
      close();
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      history.replaceState(null, "", `#${hash}`);
    },
    [close],
  );

  const items: Item[] = useMemo(() => {
    const ui = UI[lang];
    const sections: Item[] = SECTION_IDS.map((id) => ({
      key: `s-${id}`,
      group: "sections",
      title: ui.titles[id],
      search: `${ui.titles[id]} ${ui.nav[id]} ${UI.en.titles[id]}`,
      icon: "hash",
      run: () => go(id),
    }));
    sections.splice(4, 0, {
      key: "s-northcua",
      group: "sections",
      title: "NorthCUA",
      sub: lang === "zh" ? "代表项目" : "Featured project",
      search: "northcua cua beipo 北坡",
      icon: "hash",
      run: () => go("northcua"),
    });
    const ext = (href: string) => () => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    };
    const actions: Item[] = [
      { key: "a-lang", group: "actions", title: t.switchLang, search: "language 中文 english 语言 切换 switch", icon: "lang", run: () => (location.href = ui.switchHref) },
      {
        key: "a-copy",
        group: "actions",
        title: t.copyEmail,
        sub: EMAIL,
        search: `email mail 邮箱 contact ${EMAIL}`,
        icon: "copy",
        run: () => {
          navigator.clipboard?.writeText(EMAIL).then(
            () => setCopied(true),
            () => setCopied(false),
          );
        },
      },
      { key: "a-report", group: "actions", title: t.report, sub: "arXiv 2611.02102", search: "northcua report paper arxiv 技术报告", icon: "link", run: ext("https://arxiv.org/abs/2611.02102"), external: "https://arxiv.org/abs/2611.02102" },
      { key: "a-gh", group: "actions", title: "GitHub", sub: "github.com/vyokky", search: "github code", icon: "link", run: ext("https://github.com/vyokky"), external: "https://github.com/vyokky" },
      {
        key: "a-scholar",
        group: "actions",
        title: "Google Scholar",
        search: "google scholar citations 谷歌学术 引用",
        icon: "link",
        run: ext("https://scholar.google.com/citations?hl=en&user=5h9KUFIAAAAJ&view_op=list_works"),
        external: "https://scholar.google.com/citations?hl=en&user=5h9KUFIAAAAJ&view_op=list_works",
      },
      {
        key: "a-in",
        group: "actions",
        title: "LinkedIn",
        search: "linkedin",
        icon: "link",
        run: ext("https://www.linkedin.com/in/chaoyun-zhang-8221b012a/?originalSubdomain=uk"),
        external: "https://www.linkedin.com/in/chaoyun-zhang-8221b012a/?originalSubdomain=uk",
      },
    ];
    const papers: Item[] = publications.map((p, i) => ({
      key: `p-${i}`,
      group: "papers",
      title: p.title,
      sub: `${p.venue.replace(/^.*\(([^)]+)\).*$/, "$1")} · ${p.year}`,
      search: `${p.title} ${p.authors} ${p.venue} ${p.year}`,
      icon: "paper",
      external: p.links[0]?.href,
      run: () => {
        close();
        // the list may not be hydrated yet (it loads when visible): leave the request where it will look
        (window as unknown as { __pubFilter?: string }).__pubFilter = p.title;
        window.dispatchEvent(new CustomEvent("pub:filter", { detail: p.title }));
        requestAnimationFrame(() => document.getElementById("publications")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      },
    }));
    return [...sections, ...actions, ...papers];
  }, [lang, t, go, close]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items.filter((it) => it.group !== "papers" || publications[Number(it.key.slice(2))]?.selected);
    const words = s.split(/\s+/);
    const hit = items.filter((it) => words.every((w) => it.search.toLowerCase().includes(w)));
    const papers = hit.filter((it) => it.group === "papers").slice(0, 8);
    return [...hit.filter((it) => it.group !== "papers"), ...papers];
  }, [q, items]);

  // open / close from the keyboard and from [data-palette-open]
  useEffect(() => {
    const isTyping = (el: EventTarget | null) =>
      el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) returnFocus.current = document.activeElement;
          return !o;
        });
      } else if (e.key === "/" && !open && !isTyping(e.target)) {
        e.preventDefault();
        returnFocus.current = document.activeElement;
        setOpen(true);
      }
    };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-palette-open]");
      if (el) {
        e.preventDefault();
        returnFocus.current = el;
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  const groups: Item["group"][] = ["sections", "actions", "papers"];
  let idx = -1;

  return (
    <div className="palette fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <div className="palette-backdrop absolute inset-0 bg-gray-900/20 backdrop-blur-[3px]" onClick={close} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.label}
        className="palette-panel glass relative w-full max-w-xl overflow-hidden rounded-2xl"
      >
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Search size={18} className="shrink-0 text-accent-ink" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `pal-${results[active].key}` : undefined}
            className="h-14 w-full bg-transparent text-[15px] text-gray-900 placeholder:text-gray-500 outline-hidden"
          />
          <kbd className="t-meta rounded-md border border-hairline bg-white/70 px-1.5 py-0.5 text-[11px]">Esc</kbd>
        </div>

        <div ref={listRef} id="palette-list" role="listbox" className="max-h-[56vh] overflow-y-auto overscroll-contain p-2">
          {results.length === 0 && <p className="px-3 py-8 text-center text-sm text-gray-500">{t.empty}</p>}
          {groups.map((g) => {
            const rows = results.filter((r) => r.group === g);
            if (!rows.length) return null;
            return (
              <div key={g} role="group" aria-label={t[g]} className="mb-1">
                <p className="t-caption px-3 pt-2 pb-1 text-[11px] font-medium">{t[g]}</p>
                {rows.map((it) => {
                  idx += 1;
                  const i = idx;
                  const on = i === active;
                  return (
                    <div
                      key={it.key}
                      id={`pal-${it.key}`}
                      data-idx={i}
                      role="option"
                      aria-selected={on}
                      onMouseMove={() => setActive(i)}
                      onClick={() => it.run()}
                      className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors ${on ? "bg-accent/12" : ""}`}
                    >
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${on ? "bg-accent-ink text-white" : "bg-accent/10 text-accent-ink"}`}>
                        {it.icon === "hash" && <Hash size={14} />}
                        {it.icon === "paper" && <FileText size={14} />}
                        {it.icon === "lang" && <Languages size={14} />}
                        {it.icon === "copy" && <Copy size={14} />}
                        {it.icon === "link" && <ArrowUpRight size={14} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-gray-900">{it.title}</span>
                        {it.sub && <span className="t-caption block truncate text-[11px]">{it.key === "a-copy" && copied ? t.copied : it.sub}</span>}
                      </span>
                      {it.group === "papers" && it.external && (
                        <a
                          href={it.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="t-meta shrink-0 rounded-md border border-hairline bg-white/70 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-accent-ink hover:border-accent"
                        >
                          PDF
                        </a>
                      )}
                      {on && <CornerDownLeft size={14} className="shrink-0 text-gray-400" aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="t-caption flex items-center gap-4 border-t border-hairline px-4 py-2 text-[11px]">
          <span>↑↓ {t.hints[0]}</span>
          <span>↵ {t.hints[1]}</span>
          <span>Esc {t.hints[2]}</span>
          <span className="ml-auto hidden sm:inline">{t.showInList}: ↵</span>
        </div>
      </div>
    </div>
  );
}
