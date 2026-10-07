"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "4.06", label: "GPA / 4.30" },
  { value: "President's List", label: "Ontario Tech" },
  { value: "Top 10", label: "TechNation Canada" },
  { value: "Top 100", label: "FAR AWAY 2026" },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-24 xl:px-40 bg-[#08080f]">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="h-px w-8 bg-indigo-500" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-indigo-400"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            About Me
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-8"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              Designing at the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                intersection
              </span>{" "}
              of code &amp; craft.
            </h2>

            <div className="space-y-5 text-slate-400 text-base md:text-lg leading-relaxed">
              <p>
                Fourth-year Software Engineering student at Ontario Tech. What excites me
                isn&apos;t the code itself, it&apos;s what the code makes possible. I figured out
                early that I come alive at the intersection of design and tech: where a font choice
                changes how a page <span className="text-slate-200">feels</span>, and a color shift
                makes someone trust a product or close the tab.
              </p>
              <p>
                I&apos;ve worn a lot of hats. Interned at an AI recruiting startup doing UX audits
                and product fixes. Run marketing and branding for a 500+ member student org. Built
                things ranging from full-stack platforms to multi-agent AI systems. I researched how
                design affects human perception across age groups{" "}
                <span className="text-slate-200">in first year, by choice</span>. That probably
                tells you everything.
              </p>
              <p>
                Where I&apos;m headed:{" "}
                <span className="text-indigo-400">UX and product</span>, working with engineers
                who care how the thing feels to use. Gaming and media is the space I&apos;m most
                curious about.
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-8 flex-wrap">
              <a
                href="https://github.com/Khushi-Patel-code"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:border-white/30"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/khushipatel-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:border-white/30"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0f0f1c] border border-white/6 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div
                    className="text-3xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs text-slate-500 tracking-wide uppercase"
                    style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="bg-[#0f0f1c] border border-white/6 rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  className="text-xs text-emerald-400 tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  Available for opportunities
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Looking for a co-op or internship from{" "}
                <span className="text-slate-200">Winter 2027</span>, and Summer 2027 too. Roles in{" "}
                <span className="text-slate-200">UX/UI</span>,{" "}
                <span className="text-slate-200">product</span>, and{" "}
                <span className="text-slate-200">software</span>.
              </p>
            </div>

            {/* Education */}
            <div className="bg-[#0f0f1c] border border-white/6 rounded-2xl p-6 hover:border-indigo-500/20 transition-all duration-300">
              <div
                className="text-xs text-slate-500 tracking-widest uppercase mb-3"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                Education
              </div>
              <div
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
              >
                Ontario Tech University
              </div>
              <div className="text-slate-400 text-sm mt-1">
                B.Eng. Software Engineering (Honours)
              </div>
              <div
                className="text-slate-500 text-xs mt-1"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                GPA 4.06 / 4.30 · Expected June 2028
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
