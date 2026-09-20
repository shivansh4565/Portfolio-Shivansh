import React, { useRef, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  tags?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  number,
  title,
  description,
  tags,
}) => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

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
        className={`group relative flex flex-col justify-between h-full overflow-hidden rounded-[28px] sm:rounded-[32px] border p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 ${
          isLight
            ? "border-slate-200/80 bg-white/90 hover:border-black hover:bg-white hover:shadow-[0_15px_45px_rgba(0,0,0,0.1)]"
            : "border-white/10 bg-[#08080c]/85 hover:border-white/30 hover:bg-[#0d0d12] hover:shadow-[0_15px_45px_rgba(0,0,0,0.8)]"
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
            isHovered ? "translateZ(12px)" : "translateZ(0px)"
          }`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow Background on Hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />

        {/* Animated Top Border */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-white via-zinc-300 to-zinc-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        <div>
          {/* Card Top: Header & Watermark Number */}
          <div className="flex items-start justify-between">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${
                isLight
                  ? "border-slate-300 bg-slate-100 text-slate-900 group-hover:bg-slate-200 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                  : "border-white/10 bg-white/[0.04] text-white group-hover:border-white/40 group-hover:bg-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              }`}
            >
              <Sparkles className="h-5 w-5" />
            </div>

            <span
              className={`font-mono text-4xl sm:text-5xl font-black tracking-tighter select-none transition-colors ${
                isLight
                  ? "text-slate-900/10 group-hover:text-black/20"
                  : "text-white/10 group-hover:text-white/20"
              }`}
            >
              {number}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`mt-5 sm:mt-6 text-xl sm:text-2xl font-bold transition-all ${
              isLight
                ? "text-slate-900 group-hover:text-black"
                : "text-white group-hover:text-white"
            }`}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={`mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed transition-colors ${
              isLight
                ? "text-slate-600 group-hover:text-slate-800"
                : "text-zinc-400 group-hover:text-zinc-300"
            }`}
          >
            {description}
          </p>
        </div>

        {/* Bottom Tags / Indicator */}
        <div
          className={`mt-6 sm:mt-8 border-t pt-4 sm:pt-5 ${
            isLight ? "border-slate-200" : "border-white/5"
          }`}
        >
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((t) => (
                <span
                  key={t}
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${
                    isLight
                      ? "border-slate-200 bg-slate-100 text-slate-600"
                      : "border-white/5 bg-white/[0.02] text-zinc-400"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
            <span>Specialized Architecture</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;


