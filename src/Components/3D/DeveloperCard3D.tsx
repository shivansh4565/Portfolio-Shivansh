import React, { useRef, useState, useEffect } from "react";
import { Terminal, Cpu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const DeveloperCard3D: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      setRotation({ x: rotateX, y: rotateY });
      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: isLight ? 0.35 : 0.25,
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setRotation({ x: 0, y: 0 });
      setGlare((prev) => ({ ...prev, opacity: 0 }));
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isLight]);

  return (
    <div className="relative mx-auto w-full max-w-sm [perspective:1000px]">
      <div
        ref={cardRef}
        className={`relative overflow-hidden rounded-[32px] border p-6 backdrop-blur-2xl transition-transform duration-200 ease-out ${
          isLight
            ? "border-black/15 bg-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            : "border-white/15 bg-[#08080c]/95 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
            isHovered ? "scale3d(1.03, 1.03, 1.03)" : "scale3d(1, 1, 1)"
          }`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 35%, transparent 70%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Outer Glow Border Gradient */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/[0.04] via-transparent to-white/[0.02]" />

        {/* Card Header HUD */}
        <div
          className={`flex items-center justify-between border-b pb-4 ${
            isLight ? "border-slate-200" : "border-white/10"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-white">
              <Cpu className="h-3.5 w-3.5" />
            </div>
            <span
              className={`font-mono text-xs font-semibold tracking-wider ${
                isLight ? "text-slate-700" : "text-zinc-300"
              }`}
            >
              DEV // IDENTITY
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* Profile Image & Badge Frame */}
        <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-inner group">
          <img
            src="/img2.jpeg"
            alt="Shivansh Saxena"
            className="h-64 w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-85" />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-[#08080c]/85 px-3 py-2 backdrop-blur-md">
            <div>
              <p className="font-mono text-[11px] text-zinc-400">ENGINEER</p>
              <p className="text-xs font-bold text-white">Shivansh Saxena</p>
            </div>
            <span className="font-mono text-xs text-white font-semibold">CS • AI</span>
          </div>
        </div>

        {/* Metadata Badges */}
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
          <div
            className={`rounded-xl border p-2.5 ${
              isLight
                ? "border-slate-200 bg-slate-50/80"
                : "border-white/5 bg-white/[0.03]"
            }`}
          >
            <p className="font-mono text-[10px] text-zinc-500">DEGREE</p>
            <p
              className={`font-medium ${
                isLight ? "text-slate-800" : "text-zinc-200"
              }`}
            >
              B.Tech CS (AI)
            </p>
          </div>
          <div
            className={`rounded-xl border p-2.5 ${
              isLight
                ? "border-slate-200 bg-slate-50/80"
                : "border-white/5 bg-white/[0.03]"
            }`}
          >
            <p className="font-mono text-[10px] text-zinc-500">FOCUS</p>
            <p
              className={`font-medium ${
                isLight ? "text-slate-800" : "text-zinc-200"
              }`}
            >
              GenAI & Agents
            </p>
          </div>
        </div>

        {/* Terminal Status Bar */}
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-xs shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Terminal className="h-3.5 w-3.5 text-white" />
          <span
            className={`font-mono text-[11px] truncate ${
              isLight ? "text-slate-800" : "text-zinc-300"
            }`}
          >
            Ready to build scalable AI systems
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard3D;

