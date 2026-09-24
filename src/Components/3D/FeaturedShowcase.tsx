Here is your complete, updated **`src/Components/3D/FeaturedShowcase.tsx`** with **DubSync AI 2.0** set as your #1 Flagship Featured Project:

```tsx
import React, { useState, useRef } from "react";
import {
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "../Icons";
import { useTheme } from "../../context/ThemeContext";

interface FeaturedProject {
  title: string;
  category: string;
  tagline: string;
  image: string;
  demo: string;
  github: string;
  highlights: string[];
  techStack: string[];
}

const featuredList: FeaturedProject[] = [
  {
    title: "DubSync AI 2.0",
    category: "Generative AI & Multimodal Video Dubbing",
    tagline:
      "Autonomous Multilingual Video Dubbing & Translation engine powered by Faster-Whisper, Edge-TTS, Gemini & Groq LLM translation, time-aligned audio synthesis & subtitle generation.",
    image: "/dubsync.png",
    demo: "https://dub-sync-ai-2-0.vercel.app/",
    github: "https://github.com/shivansh4565/DubSync-AI-2.0",
    highlights: [
      "Faster-Whisper speech-to-text with VAD silence filtering",
      "Context-aware multilingual translation via Gemini & Groq LLMs",
      "Edge-TTS time-aligned multi-speaker voice synthesis",
      "Automated FFmpeg remuxing and burnt-in subtitle generation",
    ],
    techStack: ["Faster-Whisper", "Edge-TTS", "FastAPI", "Next.js", "Python", "FFmpeg", "Tailwind CSS"],
  },
  {
    title: "Intervia",
    category: "AI Audio & NLP Intelligence",
    tagline:
      "AI-powered mock interview platform with real-time audio evaluation, question generation based on user resume, speech transcription, behavioral scoring & comprehensive feedback reports.",
    image: "/Intervia.png",
    demo: "https://intervia-client.onrender.com",
    github: "https://github.com/shivansh4565/Intervia",
    highlights: [
      "Dynamic resume parsing & tailored question generation",
      "Real-time audio speech-to-text NLP processing",
      "Instant technical scoring & behavioral rubric feedback",
      "Exportable PDF performance evaluation analytics",
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "AI Audio NLP", "Tailwind CSS"],
  },
  {
    title: "SplitPay",
    category: "Fintech & Full Stack Engineering",
    tagline:
      "MERN-based UPI payment splitting platform that scans merchant QR codes and divides large payments into smaller transactions below ₹2,000 with UPI intent, payment tracking & retry support.",
    image: "/SplitPay.png",
    demo: "https://splitpay-hkny.onrender.com/",
    github: "https://github.com/shivansh4565/SplitPay",
    highlights: [
      "Real-time QR Code scanning & merchant parsing",
      "Automated micro-transaction routing (< ₹2,000)",
      "Instant UPI Intent triggers & failure retry mechanisms",
      "End-to-end payment status analytics & history",
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "UPI Protocol", "Tailwind CSS"],
  },
  {
    title: "ATSense",
    category: "AI & Resume Intelligence",
    tagline:
      "AI Resume Intelligence Platform for ATS scoring, keyword analysis, actionable feedback, AI-powered improvements & PDF export.",
    image: "/ATSense.png",
    demo: "https://atsense-frontend.onrender.com",
    github: "https://github.com/shivansh4565/ATSense",
    highlights: [
      "Semantic keyword extraction & match scoring",
      "Actionable AI feedback tailored to job descriptions",
      "Automated bullet point optimization via LLMs",
      "High-fidelity ATS-compliant PDF export",
    ],
    techStack: ["Python", "Generative AI", "React", "REST API", "PDF Engine", "Tailwind CSS"],
  },
  {
    title: "AskAKTU",
    category: "Conditional RAG & University AI",
    tagline:
      "AI College Assistant built using Conditional RAG, LangGraph, FAISS vector search & Groq LLM for intelligent academic queries.",
    image: "/AKTU.png",
    demo: "https://askaktu.streamlit.app",
    github: "https://github.com/shivansh4565/AskAKTU",
    highlights: [
      "Conditional RAG retrieval routing based on query intent",
      "FAISS Vector Store with semantic document indexing",
      "Ultra-low latency inference via Groq Cloud LLMs",
      "Interactive Streamlit chat interface with source citations",
    ],
    techStack: ["LangGraph", "FAISS", "Groq LLM", "Streamlit", "Python", "RAG"],
  },
  {
    title: "DeepScope",
    category: "Agentic AI & Multi-Agent Workflows",
    tagline:
      "Multi-Agent AI Research Assistant using LangGraph, LangChain, Tavily Search & Streamlit.",
    image: "/DeepScope.png",
    demo: "https://deepscope-ai.streamlit.app",
    github: "https://github.com/shivansh4565/DeepScope",
    highlights: [
      "Autonomous multi-agent research orchestration",
      "Deep web query synthesis via Tavily API",
      "Stateful reasoning graph powered by LangGraph",
      "Comprehensive formatted Markdown & PDF report generation",
    ],
    techStack: ["LangGraph", "LangChain", "Tavily Search", "Streamlit", "Python", "LLMs"],
  },
];

const FeaturedShowcase: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const active = featuredList[selectedIndex];

  const monitorRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply 3D tilt on devices with hover capability
    if (window.matchMedia("(hover: none)").matches) return;

    const el = monitorRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="my-10 sm:my-14 lg:my-16">
      {/* Project Switcher Tabs */}
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span
          className={`font-mono text-xs mr-1 hidden sm:inline ${
            isLight ? "text-slate-500" : "text-zinc-500"
          }`}
        >
          FEATURED SPOTLIGHT:
        </span>
        {featuredList.map((proj, idx) => (
          <button
            key={proj.title}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs font-semibold transition-all duration-300 ${
              selectedIndex === idx
                ? "border border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-105 font-bold"
                : isLight
                ? "border border-slate-300 bg-white/90 text-slate-700 hover:border-black"
                : "border border-white/10 bg-[#08080c]/80 text-zinc-400 hover:border-white/30 hover:text-white"
            }`}
          >
            <Sparkles className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${selectedIndex === idx ? "text-black" : "text-zinc-400"}`} />
            <span>{proj.title}</span>
          </button>
        ))}
      </div>

      {/* 3D Floating Monitor Vessel */}
      <div
        className="[perspective:1200px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={monitorRef}
          className={`relative overflow-hidden rounded-[24px] sm:rounded-[36px] border p-4 sm:p-7 md:p-10 backdrop-blur-2xl transition-transform duration-300 ease-out ${
            isLight
              ? "border-black/15 bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              : "border-white/15 bg-[#08080c]/95 shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
          }`}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Ambient Inner Gradient */}
          <div className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01]" />

          {/* Top Window Bar HUD */}
          <div
            className={`flex items-center justify-between border-b pb-4 sm:pb-5 ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-white/40" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-white/60" />
              </div>
              <span
                className={`font-mono text-[11px] sm:text-xs truncate max-w-[160px] sm:max-w-none ${
                  isLight ? "text-slate-600" : "text-zinc-400"
                }`}
              >
                system://showcase/{active.title.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs text-white font-semibold">
                PRODUCTION LIVE
              </span>
            </div>
          </div>

          {/* Main Grid: Visualizer + Deep Architecture Breakdown */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Project Image Mockup */}
            <div className="lg:col-span-6">
              <div
                className={`group relative overflow-hidden rounded-2xl border shadow-2xl ${
                  isLight
                    ? "border-slate-200 bg-slate-100"
                    : "border-white/10 bg-zinc-900/80"
                }`}
              >
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-52 sm:h-72 md:h-80 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between">
                  <span className="rounded-lg border border-white/20 bg-black/80 px-2.5 py-1 font-mono text-[10px] sm:text-xs text-white backdrop-blur-md">
                    {active.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Deep-Dive & Action Links */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div>
                <span className="font-mono text-[11px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  FLAGSHIP SHOWCASE
                </span>
                <h3
                  className={`mt-1 text-2xl sm:text-3xl font-extrabold ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  {active.title}
                </h3>
                <p
                  className={`mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed ${
                    isLight ? "text-slate-600" : "text-zinc-300"
                  }`}
                >
                  {active.tagline}
                </p>
              </div>

              {/* Key Architecture Highlights */}
              <div className="space-y-2">
                <p
                  className={`font-mono text-[11px] sm:text-xs font-semibold ${
                    isLight ? "text-slate-700" : "text-zinc-400"
                  }`}
                >
                  KEY ARCHITECTURAL HIGHLIGHTS:
                </p>
                {active.highlights.map((h) => (
                  <div
                    key={h}
                    className={`flex items-start gap-2 text-xs ${
                      isLight ? "text-slate-700" : "text-zinc-300"
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {active.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-lg border px-2.5 py-1 font-mono text-[11px] sm:text-xs font-medium ${
                      isLight
                        ? "border-slate-300 bg-slate-100 text-slate-800"
                        : "border-white/10 bg-white/[0.04] text-zinc-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <a
                  href={active.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="h-4 w-4 text-black" />
                </a>

                <a
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                    isLight
                      ? "border-slate-300 bg-slate-50 text-slate-900 hover:border-black"
                      : "border-white/15 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08]"
                  }`}
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Inspect Source</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedShowcase;
```
