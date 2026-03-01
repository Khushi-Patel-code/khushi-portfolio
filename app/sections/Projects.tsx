"use client";

import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Management System",
    description: "A robust full-stack system for inventory and order orchestration. Engineered with JWT authentication, secure payment simulations, and dynamic data visualization.",
    tags: ["Node.js", "MySQL", "Express", "Chart.js"],
    link: "https://github.com/Khushi-Patel-code/E-Commerce-Inventory-Order-Management-System-Website"
  },
  {
    title: "Neuro-Pilot",
    description: "AI-powered support system for neurodivergent students, developed for the Technation AI Hackathon. Replaces rigid timers with gentle momentum, breaking tasks into sensory-friendly micro-steps.",
    tags: ["Python", "AI + Wellness", "Accessibility", "UX Research"],
    link: "https://github.com/yourusername/neuro-pilot"
  },
  {
    title: "Battery SOH Predictor",
    description: "A full-stack AI solution predicting battery State of Health using Linear Regression. Features an integrated OpenAI chatbot to translate complex sensor data into actionable health insights.",
    tags: ["React", "Flask", "AWS", "Scikit-Learn"],
    link: "https://github.com/Khushi-Patel-code/BatterySOH-AI"
  },
  {
    title: "TSWF Automation Framework",
    description: "A modular Bash-based system for scheduling recurring tasks and multi-step workflows. Implements core UNIX principles like process control, error handling, and file-based state tracking.",
    tags: ["Shell Scripting", "Linux", "Automation", "Cron"],
    link: "https://github.com/Khushi-Patel-code/TASK-SCHEDULER"
  },
  {
    title: "Multi-Agent AI Learning Coach",
    description: "An orchestration of AI agents designed to generate personalized study plans and research summaries. Built as a Kaggle capstone focusing on session memory and autonomous tool usage.",
    tags: ["Python", "Kaggle", "Agentic AI", "LLMs"],
    link: "https://github.com/Khushi-Patel-code/AI-learning-coach-kaggle-capstone"
  },
  {
    title: "ChronoSlate Web Calendar",
    description: "An interactive scheduling interface focusing on persistence and user-centric event management. Designed with a high-contrast UI and localized storage for seamless performance.",
    tags: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
    link: "https://github.com/Khushi-Patel-code/Chronoslate_Web_calendar"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 px-8 md:px-32 bg-[#0a0a0c] overflow-hidden">
      
      {/* Background Grid - Matching Hero */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }}>
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold uppercase text-white tracking-[0.03em] mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Works</span>
          </h2>
          <div className="h-1 w-20 bg-indigo-500"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all duration-500"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 font-light leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.a 
                    href={project.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-slate-400 uppercase tracking-widest transition-all duration-300 group/link"
                    // 1. We make the parent a motion component and set the trigger here
                    initial="initial"
                    whileHover="hover"
                    >
                    <span className="group-hover/link:text-indigo-400 transition-colors duration-300">
                        GitHub Tour
                    </span>

                    <motion.span 
                        className="ml-2 text-slate-500 group-hover/link:text-cyan-400 transition-colors duration-300"
                        variants={{
                        initial: { x: 0 },
                        // 2. The child now listens to the "hover" state of the parent
                        hover: { x: 12 } 
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        →
                    </motion.span>
                    </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;