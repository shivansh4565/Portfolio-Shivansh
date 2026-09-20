import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Services from "./Components/Services";
import Portfolio from "./Components/Portfolio";
import Contact from "./Components/Contact";
import Background from "./Components/Background";
import CustomCursor from "./Components/CustomCursor";

const PortfolioContent: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`relative min-h-screen bg-transparent transition-colors duration-500 selection:bg-white/20 ${
        isLight
          ? "text-slate-900 selection:text-black selection:bg-black/10"
          : "text-white selection:text-white selection:bg-white/20"
      }`}
    >

      {/* Desktop Dynamic Glowing Cursor */}
      <CustomCursor />

      {/* 3D Universe Model Background with dynamic scroll fly-through animation */}
      <Background />

      <div className="relative z-10 flex flex-col">
        {/* Floating Glass Navbar with Theme Toggle & Scroll Spy */}
        <Navbar />

        {/* Hero Section with 3D Neural Workstation */}
        <Hero />

        {/* About Section with 3D Identity Card, Stats, and Tech Universe */}
        <About />

        {/* Core Expertise with 3D Monolith Cards */}
        <Services />

        {/* Portfolio Section with 3D Featured Showcase & Project Cards */}
        <Portfolio />

        {/* Contact Section with 3D Holographic Orb, Form & Footer */}
        <Contact />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default App;


