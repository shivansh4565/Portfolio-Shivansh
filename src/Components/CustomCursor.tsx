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

      setTrailingPos({
        x: trailX,
        y: trailY,
      });

      animationFrameId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

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
      {/* Golden Inner Dot */}
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-all duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? "6px" : "8px",
          height: isHovered ? "6px" : "8px",
          transform: "translate(-50%, -50%)",

          background:
            "radial-gradient(circle, #FFF4B0 0%, #FFD700 35%, #D4AF37 70%, #B8860B 100%)",

          boxShadow:
            "0 0 8px rgba(255, 215, 0, 0.9), 0 0 18px rgba(212, 175, 55, 0.65)",
        }}
      />

      {/* Golden Outer Ring */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border transition-all duration-300 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,

          width: isHovered ? "48px" : "32px",
          height: isHovered ? "48px" : "32px",

          transform: "translate(-50%, -50%)",

          borderColor: isHovered
            ? "#FFD700"
            : isLight
            ? "rgba(184, 134, 11, 0.55)"
            : "rgba(255, 215, 0, 0.45)",

          backgroundColor: isHovered
            ? isLight
              ? "rgba(212, 175, 55, 0.10)"
              : "rgba(255, 215, 0, 0.08)"
            : "transparent",

          boxShadow: isHovered
            ? "0 0 20px rgba(255, 215, 0, 0.45), inset 0 0 12px rgba(255, 215, 0, 0.08)"
            : "0 0 12px rgba(212, 175, 55, 0.25)",
        }}
      />
    </>
  );
};

export default CustomCursor;
