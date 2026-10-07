"use client";

import Link from "next/link";
import { useView } from "../components/ViewContext";

type Project = {
  id: string;
  title: string;
  line: string;
  stack: string;
  github: string;
  demo?: string;
  image?: string;
  alt?: string;
};

const all: Record<string, Project> = {
  farsight: {
    id: "farsight",
    title: "Farsight",
    line: "A multi-agent system that predicts where crowds will build up in railway stations and tells operators what to do about it. Top 100 of 11,000+ applicants at FAR AWAY 2026, and invited to the in-person round in Delhi.",
    stack: "React, TypeScript, Tailwind CSS, multi-agent systems",
    github: "https://github.com/Khushi-Patel-code/Farsight",
    demo: "https://farsight-fawn.vercel.app",
    image: "/projects/farsight-dashboard.jpg",
    alt: "Farsight operator dashboard with a live simulation map, risk alerts and recommendations",
  },
  neuro: {
    id: "neuro",
    title: "Neuro-Pilot",
    line: "AI support for neurodivergent students. It swaps rigid timers for gentle momentum and breaks tasks into small, sensory-friendly steps. Built for the TechNation AI hackathon.",
    stack: "Python, OpenAI, accessibility-first UX",
    github: "https://github.com/Khushi-Patel-code/Neuro-Pilot",
  },
  ecom: {
    id: "ecom",
    title: "E-Commerce Inventory & Order System",
    line: "A full-stack system for inventory and orders, with role-based logins, order tracking, and sales analytics for admins.",
    stack: "Node.js, Express, MySQL, JWT, Chart.js",
    github: "https://github.com/Khushi-Patel-code/E-Commerce-Inventory-Order-Management-System-Website",
    image: "/projects/ecom-dashboard.jpg",
    alt: "E-commerce admin dashboard showing revenue, products, customers and sales charts",
  },
  coach: {
    id: "coach",
    title: "Multi-Agent AI Learning Coach",
    line: "A group of AI agents that put together personalized study plans and research summaries. My Kaggle capstone, focused on session memory and how agents use tools.",
    stack: "Python, OpenAI, LangChain",
    github: "https://github.com/Khushi-Patel-code/AI-learning-coach-kaggle-capstone",
  },
};

const order = {
  ux: ["farsight", "neuro", "ecom", "coach"],
  software: ["farsight", "ecom", "coach", "neuro"],
};

export default function Projects() {
  const { view } = useView();
  const projects = order[view].map((k) => all[k]);

  return (
    <section id="work" className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-rule">
      <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-14">
        Things I&apos;ve <em className="text-maroon">made</em>
      </h2>

      {view === "ux" && (
        <Link
          href="/case-studies/hirezapp"
          className="group block bg-paper-deep rounded-sm p-8 md:p-12 mb-20 hover:bg-[#e6dcca] transition-colors"
        >
          <p className="font-display italic text-maroon text-lg mb-3">Case study</p>
          <h3 className="font-display text-3xl md:text-5xl leading-tight tracking-tight max-w-3xl">
            I audited 15+ pages against 20+ competitors, then fixed what confused people.
          </h3>
          <p className="mt-5 text-muted max-w-xl">
            My work at HireZapp, an AI recruiting startup. It ended with a redesign of the candidate
            communications hub that shipped to production.
          </p>
          <span className="mt-6 inline-block link text-ink group-hover:text-maroon">
            Read the case study
          </span>
        </Link>
      )}

      <ol className="space-y-24">
        {projects.map((p, i) => (
          <li key={p.id} className="grid md:grid-cols-12 gap-x-10 gap-y-6">
            <div className="md:col-span-1 font-display italic text-3xl text-rule">0{i + 1}</div>

            <div className={p.image ? "md:col-span-5" : "md:col-span-11 md:max-w-2xl"}>
              <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight mb-4">
                {p.title}
              </h3>
              <p className="text-ink/85 mb-5">{p.line}</p>
              <p className="text-sm text-muted mb-5">{p.stack}</p>
              <p className="flex gap-6 text-[15px]">
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="link">
                    Live demo
                  </a>
                )}
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="link">
                  Code on GitHub
                </a>
              </p>
            </div>

            {p.image && (
              <div className="md:col-span-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full rounded-sm border border-rule shadow-[6px_6px_0_var(--color-rule)]"
                />
              </div>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-24 text-lg">
        There&apos;s more, mostly class labs and smaller experiments, on{" "}
        <a
          href="https://github.com/Khushi-Patel-code"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          my GitHub
        </a>
        .
      </p>
    </section>
  );
}
