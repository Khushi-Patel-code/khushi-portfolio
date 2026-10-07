"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "../components/Reveal";
import ViewSwitch from "../components/ViewSwitch";
import {
  projects,
  uxOrder,
  moreWork,
  githubUrl,
  roles,
  skills,
  links,
  Project,
} from "../data";

const ease = [0.22, 1, 0.36, 1] as const;

const facts = [
  {
    label: "Studying",
    value: "Software Engineering (Honours) at Ontario Tech. GPA 4.06 / 4.30, graduating June 2028.",
  },
  {
    label: "Recently",
    value: "Top 100 of 11,000+ at FAR AWAY 2026. Top 10 across Canada at the TECHNATION AI Equity Data Challenge.",
  },
  {
    label: "Around campus",
    value: "CMO of the Tech Management Student Association, and a peer educator.",
  },
];

// thin line at the top that fills as you read
function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="absolute left-0 bottom-0 h-[2px] w-full origin-left bg-maroon" />;
}

// a highlighter swipe that draws itself in
function Swipe({ children, delay = 0.9 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={{ backgroundSize: reduce ? "100% 100%" : "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease }}
      className="px-[0.1em]"
      style={{
        backgroundImage:
          "linear-gradient(transparent 60%, var(--color-mark) 60%, var(--color-mark) 92%, transparent 92%)",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </motion.span>
  );
}

function Headline() {
  const reduce = useReducedMotion();
  const words = ["Hi,", "I'm"];
  return (
    <h1 className="font-display text-6xl md:text-8xl leading-[0.95] tracking-tight">
      {words.map((w, i) => (
        <span key={w} className="inline-block overflow-hidden align-bottom pb-2 mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
          >
            {w}
          </motion.span>
        </span>
      ))}
      <span className="inline-block overflow-hidden align-bottom pb-2">
        <motion.em
          className="inline-block text-maroon"
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, delay: 0.38, ease }}
        >
          Khushi.
        </motion.em>
      </span>
    </h1>
  );
}

// the screenshot wipes in, then drifts a little as you scroll past
function Shot({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease }}
      className="overflow-hidden rounded-sm border border-rule"
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1.12 }}
        className="w-full block"
      />
    </motion.div>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  return (
    <li className="grid md:grid-cols-12 gap-x-10 gap-y-6 items-center">
      <Reveal className="md:col-span-1 font-display italic text-3xl text-rule md:self-start">
        0{i + 1}
      </Reveal>

      <Reveal delay={0.1} className={p.image ? "md:col-span-5" : "md:col-span-11 md:max-w-2xl"}>
        <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight mb-4">{p.title}</h3>
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
      </Reveal>

      {p.image && (
        <div className="md:col-span-6">
          <Shot src={p.image} alt={p.alt ?? p.title} />
        </div>
      )}
    </li>
  );
}

export default function UxTemplate() {
  const list = uxOrder.map((k) => projects[k]);

  return (
    <div className="bg-paper text-ink min-h-screen">
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-rule">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">
            Khushi Patel
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-[15px] text-muted">
            <a href="#work" className="hover:text-ink transition-colors">Work</a>
            <a href="#experience" className="hover:text-ink transition-colors">Experience</a>
            <a href="#contact" className="hover:text-ink transition-colors">Contact</a>
          </nav>
          <ViewSwitch variant="ux" />
        </div>
        <Progress />
      </header>

      <main>
        <section className="max-w-5xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20">
          <Headline />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="mt-10 max-w-2xl text-xl md:text-2xl leading-relaxed text-ink/90"
          >
            I&apos;m a fourth-year Software Engineering student at Ontario Tech. My favourite part of any
            product is the moment someone gets confused, because then you get to figure out why and{" "}
            <Swipe>fix it</Swipe>. I do that as a developer, and more and more as a UX and product person.
          </motion.p>

          <dl className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-8 border-t border-rule pt-8">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={0.1 * i}>
                <dt className="font-display italic text-maroon text-lg mb-1">{f.label}</dt>
                <dd className="text-muted text-[15px] leading-relaxed">{f.value}</dd>
              </Reveal>
            ))}
          </dl>

          <p className="mt-10 text-[15px] text-muted">
            Looking for a co-op from Winter 2027 (Summer 2027 works too).{" "}
            <a href="#contact" className="link text-ink">Say hi</a>.
          </p>
        </section>

        <section id="work" className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-rule">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-14">
              Things I&apos;ve <em className="text-maroon">made</em>
            </h2>
          </Reveal>

          <Reveal>
            <Link
              href="/case-studies/hirezapp"
              className="group block bg-paper-deep rounded-sm p-8 md:p-12 mb-24 transition-all duration-500 hover:bg-[#e6dcca] hover:-translate-y-1"
            >
              <p className="font-display italic text-maroon text-lg mb-3">Case study</p>
              <h3 className="font-display text-3xl md:text-5xl leading-tight tracking-tight max-w-3xl">
                I audited 15+ pages against 20+ competitors, then fixed what confused people.
              </h3>
              <p className="mt-5 text-muted max-w-xl">
                My work at HireZapp, an AI recruiting startup. It ended with a redesign of the candidate
                communications hub that shipped to production.
              </p>
              <span className="mt-6 inline-block link text-ink group-hover:text-maroon">Read the case study</span>
            </Link>
          </Reveal>

          <ol className="space-y-28">
            {list.map((p, i) => (
              <ProjectRow key={p.id} p={p} i={i} />
            ))}
          </ol>

          <Reveal className="mt-28">
            <p className="text-lg max-w-2xl">
              More of my work is on{" "}
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="link">
                GitHub
              </a>
              , including {moreWork.map((m) => m.title).join(", ").replace(/, ([^,]*)$/, ", and $1")}.
            </p>
          </Reveal>
        </section>

        <section id="experience" className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-rule">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-14">
              Where I&apos;ve <em className="text-maroon">worked</em>
            </h2>
          </Reveal>
          <div className="space-y-14">
            {roles.map((r) => (
              <Reveal key={r.org + r.role}>
                <div className="grid md:grid-cols-12 gap-x-10 gap-y-2">
                  <p className="md:col-span-3 text-sm text-muted pt-1.5">{r.dates}</p>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-2xl leading-snug">{r.role}</h3>
                    <p className="text-muted mb-4">{r.org}</p>
                    <ul className="space-y-2 text-ink/85 list-disc pl-5 marker:text-maroon">
                      {r.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    {r.caseStudy && (
                      <Link href="/case-studies/hirezapp" className="link mt-4 inline-block text-[15px]">
                        Read the HireZapp case study
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-rule">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-12">
              What I <em className="text-maroon">use</em>
            </h2>
          </Reveal>
          <dl className="space-y-5">
            {skills.map((g, i) => (
              <Reveal key={g.label} delay={0.05 * i}>
                <div className="grid md:grid-cols-12 gap-x-10 gap-y-1">
                  <dt className="md:col-span-3 font-display italic text-maroon text-lg">{g.label}</dt>
                  <dd className="md:col-span-9 text-ink/85">{g.items}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        <section id="contact" className="max-w-5xl mx-auto px-6 md:px-10 py-24 border-t border-rule">
          <Reveal>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-8">
              Say <em className="text-maroon">hi.</em>
            </h2>
            <p className="text-xl max-w-xl mb-12">
              I&apos;m looking for a co-op from Winter 2027, Summer 2027 too. I&apos;m also happy to talk about
              product, UX, or whatever you&apos;re building.
            </p>
          </Reveal>
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.label} className="grid md:grid-cols-12 gap-x-10">
                <span className="md:col-span-3 text-muted">{l.label}</span>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="md:col-span-9 link break-all"
                >
                  {l.value}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 md:px-10 py-10 border-t border-rule text-sm text-muted">
        © {new Date().getFullYear()} Khushi Patel. Set in Fraunces and Krub.
      </footer>
    </div>
  );
}
