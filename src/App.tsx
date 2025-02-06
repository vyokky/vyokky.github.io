import React, { useState } from 'react';
import { Github, LinkedinIcon, BookOpenCheck, Newspaper, Mail } from 'lucide-react';
import profileImage from './image/Image.jpg';
import ufoImage from './image/UFO.png';
import surveyImage from './image/survey.png';
import lamImage from './image/lam.png';


function App() {
  const sections = [
    { id: "about", title: "About" },
    { id: "experience", title: "Experience" },
    { id: "news", title: "News" },
    { id: "projects", title: "Projects" },
    { id: "publications", title: "Publications" },
    { id: "service", title: "Service" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Menu */}
      <nav className="sticky top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-end space-x-6 py-4">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-gray-600 hover:text-[#81D8D0] transition-colors text-sm font-medium"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-[#81D8D0]/10 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Chaoyun Zhang (张朝运)</h1>
              <p className="text-xl text-gray-600 mb-6">Senior Researcher at Microsoft</p>
              <div className="flex flex-wrap gap-6">
                <a href="https://github.com/vyokky" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-gray-600 hover:text-[#81D8D0] transition-colors group">
                  <Github size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/chaoyun-zhang-8221b012a/?originalSubdomain=uk" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-gray-600 hover:text-[#81D8D0] transition-colors group">
                  <LinkedinIcon size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a href="https://scholar.google.com/citations?hl=zh-CN&user=5h9KUFIAAAAJ&view_op=list_works" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-gray-600 hover:text-[#81D8D0] transition-colors group">
                  <BookOpenCheck size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Google Scholar</span>
                </a>
                <a href="mailto:chaoyun.zhang@microsoft.com" 
                   className="flex items-center gap-2 text-gray-600 hover:text-[#81D8D0] transition-colors group">
                  <Mail size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* About Me */}
        <section id="about" className="mb-16 scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#81D8D0]">About Me</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
        <p>
          I am a Senior Researcher in the Data, Knowledge and Intelligence <strong>(DKI)</strong> group at <strong>Microsoft</strong>. 
          My current research focuses on <strong>GUI agents</strong> powered by large language models to enhance user 
          experiences on computer systems. Before this, I worked on various AIOps projects, leveraging 
          both traditional and large language model-based approaches, to drive innovation and technology 
          transfer at Microsoft. You can explore my
        <a 
          href="https://scholar.google.com/citations?hl=zh-CN&user=5h9KUFIAAAAJ&view_op=list_works" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#81D8D0] underline ml-1 mr-1 hover:text-[#5fb5ae] font-bold"
        >
          Google Scholar 
        </a>
        to stay updated on my latest research.
      </p>

        <p>
          Previously, I served as a research scientist at Lightspeed and Quantum Studio <strong>(光子工作室)</strong>, Tencent, 
          where I developed matchmaking systems for the game <i>League of Legends: Wild Rift</i>. 
          I hold a PhD from the School of Informatics at the University of Edinburgh, where I was 
          supervised by 
          <a 
          href="https://homepages.inf.ed.ac.uk/ppatras/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#81D8D0] underline ml-1 mr-1 hover:text-[#5fb5ae] font-bold"
        >
          Prof. Paul Patras.
          </a>
          
         I also earned an MSc in Artificial Intelligence from the 
          same institution and a BEng in Telecommunication Engineering from Huazhong University of 
          Science and Technology.
        </p>
        <p>
          I am the core developer and maintainer of
          <a 
          href="https://github.com/microsoft/UFO/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#81D8D0] underline ml-1 mr-1 hover:text-[#5fb5ae] font-bold"
        >
          UFO
          </a>
          , the first GUI agent for Windows OS, which 
          has received widespread recognition. I also maintain a public
          <a 
          href="https://arxiv.org/pdf/2411.18279?" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#81D8D0] underline ml-1 mr-1 hover:text-[#5fb5ae] font-bold"
        >
          survey
          </a>
           on large language 
          model-driven GUI agents (
            <a 
          href="https://vyokky.github.io/LLM-Brained-GUI-Agents-Survey/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#81D8D0] underline hover:text-[#5fb5ae] font-bold"
        >
        Website
          </a>
          ).
        </p>
        <p>
          For any inquiries, please feel free to reach me at <strong>chaoyun.zhang at microsoft dot com</strong>.
        </p>
      </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-16 scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#81D8D0]">Experience</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">Senior Researcher</h3>
              <p className="text-[#81D8D0] font-medium">Microsoft | 2022 - Present</p>
              <p className="text-gray-600 mt-2"> GUI agents, large language models, and AIOps.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">Applied Research Scientist</h3>
              <p className="text-[#81D8D0] font-medium">Lightspeed and Quantum Studio (光子工作室), Tencent | 2020 - 2022</p>
              <p className="text-gray-600 mt-2">Worked on matchmaking systems for <strong>League of Legends: Wild Rift</strong>, a popular mobile MOBA game.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">Ph.D. in Informatics</h3>
              <p className="text-[#81D8D0] font-medium">School of Informatics, University of Edinburgh | 2016 - 2020</p>
              <p className="text-gray-600 mt-2">Focused on deep learning for mobile networking.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">MSc in Artificial Intelligence</h3>
              <p className="text-[#81D8D0] font-medium">School of Informatics, University of Edinburgh | 2015 - 2016</p>
              <p className="text-gray-600 mt-2">Worked on non-intrusive load monitoring for appliance power consumption.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">Bechelor in Telecommunication Engineering</h3>
              <p className="text-[#81D8D0] font-medium">Huazhong University of Science and Technology | 2011 - 2015</p>
            </div>
          </div>
        </section>

        {/* News */}
        <section id="news" className="mb-16 scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#81D8D0]">Latest News</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <Newspaper className="text-[#81D8D0] flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">January 2025</p>
                <p className="text-gray-700">Two papers accepted at <strong>ICLR 2025</strong> and <strong>NAACL 2025</strong>! 🎉</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Newspaper className="text-[#81D8D0] flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">January 2025</p>
                <p className="text-gray-700">Our work on 
                <a 
                    href="https://arxiv.org/pdf/2412.10047" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#81D8D0] underline font-bold ml-1 mr-1 hover:text-[#5fb5ae]"
                  >
                    Large Action Models
                 </a> is released and
                has been been reported by 
                <a 
                    href="https://mp.weixin.qq.com/s/6FHrOMXTCUmKS2GrWrzzrA" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#81D8D0] underline font-bold ml-1 mr-1 hover:text-[#5fb5ae]"
                  >
                    机器之心
                 </a>
                 and 
                 <a 
                    href="https://mp.weixin.qq.com/s/BVFV8v6KGcpKoz_TYdBdAA" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#81D8D0] underline font-bold ml-1 mr-1 hover:text-[#5fb5ae]"
                  >
                    新智元
                 </a>
                🚀！</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Newspaper className="text-[#81D8D0] flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-sm">November 2024</p>
                <p className="text-gray-700">Our 
                  <a 
                    href="https://arxiv.org/pdf/2411.18279?" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#81D8D0] underline font-bold ml-1 mr-1 hover:text-[#5fb5ae]"
                  >
                    survey
                 </a>
                  on Large Language Model-Brained <strong>GUI Agents</strong> is released, and it is reported by 
                  <a 
                    href="https://baijiahao.baidu.com/s?id=1820751448950288867&wfr=spider&for=pc" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#81D8D0] underline font-bold ml-1 mr-1 hover:text-[#5fb5ae]"
                  >
                    机器之心
                 </a>
                   📰！</p>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section id="projects" className="mb-16 scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#81D8D0]">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* UFO Project */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                UFO: The Windows Desktop AgentOS
              </h3>
              <p className="text-gray-600 mb-4">
              UFO is a groundbreaking multi-agent framework for Windows OS. It features a <b>HostAgent</b> for task decomposition and a set of <b>AppAgents</b> for interacting with applications.
              Designed for GUI operations, UFO utilizes mouse and keyboard inputs to seamlessly interact with the Windows environment. It also supports command-line interfaces and custom APIs for advanced application control.
              Its knowledge expands through human demonstrations, self-exploration, help documents, and real-time Bing searches.
              </p>
              {/* Image Section */}
              <div className="mb-4">
                <img 
                  src={ufoImage}
                  alt="UFO Project Screenshot" 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              {/* Media Coverage Links */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Media Coverage</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    <a 
                      href="https://baijiahao.baidu.com/s?id=1790938358152188625&wfr=spider&for=pc" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      下一代Windows系统曝光：基于GPT-4V，Agent跨应用调度，代号UFO
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://blog.csdn.net/csdnnews/article/details/136161570" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      下一代智能版 Windows 要来了？微软推出首个 Windows Agent，命名为 UFO！
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://the-decoder.com/microsofts-ufo-abducts-traditional-user-interfaces-for-a-smarter-windows-experience/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      Microsoft's UFO abducts traditional user interfaces for a smarter Windows experience
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://github.com/microsoft/UFO/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  GitHub Code
                </a>
                <a 
                  href="https://microsoft.github.io/UFO/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  Documentation
                </a>
                <a 
                  href="https://arxiv.org/pdf/2402.07939" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  Paper (NAACL 2025)
                </a>
              </div>
            </div>
            {/* GUI Agent Survey */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                LLM-Brained GUI Agent Survey
              </h3>
              <p className="text-gray-600 mb-4">
              We present a comprehensive survey on <b>large language model-powered GUI agents</b>—AI agents that interact with graphical user interfaces (GUIs) on digital devices using natural language instructions via LLMs. 
              This survey is the most extensive to date, encompassing over 500 research papers. 
              Both the paper and its accompanying website are periodically updated to reflect the latest advancements in this rapidly evolving field.
              </p>
              {/* Image Section */}
              <div className="mb-4">
                <img 
                  src={surveyImage}
                  alt="SurveyImage Project Screenshot" 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              {/* Media Coverage Links */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Media Coverage</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    <a 
                      href="https://baijiahao.baidu.com/s?id=1820751448950288867&wfr=spider&for=pc" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      引领人机交互革命？微软研究团队发布80页的大模型GUI智能体综述
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://news.qq.com/rain/a/20241224A07J3R00" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      Agent操纵手机/电脑屏幕的全面综述
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://medium.com/advancedai/survey-gui-agents-revolutionizing-human-computer-interaction-a-comprehensive-survey-on-27ae2b4a8965" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      [LLM-Brained GUI Agents] A Survey: Revolutionizing Human-Computer Interaction
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://arxiv.org/pdf/2411.18279" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  Paper
                </a>
                <a 
                  href="https://github.com/vyokky/LLM-Brained-GUI-Agents-Survey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  GitHub Code
                </a>
                <a 
                  href="https://vyokky.github.io/LLM-Brained-GUI-Agents-Survey/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  Website
                </a>
              </div>
            </div>
            {/* LAM Project */}
            <div className="bg-gray-50 shadow-md p-6 rounded-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Large Action Models for GUI Agents
              </h3>
              <p className="text-gray-600 mb-4">
                LLMs are good at generating text, but not at executing actions? Not anymore! We present a detail pipeline for training <b>Large Action Models</b> (LAMs) from inception to implementation.
                Starting from data collection and preprocessing, we move on to model training and evaluation. We also provide a set of tools for deploying LAMs in real-world applications.
                This project is part of the <b>UFO</b> initiative, which aims to build actionable models tailored for GUI agents.
              </p>
              {/* Image Section */}
              <div className="mb-4">
                <img 
                  src={lamImage}
                  alt="LAM Project Screenshot" 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              {/* Media Coverage Links */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Media Coverage</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    <a 
                      href="https://mp.weixin.qq.com/s/BVFV8v6KGcpKoz_TYdBdAA" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      微软华人团队最新研究：从LLM到LAM，让大模型真正具有「行动力」！
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://mp.weixin.qq.com/s/6FHrOMXTCUmKS2GrWrzzrA" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      无直接数据可用，AI怎么学会「干活」？微软团队揭秘AI从语言到行动的进化之路
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://the-decoder.com/microsofts-new-large-action-model-can-perform-some-tasks-in-word/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#81D8D0] hover:underline"
                    >
                      Microsoft's new Large Action Model can perform some tasks in Word
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://github.com/microsoft/UFO/tree/main/dataflow" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  GitHub Code
                </a>
                <a 
                  href="https://microsoft.github.io/UFO/dataflow/overview/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  Documentation
                </a>
                <a 
                  href="https://arxiv.org/pdf/2412.10047" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#81D8D0] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#70c1b3] transition"
                >
                  Paper
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="mb-16 scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#81D8D0]">Publications</h2>
          <div className="space-y-12">

            {/* Preprint */}
            <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Preprints</h3>
              <div className="space-y-6">

                {/* 18. Zhang et al., arXiv 2024 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Large Language Model-Brained GUI Agents: A Survey
                    <span className="ml-4 space-x-2">
                      <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      <a href="https://github.com/vyokky/LLM-Brained-GUI-Agents-Survey" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                      <a href="https://vyokky.github.io/LLM-Brained-GUI-Agents-Survey/" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Website]</a>
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Shilin He, Jiaxu Qian, Bowen Li, Liqun Li, Si Qin, Yu Kang, Minghua Ma, Qingwei Lin, Saravan Rajmohan, and others
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">arXiv preprint (2024)</p>
                </div>

                {/* 19. Wang et al., arXiv 2024 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Large Action Models: From Inception to Implementation
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/2412.10047" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      <a href="https://github.com/microsoft/UFO/tree/main/dataflow" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                      <a href="https://microsoft.github.io/UFO/dataflow/overview/" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Documentation]</a>
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Lu Wang, Fangkai Yang, <b><u>Chaoyun Zhang</u></b>, Junting Lu, Jiaxu Qian, Shilin He, Pu Zhao, Bo Qiao, Ray Huang, Si Qin, and others
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">arXiv preprint (2024)</p>
                </div>

                {/* Zhang et al., arXiv 2025 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    DI-BENCH: Benchmarking Large Language Models on Dependency Inference With Testable Repositories at Scale
                    <span className="ml-4 space-x-2">
                      <a
                        href="https://arxiv.org/pdf/2501.13699"
                        className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium"
                      >
                        [PDF]
                      </a>
                      <a href="https://github.com/Microsoft/DI-Bench" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">
                        [Code]
                      </a>
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Linghao Zhang, Junhao Wang, Shilin He, <b><u>Chaoyun Zhang</u></b>, Yu Kang, Bowen Li and others
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">arXiv preprint (2025)</p>
                </div>


                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    TaskWeaver: A Code-First Agent Framework
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/2311.17541" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      <a href="https://github.com/microsoft/TaskWeaver/" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Bo Qiao, Liqun Li, Xu Zhang, Shilin He, Yu Kang, <b><u>Chaoyun Zhang</u></b>, Fangkai Yang, Hang Dong, Jue Zhang, Lu Wang, and others
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">arXiv preprint (2023)</p>
                </div>

                {/* 14. Liu et al., arXiv 2024 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Large Language Models Can Deliver Accurate and Interpretable Time Series Anomaly Detection
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/2405.15370" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      <a href="https://github.com/LJunius/LLMAD" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Jun Liu, <b><u>Chaoyun Zhang</u></b>, Jiaxu Qian, Minghua Ma, Si Qin, Chetan Bansal, Qingwei Lin, Saravan Rajmohan, Dongmei Zhang
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">arXiv preprint (2024)</p>
                </div>

              </div>

            </div>

            {/* 2025 Publications */}
            <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">2025 </h3>
              <div className="space-y-6">

                {/* 17. Zhang et al., arXiv 2024 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  RuAG: Learned-Rule-Augmented Generation for Large Language Models
                  <span className="ml-4 space-x-2">
                    <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Yudi Zhang, Pei Xiao, Lu Wang, <b><u>Chaoyun Zhang</u></b>, Meng Fang, Yali Du, Yevgeniy Puzyrev, Randolph Yao, Si Qin, Qingwei Lin, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">To appear in ICLR 2025</p>
              </div>

                {/* 9. Zhang et al., arXiv 2024 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    UFO: A UI-Focused Agent for Windows OS Interaction
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/2402.07939" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      <a href="https://github.com/microsoft/UFO/" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                      <a href="https://microsoft.github.io/UFO/" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Documentation]</a>
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Liqun Li, Shilin He, Xu Zhang, Bo Qiao, Si Qin, Minghua Ma, Yu Kang, Qingwei Lin, Saravan Rajmohan, and others
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">To appear in NAACL 2025</p>
                </div>

                {/* 11. Zhang et al., arXiv 2024 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    AllHands: Ask Me Anything on Large-Scale Verbatim Feedback via Large Language Models
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/2403.15157" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Zicheng Ma, Yuhao Wu, Shilin He, Si Qin, Minghua Ma, Xiaoting Qin, Yu Kang, Yuyi Liang, Xiaoyu Gou, and others
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2"> To appear in ICDE 2025</p>
                </div>


              </div>

            </div>


            {/* 2024 Publications */}

            <div>

              <h3 className="text-2xl font-bold text-gray-800 mb-6">2024</h3>

              <div className="space-y-6">

                {/* 16. Zhang et al., SoCC 2024 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Deoxys: A Causal Inference Engine for Unhealthy Node Mitigation in Large-Scale Cloud Infrastructure
                    <span className="ml-4 space-x-2">
                      <a href="https://dl.acm.org/doi/pdf/10.1145/3698038.3698534" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Randolph Yao, Si Qin, Ze Li, Shekhar Agrawal, Binit R Mishra, Tri Tran, Minghua Ma, Qingwei Lin, Murali Chintalapati, and others
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                  Proceedings of the 2024 ACM Symposium on Cloud Computing (SoCC 2024)
                  </p>
                </div>

              {/* Ding et al., Findings of the Association for Computational Linguistics: ACL 2024 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Everything of Thoughts: Defying the Law of Penrose Triangle for Thought Generation
                  <span className="ml-4 space-x-2">
                    <a href="https://arxiv.org/pdf/2311.04254" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    <a href="https://github.com/microsoft/Everything-of-Thoughts-XoT" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Ruomeng Ding, <b><u>Chaoyun Zhang</u></b>, Lu Wang, Yong Xu, Minghua Ma, Wei Zhang, Si Qin, Saravan Rajmohan, Qingwei Lin, Dongmei Zhang
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the Association for Computational Linguistics (ACL 2024)
                </p>
              </div>

              {/* 10. Cheng et al., arXiv 2024 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Call Me When Necessary: LLMs Can Efficiently and Faithfully Reason over Structured Environments
                  <span className="ml-4 space-x-2">
                    <a href="https://arxiv.org/pdf/2403.08593" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Sitao Cheng, Ziyuan Zhuang, Yong Xu, Fangkai Yang, <b><u>Chaoyun Zhang</u></b>, Xiaoting Qin, Xiang Huang, Ling Chen, Qingwei Lin, Dongmei Zhang, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">Proceedings of the Association for Computational Linguistics (ACL 2024)</p>
              </div>

              {/* 12. Huang et al., arXiv 2024 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  QueryAgent: A Reliable and Efficient Reasoning Framework With Environmental Feedback-Based Self-Correction
                  <span className="ml-4 space-x-2">
                    <a href="https://arxiv.org/pdf/2403.11886" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Xiang Huang, Sitao Cheng, Shanshan Huang, Jiayu Shen, Yong Xu, <b><u>Chaoyun Zhang</u></b>, Yuzhong Qu
                </p>
                <p className="text-[#81D8D0] font-medium mt-2"> Proceedings of the Association for Computational Linguistics (ACL 2024)</p>
              </div>

              {/* 15. Fan et al., CSCW 2024 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  CUPID: Improving Battle Fairness and Position Satisfaction in Online MOBA Games With a Re-Matchmaking System
                  <span className="ml-4 space-x-2">
                    <a href="https://arxiv.org/pdf/2406.19720" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Ge Fan, <b><u>Chaoyun Zhang</u></b>, Kai Wang, Yingjie Li, Junyang Chen, Zenglin Xu
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the ACM on Human-Computer Interaction (CSCW 2024)
                </p>
              </div>


              {/* Chen Y, Zhang C, Ma M, et al. ImDiffusion: Imputed Diffusion Models for Multivariate Time Series Anomaly Detection[J]. Proceedings of the VLDB Endowment, 2023, 17(3): 359-372.*/}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  ImDiffusion: Imputed Diffusion Models for Multivariate Time Series Anomaly Detection
                  <span className="ml-4 space-x-2">
                    <a href="https://www.vldb.org/pvldb/vol17/p359-zhang.pdf" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    <a href="https://github.com/17000cyh/IMDiffusion.git" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Yuhang Chen, <b><u>Chaoyun Zhang</u></b>, Minghua Ma, Yudong Liu, Ruomeng Ding, Bowen Li, Shilin He, Saravan Rajmohan, Qingwei Lin, Dongmei Zhang
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">Proceedings of the VLDB Endowment (VLDB 2024)</p>
              </div>

              {/* 7. Jiang et al., ICSE 2024 */}
              
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Xpert: Empowering Incident Management With Query Recommendations via Large Language Models
                  <span className="ml-4 space-x-2">
                    <a href="https://dl.acm.org/doi/pdf/10.1145/3597503.3639081" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Yuxuan Jiang, <b><u>Chaoyun Zhang</u></b>, Shilin He, Zhihao Yang, Minghua Ma, Si Qin, Yu Kang, Yingnong Dang, Saravan Rajmohan, Qingwei Lin, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the IEEE/ACM 46th International Conference on Software Engineering (ICSE 2024)
                </p>
              </div>

              {/* 8. Chen et al., EuroSys 2024 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Automatic Root Cause Analysis via Large Language Models for Cloud Incidents
                  <span className="ml-4 space-x-2">
                    <a href="https://dl.acm.org/doi/pdf/10.1145/3627703.3629553" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Yinfang Chen, Huaibing Xie, Minghua Ma, Yu Kang, Xin Gao, Liu Shi, Yunjie Cao, Xuedong Gao, Hao Fan, Ming Wen, Jun Zeng, Supriyo Ghosh, Xuchao Zhang, <b><u>Chaoyun Zhang</u></b>, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the Nineteenth European Conference on Computer Systems (EuroSys 2024)
                </p>
              </div>

              {/* 13. Yu et al., ESEC/FSE 2024 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  MonitorAssistant: Simplifying Cloud Service Monitoring via Large Language Models
                  <span className="ml-4 space-x-2">
                    <a href="https://dl.acm.org/doi/pdf/10.1145/3663529.3663826" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Zhaoyang Yu, Minghua Ma, <b><u>Chaoyun Zhang</u></b>, Si Qin, Yu Kang, Chetan Bansal, Saravan Rajmohan, Yingnong Dang, Changhua Pei, Dan Pei, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the 32nd ACM International Conference on the Foundations of Software Engineering (ESEC/FSE 2024)
                </p>
              </div>

              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Large Language Models Can Provide Accurate and Interpretable Incident Triage
                  <span className="ml-4 space-x-2">
                    <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10771420" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Zexin Wang, Jianhui Li, Minghua Ma, Ze Li, Yu Kang, <b><u>Chaoyun Zhang</u></b>, Chetan Bansal, Murali Chintalapati, Saravan Rajmohan, Qingwei Lin, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  2024 IEEE 35th International Symposium on Software Reliability Engineering (ISSRE 2024)
                </p>
              </div>


    
              </div>
            </div>

            {/* 2023 Publications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2023</h3>

              {/* 1. Jin et al., ESEC/FSE 2023 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Assess and Summarize: Improve Outage Understanding With Large Language Models
                  <span className="ml-4 space-x-2">
                    <a href="https://arxiv.org/pdf/2305.18084" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Pengxiang Jin, Shenglin Zhang, Minghua Ma, Haozhe Li, Yu Kang, Liqun Li, Yudong Liu, Bo Qiao, <b><u>Chaoyun Zhang</u></b>, Pu Zhao, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the 32nd ACM International Conference on the Foundations of Software Engineering (ESEC/FSE 2023)
                </p>
              </div>

              {/* 4. Ding et al., ESEC/FSE 2023 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  TraceDiag: Adaptive, Interpretable, and Efficient Root Cause Analysis on Large-Scale Microservice Systems
                  <span className="ml-4 space-x-2">
                    <a href="https://arxiv.org/pdf/2310.18740" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Ruomeng Ding, <b><u>Chaoyun Zhang</u></b>, Lu Wang, Yong Xu, Minghua Ma, Xiaomin Wu, Meng Zhang, Qingjun Chen, Xin Gao, Xuedong Gao, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the 32nd ACM International Conference on the Foundations of Software Engineering (ESEC/FSE 2023)
                </p>
              </div>

              {/* 3. Wang et al., KDD 2023 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Root Cause Analysis for Microservice Systems via Hierarchical Reinforcement Learning From Human Feedback
                  <span className="ml-4 space-x-2">
                    <a href="https://dl.acm.org/doi/pdf/10.1145/3580305.3599934" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Lu Wang, <b><u>Chaoyun Zhang</u></b>, Ruomeng Ding, Yong Xu, Qihang Chen, Wentao Zou, Qingjun Chen, Meng Zhang, Xuedong Gao, Hao Fan, and others
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the 29th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD 2023)
                </p>
              </div>

              {/* 25. Fan et al., IEEE TNS&E 2023 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Improving Rating Prediction in Multi-Criteria Recommender Systems via a Collective Factor Model
                  <span className="ml-4 space-x-2">
                    <a href="https://papers.ssrn.com/sol3/Delivery.cfm?abstractid=4618243" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Ge Fan, <b><u>Chaoyun Zhang</u></b>, Junyang Chen, Paul Li, Yingjie Li, Victor CM Leung
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  IEEE Transactions on Network Science and Engineering (IEEE TNS&E), 2023
                </p>
              </div>
            </div>

            {/* 2022 Publications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2022</h3>
              <div className="space-y-6">
                {/* 20. Zhang et al., IEEE/ACM ToN 2022 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Adversarial Attacks Against Deep Learning-Based Network Intrusion Detection Systems and Defense Mechanisms
                    <span className="ml-4 space-x-2">
                      <a href="https://www.research.ed.ac.uk/files/245550295/Adversarial_Attacks_Against_ZHANG_DOA01122021_AFV.pdf" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Xavier Costa-Pérez, Paul Patras
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    IEEE/ACM Transactions on Networking (ToN), 2022
                  </p>
                </div>

                {/* 21. Fan et al., ICDE 2022 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Field-Aware Variational Autoencoders for Billion-Scale User Representation Learning
                    <span className="ml-4 space-x-2">
                      <a href="https://www.researchgate.net/profile/Ge-Fan-5/publication/361253019_Field-aware_Variational_Autoencoders_for_Billion-scale_User_Representation_Learning/links/62a69c556886635d5cd4c1ce/Field-aware-Variational-Autoencoders-for-Billion-scale-User-Representation-Learning.pdf" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Ge Fan, <b><u>Chaoyun Zhang</u></b>, Junyang Chen, Baopu Li, Zenglin Xu, Yingjie Li, Luyu Peng, Zhiguo Gong
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the 2022 IEEE 38th International Conference on Data Engineering (ICDE 2022).
                  </p>
                </div>

                {/* 22. Wang et al., ICCDE 2022 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    AdnFM: An Attentive DenseNet Based Factorization Machine for Click-Through-Rate Prediction
                    <span className="ml-4 space-x-2">
                      <a href="https://dl.acm.org/doi/pdf/10.1145/3512850.3512852" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Kai Wang, Chunxu Shen, <b><u>Chaoyun Zhang</u></b>, Wenye Ma
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the 2022 8th International Conference on Computing and Data Engineering.
                  </p>
                </div>

                {/* 23. Zhang et al., CIKM 2022 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Quickskill: Novice Skill Estimation in Online Multiplayer Games
                    <span className="ml-4 space-x-2">
                      <a href="https://www.researchgate.net/profile/Ge-Fan-5/publication/362728596_QuickSkill_Novice_Skill_Estimation_in_Online_Multiplayer_Games/links/638026627b0e356feb7f0a28/QuickSkill-Novice-Skill-Estimation-in-Online-Multiplayer-Games.pdf" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Kai Wang, Hao Chen, Ge Fan, Yingjie Li, Lifang Wu, Bingchao Zheng
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the 31st ACM International Conference on Information Knowledge Management (CIKM 2022)
                  </p>
                </div>

                {/* 24. Fan et al., ASE 2022 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    MV-HAN: A Hybrid Attentive Networks Based Multi-View Learning Model for Large-Scale Contents Recommendation
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/2210.07660" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Ge Fan, <b><u>Chaoyun Zhang</u></b>, Kai Wang, Junyang Chen
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the 37th IEEE/ACM International Conference on Automated Software Engineering (ASE 2022)
                  </p>
                </div>

              </div>
            </div>


            {/* 2021 Publications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2021</h3>
              <div className="space-y-6">

              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Spider: Deep Learning-Driven Sparse Mobile Traffic Measurement Collection and Reconstruction
                  <span className="ml-4 space-x-2">
                    <a href="https://www.pure.ed.ac.uk/ws/portalfiles/portal/244096825/Spider_FANG_DOA15082021_AFV.pdf" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Yini Fang, Alec F Diallo, <b><u>Chaoyun Zhang</u></b>, Paul Patras
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  Proceedings of the 2021 IEEE Global Communications Conference (GLOBECOM 2021)
                </p>
              </div>


                {/* 12. Zhang et al., AAAI 2021 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    CloudLSTM: A Recurrent Neural Model for Spatiotemporal Point-Cloud Stream Forecasting
                    <span className="ml-4 space-x-2">
                      <a href="https://ojs.aaai.org/index.php/AAAI/article/download/17296/17103" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Marco Fiore, Iain Murray, Paul Patras
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the AAAI Conference on Artificial Intelligence (2021)
                  </p>
                </div>

                {/* 19. Fan et al., DeMal@TheWebConf 2021 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Predicting Ratings in Multi-Criteria Recommender Systems via a Collective Factor Model
                  <span className="ml-4 space-x-2">
                    <a href="https://demalworkshop.github.io/www2021/papers/predictingratings.pdf" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Ge Fan, <b><u>Chaoyun Zhang</u></b>, Junyang Chen, Kaishun Wu
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  Proceedings of DeMal@The Web Conference (2021)
                </p>
              </div>

                

              </div>
            </div>

            {/* 2020 Publications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2020</h3>
              <div className="space-y-6">

              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Microscope: Mobile Service Traffic Decomposition for Network Slicing as a Service
                <span className="ml-4 space-x-2">
                  <a href="https://www.research.ed.ac.uk/files/162970684/Microscope_Mobicom_2020_revision_pp.pdf" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                  {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                </span>
              </h4>
              <p className="text-gray-600 mt-2 leading-relaxed">
                <b><u>Chaoyun Zhang</u></b>, Marco Fiore, Cezary Ziemlicki, Paul Patras
              </p>
              <p className="text-[#81D8D0] font-medium mt-2">
                Proceedings of the 26th Annual International Conference on Mobile Computing and Networking (MobiCOM 2020)
              </p>
            </div>

            {/* 16. Zhang et al., CCSW 2020 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Tiki-Taka: Attacking and Defending Deep Learning-Based Intrusion Detection Systems
                  <span className="ml-4 space-x-2">
                    <a href="https://www.research.ed.ac.uk/files/162970796/TikiTaka_CCSW_copy.pdf" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  <b><u>Chaoyun Zhang</u></b>, Xavier Costa-Pérez, Paul Patras
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  Proceedings of the 2020 ACM SIGSAC Conference on Cloud Computing Security Workshop (CCSW 2020)
                </p>
              </div>

            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  A Machine-Learning-Based Framework for Optimizing the Operation of Future Networks
                  <span className="ml-4 space-x-2">
                    <a href="https://dspace.networks.imdea.org/bitstream/handle/20.500.12761/805/A_Machine_Learning-based_Framework.pdf?sequence=1&isAllowed=y" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Claudio Fiandrino, <b><u>Chaoyun Zhang</u></b>, Paul Patras, Albert Banchs, Joerg Widmer
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  IEEE Communications Magazine
                </p>
              </div>

                {/* 9. Zhang et al., IEEE Access 2020 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Driver Behavior Recognition via Interwoven Deep Convolutional Neural Nets With Multi-Stream Inputs
                  <span className="ml-4 space-x-2">
                    <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9233399" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  <b><u>Chaoyun Zhang</u></b>, Rui Li, Woojin Kim, Daesub Yoon, Paul Patras
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  IEEE Access.
                </p>
              </div>

              </div>
            </div>

            {/* 2019 Publications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2019</h3>
              <div className="space-y-6">
                {/* 6. Zhang et al., IEEE Communications Surveys & Tutorials 2019 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Deep Learning in Mobile and Wireless Networking: A Survey
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/1803.04311" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Paul Patras, Hamed Haddadi
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    IEEE Communications Surveys &amp; Tutorials (2019)
                  </p>
                </div>

                {/* 7. Li et al., MLN 2019 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Delmu: A Deep Learning Approach to Maximising the Utility of Virtualised Millimetre-Wave Backhauls
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/1810.00356" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Rui Li, <b><u>Chaoyun Zhang</u></b>, Pan Cao, Paul Patras, John S Thompson
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    MLM 2019.
                  </p>
                </div>

                {/* 8. Li et al., ACM SIGMETRICS PER 2019 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Learning Driven Mobility Control of Airborne Base Stations in Emergency Networks
                    <span className="ml-4 space-x-2">
                      <a href="https://inria.hal.science/hal-01927252/document" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Rui Li, <b><u>Chaoyun Zhang</u></b>, Paul Patras, Razvan Stanica, Fabrice Valois
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    ACM SIGMETRICS Performance Evaluation Review 2019.
                  </p>
                </div>

                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Multi-Service Mobile Traffic Forecasting via Convolutional Long Short-Term Memories
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/1905.09771" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Marco Fiore, Paul Patras
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the 2019 IEEE International Symposium on Measurements  Networking (M&amp;N 2019)
                  </p>
                </div>

                {/* 10. Ouyang et al., IEEE Access 2019 */}
              <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  A 3D-CNN and LSTM Based Multi-Task Learning Architecture for Action Recognition
                  <span className="ml-4 space-x-2">
                    <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=8677269" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Xi Ouyang, Shuangjie Xu, <b><u>Chaoyun Zhang</u></b>, Pan Zhou, Yang Yang, Guanghui Liu, Xuelong Li
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  IEEE Access (2019)
                </p>
              </div>

              </div>
            </div>

            {/* 2018 Publications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2018</h3>
              <div className="space-y-6">
                {/* 2. Zhang et al., AAAI 2018 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Sequence-to-Point Learning With Neural Networks for Nonintrusive Load Monitoring
                    <span className="ml-4 space-x-2">
                      <a href="https://ojs.aaai.org/index.php/AAAI/article/download/11873/11732" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      <a href="https://github.com/vyokky/seq2point_NILM" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a>
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Mingjun Zhong, Zongzuo Wang, Nigel Goddard, Charles Sutton
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the Thirty-Second AAAI Conference on Artificial Intelligence (AAAI 2018)
                  </p>
                </div>

              {/* 5. Zhang & Patras, MobiHoc 2018 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Long-Term Mobile Traffic Forecasting Using Deep Spatio-Temporal Neural Networks
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/1712.08083" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Paul Patras
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the Eighteenth ACM International Symposium on Mobile Ad Hoc Networking and Computing (MobiHoc 2018)
                  </p>
                </div>

              </div>
            </div>

            {/* 2017 Publications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2017</h3>
              <div className="space-y-6">
                {/* 4. Zhang et al., CoNEXT 2017 */}
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    ZipNet-GAN: Inferring Fine-Grained Mobile Traffic Patterns via a Generative Adversarial Neural Network
                    <span className="ml-4 space-x-2">
                      <a href="https://arxiv.org/pdf/1711.02413" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                      {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                    </span>
                  </h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    <b><u>Chaoyun Zhang</u></b>, Xi Ouyang, Paul Patras
                  </p>
                  <p className="text-[#81D8D0] font-medium mt-2">
                    Proceedings of the 13th International Conference on Emerging Networking EXperiments and Technologies (CoNEXT 2017)
                  </p>
                </div>

              </div>
            </div>

            {/* 2015 Publications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2015</h3>
              <div className="space-y-6">
                <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  A Convolutional Neural Network for Leaves Recognition Using Data Augmentation
                  <span className="ml-4 space-x-2">
                    <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=7363364" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[PDF]</a>
                    {/* <a href="#" className="text-[#81D8D0] hover:text-[#5fb5ae] text-sm font-medium">[Code]</a> */}
                  </span>
                </h4>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  <b><u>Chaoyun Zhang</u></b>, Pan Zhou, Chenghua Li, Lijun Liu
                </p>
                <p className="text-[#81D8D0] font-medium mt-2">
                  Proceedings of the 2015 IEEE PICOM.
                </p>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service */}
        <section id="service" className="mb-16 scroll-mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#81D8D0]">Academic Service</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Conference Program Committee and Reviewing</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• FSE 2025 Industry Track - Program Committee</li>
                <li>• ICML 2025 - Reviewer</li>
                <li>• ICLR 2025 - Reviewer</li>
                <li>• ACL ARR - Reviewer</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Journal Reviewing</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• ACM Computing Surveys (CSUR)</li>
                {/* <li>• IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)</li>
                <li>• Artificial Intelligence Journal (AIJ)</li> */}
              </ul>
            </div>
            {/* <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Workshop Organization</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• NeurIPS 2023 Workshop on AI Safety - Co-organizer</li>
                <li>• ICML 2023 Workshop on Large Language Models - Program Chair</li>
              </ul>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;