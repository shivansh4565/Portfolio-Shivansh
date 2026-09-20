import React, { useState } from "react";
import DeveloperCard3D from "./3D/DeveloperCard3D";
import DeveloperWorkstation3D from "./3D/DeveloperWorkstation3D";
import TechUniverse from "./3D/TechUniverse";
import { Brain, Code, Award, GraduationCap, FolderGit2, Binary, Laptop, UserCheck } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const stats = [
  {
    number: "350+",
    label: "LeetCode Solved",
    icon: Binary,
    highlight: "Data Structures & Algorithms",
  },
  {
    number: "12+",
    label: "Real Projects",
    icon: FolderGit2,
    highlight: "AI & Full Stack Systems",
  },
  {
    number: "8.0",
    label: "B.Tech CGPA",
    icon: Award,
    highlight: "Academic Excellence",
  },
  {
    number: "2027",
    label: "Graduation Year",
    icon: GraduationCap,
    highlight: "B.Tech CS (AI)",
  },
];

const About: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [visualMode, setVisualMode] = useState<"workstation" | "card">("workstation");

  return (
    <section
      id="about"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 transition-colors duration-300 ${
        isLight ? "text-slate-900" : "text-white"
      }`}
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-1/4 left-0 h-96 w-96 rounded-full bg-white/[0.03] blur-[160px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-white/[0.02] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-16 text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-mono backdrop-blur-md transition-all ${
              isLight
                ? "border-black/15 bg-black/5 text-black"
                : "border-white/20 bg-white/[0.04] text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            }`}
          >
            <span>ABOUT // BIOGRAPHY</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent text-glow">
              Shivansh Saxena
            </span>
          </h2>
          <p
            className={`mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg ${
              isLight ? "text-slate-600" : "text-zinc-400"
            }`}
          >
            Passionate software engineer bridging the gap between cutting-edge AI models and production web architectures.
          </p>
        </div>

        {/* 3D Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: 3D Animated Workstation & Identity Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Mode Switcher Tabs */}
            <div className={`mb-4 flex items-center gap-2 rounded-full border p-1 backdrop-blur-xl transition-all duration-300 ${
              isLight ? "border-slate-300/80 bg-slate-100/90 shadow-inner" : "border-white/10 bg-black/60"
            }`}>
              <button
                type="button"
                onClick={() => setVisualMode("workstation")}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  visualMode === "workstation"
                    ? isLight
                      ? "bg-slate-900 text-white font-bold shadow-sm"
                      : "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Laptop className="h-3.5 w-3.5" />
                <span>3D Workstation</span>
              </button>

              <button
                type="button"
                onClick={() => setVisualMode("card")}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  visualMode === "card"
                    ? isLight
                      ? "bg-slate-900 text-white font-bold shadow-sm"
                      : "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Identity Card</span>
              </button>
            </div>

            {/* Container */}
            <div className="w-full flex justify-center">
              {visualMode === "workstation" ? (
                <div className={`w-full rounded-[28px] sm:rounded-[36px] border p-2 backdrop-blur-2xl transition-all duration-500 ${
                  isLight
                    ? "border-slate-200/90 bg-white/95 shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
                    : "border-white/15 bg-[#08080c]/90 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-neon-glow"
                }`}>
                  <DeveloperWorkstation3D />
                </div>
              ) : (
                <DeveloperCard3D />
              )}
            </div>
          </div>

          {/* Right Column: Bio & Core Pillar Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
                isLight
                  ? "border-slate-200/80 bg-white/90 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:border-slate-400 hover:bg-white"
                  : "border-white/10 bg-[#08080c]/85 shadow-[0_0_35px_rgba(0,0,0,0.8)] hover:border-white/30"
              }`}
            >
              <p
                className={`text-base sm:text-lg leading-relaxed ${
                  isLight ? "text-slate-800" : "text-zinc-200"
                }`}
              >
                I'm{" "}
                <span className="font-bold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                  Shivansh Saxena
                </span>
                , a 4th-year B.Tech Computer Science (Artificial Intelligence)
                student passionate about building AI-powered applications and
                scalable full-stack software.
              </p>

              <p
                className={`mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-slate-600" : "text-zinc-400"
                }`}
              >
                I specialize in Machine Learning, Deep Learning, Generative AI,
                Agentic AI, Retrieval-Augmented Generation (RAG), Large Language
                Models, and MERN Stack development. My goal is to build
                intelligent software that solves real-world problems.
              </p>
            </div>

            {/* AI & ML vs Full Stack Glass Monoliths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* AI & ML Card */}
              <div
                className={`group relative overflow-hidden rounded-3xl border p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                  isLight
                    ? "border-slate-200/80 bg-white/90 hover:border-slate-900 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    : "border-white/10 bg-[#08080c]/80 hover:border-white/30 hover:bg-[#0c0f14] hover:shadow-[0_0_35px_rgba(0,0,0,0.7)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all group-hover:scale-110 ${
                    isLight
                      ? "bg-slate-100 text-slate-800 group-hover:bg-slate-900 group-hover:text-white"
                      : "bg-white/10 text-white group-hover:bg-white group-hover:text-black"
                  }`}>
                    <Brain className="h-5 w-5" />
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    AI & Machine Learning
                  </h3>
                </div>
                <p
                  className={`mt-3 text-xs sm:text-sm leading-relaxed ${
                    isLight ? "text-slate-600" : "text-zinc-400"
                  }`}
                >
                  Machine Learning, Deep Learning, Generative AI, LangChain,
                  LangGraph, Hugging Face, TensorFlow, PyTorch, LLMs and RAG.
                </p>
              </div>

              {/* Full Stack Card */}
              <div
                className={`group relative overflow-hidden rounded-3xl border p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                  isLight
                    ? "border-slate-200/80 bg-white/90 hover:border-slate-900 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    : "border-white/10 bg-[#08080c]/80 hover:border-white/30 hover:bg-[#0c0f14] hover:shadow-[0_0_35px_rgba(0,0,0,0.7)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all group-hover:scale-110 ${
                    isLight
                      ? "bg-slate-100 text-slate-800 group-hover:bg-slate-900 group-hover:text-white"
                      : "bg-white/10 text-white group-hover:bg-white group-hover:text-black"
                  }`}>
                    <Code className="h-5 w-5" />
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    Full Stack Development
                  </h3>
                </div>
                <p
                  className={`mt-3 text-xs sm:text-sm leading-relaxed ${
                    isLight ? "text-slate-600" : "text-zinc-400"
                  }`}
                >
                  React, Next.js, Node.js, Express.js, MongoDB, REST APIs,
                  Tailwind CSS, Git & GitHub.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Futuristic 3D Statistics Cards */}
        <div className="mt-12 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`group relative overflow-hidden rounded-3xl border p-4 sm:p-6 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                  isLight
                    ? "border-slate-200/80 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-slate-900 hover:bg-white hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
                    : "border-white/10 bg-[#08080c]/85 shadow-[0_0_35px_rgba(0,0,0,0.7)] hover:border-white/30 hover:bg-[#0c0f14] hover:shadow-[0_0_35px_rgba(255,255,255,0.08)]"
                }`}
              >
                {/* Accent glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white/[0.04] via-transparent to-white/[0.02]" />

                <div
                  className={`mx-auto mb-2 sm:mb-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all group-hover:scale-110 ${
                    isLight
                      ? "bg-slate-100 text-slate-800"
                      : "bg-white/[0.06] text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent text-glow">
                  {item.number}
                </div>

                <p
                  className={`mt-1 sm:mt-2 text-xs md:text-sm font-semibold uppercase tracking-wider ${
                    isLight ? "text-slate-800" : "text-zinc-200"
                  }`}
                >
                  {item.label}
                </p>

                <p
                  className={`mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-mono ${
                    isLight ? "text-slate-500" : "text-zinc-500"
                  }`}
                >
                  {item.highlight}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3D Technology Universe */}
        <TechUniverse />
      </div>
    </section>
  );
};

export default About;


