"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ViewPill from "../components/ViewPill";
import { projects, uxOrder, moreWork, githubUrl, roles, skills, links, Project } from "../data";

const ease = [0.22, 1, 0.36, 1] as const;

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const on = () => setD(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return d;
}

// ring that follows the mouse, grows over links
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32 });
  const sy = useSpring(y, { stiffness: 380, damping: 32 });
  const [big, setBig] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(!!(e.target as HTMLElement).closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!fine) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="fixed top-0 left-0 z-[100] pointer-events-none -ml-4 -mt-4"
    >
      <motion.div
        animate={{ scale: big ? 2.2 : 1 }}
        transition={{ duration: 0.25 }}
        className="w-8 h-8 rounded-full bg-coral/80 mix-blend-multiply"
      />
    </motion.div>
  );
}

// nudges its child toward the cursor
function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 });
  const sy = useSpring(y, { stiffness: 220, damping: 14 });
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

// numbered note that shows up in audit mode
function Pin({ n, note, audit, className }: { n: number; note: string; audit: boolean; className: string }) {
  return (
    <AnimatePresence>
      {audit && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: n * 0.07 }}
          className={`absolute z-40 group ${className}`}
        >
          <button
            type="button"
            aria-label={`Design note ${n}`}
            className="w-9 h-9 rounded-full bg-coral text-ink2 font-bold text-sm border-2 border-ink2 shadow-[3px_3px_0_#16110f]"
          >
            {n}
          </button>
          <span className="pointer-events-none absolute left-11 top-0 w-60 rounded-md bg-ink2 text-cream text-[13px] leading-snug p-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity shadow-xl">
            {note}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Marquee({ rev = false, className = "" }: { rev?: boolean; className?: string }) {
  const words = ["Research", "Audit", "Wireframe", "Prototype", "Build", "Ship"];
  const row = (k: string) => (
    <div key={k} className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={k + w} className="flex items-center">
          <span className="px-6 md:px-10">{w}</span>
          <span aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden whitespace-nowrap py-3 md:py-4 font-display italic text-3xl md:text-5xl ${className}`}>
      <div className={`marquee ${rev ? "rev" : ""}`}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

// little animated drawings for projects without a screenshot
function Art({ id }: { id: string }) {
  if (id === "neuro") {
    return (
      <svg viewBox="0 0 400 300" className="w-full max-h-[55vh]" role="img" aria-label="Soft rings pulsing outward, like momentum">
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx="200"
            cy="150"
            fill="none"
            stroke="#ff6b4a"
            strokeWidth="2"
            initial={{ r: 20, opacity: 0.9 }}
            animate={{ r: [20, 140], opacity: [0.9, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 1.25, ease: "easeOut" }}
          />
        ))}
        <circle cx="200" cy="150" r="14" fill="#f6efe4" />
      </svg>
    );
  }
  const pts = [
    [70, 150],
    [170, 70],
    [170, 230],
    [280, 110],
    [320, 200],
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [1, 2],
    [3, 4],
  ];
  return (
    <svg viewBox="0 0 400 300" className="w-full max-h-[55vh]" role="img" aria-label="Connected agents passing work to each other">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={pts[a][0]}
          y1={pts[a][1]}
          x2={pts[b][0]}
          y2={pts[b][1]}
          stroke="#f6efe4"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {pts.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="12"
          fill={i === 0 ? "#ff6b4a" : "#f6efe4"}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

function WorkPanel({ p, i, desktop }: { p: Project; i: number; desktop: boolean }) {
  return (
    <div
      className={`relative ${desktop ? "w-screen h-screen shrink-0" : "py-20"} flex items-center overflow-hidden`}
    >
      <span
        aria-hidden="true"
        className="absolute -left-6 md:left-6 -bottom-16 md:-bottom-24 font-display italic text-[16rem] md:text-[30rem] leading-none text-cream/[0.05] select-none"
      >
        0{i + 1}
      </span>
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-14 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <p className="font-display italic text-coral text-xl mb-3">0{i + 1}</p>
          <h3 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6">{p.title}</h3>
          <p className="text-cream/80 text-lg leading-relaxed mb-5">{p.line}</p>
          <p className="text-cream/50 text-sm mb-7">{p.stack}</p>
          <div className="flex flex-wrap gap-4 text-[15px]">
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-coral text-ink2 font-medium hover:bg-cream transition-colors"
              >
                Live demo
              </a>
            )}
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-cream/40 hover:bg-cream hover:text-ink2 transition-colors"
            >
              Code on GitHub
            </a>
          </div>
        </div>

        <div className="md:col-span-7">
          {p.image ? (
            <motion.div
              initial={{ rotate: -2.5, y: 30, opacity: 0 }}
              whileInView={{ rotate: -2.5, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease }}
              data-hover
              className="rounded-md border-2 border-cream/80 overflow-hidden shadow-[14px_14px_0_#ff6b4a]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.alt ?? p.title} loading="lazy" className="w-full block" />
            </motion.div>
          ) : (
            <Art id={p.id} />
          )}
        </div>
      </div>
    </div>
  );
}

function Work({ items, audit }: { items: Project[]; audit: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const n = items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((n - 1) / n) * 100}%`]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="work"
      ref={ref}
      className="relative bg-ink2 text-cream"
      style={desktop ? { height: `${n * 100}vh` } : undefined}
    >
      <Pin n={4} audit={audit} className="top-24 right-8" note="Projects scroll sideways one at a time, so each one gets the whole screen and you never compare them by accident." />
      <div className={desktop ? "sticky top-0 h-screen overflow-hidden" : ""}>
        {desktop && (
          <p className="absolute top-8 left-14 z-10 font-display italic text-cream/70 text-lg">Selected work</p>
        )}
        <motion.div
          style={desktop ? { x, width: `${n * 100}vw` } : undefined}
          className={desktop ? "flex h-full" : "flex flex-col"}
        >
          {items.map((p, i) => (
            <WorkPanel key={p.id} p={p} i={i} desktop={desktop} />
          ))}
        </motion.div>
        {desktop && (
          <div className="absolute bottom-8 left-14 right-14 h-[3px] bg-cream/15">
            <motion.div style={{ width: bar }} className="h-full bg-coral" />
          </div>
        )}
      </div>
    </section>
  );
}

function ExperienceRow({ r, open, onToggle }: { r: (typeof roles)[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-ink2/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        data-hover
        className="w-full text-left py-6 md:py-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 group"
      >
        <span className="font-display text-3xl md:text-5xl leading-tight tracking-tight group-hover:text-maroon group-hover:italic transition-all">
          {r.role}
        </span>
        <span className="text-sm text-ink2/60 flex items-center gap-3">
          {r.dates}
          <span className={`inline-block transition-transform ${open ? "rotate-45" : ""}`}>+</span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <p className="text-ink2/60 -mt-3 mb-4">{r.org}</p>
            <ul className="pb-8 space-y-2 list-disc pl-5 marker:text-coral max-w-3xl text-lg">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {r.caseStudy && (
              <p className="pb-8">
                <Link href="/case-studies/hirezapp" className="link">
                  Read the HireZapp case study
                </Link>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UxTemplate() {
  const [audit, setAudit] = useState(false);
  const [openRow, setOpenRow] = useState(0);
  const items = uxOrder.map((k) => projects[k]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useSpring(useTransform(mx, [-1, 1], [-26, 26]), { stiffness: 80, damping: 20 });
  const by = useSpring(useTransform(my, [-1, 1], [-26, 26]), { stiffness: 80, damping: 20 });
  const tx = useSpring(useTransform(mx, [-1, 1], [10, -10]), { stiffness: 80, damping: 20 });

  const word = "Khushi".split("");

  return (
    <div className="bg-cream text-ink2 min-h-screen overflow-x-clip">
      <Cursor />
      <ViewPill tone="ux" />

      <button
        type="button"
        onClick={() => setAudit((a) => !a)}
        aria-pressed={audit}
        className={`fixed bottom-4 left-4 z-[90] px-4 py-2.5 rounded-full text-sm font-medium border-2 border-ink2 shadow-[3px_3px_0_#16110f] transition-colors ${
          audit ? "bg-coral text-ink2" : "bg-cream text-ink2 hover:bg-mark"
        }`}
      >
        {audit ? "Audit mode: on" : "Audit this page"}
      </button>

      <section
        className="relative min-h-screen bg-maroon text-cream overflow-hidden flex flex-col justify-between"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
          my.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
      >
        <Pin n={1} audit={audit} className="top-[6.25rem] left-6 md:left-[31rem]" note="Name first, big. Someone skimming from across a table knows who this is in a second." />

        <div className="px-6 md:px-14 pt-24">
          <p className="text-sm tracking-[0.25em] uppercase text-cream/70">Software engineer, UX and product</p>
        </div>

        <div className="relative px-6 md:px-14">
          <motion.h1 style={{ x: tx }} className="font-display leading-[0.82] tracking-tight">
            <span className="block italic" style={{ fontSize: "clamp(6rem, 25vw, 23rem)" }}>
              {word.map((c, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "115%", rotate: 8 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease }}
                  >
                    {c}
                  </motion.span>
                </span>
              ))}
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(6rem, 25vw, 23rem)",
                WebkitTextStroke: "2px #f6efe4",
                color: "transparent",
              }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "40%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.7, ease }}
              >
                Patel
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            style={{ x: bx, y: by }}
            className="hidden md:block absolute right-14 top-0 w-44 h-44"
            aria-hidden="true"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full spin-slow">
              <defs>
                <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text fontSize="17" letterSpacing="3.5" fill="#f6efe4" className="font-display italic">
                <textPath href="#circ">SOFTWARE ✦ UX ✦ PRODUCT ✦ SOFTWARE ✦ UX ✦ PRODUCT ✦</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-4xl text-coral">✦</span>
          </motion.div>
        </div>

        <div className="px-6 md:px-14 pb-24 pt-8 flex flex-wrap items-end justify-between gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="font-display text-2xl md:text-4xl max-w-xl leading-snug"
          >
            I find the moment people get confused, then <em className="text-mark">fix it</em>.
          </motion.p>
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex gap-8 text-sm text-cream/80"
          >
            <div>
              <dt className="text-cream/50">Ontario Tech</dt>
              <dd className="text-xl font-display">GPA 4.06</dd>
            </div>
            <div>
              <dt className="text-cream/50">FAR AWAY 2026</dt>
              <dd className="text-xl font-display">Top 100 of 11,000+</dd>
            </div>
          </motion.dl>
        </div>
      </section>

      <div className="relative">
        <Pin n={2} audit={audit} className="top-3 left-6 md:left-14" note="A moving strip of my process. It says how I work before anyone reads a word." />
        <Marquee className="bg-coral text-ink2 -rotate-1 scale-105 relative z-10" />
        <Marquee rev className="bg-ink2 text-cream rotate-1 scale-105 -mt-4" />
      </div>

      <section className="relative px-6 md:px-14 py-28 md:py-40">
        <Pin n={3} audit={audit} className="top-10 right-8" note="Numbers do the talking here. They count up when you arrive, so your eye lands on them." />
        <div className="max-w-6xl mx-auto">
          <p className="font-display italic text-maroon text-xl mb-4">Case study</p>
          <h2 className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tight max-w-5xl">
            I audit things until they stop <em className="text-maroon">confusing people.</em>
          </h2>
          <p className="mt-8 text-xl max-w-2xl text-ink2/75">
            At HireZapp, an AI recruiting startup, I compared the product against its competitors, wrote down why
            each issue mattered, and redesigned the candidate communications hub. It shipped after CEO approval.
          </p>

          <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 border-t border-ink2/20 pt-10">
            {[
              { n: 15, s: "+", l: "pages audited" },
              { n: 20, s: "+", l: "competitors compared" },
              { n: 30, s: "+", l: "blog posts audited" },
              { n: 1, s: "", l: "redesign shipped to production" },
            ].map((s) => (
              <div key={s.l}>
                <dd className="font-display text-6xl md:text-8xl leading-none text-maroon">
                  <CountUp to={s.n} suffix={s.s} />
                </dd>
                <dt className="mt-2 text-ink2/70">{s.l}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-14">
            <Magnetic>
              <Link
                href="/case-studies/hirezapp"
                className="inline-block px-8 py-4 rounded-full bg-maroon text-cream text-lg hover:bg-ink2 transition-colors"
              >
                Read the case study
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      <Work items={items} audit={audit} />

      <section className="px-6 md:px-14 py-24 bg-cream">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-10">
            More <em className="text-maroon">on GitHub</em>
          </h2>
          <ul className="grid md:grid-cols-3 gap-5">
            {moreWork.map((m) => (
              <li key={m.title}>
                <a
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="block h-full rounded-md border-2 border-ink2 p-6 hover:-translate-y-1 hover:shadow-[6px_6px_0_#ff6b4a] transition-all"
                >
                  <h3 className="font-display text-2xl mb-2">{m.title}</h3>
                  <p className="text-ink2/75 mb-3">{m.line}</p>
                  <p className="text-sm text-ink2/50">{m.stack}</p>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            The rest is on{" "}
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="link">
              my GitHub
            </a>
            .
          </p>
        </div>
      </section>

      <section id="experience" className="relative px-6 md:px-14 py-24 md:py-32">
        <Pin n={5} audit={audit} className="top-10 right-8" note="Roles open one at a time. You get the headline first, the detail only if you want it." />
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl md:text-8xl tracking-tight mb-14">
            Where I&apos;ve <em className="text-maroon">worked</em>
          </h2>
          {roles.map((r, i) => (
            <ExperienceRow key={r.org + r.role} r={r} open={openRow === i} onToggle={() => setOpenRow(openRow === i ? -1 : i)} />
          ))}
          <div className="border-t border-ink2/20" />
        </div>
      </section>

      <section className="px-6 md:px-14 py-24 bg-mark/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-12">
            What I <em className="text-maroon">use</em>
          </h2>
          <dl className="space-y-8">
            {skills.map((g) => (
              <div key={g.label} className="grid md:grid-cols-12 gap-x-8 gap-y-1">
                <dt className="md:col-span-2 font-display italic text-maroon text-lg pt-1">{g.label}</dt>
                <dd className="md:col-span-10 font-display text-2xl md:text-4xl leading-snug">
                  {g.items.split(", ").map((s, i, arr) => (
                    <span key={s}>
                      <span className="hover:text-coral hover:italic transition-all cursor-default">{s}</span>
                      {i < arr.length - 1 && <span className="text-ink2/30">, </span>}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="relative bg-coral text-ink2 px-6 md:px-14 pt-24 pb-10 overflow-hidden">
        <Pin n={6} audit={audit} className="top-8 right-8" note="One clear next step: say hi. Everything else on this page leads here." />
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display italic leading-[0.85] tracking-tight" style={{ fontSize: "clamp(6rem, 22vw, 20rem)" }}>
            Say hi.
          </h2>
          <p className="mt-16 md:mt-24 text-xl md:text-2xl max-w-2xl">
            I&apos;m looking for a co-op from Winter 2027, Summer 2027 too. Happy to talk about product, UX, or
            whatever you&apos;re building.
          </p>
          <div className="mt-10">
            <Magnetic>
              <a
                href="mailto:khuship2708@gmail.com"
                className="inline-block px-8 py-4 rounded-full bg-ink2 text-cream text-lg hover:bg-maroon transition-colors"
              >
                khuship2708@gmail.com
              </a>
            </Magnetic>
          </div>
          <ul className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-2 max-w-xl">
            {links
              .filter((l) => l.label !== "Email")
              .map((l) => (
                <li key={l.label}>
                  <span className="text-ink2/60 mr-3">{l.label}</span>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link break-all">
                    {l.value}
                  </a>
                </li>
              ))}
          </ul>
          <p className="mt-16 pb-16 md:pl-44 text-sm text-ink2/60">
            © {new Date().getFullYear()} Khushi Patel. Set in Fraunces and Krub.
          </p>
        </div>
      </section>
    </div>
  );
}
