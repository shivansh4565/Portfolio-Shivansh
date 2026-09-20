import React, { useState, useEffect } from "react";
import {
  FileText,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import HeroScene from "./3D/HeroScene";
import { useTheme } from "../context/ThemeContext";

const TYPING_PHRASES = [
  "AI/ML Engineer • Generative AI",
  "Agentic AI • Full Stack Developer",
  "LLM Architect • RAG Systems Builder",
  "Deep Learning & Multi-Agent Specialist",
];

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Live Typewriter Effect State
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(35);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(65);
      }, typingSpeed);
    }

    if (!isDeleting && text === currentPhrase) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      setTypingSpeed(400);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, typingSpeed]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-4 sm:px-6 lg:px-12 pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-16">
        {/* LEFT COLUMN: HERO CONTENT */}
        <div className="flex flex-col items-start w-full">
          {/* Glowing Status Badge */}
          <div
            className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-medium backdrop-blur-xl transition-all duration-300 ${
              isLight
                ? "border-black/15 bg-black/5 text-black shadow-[0_0_15px_rgba(0,0,0,0.06)]"
                : "border-white/20 bg-white/[0.04] text-white shadow-[0_0_25px_rgba(255,255,255,0.12)] animate-neon-glow"
            }`}
          >
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></span>
            </span>
            <span>AVAILABLE // AI/ML & FULL STACK ARCHITECT</span>
          </div>

          {/* Heading with Monochrome Platinum Gradient */}
          <h1 className="mt-6 sm:mt-8 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            <span className={isLight ? "text-slate-900" : "text-white"}>
              Hey, I'm{" "}
            </span>
            <br className="inline" />
            <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent text-glow">
              Shivansh Saxena
            </span>
          </h1>

          {/* Live Typed Dynamic Role Block */}
          <div className={`mt-4 sm:mt-6 w-full min-h-[4rem] sm:min-h-[4.5rem] flex flex-col justify-center rounded-2xl border p-3 sm:p-4 backdrop-blur-md transition-all ${
            isLight
              ? "border-slate-200/90 bg-white/80 shadow-sm"
              : "border-white/10 bg-black/40 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          }`}>
            <div className="flex items-center gap-2 text-base sm:text-xl lg:text-2xl font-bold font-mono">
              <Terminal className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 ${isLight ? "text-slate-800" : "text-white/80"}`} />
              <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-300 bg-clip-text text-transparent">
                {text}
              </span>
              <span className={`inline-block w-2 sm:w-2.5 h-4 sm:h-6 animate-pulse ${isLight ? "bg-slate-900" : "bg-white"}`} />
            </div>

            {/* Static Sub-roles line */}
            <div className={`mt-1 flex flex-wrap items-center gap-2 text-xs font-mono ${isLight ? "text-slate-600" : "text-zinc-400"}`}>
              <span className={isLight ? "text-slate-400" : "text-zinc-500"}>//</span>
              <span>AI/ML Engineer • Generative AI</span>
              <span className={isLight ? "text-slate-400" : "text-zinc-600"}>•</span>
              <span>Agentic AI • Full Stack Developer</span>
            </div>
          </div>

          {/* Authentic Description */}
          <p
            className={`mt-5 max-w-xl text-sm leading-relaxed sm:text-base lg:text-lg ${
              isLight ? "text-slate-600" : "text-zinc-300"
            }`}
          >
            Final-year B.Tech Artificial Intelligence student passionate about
            building AI-powered products using Machine Learning, Deep Learning,
            Large Language Models, Agentic AI, and scalable Full Stack
            technologies.
          </p>

          {/* Interactive Buttons with Pure Monochrome Stealth Theme */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Let's Connect CTA */}
            <a
              href="#contact"
              className={`group relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                isLight
                  ? "bg-slate-950 text-white shadow-md hover:bg-black hover:shadow-lg"
                  : "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-zinc-200"
              }`}
            >
              <span>Let's Connect</span>
              <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                isLight ? "text-white" : "text-black"
              }`} />
            </a>

            {/* Resume Google Drive Direct Link Button */}
            <a
              href="https://drive.google.com/drive/folders/1WRcG70PIvTqLnjAEJzYPYFuWO2gzky1A?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                isLight
                  ? "border-slate-300/90 bg-white/95 text-slate-900 shadow-sm hover:border-slate-900 hover:bg-white hover:shadow-md"
                  : "border-white/15 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              }`}
            >
              <FileText className={`h-4 w-4 ${isLight ? "text-slate-900" : "text-white"}`} />
              <span>Resume (Google Drive)</span>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/shivansh4565"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                isLight
                  ? "border-slate-300/80 bg-white/90 text-slate-800 shadow-sm hover:border-slate-900 hover:text-slate-950"
                  : "border-white/15 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08]"
              }`}
            >
              <GithubIcon className={`h-4 w-4 ${isLight ? "text-slate-800" : "text-zinc-300"}`} />
              <span>GitHub</span>
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/s4565/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                isLight
                  ? "border-slate-300/80 bg-white/90 text-slate-800 shadow-sm hover:border-slate-900 hover:text-slate-950"
                  : "border-white/15 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08]"
              }`}
            >
              <LinkedinIcon className={`h-4 w-4 ${isLight ? "text-slate-800" : "text-zinc-300"}`} />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Quick Technical Highlights */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <span className="font-mono text-zinc-500">// SPECIALIZATIONS:</span>
            {["RAG Architectures", "LangGraph Agents", "PyTorch / TensorFlow", "MERN & Next.js"].map(
              (tag) => (
                <span
                  key={tag}
                  className={`rounded-lg border px-2.5 py-1 font-mono transition-all hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] ${
                    isLight
                      ? "border-slate-200 bg-white/90 text-slate-800"
                      : "border-white/10 bg-white/[0.02] text-zinc-300"
                  }`}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: 3D HERO VISUALIZATION (OPTIMIZED FOR MOBILE & LAPTOP) */}
        <div className="relative flex items-center justify-center w-full mt-6 lg:mt-0">
          {/* Glass Vessel Container with Stealth Monochrome Frame */}
          <div
            className={`relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border p-2 sm:p-3 backdrop-blur-2xl transition-all duration-500 hover:scale-[1.01] ${
              isLight
                ? "border-black/10 bg-white/90 shadow-[0_0_40px_rgba(0,0,0,0.08)]"
                : "border-white/15 bg-gradient-to-b from-[#0f0f14]/90 to-[#050507]/95 shadow-[0_0_50px_rgba(0,0,0,0.9)] hover:border-white/30 animate-neon-glow"
            }`}
          >
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />

            {/* Interactive 3D Canvas */}
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


          
