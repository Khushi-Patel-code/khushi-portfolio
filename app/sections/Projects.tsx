"use client";

import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Management System",
    subtitle: "Full-Stack Inventory Orchestration",
    description: "A robust full-stack system for inventory and order orchestration with role-based authentication, inventory management, order processing, analytics, and secure admin controls.",
    highlights: ["JWT Authentication", "Product & Inventory CRUD", "Role-based Access Control", "Dynamic Data Visualization", "Order Processing & Tracking", "Sales Analytics & Reporting" ],
    tags: ["nodedotjs", "mysql","jsonwebtokens", "express", "chartdotjs"],
    link: "https://github.com/Khushi-Patel-code/E-Commerce-Inventory-Order-Management-System-Website"
  },
  {
    title: "Neuro-Pilot",
    subtitle: "AI-Powered Executive Function Support",
    description: "AI-powered support system for neurodivergent students, developed for the Technation AI Hackathon. Replaces rigid timers with gentle momentum, breaking tasks into sensory-friendly micro-steps.",
    highlights: ["Micro-step task breakdown", "Sensory-friendly UX", "Hackathon Project", "Momentum-based workflow"],
    tags: ["python", "openai", "accessibility", "uxdesign"],
    link: "https://github.com/yourusername/neuro-pilot"
  },
  {
    title: "Battery SOH Predictor",
    subtitle: "IoT & Machine Learning Analysis",
    description: "A full-stack AI solution predicting battery State of Health using Linear Regression. Features an integrated OpenAI chatbot to translate complex sensor data into actionable health insights.",
    highlights: ["Linear Regression Model", "OpenAI Chatbot Integration", "Real-time Sensor Analysis", "AWS Elastic Beanstalk"],
    tags: ["react", "flask", "amazonwebservices", "scikitlearn"],
    link: "https://github.com/Khushi-Patel-code/BatterySOH-AI"
  },
  {
    title: "TSWF Automation Framework",
    subtitle: "UNIX System Automation",
    description: "A modular Bash-based system for scheduling recurring tasks and multi-step workflows. Implements core UNIX principles like process control, error handling, and file-based state tracking.",
    highlights: ["Bash-based scheduling", "UNIX Process Control", "File-based state tracking", "Cron Integration"],
    tags: ["gnubash", "linux", "automation", "cron"],
    link: "https://github.com/Khushi-Patel-code/TASK-SCHEDULER"
  },
  {
    title: "Multi-Agent AI Learning Coach",
    subtitle: "Agentic AI Orchestration",
    description: "An orchestration of AI agents designed to generate personalized study plans and research summaries. Built as a Kaggle capstone focusing on session memory and autonomous tool usage.",
    highlights: ["Agent Orchestration", "Session Memory Tracking", "Kaggle Capstone", "Autonomous Tool Usage"],
    tags: ["python", "kaggle", "openai", "langchain"],
    link: "https://github.com/Khushi-Patel-code/AI-learning-coach-kaggle-capstone"
  },
  {
    title: "ChronoSlate Web Calendar",
    subtitle: "Interactive Scheduling System",
    description: "An interactive scheduling interface focusing on persistence and user-centric event management. Designed with a high-contrast UI and localized storage for seamless performance.",
    highlights: ["Local Storage Persistence", "High-contrast UI Design", "User-centric event management", "Dynamic calendar generation"],
    tags: ["javascript", "html5", "css3", "storage"],
    link: "https://github.com/Khushi-Patel-code/Chronoslate_Web_calendar"
  }
];

// Refined Staggered Title: It now inherits "hovered" state from the parent "group"
const StaggeredTitle = ({ title }: { title: string }) => {
  const letters = title.split("");
  
  return (
    <h3 className="text-2xl font-bold text-white uppercase tracking-tight flex flex-wrap pointer-events-none">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            initial: { color: "#ffffff" },
            hovered: { color: "#818cf8" }, // Indigo wave
          }}
          transition={{
            duration: 0.3,
            delay: i * 0.02,
            ease: "easeInOut"
          }}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </h3>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-24 bg-black overflow-hidden select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-24">
          <span className="text-indigo-500 font-mono text-xs tracking-[0.3em] uppercase block mb-4">
            Featured Projects
          </span>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
            PROJECTS
          </h2>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hovered" // This triggers the wave for the specific card
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              // Added cursor-default so only the circle feels clickable
              className="flex flex-col lg:flex-row gap-10 group cursor-default"
            >
              {/* IMAGE / PREVIEW BOX */}
              <div className="lg:w-3/5 aspect-video bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden relative">
                <div className="absolute top-8 left-8 z-20 max-w-xs pointer-events-none">
                  <p className="text-xl text-zinc-300 font-medium leading-snug">
                    {project.subtitle}
                  </p>
                </div>
                
                {/* GITHUB LINK: The ONLY clickable part */}
                <div className="absolute top-8 right-8 z-30">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 shadow-2xl group/btn cursor-pointer"
                    >
                      <svg 
                        className="absolute group-hover/btn:opacity-0 group-hover/btn:scale-50 transition-all duration-500" 
                        width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <svg 
                        className="opacity-0 scale-50 group-hover/btn:opacity-100 group-hover/btn:scale-100 transition-all duration-500" 
                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                </div>

                <div className="absolute -bottom-1/4 -left-1/4 w-[150%] h-[150%] bg-indigo-500/10 rounded-full blur-[120px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                
                <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-mono text-xs uppercase tracking-widest pt-20 text-center px-4 pointer-events-none">
                   {project.title} Interface Preview
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="lg:w-2/5 flex flex-col justify-center space-y-8 pointer-events-none">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[1px] w-6 bg-indigo-500"></span>
                    <StaggeredTitle title={project.title} />
                  </div>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {project.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="text-indigo-400 mt-1">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4 pt-4 transition-all duration-500 pointer-events-auto">
                   {project.tags.map(tag => (
                     <div key={tag} className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center p-3 hover:border-white/30 transition-all">
                       <img 
                        src={`https://cdn.simpleicons.org/${tag}`} 
                        alt={tag} 
                        className="w-full h-full object-contain"
                       />
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;