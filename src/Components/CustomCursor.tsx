import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const CustomCursor: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check for touch device or prefers-reduced-motion
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      // Check hover target
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest('[role="button"]'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.18;
      trailY += (mouseY - trailY) * 0.18;
      setTrailingPos({ x: trailX, y: trailY });
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animationFrameId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="pointer-events-none fixed z-50 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)] transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? "6px" : "8px",
          height: isHovered ? "6px" : "8px",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Outer Ring */}
      <div
        className={`pointer-events-none fixed z-50 rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out ${
          isHovered
            ? isLight
              ? "border-neutral-900/80 bg-neutral-900/10 shadow-[0_0_25px_rgba(0,0,0,0.2)]"
              : "border-white/80 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.35)]"
            : isLight
            ? "border-neutral-400/40 bg-transparent shadow-[0_0_15px_rgba(0,0,0,0.05)]"
            : "border-white/30 bg-transparent shadow-[0_0_15px_rgba(255,255,255,0.15)]"
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? "48px" : "32px",
          height: isHovered ? "48px" : "32px",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CustomCursor;

