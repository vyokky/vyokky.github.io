export type Lang = "en" | "zh";

/** Interface strings. Content-heavy sections keep their own per-language copy next to the markup. */
export const UI = {
  en: {
    skip: "Skip to content",
    nav: { about: "About", experience: "Experience", news: "News", projects: "Projects", publications: "Publications", books: "Books", service: "Service" },
    switchLabel: "中文",
    switchHref: "/zh/",
    switchAria: "阅读中文版",
    titles: {
      about: "About Me",
      experience: "Experience",
      news: "Latest News",
      projects: "Featured Projects",
      publications: "Publications",
      books: "Books",
      service: "Service & Honors",
    },
    meta: {
      title: "Chaoyun Zhang | Computer-Using Agents | NorthCUA · UFO",
      description:
        "Chaoyun Zhang (张朝运) - Head of Computer-Using Agents at Beipo, leading NorthCUA; previously Principal Researcher at Microsoft and lead developer of UFO. Research on computer-using agents, GUI agents and AgentOS.",
    },
  },
  zh: {
    skip: "跳到正文",
    nav: { about: "关于", experience: "经历", news: "动态", projects: "项目", publications: "论文", books: "著作", service: "服务" },
    switchLabel: "EN",
    switchHref: "/",
    switchAria: "Read in English",
    titles: {
      about: "关于我",
      experience: "经历",
      news: "最新动态",
      projects: "代表项目",
      publications: "论文",
      books: "著作",
      service: "学术服务与荣誉",
    },
    meta: {
      title: "张朝运 | 计算机使用智能体 | NorthCUA · UFO",
      description:
        "张朝运（Chaoyun Zhang），北坡计算机使用智能体（CUA）负责人，主导 NorthCUA；曾任微软首席研究员，UFO 主要开发者。研究方向：计算机使用智能体、GUI 智能体与 AgentOS。",
    },
  },
} as const;

export const SECTION_IDS = ["about", "experience", "news", "projects", "publications", "books", "service"] as const;
