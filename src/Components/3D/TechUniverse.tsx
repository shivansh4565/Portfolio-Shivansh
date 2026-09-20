import React, { useState } from "react";
import { Sparkles, Cpu, Globe, Code, Brain } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface TechItem {
  name: string;
  category: "ai" | "agents" | "fullstack" | "tools";
  level?: string;
  icon?: string;
}

const allTechnologies: TechItem[] = [
  // AI & ML
  { name: "Machine Learning", category: "ai", level: "Predictive Modeling" },
  { name: "Deep Learning", category: "ai", level: "CNNs & RNNs" },
  { name: "Generative AI", category: "ai", level: "LLMs & Diffusion" },
  { name: "PyTorch", category: "ai", level: "Deep Learning Framework" },
  { name: "TensorFlow", category: "ai", level: "Neural Networks" },
  { name: "Hugging Face", category: "ai", level: "Transformers & Models" },
  { name: "Python", category: "ai", level: "Core Language" },

  // Agentic AI & LLMs
  { name: "Agentic AI", category: "agents", level: "Autonomous Workflows" },
  { name: "LangChain", category: "agents", level: "LLM Framework" },
  { name: "LangGraph", category: "agents", level: "Multi-Agent Workflows" },
  { name: "LLMs", category: "agents", level: "Prompt & Fine-tuning" },
  { name: "RAG", category: "agents", level: "Retrieval-Augmented Generation" },
  { name: "FAISS", category: "agents", level: "Vector Similarity Search" },

  // Full Stack
  { name: "React", category: "fullstack", level: "Frontend Architecture" },
  { name: "Next.js", category: "fullstack", level: "Full Stack Framework" },
  { name: "Node.js", category: "fullstack", level: "Backend Runtime" },
  { name: "Express.js", category: "fullstack", level: "REST APIs" },
  { name: "MongoDB", category: "fullstack", level: "Database Architecture" },
  { name: "JavaScript", category: "fullstack", level: "Modern ES6+" },
  { name: "C++", category: "fullstack", level: "Algorithms & DSA" },

  // Tools & Version Control
  { name: "Git", category: "tools", level: "Version Control" },
  { name: "GitHub", category: "tools", level: "CI/CD & Collaboration" },
];

const TechUniverse: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Technologies", icon: Sparkles },
    { id: "ai", label: "AI & Deep Learning", icon: Brain },
    { id: "agents", label: "Agentic AI & RAG", icon: Cpu },
    { id: "fullstack", label: "Full Stack & Web", icon: Globe },
    { id: "tools", label: "Languages & Tools", icon: Code },
  ];

  const filteredTech =
    activeCategory === "all"
      ? allTechnologies
      : allTechnologies.filter((t) => t.category === activeCategory);

  return (
    <div
      className={`relative mt-12 rounded-[36px] border p-6 md:p-10 backdrop-blur-2xl transition-all duration-300 ${
        isLight
          ? "border-slate-200/80 bg-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
          : "border-white/10 bg-[#08080c]/85 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.01]" />

      {/* Header & Category Filters */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8 ${
          isLight ? "border-slate-200" : "border-white/10"
        }`}
      >
        <div>
          <div className="flex items-center gap-2 text-white">
            <Cpu className="h-5 w-5 animate-pulse text-white" />
            <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300">
              TECH STACK ECOSYSTEM
            </span>
          </div>
          <h3
            className={`mt-2 text-2xl md:text-3xl font-bold ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            3D Technology Universe
          </h3>
          <p
            className={`mt-1 text-sm ${
              isLight ? "text-slate-600" : "text-zinc-400"
            }`}
          >
            Production-tested stack across AI/ML engineering, multi-agent frameworks, and scalable web architectures.
          </p>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? "border border-white bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105 font-bold"
                    : isLight
                    ? "border border-slate-300 bg-slate-100 text-slate-700 hover:border-black hover:bg-white"
                    : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Central AI Core Banner */}
      <div className="relative my-8 overflow-hidden rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-md shadow-[0_0_25px_rgba(255,255,255,0.05)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <Brain className="h-6 w-6 text-black animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Central AI Core</span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] text-white">
                  ORCHESTRATED
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Large Language Models • Agentic Multi-Agent Graphs • RAG Retrieval & Embeddings
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span>22 Verified Technologies</span>
          </div>
        </div>
      </div>

      {/* Responsive Tech Node Grid / Universe */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredTech.map((tech) => {
          const isHovered = hoveredTech === tech.name;

          return (
            <div
              key={tech.name}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 cursor-default ${
                isHovered
                  ? "border-white/50 shadow-[0_0_25px_rgba(255,255,255,0.15)] -translate-y-1 scale-105"
                  : isLight
                  ? "border-slate-200 bg-white/80 hover:border-black hover:bg-white"
                  : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]"
              } ${isHovered && isLight ? "bg-white" : isHovered ? "bg-[#111116]" : ""}`}
            >
              {/* Subtle Ambient Node Glow */}
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : ""
                } bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]`}
              />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  />
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">
                    {tech.category}
                  </span>
                </div>

                <div className="mt-3">
                  <h4
                    className={`text-sm md:text-base font-bold transition-colors ${
                      isLight
                        ? "text-slate-900 group-hover:text-black"
                        : "text-white group-hover:text-white"
                    }`}
                  >
                    {tech.name}
                  </h4>
                  <p
                    className={`mt-1 text-[11px] truncate ${
                      isLight ? "text-slate-500" : "text-zinc-400"
                    }`}
                  >
                    {tech.level}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechUniverse;

