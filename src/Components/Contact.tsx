import React, { useState } from "react";
import type { FormEvent } from "react";
import HolographicOrb from "./3D/HolographicOrb";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Bot,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useTheme } from "../context/ThemeContext";

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult("");
    setStatusType("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "51876399-ca9b-4820-ada2-9729b5aa883a");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message transmitted successfully! I will get back to you shortly.");
        setStatusType("success");
        form.reset();
      } else {
        setResult(data.message || "Submission failed. Please try again.");
        setStatusType("error");
      }
    } catch (err) {
      console.error(err);
      setResult("Something went wrong. Please reach out directly via email.");
      setStatusType("error");
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 transition-colors duration-300 ${
        isLight ? "text-slate-900" : "text-white"
      }`}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-[450px] w-[450px] rounded-full bg-white/[0.03] blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-white/[0.02] blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-mono backdrop-blur-md transition-all ${
              isLight
                ? "border-black/15 bg-black/5 text-black"
                : "border-white/20 bg-white/[0.04] text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            }`}
          >
            <Sparkles className={`h-3.5 w-3.5 ${isLight ? "text-slate-800" : "text-white"}`} />
            <span>CONTACT // GET IN TOUCH</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Let's{" "}
            <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent text-glow">
              Build Something Amazing
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed ${
              isLight ? "text-slate-600" : "text-zinc-400"
            }`}
          >
            I'm actively looking for AI/ML Engineer, Generative AI, Agentic AI, and Full Stack Developer opportunities.
            Whether you have an exciting project, internship, or full-time role, I'd love to connect.
          </p>
        </div>

        {/* Main Grid: Left Details & 3D Orb + Right Form */}
        <div className="mt-12 sm:mt-16 grid gap-8 sm:gap-12 lg:grid-cols-12 items-start">
          {/* LEFT COLUMN: Contact Details & 3D Holographic Orb */}
          <div className="lg:col-span-5 space-y-6">
            {/* 3D Holographic Orb Container */}
            <div
              className={`relative flex items-center justify-center rounded-[28px] sm:rounded-[32px] border p-4 sm:p-6 backdrop-blur-2xl shadow-xl transition-all duration-300 ${
                isLight
                  ? "border-slate-200/80 bg-white/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
                  : "border-white/15 bg-[#08080c]/90 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
              }`}
            >
              <HolographicOrb />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span>AI_COMM_NODE</span>
                <span className="text-white font-semibold">ENCRYPTED // ACTIVE</span>
              </div>
            </div>

            {/* Availability Status Card */}
            <div
              className={`rounded-3xl border p-5 sm:p-6 backdrop-blur-xl shadow-lg transition-all duration-300 ${
                isLight
                  ? "border-slate-200 bg-white/90 text-slate-900"
                  : "border-white/15 bg-white/[0.03] text-white"
              }`}
            >
              <div className="flex items-center gap-2.5 text-white">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                </span>
                <h3 className="text-base sm:text-lg font-bold">Available for Opportunities</h3>
              </div>
              <p
                className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                  isLight ? "text-slate-700" : "text-zinc-300"
                }`}
              >
                Open to Full-Time, Internship, AI/ML Engineer, Generative AI, Agentic AI, and Full Stack Developer roles.
              </p>
            </div>

            {/* Contact Metadata Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div
                className={`flex items-center gap-4 rounded-2xl border p-3.5 sm:p-4 backdrop-blur-xl transition-all hover:border-white/30 ${
                  isLight
                    ? "border-slate-200 bg-white/90"
                    : "border-white/10 bg-[#08080c]/80"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-mono text-[11px] text-zinc-400">EMAIL</p>
                  <a
                    href="mailto:shivanshsaxena108@gmail.com"
                    className={`text-xs sm:text-sm font-semibold hover:text-white transition-colors truncate block ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    shivanshsaxena108@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div
                className={`flex items-center gap-4 rounded-2xl border p-3.5 sm:p-4 backdrop-blur-xl transition-all hover:border-white/30 ${
                  isLight
                    ? "border-slate-200 bg-white/90"
                    : "border-white/10 bg-[#08080c]/80"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] text-zinc-400">PHONE</p>
                  <a
                    href="tel:+918433055364"
                    className={`text-xs sm:text-sm font-semibold hover:text-white transition-colors ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    +91 84330 55364
                  </a>
                </div>
              </div>

              {/* Location */}
              <div
                className={`flex items-center gap-4 rounded-2xl border p-3.5 sm:p-4 backdrop-blur-xl transition-all hover:border-white/30 ${
                  isLight
                    ? "border-slate-200 bg-white/90"
                    : "border-white/10 bg-[#08080c]/80"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[11px] text-zinc-400">LOCATION</p>
                  <p
                    className={`text-xs sm:text-sm font-semibold ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    Greater Noida, Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Resume Action Hub (Cleaned to keep ONLY Google Drive link) */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="https://github.com/shivansh4565"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                  isLight
                    ? "border-slate-300 bg-white/90 text-slate-800 hover:border-black"
                    : "border-white/15 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08]"
                }`}
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/s4565"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                  isLight
                    ? "border-slate-300 bg-white/90 text-slate-800 hover:border-black"
                    : "border-white/15 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08]"
                }`}
              >
                <LinkedinIcon className="h-4 w-4 text-zinc-300" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://drive.google.com/drive/folders/1WRcG70PIvTqLnjAEJzYPYFuWO2gzky1A?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
              >
                <Bot className="h-4 w-4 text-black" />
                <span>Resume (Google Drive)</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-7">
            <div
              className={`relative overflow-hidden rounded-[28px] sm:rounded-[36px] border p-6 sm:p-8 md:p-10 backdrop-blur-2xl transition-all duration-300 ${
                isLight
                  ? "border-slate-200/80 bg-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                  : "border-white/15 bg-[#08080c]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              }`}
            >
              {/* Form Header HUD */}
              <div
                className={`flex items-center justify-between border-b pb-4 sm:pb-5 ${
                  isLight ? "border-slate-200" : "border-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-2.5 w-2.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <span
                    className={`font-mono text-xs font-semibold tracking-wider ${
                      isLight ? "text-slate-800" : "text-zinc-300"
                    }`}
                  >
                    TRANSMISSION_FORM // SECURE
                  </span>
                </div>
                <span className="font-mono text-[11px] text-zinc-500">
                  Web3Forms Integrated
                </span>
              </div>

              <form onSubmit={onSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                {/* Name */}
                <div>
                  <label
                    className={`mb-1.5 sm:mb-2 block font-mono text-xs ${
                      isLight ? "text-slate-700" : "text-zinc-300"
                    }`}
                  >
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Shivansh Saxena"
                    className={`w-full rounded-xl border px-4 py-3 sm:px-5 sm:py-3.5 text-sm outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/20 ${
                      isLight
                        ? "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                        : "border-white/15 bg-white/[0.04] text-white placeholder:text-zinc-500 focus:bg-white/[0.08]"
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className={`mb-1.5 sm:mb-2 block font-mono text-xs ${
                      isLight ? "text-slate-700" : "text-zinc-300"
                    }`}
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. name@organization.com"
                    className={`w-full rounded-xl border px-4 py-3 sm:px-5 sm:py-3.5 text-sm outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/20 ${
                      isLight
                        ? "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                        : "border-white/15 bg-white/[0.04] text-white placeholder:text-zinc-500 focus:bg-white/[0.08]"
                    }`}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    className={`mb-1.5 sm:mb-2 block font-mono text-xs ${
                      isLight ? "text-slate-700" : "text-zinc-300"
                    }`}
                  >
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="AI Project • Full-Time Role • Collaboration • Internship"
                    className={`w-full rounded-xl border px-4 py-3 sm:px-5 sm:py-3.5 text-sm outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/20 ${
                      isLight
                        ? "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                        : "border-white/15 bg-white/[0.04] text-white placeholder:text-zinc-500 focus:bg-white/[0.08]"
                    }`}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className={`mb-1.5 sm:mb-2 block font-mono text-xs ${
                      isLight ? "text-slate-700" : "text-zinc-300"
                    }`}
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell me about your project, internship, collaboration, or hiring opportunity..."
                    className={`w-full resize-none rounded-xl border px-4 py-3 sm:px-5 sm:py-3.5 text-sm outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/20 ${
                      isLight
                        ? "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white"
                        : "border-white/15 bg-white/[0.04] text-white placeholder:text-zinc-500 focus:bg-white/[0.08]"
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 sm:py-4 font-bold text-black shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4 text-black" />
                  <span>{loading ? "Transmitting..." : "Send Message 🚀"}</span>
                </button>

                {/* Status Feedback */}
                {result && (
                  <div
                    className={`flex items-center gap-3 rounded-xl border p-4 text-xs md:text-sm font-medium animate-in fade-in duration-300 ${
                      statusType === "success"
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-red-500/30 bg-red-950/30 text-red-300"
                    }`}
                  >
                    {statusType === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-white shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                    )}
                    <span>{result}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Minimalist Premium Footer */}
        <footer
          className={`mt-20 sm:mt-28 border-t pt-10 sm:pt-12 ${
            isLight ? "border-slate-200" : "border-white/10"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            {/* Left */}
            <div>
              <h3
                className={`text-2xl font-bold tracking-tight ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                Shivansh{" "}
                <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent text-glow">
                  Saxena
                </span>
              </h3>
              <p
                className={`mt-2 max-w-md text-xs leading-relaxed ${
                  isLight ? "text-slate-600" : "text-zinc-400"
                }`}
              >
                AI/ML Engineer • Generative AI • Agentic AI • Full Stack Developer
                <br />
                Building intelligent AI products, scalable architectures, and production-ready software.
              </p>
            </div>

            {/* Right: Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <a
                href="https://github.com/shivansh4565"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                  isLight
                    ? "border-slate-300 bg-white/90 text-slate-800 hover:border-black"
                    : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/s4565"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                  isLight
                    ? "border-slate-300 bg-white/90 text-slate-800 hover:border-black"
                    : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                LinkedIn
              </a>

              <a
                href="https://drive.google.com/drive/folders/1WRcG70PIvTqLnjAEJzYPYFuWO2gzky1A?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Resume (Google Drive)
              </a>
            </div>
          </div>

          {/* Bottom attribution */}
          <div
            className={`mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-[11px] md:flex-row ${
              isLight
                ? "border-slate-200 text-slate-500"
                : "border-white/5 text-zinc-500"
            }`}
          >
            <p>© {new Date().getFullYear()} Shivansh Saxena. All Rights Reserved.</p>
            <p className="font-mono">
              Designed & Engineered with React, TypeScript, Three.js & Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;


