import React, { useRef, useState } from "react";
import FeaturedShowcase from "./3D/FeaturedShowcase";
import { ExternalLink, Sparkles, FolderGit2 } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useTheme } from "../context/ThemeContext";

interface ProjectItem {
  image: string;
  title: string;
  subtitle: string;
  demo: string;
  github: string;
  tags: string[];
}

const ProjectCard3D: React.FC<ProjectItem> = ({
  image,
  title,
  subtitle,
  demo,
  github,
  tags,
}) => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="[perspective:1000px] h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={`group relative flex flex-col justify-between h-full overflow-hidden rounded-[28px] sm:rounded-[32px] border backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 ${
          isLight
            ? "border-slate-200/80 bg-white/90 hover:border-black hover:bg-white hover:shadow-[0_15px_45px_rgba(0,0,0,0.12)]"
            : "border-white/10 bg-[#08080c]/85 hover:border-white/30 hover:bg-[#0d0d12] hover:shadow-[0_15px_45px_rgba(0,0,0,0.8)]"
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
            isHovered ? "translateZ(12px)" : "translateZ(0px)"
          }`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow Overlay on Hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />

        {/* Project Image Frame with Parallax Zoom */}
        <div
          className={`relative overflow-hidden border-b ${
            isLight ? "border-slate-200 bg-slate-100" : "border-white/10 bg-zinc-900"
          }`}
        >
          <img
            src={image}
            alt={title}
            className="h-48 sm:h-56 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

          {/* Floating Tag */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full border border-white/20 bg-black/80 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-[11px] text-zinc-200 backdrop-blur-md shadow-md">
            {tags[0]}
          </div>
        </div>

        {/* Project Details */}
        <div className="flex flex-col justify-between flex-grow p-5 sm:p-7">
          <div>
            <h3
              className={`text-xl sm:text-2xl font-bold transition-all ${
                isLight
                  ? "text-slate-900 group-hover:text-black"
                  : "text-white group-hover:text-white"
              }`}
            >
              {title}
            </h3>

            <p
              className={`mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed transition-colors ${
                isLight
                  ? "text-slate-600 group-hover:text-slate-800"
                  : "text-zinc-400 group-hover:text-zinc-300"
              }`}
            >
              {subtitle}
            </p>

            {/* Tech Tags */}
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] sm:text-[11px] ${
                    isLight
                      ? "border-slate-200 bg-slate-100 text-slate-700"
                      : "border-white/10 bg-white/[0.03] text-zinc-300"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons: Live Demo & GitHub */}
          <div
            className={`mt-5 sm:mt-7 flex gap-2.5 sm:gap-3 border-t pt-4 sm:pt-5 ${
              isLight ? "border-slate-200" : "border-white/5"
            }`}
          >
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-white py-2.5 text-xs sm:text-sm font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-zinc-200 active:scale-95"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3.5 w-3.5 text-black" />
            </a>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border py-2.5 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                isLight
                  ? "border-slate-300 bg-slate-50 text-slate-800 hover:border-black"
                  : "border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]"
              }`}
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const projects: ProjectItem[] = [
    {
      image: "/Intervia.png",
      title: "Intervia",
      subtitle:
        "AI Interview Platform with resume-based question generation, real-time voice NLP evaluation, behavioral scoring & performance reports.",
      demo: "https://intervia-client.onrender.com",
      github: "https://github.com/shivansh4565/Intervia",
      tags: ["AI Audio & NLP", "React", "Express.js", "MongoDB", "Analytics"],
    },
    {
      image: "/SplitPay.png",
      title: "SplitPay",
      subtitle:
        "MERN-based UPI payment splitting platform that scans merchant QR codes and divides large payments into smaller transactions below ₹2,000 with UPI intent, payment tracking & retry support.",
      demo: "https://splitpay-hkny.onrender.com/",
      github: "https://github.com/shivansh4565/SplitPay",
      tags: ["MERN Stack", "UPI Protocol", "Node.js", "Express.js", "MongoDB"],
    },
    {
      image: "/ATSense.png",
      title: "ATSense",
      subtitle:
        "AI Resume Intelligence Platform for ATS scoring, keyword analysis, actionable feedback, AI-powered improvements & PDF export.",
      demo: "https://atsense-frontend.onrender.com",
      github: "https://github.com/shivansh4565/ATSense",
      tags: ["Generative AI", "LLMs", "React", "Python", "REST API"],
    },
    {
      image: "/AKTU.png",
      title: "AskAKTU",
      subtitle:
        "AI College Assistant built using Conditional RAG, LangGraph, FAISS vector search & Groq LLM for intelligent academic queries.",
      demo: "https://askaktu.streamlit.app",
      github: "https://github.com/shivansh4565/AskAKTU",
      tags: ["Conditional RAG", "LangGraph", "FAISS", "Groq LLM", "Streamlit"],
    },
    {
      image: "/DeepScope.png",
      title: "DeepScope",
      subtitle:
        "Multi-Agent AI Research Assistant using LangGraph, LangChain, Tavily Search & Streamlit.",
      demo: "https://deepscope-ai.streamlit.app",
      github: "https://github.com/shivansh4565/DeepScope",
      tags: ["LangGraph Agents", "LangChain", "Tavily Search", "Streamlit", "Python"],
    },
  ];

  return (
    <section
      id="projects"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 transition-colors duration-300 ${
        isLight ? "text-slate-900" : "text-white"
      }`}
    >
      {/* Background Lighting */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 rounded-full bg-white/[0.03] blur-[180px]" />
      <div className="pointer-events-none absolute bottom-1/3 left-0 h-96 w-96 rounded-full bg-white/[0.02] blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 sm:mb-12 text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-mono backdrop-blur-md transition-all ${
              isLight
                ? "border-black/15 bg-black/5 text-black"
                : "border-white/20 bg-white/[0.04] text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            }`}
          >
            <FolderGit2 className={`h-3.5 w-3.5 ${isLight ? "text-slate-800" : "text-white"}`} />
            <span>PORTFOLIO & EXPERIMENTS</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent text-glow">
              Projects
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed ${
              isLight ? "text-slate-600" : "text-zinc-400"
            }`}
          >
            A collection of AI/ML and Full Stack projects showcasing my experience
            in Generative AI, Agentic AI, Retrieval-Augmented Generation (RAG),
            and scalable web application development.
          </p>
        </div>

        {/* 3D Featured Showcase Monitor */}
        <FeaturedShowcase />

        {/* Complete Project Cards Grid */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2 ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              <Sparkles className={`h-4 w-4 sm:h-5 sm:w-5 ${isLight ? "text-slate-800" : "text-white"}`} />
              <span>All Real Projects</span>
            </h3>
            <span
              className={`font-mono text-xs ${
                isLight ? "text-slate-500" : "text-zinc-500"
              }`}
            >
              5 Verified Builds
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard3D
                key={project.title}
                image={project.image}
                title={project.title}
                subtitle={project.subtitle}
                demo={project.demo}
                github={project.github}
                tags={project.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;


