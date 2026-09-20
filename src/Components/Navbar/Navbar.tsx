import React, { useState, useEffect } from "react";
import { MessageSquare, Menu, X, ArrowUpRight, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface NavLink {
  title: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { title: "About", href: "#about", id: "about" },
  { title: "Expertise", href: "#services", id: "services" },
  { title: "Projects", href: "#projects", id: "projects" },
  { title: "Contact", href: "#contact", id: "contact" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy
      const sections = ["hero", "about", "services", "projects", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <nav
        className={`w-full max-w-6xl rounded-2xl border transition-all duration-300 ${
          isLight
            ? scrolled
              ? "border-black/10 bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
              : "border-slate-200/80 bg-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl"
            : scrolled
            ? "border-white/15 bg-[#08080c]/90 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
            : "border-white/10 bg-[#08080c]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 md:px-8">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-base sm:text-lg md:text-xl font-bold tracking-tight transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl shadow-sm transition-all ${
              isLight
                ? "bg-slate-900 text-white shadow-slate-300"
                : "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            }`}>
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <span className={isLight ? "text-slate-900" : "text-white"}>
              Shivansh{" "}
              <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                Saxena
              </span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div
            className={`hidden md:flex items-center gap-1.5 rounded-full border p-1.5 backdrop-blur-md transition-colors ${
              isLight
                ? "border-slate-200 bg-slate-100/80 shadow-inner"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.title}
                  href={link.href}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isLight
                        ? "text-slate-950 bg-white shadow-sm border border-slate-200/80 font-bold"
                        : "text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold"
                      : isLight
                      ? "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-900 dark:bg-white" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Hub: Theme Toggle + Let's Talk CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
                isLight
                  ? "border-slate-300/80 bg-white text-slate-800 shadow-sm hover:border-slate-900 hover:bg-slate-50"
                  : "border-white/15 bg-white/[0.05] text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-white/40"
              }`}
            >
              {isLight ? (
                <Moon className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <Sun className="h-4 w-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
              )}
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-5 py-2 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                isLight
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm hover:bg-black hover:shadow-md"
                  : "border-white/20 bg-white/[0.06] text-white hover:border-white/50 hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              }`}
            >
              <MessageSquare className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 ${
                isLight ? "text-white" : "text-white group-hover:text-black"
              }`} />
              <span>
                Let's Talk
              </span>
              <ArrowUpRight className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isLight ? "text-slate-300 group-hover:text-white" : "text-zinc-400 group-hover:text-black"
              }`} />
            </a>
          </div>

          {/* Mobile Right: Theme Toggle + Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                isLight
                  ? "border-slate-300 bg-slate-100 text-slate-800"
                  : "border-white/15 bg-white/5 text-white"
              }`}
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <button
              type="button"
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                isLight
                  ? "border-slate-300 bg-white text-slate-800"
                  : "border-white/15 bg-white/5 text-zinc-300 hover:text-white"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Glass Menu Drawer */}
        {menuOpen && (
          <div
            className={`border-t px-6 py-6 backdrop-blur-3xl md:hidden animate-in fade-in duration-200 ${
              isLight
                ? "border-slate-200 bg-white/95 text-slate-900"
                : "border-white/10 bg-[#08080c]/95 text-white"
            }`}
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? isLight
                          ? "border border-black/20 bg-slate-100 text-black font-bold"
                          : "border border-white/30 bg-white/10 text-white font-bold"
                        : isLight
                        ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.title}</span>
                    {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all active:scale-95"
              >
                <MessageSquare className="h-4 w-4 text-black" />
                <span>Let's Talk</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;


