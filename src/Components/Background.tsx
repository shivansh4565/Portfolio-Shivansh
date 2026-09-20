import React, { useEffect, useRef } from "react";
import UniverseBackground from "./3D/UniverseBackground";
import { useTheme } from "../context/ThemeContext";

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Floating Stardust Nodes
    const particleCount = Math.min(32, Math.floor(width / 45));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = isLight
      ? [
          "rgba(0, 0, 0, ", // black
          "rgba(71, 85, 105, ", // slate
          "rgba(100, 116, 139, ", // cool gray
          "rgba(148, 163, 184, ", // light slate
        ]
      : [
          "rgba(255, 255, 255, ", // pure white
          "rgba(226, 232, 240, ", // platinum silver
          "rgba(203, 213, 225, ", // icy silver
          "rgba(148, 163, 184, ", // slate-gray
        ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.6 + 0.6,
        alpha: isLight ? Math.random() * 0.25 + 0.15 : Math.random() * 0.4 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * (isLight ? 0.08 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isLight
              ? `rgba(0, 0, 0, ${lineAlpha})`
              : `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLight]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-500 bg-transparent">
      {/* 1. Live 3D Floating Abyssal Universe & Nebula Clouds (Three.js WebGL Scene) */}
      <UniverseBackground />

      {/* 2. Dynamic Ambient Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* 3. Deep Atmospheric Glow Spheres */}
      <div
        className={`absolute -top-40 -left-40 h-[650px] w-[650px] rounded-full blur-[180px] animate-subtle-pulse transition-all duration-700 ${
          isLight ? "bg-black/[0.04]" : "bg-white/[0.03]"
        }`}
      />
      <div
        className={`absolute top-[20%] -right-40 h-[650px] w-[650px] rounded-full blur-[180px] animate-subtle-pulse transition-all duration-700 ${
          isLight ? "bg-slate-300/30" : "bg-white/[0.02]"
        }`}
      />
      <div
        className={`absolute top-[60%] left-[-10%] h-[550px] w-[550px] rounded-full blur-[190px] transition-all duration-700 ${
          isLight ? "bg-neutral-200/40" : "bg-white/[0.025]"
        }`}
      />
      <div
        className={`absolute bottom-[-10%] right-[10%] h-[700px] w-[700px] rounded-full blur-[220px] transition-all duration-700 ${
          isLight ? "bg-slate-200/30" : "bg-white/[0.03]"
        }`}
      />

      {/* 4. Subtle Tech Grid Mask */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isLight ? 0.03 : 0.02,
          backgroundImage: isLight
            ? `
            linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
          `
            : `
            linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)",
        }}
      />
    </div>
  );
};

export default Background;




