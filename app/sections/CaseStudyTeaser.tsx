"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useView } from "../components/ViewContext";

export default function CaseStudyTeaser() {
  const { view } = useView();
  if (view !== "ux") return null;

  return (
    <section className="py-24 px-8 md:px-24 xl:px-40 bg-[#0a0a12]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0f0f1c] border border-white/6 rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center"
        >
          <div className="md:col-span-2">
            <div
              className="text-xs tracking-[0.3em] uppercase text-indigo-400 mb-4"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              Case study
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
              style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
            >
              Auditing 15+ pages against 20+ competitors at HireZapp
            </h2>
            <p className="text-slate-400 leading-relaxed">
              How I found what confused users, wrote down why each issue mattered, and shipped a
              redesign of the candidate communications hub.
            </p>
          </div>
          <div className="md:text-right">
            <Link
              href="/case-studies/hirezapp"
              className="inline-block px-8 py-3 rounded-full border border-indigo-500/50 text-slate-100 hover:border-indigo-400 hover:bg-indigo-600 transition-colors"
            >
              Read the case study
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
