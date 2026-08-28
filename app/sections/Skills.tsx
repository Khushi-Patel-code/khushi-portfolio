"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Languages",
    color: "indigo",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
  },
  {
    category: "Web Development",
    color: "cyan",
    items: ["React", "Next.js", "HTML", "CSS", "Tailwind", "Bootstrap", "Node.js", "Express.js", "Firebase", "REST APIs", "JWT"],
  },
  {
    category: "Design & UX",
    color: "violet",
    items: ["Figma", "Wireframing", "UI Prototyping", "Responsive Design", "Visual Branding", "Canva"],
  },
  {
    category: "Databases & Data",
    color: "sky",
    items: ["MySQL", "Pandas", "NumPy"],
  },
  {
    category: "Tools & DevOps",
    color: "slate",
    items: ["Git", "GitHub", "Linux", "Bash", "Cron", "Jira", "VS Code"],
  },
  {
    category: "Business Tools",
    color: "emerald",
    items: ["Microsoft Excel", "PowerPoint", "Agile/Scrum", "Requirements Gathering"],
  },
];

const colorMap: Record<string, string> = {
  indigo:  "border-indigo-500/30 text-indigo-300 bg-indigo-500/8 hover:bg-indigo-500/15",
  cyan:    "border-cyan-500/30 text-cyan-300 bg-cyan-500/8 hover:bg-cyan-500/15",
  violet:  "border-violet-500/30 text-violet-300 bg-violet-500/8 hover:bg-violet-500/15",
  sky:     "border-sky-500/30 text-sky-300 bg-sky-500/8 hover:bg-sky-500/15",
  slate:   "border-slate-500/30 text-slate-300 bg-slate-500/8 hover:bg-slate-500/15",
  emerald: "border-emerald-500/30 text-emerald-300 bg-emerald-500/8 hover:bg-emerald-500/15",
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 md:px-24 xl:px-40 bg-[#0a0a12]">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-indigo-500" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-indigo-400"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Skills
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-16"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          Tools of the trade
        </motion.h2>

        <div className="space-y-8">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 pb-8 border-b border-white/5 last:border-0"
            >
              <div className="sm:w-40 shrink-0 pt-1">
                <span
                  className="text-xs tracking-widest uppercase text-slate-500"
                  style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                >
                  {group.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-default ${colorMap[group.color]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
