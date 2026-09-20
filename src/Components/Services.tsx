import React from "react";
import ServiceCard from "./ServiceCard";
import { Cpu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const servicesData = [
  {
    number: "01",
    title: "Machine Learning",
    description:
      "Develop predictive models using supervised & unsupervised learning, feature engineering, model evaluation, and Scikit-learn.",
    tags: ["Scikit-Learn", "Regression", "Classification", "Feature Engineering"],
  },
  {
    number: "02",
    title: "Deep Learning",
    description:
      "Build intelligent AI systems using CNNs, RNNs, LSTMs, TensorFlow, and PyTorch for computer vision and sequence modeling.",
    tags: ["PyTorch", "TensorFlow", "CNNs", "RNNs / LSTMs"],
  },
  {
    number: "03",
    title: "Generative AI",
    description:
      "Develop LLM-powered applications using Prompt Engineering, RAG, Embeddings, Hugging Face, and Vector Databases.",
    tags: ["LLMs", "RAG", "Embeddings", "Hugging Face"],
  },
  {
    number: "04",
    title: "Agentic AI",
    description:
      "Create autonomous AI agents using LangChain, LangGraph, multi-agent workflows, tool calling, and AI orchestration.",
    tags: ["LangGraph", "LangChain", "Multi-Agent", "Tool Calling"],
  },
  {
    number: "05",
    title: "Full Stack Development",
    description:
      "Build scalable web applications using React, Next.js, Node.js, Express.js, MongoDB, REST APIs, and Tailwind CSS.",
    tags: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    number: "06",
    title: "AI Application Development",
    description:
      "Design production-ready AI applications integrating LLMs, vector search, Streamlit, REST APIs, and modern AI frameworks.",
    tags: ["Vector Search", "FAISS", "Streamlit", "REST APIs"],
  },
];

const Services: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="services"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 transition-colors duration-300 ${
        isLight ? "text-slate-900" : "text-white"
      }`}
    >
      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/[0.03] blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/[0.02] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 sm:mb-16 text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-mono backdrop-blur-md transition-all ${
              isLight
                ? "border-black/15 bg-black/5 text-black"
                : "border-white/20 bg-white/[0.04] text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            }`}
          >
            <Cpu className={`h-3.5 w-3.5 ${isLight ? "text-slate-800" : "text-white"}`} />
            <span>SPECIALIZED DOMAINS</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Core{" "}
            <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent text-glow">
              Expertise
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed ${
              isLight ? "text-slate-600" : "text-zinc-400"
            }`}
          >
            Passionate about building intelligent AI systems and scalable
            full-stack applications by combining Machine Learning,
            Deep Learning, Generative AI, Agentic AI, and modern web
            technologies.
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.number}
              number={service.number}
              title={service.title}
              description={service.description}
              tags={service.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;


