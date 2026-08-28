"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Full Stack Developer Intern",
    roleExtra: "Product, UI/UX & Growth",
    company: "HireZapp · Remote/Hybrid",
    period: "May 2026 – August 2026",
    type: "Internship",
    typeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    bullets: [
      "Audited and redesigned UX across the website, implementing layout and frontend changes directly in the codebase based on real user behavior data, following object-oriented design and coding best practices",
      "Researched AI search visibility gaps and implemented structured data (FAQPage schema) in JSON-LD, using AI tools to accelerate testing and debugging",
      "Led content strategy end to end, from technical blog audits to comparative market research, translating user and business requirements into actionable engineering and content fixes",
      "Drove reputation and trust-building initiatives across major review platforms, collaborating with engineering to design, build, and ship hands-on product fixes",
    ],
  },
  {
    role: "Chief Marketing Officer",
    company: "Tech Management Student Association (TMSA) · OTU",
    period: "January 2026 – Present",
    type: "Leadership",
    typeColor: "text-violet-400 bg-violet-500/10 border-violet-500/30",
    bullets: [
      "Collaborated on building an event platform using React and Firebase, implementing real-time registration, team formation, and admin dashboard features",
      "Designed and executed an end-to-end marketing campaign for Startup Rescue Challenge 2026, driving 50+ registrations within 3 weeks through cross-platform content and event branding",
      "Led visual identity and social media strategy across all digital platforms, owning content calendars and promotional design with 60%+ engagement growth on initial campaign content",
    ],
  },
  {
    role: "Web Development Intern",
    company: "CodePhoenix Web Solutions · India",
    period: "July 2025 – August 2025",
    type: "Internship",
    typeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    bullets: [
      "Developed 5+ responsive web pages using HTML, CSS, JavaScript and Express.js, improving mobile load performance by 25%",
      "Implemented dynamic form handling and integrated REST APIs across 5+ user workflows, reducing form submission errors by 40%",
      "Led UI/UX design in Figma, created wireframes, defined component structure and ensured visual consistency across branded feature updates",
    ],
  },
  {
    role: "Peer Mentor",
    company: "Ontario Tech University",
    period: "Winter 2025",
    type: "University",
    typeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    bullets: [
      "Mentored 5+ incoming engineering students through academic onboarding, conducting bi-weekly check-ins to support academic transition and retention",
    ],
  },
  {
    role: "Level One Ambassador",
    company: "Ontario Tech University",
    period: "Nov 2023 – Present",
    type: "University",
    typeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    bullets: [
      "Represent Ontario Tech at outreach and recruitment events, engaging with 50+ prospective students and families to promote academic programs and student life",
    ],
  },
];

const achievements = [
  "🏆 FAR AWAY 2026 International Hackathon (Zuup) — Top 100 of 11,000+ applicants (July 2026)",
  "🏆 TECHNATION AI Equity Data Challenge — Top 10 nationally across Canada (Nov 2025)",
  "⚡ Brilliant Catalyst Energy Innovation Challenge Semi-finalist — Ontario Tech (Winter 2025)",
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-8 md:px-24 xl:px-40 bg-[#08080f]">
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
            Experience
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
          Where I&apos;ve grown
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-white/5 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="md:pl-12 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 w-3.5 h-3.5 rounded-full border-2 border-indigo-500 bg-[#08080f] hidden md:block" />

                <div className="bg-[#0f0f1c] border border-white/6 rounded-2xl p-6 md:p-8 hover:border-indigo-500/20 transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3
                        className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors"
                        style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
                      >
                        {exp.role}
                        {exp.roleExtra && (
                          <span className="text-slate-500 font-normal text-base ml-2">
                            ({exp.roleExtra})
                          </span>
                        )}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`text-xs px-3 py-1 rounded-full border ${exp.typeColor}`}
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {exp.type}
                      </span>
                      <span
                        className="text-xs text-slate-500"
                        style={{ fontFamily: "var(--font-dm-mono), monospace" }}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                        <span className="text-indigo-500 mt-1.5 shrink-0">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 p-6 md:p-8 bg-[#0f0f1c] border border-white/6 rounded-2xl"
        >
          <div
            className="text-xs text-slate-500 tracking-widest uppercase mb-5"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            Achievements & Competitions
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {achievements.map((item) => (
              <div key={item} className="text-sm text-slate-400 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
