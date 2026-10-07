"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Link from "next/link";
import { useView } from "../components/ViewContext";

const copy = {
  ux: {
    label: "Software Engineering Student · UX & Product",
    line: (
      <>
        I build software and I audit the experience around it. Fourth-year engineering student with{" "}
        <span className="text-slate-200">UX and product work at an AI recruiting startup</span>, and a{" "}
        <span className="text-slate-200">multi-agent system that placed top 100 of 11,000+ applicants</span>.
      </>
    ),
  },
  software: {
    label: "Software Engineering Student · Full-Stack",
    line: (
      <>
        Fourth-year engineering student building{" "}
        <span className="text-slate-200">full-stack and multi-agent systems</span>, with a product eye for
        how people actually use them. Shipped to production at an AI recruiting startup.
      </>
    ),
  },
};

const Hero = () => {
  const { view } = useView();
  const c = copy[view];
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-8 md:px-32 pt-20 bg-[#0a0a0c] overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-40" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }}>
      </div>

      {/* Decorative Radial Gradient (The Spotlight) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="h-[1px] w-8 bg-indigo-500"></span>
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">
            {c.label}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 leading-tight tracking-tighter"
        >
          {/* Nested Typography: Smaller intro text */}
          <span className="text-2xl md:text-6xl text-slate-300 font-bold block mb-2">
            Hello, I'm
          </span>
          {/* Main Hero text: Large and Gradient */}
          <span className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 uppercase">
            KHUSHI PATEL
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-slate-400 mb-10 text-lg md:text-xl max-w-xl leading-relaxed "
        >
          {c.line}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="flex flex-wrap gap-4">
            <Button
              text="See my work"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            {view === "ux" && (
              <Link
                href="/case-studies/hirezapp"
                className="px-8 py-3 rounded-full text-slate-300 border border-white/10 hover:border-white/30 hover:text-white transition-colors"
              >
                HireZapp case study
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hidden md:block"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;