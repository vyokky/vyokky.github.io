import { useState, type ReactNode } from "react";
import {
  Github,
  LinkedinIcon,
  BookOpenCheck,
  Mail,
  Users,
  FileText,
  Award,
  ArrowRight,
  ArrowUpRight,
  ScrollText,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import profileImage from "./image/Image.jpg";
import agentosImage from "./image/agentos.webp";
import surveyImage from "./image/survey.webp";
import lamImage from "./image/lam.webp";
import posterImage from "./image/poster.webp";
import NetworkField from "./components/NetworkField";
import NorthCUASpotlight from "./components/NorthCUASpotlight";
import Publications from "./components/Publications";
import Timeline, { type TimelineItem } from "./components/Timeline";
import Reveal from "./components/Reveal";
import CountUp from "./components/CountUp";
import { publications } from "./data/publications";
import { trackPointer, useScrollProgressVar, useScrollSpy } from "./lib/hooks";

const ICON = "text-accent";
const SCHOLAR = "https://scholar.google.com/citations?hl=en&user=5h9KUFIAAAAJ&view_op=list_works";
const EMAIL = "vyokky@163.com";

const SECTIONS = [
  { id: "northcua", title: "NorthCUA" },
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "news", title: "News" },
  { id: "projects", title: "Projects" },
  { id: "publications", title: "Publications" },
  { id: "books", title: "Books" },
  { id: "service", title: "Service" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

function A({ href, children, bold = true }: { href: string; children: ReactNode; bold?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-accent-ink underline decoration-accent/50 underline-offset-2 hover:text-accent-deep hover:decoration-accent-deep ${bold ? "font-semibold" : ""}`}
    >
      {children}
    </a>
  );
}

function Section({ id, title, children }: { id: string; title: ReactNode; children: ReactNode }) {
  return (
    <Reveal as="section" id={id} className="mb-20">
      <h2 className="text-2xl font-bold tracking-tight text-gray-800 mb-6 pb-2 border-b-2 border-accent">{title}</h2>
      {children}
    </Reveal>
  );
}

/* ----------------------------------------------------------------------------- */

const EXPERIENCE: TimelineItem[] = [
  {
    title: "Head of Computer-Using Agents (CUA)",
    org: "Beipo (北坡) · Shanghai Qiji Zhifeng Intelligent Technology",
    period: "Feb 2026 – Present",
    current: true,
    body: (
      <ul className="list-disc list-outside ml-5 space-y-1">
        <li>
          Lead <strong>NorthCUA</strong> from zero to one: the CUA post-training and model roadmap, combining GUI
          mid-training, long-horizon SFT and joint desktop and web reinforcement learning.
        </li>
        <li>
          Built the unified harness and experience-data flywheel that connect desktop and web execution, trajectory
          collection, outcome verification and training-data curation.
        </li>
        <li>Released the open NorthCUA Nano, Mini and Pro models, and NorthCUA-Ultrafast for low-latency execution.</li>
      </ul>
    ),
  },
  {
    title: "Principal Researcher",
    org: "Microsoft AI / Microsoft Research Asia · DKI · Shanghai",
    period: "Jul 2022 – Feb 2026",
    body: (
      <ul className="list-disc list-outside ml-5 space-y-1">
        <li>
          Lead developer and algorithm researcher of <strong>UFO, UFO² and UFO³</strong>, the first open-source Windows
          GUI agent / CUA framework, which grew into a cross-platform, cross-device Desktop AgentOS (10K+ GitHub stars).
        </li>
        <li>Trained and evaluated desktop GUI agents and action models; led the LLM-brained GUI agent survey.</li>
        <li>AIOps: anomaly detection, failure diagnosis and root cause analysis deployed in cloud operations.</li>
      </ul>
    ),
  },
  {
    title: "Applied Research Scientist",
    org: "Lightspeed and Quantum Studio (光子工作室群), Tencent · Shenzhen",
    period: "Dec 2020 – Jul 2022",
    body: (
      <p>
        Matchmaking for <strong>League of Legends: Wild Rift</strong>: novice skill estimation and multi-objective
        re-matchmaking, both deployed at million-DAU scale (QuickSkill, CIKM 2022; CUPID, CSCW 2024; two patents).
      </p>
    ),
  },
  {
    title: "Ph.D. in Informatics",
    org: "School of Informatics, University of Edinburgh",
    period: "Sep 2016 – May 2020",
    body: (
      <p>
        Deep neural mobile networking. Supervised by{" "}
        <A href="https://homepages.inf.ed.ac.uk/ppatras/" bold={false}>
          Paul Patras
        </A>{" "}
        and{" "}
        <A href="https://homepages.inf.ed.ac.uk/rsarkar/" bold={false}>
          Rik Sarkar
        </A>
        .
      </p>
    ),
  },
  {
    title: "MSc in Artificial Intelligence",
    org: "School of Informatics, University of Edinburgh",
    period: "Sep 2015 – Nov 2016",
    body: <p>Distinction (79/100). Non-intrusive load monitoring for appliance power consumption.</p>,
  },
  {
    title: "Bachelor in Telecommunication Engineering",
    org: "Huazhong University of Science and Technology",
    period: "Sep 2011 – Jun 2015",
    body: <p>Thesis on plant leaf recognition with convolutional neural networks and data augmentation.</p>,
  },
];

type NewsItem = { date: string; isNew?: boolean; body: ReactNode };
const NEWS: NewsItem[] = [
  {
    date: "November 2026",
    isNew: true,
    body: (
      <>
        The <A href="https://arxiv.org/abs/2611.02102">NorthCUA</A> technical report is out, and the NorthCUA{" "}
        <strong>Nano / Mini / Pro</strong> models are open on <A href="https://huggingface.co/beipo-ai">Hugging Face</A>{" "}
        🚀
      </>
    ),
  },
  {
    date: "2026",
    body: (
      <>
        Papers accepted at <strong>NeurIPS 2026</strong>, <strong>EMNLP 2026</strong> (main and Findings),{" "}
        <strong>CIKM 2026</strong>, <strong>ICLR 2026</strong> (×2), <strong>Findings of ACL 2026</strong>,{" "}
        <strong>FSE 2026</strong> and <strong>TOSEM</strong>, and <strong>UFO²</strong> in <strong>TMLR</strong>! 🎉
      </>
    ),
  },
  {
    date: "February 2026",
    body: (
      <>
        Joined <strong>Beipo</strong> as Head of Computer-Using Agents to build NorthCUA.
      </>
    ),
  },
  {
    date: "December 2025",
    body: (
      <>
        <A href="https://arxiv.org/abs/2511.11332">UFO³: Weaving the Digital Agent Galaxy</A> is reported by{" "}
        <A href="https://www.jiqizhixin.com/articles/2025-12-03-7">机器之心</A> 📰
      </>
    ),
  },
  {
    date: "2025",
    body: (
      <>
        Our book <strong>大语言模型 GUI 智能体：人机交互新时代</strong>, the first book that systematically introduces GUI
        agents, is published by Publishing House of Electronics Industry 📖
      </>
    ),
  },
  {
    date: "September 2025",
    body: (
      <>
        Two papers accepted at <strong>NeurIPS 2025</strong> and one paper accepted at <strong>ASE 2025</strong>! 🎉
      </>
    ),
  },
  {
    date: "May 2025",
    body: (
      <>
        One paper accepted at <strong>ACL 2025</strong>, and one paper accepted at <strong>KDD ADS 2025</strong>! 🎉
      </>
    ),
  },
  {
    date: "January 2025",
    body: (
      <>
        Two papers accepted at <strong>ICLR 2025</strong> and one paper accepted at <strong>NAACL 2025</strong>! 🎉
      </>
    ),
  },
  {
    date: "January 2025",
    body: (
      <>
        Our work on <A href="https://arxiv.org/pdf/2412.10047">Large Action Models</A> is released and has been reported
        by <A href="https://mp.weixin.qq.com/s/6FHrOMXTCUmKS2GrWrzzrA">机器之心</A> and{" "}
        <A href="https://mp.weixin.qq.com/s/BVFV8v6KGcpKoz_TYdBdAA">新智元</A> 🚀
      </>
    ),
  },
  {
    date: "November 2024",
    body: (
      <>
        Our <A href="https://arxiv.org/pdf/2411.18279">survey</A> on Large Language Model-Brained <strong>GUI Agents</strong>{" "}
        is released, and it is reported by{" "}
        <A href="https://baijiahao.baidu.com/s?id=1820751448950288867&wfr=spider&for=pc">机器之心</A> 📰
      </>
    ),
  },
];
const NEWS_VISIBLE = 5;

type Project = {
  title: string;
  desc: ReactNode;
  image: string;
  size: [number, number];
  alt: string;
  extra?: ReactNode;
  media: { label: string; href: string }[];
  links: { label: string; href: string }[];
};

const UFO3: Project = {
  title: "UFO³: Galaxy, Multi-Device Orchestration Framework",
  desc: (
    <>
      UFO³ introduces Galaxy, a multi-device orchestration framework that coordinates intelligent agents across
      heterogeneous platforms. It is built on five tightly integrated design principles:
    </>
  ),
  image: posterImage,
  size: [1600, 946],
  alt: "UFO³ Galaxy Project",
  extra: (
    <div className="text-gray-600 mb-5 space-y-2 text-sm">
      {[
        ["🌟", "Declarative Decomposition into Dynamic DAG", "Requests decomposed into structured DAG with TaskStars and dependencies for automated scheduling and runtime rewriting."],
        ["🔄", "Continuous Result-Driven Graph Evolution", "Living constellation that adapts to execution feedback through controlled rewrites and dynamic adjustments."],
        ["⚡", "Heterogeneous, Asynchronous & Safe Orchestration", "Capability-based device matching with async execution, safe locking, and formally verified correctness."],
        ["🔌", "Unified Agent Interaction Protocol (AIP)", "WebSocket-based secure coordination layer with fault tolerance and automatic reconnection."],
        ["🛠️", "Template-Driven MCP-Empowered Device Agents", "Lightweight toolkit for rapid agent development with MCP integration for tool augmentation."],
      ].map(([e, k, d]) => (
        <div key={k} className="flex items-start gap-2">
          <span className="text-lg leading-6">{e}</span>
          <div>
            <strong className="text-gray-700">{k}.</strong> {d}
          </div>
        </div>
      ))}
    </div>
  ),
  media: [{ label: "机器之心: UFO³, Weaving the Digital Agent Galaxy", href: "https://www.jiqizhixin.com/articles/2025-12-03-7" }],
  links: [
    { label: "GitHub Code", href: "https://github.com/microsoft/UFO/" },
    { label: "Documentation", href: "https://microsoft.github.io/UFO/" },
    { label: "Paper", href: "https://arxiv.org/abs/2511.11332" },
    { label: "YouTube", href: "https://www.youtube.com/watch?v=NGrVWGcJL8o" },
  ],
};

const PROJECTS: Project[] = [
  {
    title: "UFO²: The Desktop AgentOS",
    desc: (
      <>
        UFO² is a next-generation AgentOS that brings deeply integrated, system-level intelligence to Windows desktop
        automation: a centralized <b>HostAgent</b> for natural language task orchestration, application-specialized{" "}
        <b>AppAgents</b> that combine GUI actions with native APIs, hybrid control detection (vision + UI Automation),
        speculative multi-action planning and a non-disruptive Picture-in-Picture interface.
      </>
    ),
    image: agentosImage,
    size: [611, 367],
    alt: "UFO² Desktop AgentOS",
    media: [
      { label: "微软正式开源UFO²，Windows桌面迈入「AgentOS 时代」", href: "https://www.jiqizhixin.com/articles/2025-05-06-13" },
      { label: "下一代Windows系统曝光：基于GPT-4V，Agent跨应用调度，代号UFO", href: "https://baijiahao.baidu.com/s?id=1790938358152188625&wfr=spider&for=pc" },
      { label: "下一代智能版 Windows 要来了？微软推出首个 Windows Agent，命名为 UFO！", href: "https://blog.csdn.net/csdnnews/article/details/136161570" },
      { label: "Microsoft's UFO abducts traditional user interfaces for a smarter Windows experience", href: "https://the-decoder.com/microsofts-ufo-abducts-traditional-user-interfaces-for-a-smarter-windows-experience/" },
    ],
    links: [
      { label: "GitHub Code", href: "https://github.com/microsoft/UFO/" },
      { label: "Docs", href: "https://microsoft.github.io/UFO/" },
      { label: "UFO² Paper", href: "https://arxiv.org/pdf/2504.14603" },
      { label: "UFO Paper", href: "https://arxiv.org/pdf/2402.07939" },
    ],
  },
  {
    title: "LLM-Brained GUI Agent Survey",
    desc: (
      <>
        A comprehensive (90+ pages) survey on <b>large language model-powered GUI agents</b>, AI agents that operate
        graphical user interfaces from natural language instructions. It covers over 500 research papers, and both the paper
        and its website are updated as the field moves.
      </>
    ),
    image: surveyImage,
    size: [1400, 776],
    alt: "LLM-Brained GUI Agent Survey",
    media: [
      { label: "引领人机交互革命？微软研究团队发布80页的大模型GUI智能体综述", href: "https://baijiahao.baidu.com/s?id=1820751448950288867&wfr=spider&for=pc" },
      { label: "Agent操纵手机/电脑屏幕的全面综述", href: "https://news.qq.com/rain/a/20241224A07J3R00" },
      { label: "[LLM-Brained GUI Agents] A Survey: Revolutionizing Human-Computer Interaction", href: "https://medium.com/advancedai/survey-gui-agents-revolutionizing-human-computer-interaction-a-comprehensive-survey-on-27ae2b4a8965" },
    ],
    links: [
      { label: "Paper", href: "https://arxiv.org/pdf/2411.18279" },
      { label: "GitHub Code", href: "https://github.com/vyokky/LLM-Brained-GUI-Agents-Survey" },
      { label: "Website", href: "https://vyokky.github.io/LLM-Brained-GUI-Agents-Survey/" },
    ],
  },
  {
    title: "Large Action Models for GUI Agents",
    desc: (
      <>
        LLMs are good at generating text, but not at executing actions? Not anymore. A detailed pipeline for training{" "}
        <b>Large Action Models</b> (LAMs) from inception to implementation: data collection and preprocessing, model
        training and evaluation, and tools for deploying LAMs in real applications, as part of the <b>UFO</b> initiative.
      </>
    ),
    image: lamImage,
    size: [1234, 502],
    alt: "Large Action Models pipeline",
    media: [
      { label: "微软华人团队最新研究：从LLM到LAM，让大模型真正具有「行动力」！", href: "https://mp.weixin.qq.com/s/BVFV8v6KGcpKoz_TYdBdAA" },
      { label: "无直接数据可用，AI怎么学会「干活」？微软团队揭秘AI从语言到行动的进化之路", href: "https://mp.weixin.qq.com/s/6FHrOMXTCUmKS2GrWrzzrA" },
      { label: "Microsoft's new Large Action Model can perform some tasks in Word", href: "https://the-decoder.com/microsofts-new-large-action-model-can-perform-some-tasks-in-word/" },
    ],
    links: [
      { label: "GitHub Code", href: "https://github.com/microsoft/UFO/tree/main/dataflow" },
      { label: "Docs", href: "https://microsoft.github.io/UFO/dataflow/overview/" },
      { label: "Paper", href: "https://arxiv.org/pdf/2412.10047" },
    ],
  },
];

const STATS = [
  { to: 8100, suffix: "+", label: "Citations", href: SCHOLAR },
  { to: 10, suffix: "K+", label: "UFO GitHub stars", href: "https://github.com/microsoft/UFO" },
  { to: publications.length, suffix: "", label: "Publications", href: "#publications" },
  { to: 3, suffix: "", label: "Open NorthCUA models", href: "https://huggingface.co/beipo-ai" },
];

const FOCUS = [
  "Computer-using agents for desktop and web",
  "GUI agents and the Desktop AgentOS",
  "Agent post-training: SFT, RL and experience data",
  "AIOps for large-scale cloud systems",
];

/* ----------------------------------------------------------------------------- */

function Avatar() {
  return (
    <div className="relative h-44 w-44 shrink-0 md:h-60 md:w-60">
      <svg aria-hidden="true" viewBox="0 0 240 240" className="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)]">
        <circle cx="120" cy="120" r="104" fill="none" stroke="#70c1b3" strokeOpacity="0.22" strokeWidth="1" />
        <g className="orbit">
          <circle cx="120" cy="120" r="114" fill="none" stroke="#70c1b3" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="120" cy="6" r="3.5" fill="#2a7a6e" />
        </g>
      </svg>
      <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white shadow-lift">
        <img src={profileImage} alt="Chaoyun Zhang" width={240} height={240} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function Nav() {
  const active = useScrollSpy(SECTION_IDS);
  const progressRef = useScrollProgressVar<HTMLDivElement>();
  return (
    <nav aria-label="Sections" className="sticky top-0 z-50 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex h-14 items-center justify-between gap-6">
          <a href="#top" className="hidden lg:inline-flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-gray-800 hover:text-accent-ink transition-colors">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Chaoyun Zhang
          </a>
          <div className="no-scrollbar -mx-4 lg:mx-0 flex h-full flex-1 items-center md:justify-end gap-5 md:gap-6 overflow-x-auto px-4 lg:px-0 [mask-image:linear-gradient(to_right,#000_82%,transparent)] md:[mask-image:none]">
            {SECTIONS.map((s) => {
              const on = s.id === active;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`relative flex h-full shrink-0 items-center whitespace-nowrap text-sm font-medium transition-colors ${
                    on ? "text-accent-ink" : "text-gray-600 hover:text-accent-ink"
                  }`}
                >
                  {s.title}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 bottom-2.5 h-0.5 rounded-full bg-accent transition-transform duration-500 origin-left ${
                      on ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div ref={progressRef} aria-hidden="true" className="absolute left-0 right-0 -bottom-px h-[2px] overflow-hidden">
        <div
          className="h-full origin-left bg-gradient-to-r from-accent-soft via-accent to-accent-ink"
          style={{ transform: "scaleX(var(--progress, 0))" }}
        />
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-accent-soft/10">
      <NetworkField className="absolute inset-0 h-full w-full" />
      {/* veil: keeps the lines faint behind the text, livelier toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 70% at 35% 45%, rgb(251 253 252 / 0.82), rgb(251 253 252 / 0) 72%)" }}
      />
      <div className="container relative mx-auto flex max-w-6xl flex-col px-4 md:min-h-[calc(100dvh-var(--nav-h))]">
        <div className="flex flex-1 flex-col-reverse items-center gap-12 pt-14 md:flex-row md:items-center md:gap-16 md:pt-10">
          <div className="w-full min-w-0 flex-1">
            <Reveal delay={60}>
              <h1 className="text-[clamp(2.6rem,6.2vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-gray-800">
                Chaoyun Zhang
                <span className="mt-2 block text-[0.42em] font-medium leading-tight tracking-normal text-gray-500 md:ml-3 md:mt-0 md:inline">张朝运</span>
              </h1>
              <p className="mt-5 text-xl tracking-tight text-gray-600">
                Head of Computer-Using Agents at <strong className="font-semibold text-gray-800">Beipo</strong>
                <span className="text-gray-500"> · previously Principal Researcher at Microsoft</span>
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
                I build agents that operate real desktop software and the web, and the experience loops that make them
                better with practice.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#northcua"
                  className="group inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full bg-accent-ink py-2 pl-4 pr-3.5 text-sm font-medium text-white shadow-card transition hover:bg-accent-deep"
                >
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent-soft" />
                  Now leading NorthCUA
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                {[
                  { href: "https://github.com/vyokky", label: "GitHub", Icon: Github },
                  { href: "https://www.linkedin.com/in/chaoyun-zhang-8221b012a/?originalSubdomain=uk", label: "LinkedIn", Icon: LinkedinIcon },
                  { href: SCHOLAR, label: "Scholar", Icon: BookOpenCheck },
                  { href: `mailto:${EMAIL}`, label: "Email", Icon: Mail },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex min-h-[44px] items-center gap-2 whitespace-nowrap text-gray-600 transition-colors hover:text-accent-ink"
                  >
                    <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal className="shrink-0">
            <Avatar />
          </Reveal>
        </div>

        {/* Proof band: every number links to its source */}
        <Reveal delay={240}>
          <dl className="mt-14 grid grid-cols-2 border-t border-hairline md:grid-cols-4">
            {STATS.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("#") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`group flex flex-col-reverse gap-1 py-6 pr-4 transition-colors md:px-6 ${i % 2 === 1 ? "border-l border-hairline pl-4 md:pl-6" : ""} ${
                  i === 0 ? "md:pl-0" : ""
                } ${i === 2 ? "md:border-l md:border-hairline" : ""} ${i > 1 ? "border-t border-hairline md:border-t-0" : ""}`}
              >
                <dt className="flex items-center gap-1 text-xs text-gray-500 transition-colors group-hover:text-accent-ink">
                  {s.label}
                  <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </dt>
                <dd className="text-3xl font-semibold tracking-tight text-gray-800 md:text-4xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
              </a>
            ))}
          </dl>
        </Reveal>
      </div>
    </header>
  );
}

function ProjectLinks({ links }: { links: Project["links"] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-lg bg-accent-soft/60 px-4 py-2 text-sm font-medium text-accent-deep shadow-sm transition hover:bg-accent hover:text-white"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

function Media({ items }: { items: Project["media"] }) {
  if (!items.length) return null;
  return (
    <div className="mb-5">
      <h4 className="text-sm font-semibold text-gray-800 mb-2">Media coverage</h4>
      <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
        {items.map((m) => (
          <li key={m.href + m.label}>
            <a href={m.href} target="_blank" rel="noopener noreferrer" className="text-accent-ink hover:text-accent-deep hover:underline">
              {m.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureProject({ p }: { p: Project }) {
  return (
    <div
      className="glow-card grid gap-8 rounded-xl border border-hairline bg-gray-50/80 p-6 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-lift md:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      onPointerMove={trackPointer}
    >
      <div className="lg:order-2 self-center">
        <img src={p.image} alt={p.alt} width={p.size[0]} height={p.size[1]} loading="lazy" decoding="async" className="h-auto w-full rounded-lg shadow-card" />
      </div>
      <div className="lg:order-1 min-w-0">
        <h3 className="text-2xl font-semibold tracking-tight text-gray-800 mb-3">{p.title}</h3>
        <p className="text-gray-600 mb-4">{p.desc}</p>
        {p.extra}
        <Media items={p.media} />
        <ProjectLinks links={p.links} />
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className="glow-card flex flex-col rounded-xl border border-hairline bg-gray-50/80 p-6 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-lift"
      onPointerMove={trackPointer}
    >
      <h3 className="text-xl font-semibold tracking-tight text-gray-800 mb-3">{p.title}</h3>
      <div className="mb-4">
        <img src={p.image} alt={p.alt} width={p.size[0]} height={p.size[1]} loading="lazy" decoding="async" className="h-auto w-full rounded-lg shadow-card" />
      </div>
      <p className="text-gray-600 mb-4 text-[15px] leading-relaxed">{p.desc}</p>
      <Media items={p.media} />
      <div className="mt-auto pt-1">
        <ProjectLinks links={p.links} />
      </div>
    </div>
  );
}

function ServiceRow({ icon: Icon, title, sub }: { icon: typeof FileText; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-accent/5 transition-colors">
      <Icon className={`${ICON} mt-1 flex-shrink-0`} size={16} />
      <div>
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-sm text-gray-600">{sub}</p>
      </div>
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  children,
  className = "",
}: {
  icon: typeof FileText;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glow-card bg-white border border-hairline rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-card hover:border-accent/30 ${className}`}
      onPointerMove={trackPointer}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Icon className={ICON} size={24} />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function News() {
  const [all, setAll] = useState(false);
  const items = all ? NEWS : NEWS.slice(0, NEWS_VISIBLE);
  return (
    <div>
      <ol className="divide-y divide-hairline border-y border-hairline">
        {items.map((n, i) => (
          <li key={i} className="grid gap-1 py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
            <p className="flex items-center gap-2 text-sm text-gray-500 tabular-nums sm:pt-0.5">
              {n.date}
              {n.isNew && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent-ink">
                  <span className="pulse-dot inline-block h-1 w-1 rounded-full bg-accent" />
                  New
                </span>
              )}
            </p>
            <p className="text-gray-700">{n.body}</p>
          </li>
        ))}
      </ol>
      {NEWS.length > NEWS_VISIBLE && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          aria-expanded={all}
          className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-lg border border-hairline bg-white px-4 text-sm font-medium text-gray-600 transition hover:border-accent hover:text-accent-ink"
        >
          {all ? "Show less" : `Show ${NEWS.length - NEWS_VISIBLE} earlier updates`}
          <ChevronDown size={16} className={`transition-transform duration-300 ${all ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------- */

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <Hero />

      <main id="content" className="container mx-auto px-4 max-w-6xl py-14">
        <NorthCUASpotlight />

        <Section id="about" title="About Me">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="text-gray-600 leading-relaxed space-y-4 max-w-[72ch]">
              <p>
                I am the <strong className="text-gray-800">Head of Computer-Using Agents (CUA)</strong> at{" "}
                <strong className="text-gray-800">Beipo (北坡)</strong>, where I lead{" "}
                <a href="#northcua" className="font-semibold text-accent-ink underline decoration-accent/50 underline-offset-2 hover:text-accent-deep">
                  NorthCUA
                </a>{" "}
                from zero to one: an experience-driven loop that connects a unified agent harness, experience data, model
                training and continual learning for agents that operate real desktop software and the web. Its open Nano,
                Mini and Pro models are state-of-the-art among open-source models (under the reported settings) in GUI
                grounding, desktop execution and web interaction.
              </p>
              <p>
                Before that, I was a <strong className="text-gray-800">Principal Researcher</strong> in the Data, Knowledge
                and Intelligence <strong className="text-gray-800">(DKI)</strong> group at{" "}
                <strong className="text-gray-800">Microsoft</strong>, where I was the lead developer and algorithm
                researcher of <A href="https://github.com/microsoft/UFO/">UFO</A>, the first open-source Windows GUI agent /
                CUA framework, and drove its evolution through UFO² and UFO³ into a cross-platform, cross-device Desktop
                AgentOS with <strong className="text-gray-800">10K+ GitHub stars</strong>. I also worked on AIOps: anomaly
                detection, failure diagnosis and root cause analysis for cloud services. I maintain a public{" "}
                <A href="https://arxiv.org/pdf/2411.18279">survey</A> on LLM-brained GUI agents (
                <A href="https://vyokky.github.io/LLM-Brained-GUI-Agents-Survey/">Website</A>) and wrote the first book
                that systematically introduces GUI agents. My work has been cited over{" "}
                <strong className="text-gray-800">8,100</strong> times on <A href={SCHOLAR}>Google Scholar</A>.
              </p>
              <p>
                Earlier, I was a research scientist at Lightspeed and Quantum Studio{" "}
                <strong className="text-gray-800">(光子工作室)</strong>, Tencent, where I developed matchmaking systems for
                the game <i>League of Legends: Wild Rift</i>. I hold a PhD from the School of Informatics at the University
                of Edinburgh, supervised by <A href="https://homepages.inf.ed.ac.uk/ppatras/">Prof. Paul Patras</A> and{" "}
                <A href="https://homepages.inf.ed.ac.uk/rsarkar/">Rik Sarkar</A>, an MSc in Artificial Intelligence from the
                same institution, and a BEng in Telecommunication Engineering from Huazhong University of Science and
                Technology.
              </p>
              <p>
                For any inquiries, please feel free to reach me at{" "}
                <strong className="text-gray-800">vyokky at 163 dot com</strong>.
              </p>
            </div>
            <aside className="lg:pt-1">
              <h3 className="text-sm font-semibold text-gray-800">Research focus</h3>
              <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
                {FOCUS.map((f) => (
                  <li key={f} className="py-3 text-sm text-gray-600">
                    {f}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <Timeline items={EXPERIENCE} />
        </Section>

        <Section id="news" title="Latest News">
          <News />
        </Section>

        <Section id="projects" title="Featured Projects">
          <p className="mb-6 -mt-1 text-gray-600">
            The UFO family (UFO, UFO², UFO³) has <strong className="text-gray-800">10K+ GitHub stars</strong> and{" "}
            <strong className="text-gray-800">1K+ forks</strong>; the survey and Large Action Models grew around it.
          </p>
          <div className="space-y-6">
            <FeatureProject p={UFO3} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </div>
        </Section>

        <Section id="publications" title="Publications">
          <Publications />
        </Section>

        <Section id="books" title="Books">
          <div
            className="glow-card p-6 md:p-8 border border-hairline rounded-xl transition-shadow duration-300 hover:shadow-card bg-white"
            onPointerMove={trackPointer}
          >
            <div className="flex items-start gap-4">
              <div className="hidden sm:block p-2.5 bg-accent/10 rounded-lg">
                <BookOpen className={ICON} size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">大语言模型 GUI 智能体：人机交互新时代</h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  <b>
                    <u>张朝运</u>
                  </b>
                  , 秦思, 李立群, 何世林
                </p>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  The first book that systematically introduces GUI agents, covering perception, decision-making, action,
                  data and applications. Funded by the MIIT Academic Publishing Fund (工信学术出版基金).
                </p>
                <p className="text-accent-ink font-medium mt-2">
                  电子工业出版社 (Publishing House of Electronics Industry), 2025
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="service" title="Service & Honors">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ServiceCard icon={Users} title="Program Committee">
              <div className="space-y-3">
                <ServiceRow icon={Award} title="ICSE 2027" sub="International Conference on Software Engineering" />
                <ServiceRow icon={Award} title="FSE 2025 Industry Track" sub="Foundations of Software Engineering" />
                <ServiceRow icon={Award} title="ACM DistributedML Workshop 2020" sub="Distributed Machine Learning" />
                <ServiceRow icon={Award} title="IEEE CCNC 2020" sub="Consumer Communications & Networking" />
              </div>
            </ServiceCard>

            <ServiceCard icon={BookOpenCheck} title="Reviewing Service">
              <div className="space-y-4">
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Premier Conferences</h4>
                  <div className="space-y-3">
                    <ServiceRow icon={FileText} title="NeurIPS 2025" sub="Neural Information Processing Systems" />
                    <ServiceRow icon={FileText} title="ICLR 2025" sub="International Conference on Learning Representations" />
                    <ServiceRow icon={FileText} title="KDD ADS Track 2025" sub="Applied Data Science Track" />
                    <ServiceRow icon={FileText} title="ACL ARR" sub="Association for Computational Linguistics" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Specialized Conferences</h4>
                  <div className="space-y-3">
                    <ServiceRow icon={FileText} title="IEEE TMA" sub="Traffic Measurement and Analysis" />
                    <ServiceRow icon={FileText} title="IEEE WCNC" sub="Wireless Communications and Networking" />
                    <ServiceRow icon={FileText} title="IEEE WoWMoM" sub="World of Wireless, Mobile and Multimedia Networks" />
                  </div>
                </div>
              </div>
            </ServiceCard>

            <ServiceCard icon={FileText} title="Journal Editorial Service" className="md:col-span-2">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ServiceRow icon={FileText} title="ACM Computing Surveys" sub="CSUR" />
                <ServiceRow icon={FileText} title="IEEE Communications Letters" sub="ComLet" />
                <ServiceRow icon={FileText} title="IEEE Trans. Mobile Computing" sub="TMC" />
                <ServiceRow icon={FileText} title="IEEE Trans. Smart Grid" sub="TSG" />
                <ServiceRow icon={FileText} title="IEEE SECOM" sub="Systems Engineering" />
              </div>
            </ServiceCard>

            <div className="md:col-span-2 rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent-soft/10 p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <Award className={ICON} size={24} />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-800">Awards</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      ["2018", "Best Student Paper Award, MLN"],
                      ["2018", "ACM MobiHoc Student Travel Grant"],
                      ["2017", "Outstanding MSc Dissertation Award, University of Edinburgh"],
                      ["2016", "Edinburgh Global Research Scholarship"],
                    ].map(([y, t]) => (
                      <li key={t} className="flex gap-3 bg-white/80 p-3 rounded-lg border border-hairline">
                        <span className="text-xs font-medium text-accent-ink pt-0.5 tabular-nums">{y}</span>
                        <span className="text-sm text-gray-700">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <ScrollText className={ICON} size={24} />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-800">Patents</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      ["US12244467B2", "Distributed Network Traffic Data Decomposition Method (granted)"],
                      ["US 18/428,627", "Customized anomaly monitor for compute system performance metrics"],
                      ["CN116785718A", "Novice skill detection for MOBA games (面向 MOBA 游戏的新手能力探测算法)"],
                      ["CN116850601A", "Multi-objective optimization for MOBA matchmaking and position assignment"],
                    ].map(([id, t]) => (
                      <li key={id} className="bg-white/80 p-3 rounded-lg border border-hairline">
                        <p className="font-mono text-xs text-accent-ink">{id}</p>
                        <p className="text-sm text-gray-700">{t}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-hairline">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-gray-500">Get in touch</p>
              <a href={`mailto:${EMAIL}`} className="mt-1 inline-block text-2xl md:text-3xl font-semibold tracking-tight text-gray-800 hover:text-accent-ink transition-colors">
                {EMAIL}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="https://github.com/vyokky" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent-ink">GitHub</a>
              <a href={SCHOLAR} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent-ink">Google Scholar</a>
              <a href="https://www.linkedin.com/in/chaoyun-zhang-8221b012a/?originalSubdomain=uk" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent-ink">LinkedIn</a>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-500">
            <span>© 2026 Chaoyun Zhang</span>
            <span>Last updated November 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
