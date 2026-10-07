"use client";

import { caseStudies } from "../case-studies/data";
import DesignCanvas from "../components/DesignCanvas";
import ProjectVideo from "../components/ProjectVideo";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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

// what each section is built from, shown in the Figma-style panel as you scroll
const specs: Record<string, { name: string; type: [string, string][]; colours: [string, string][]; note: string; flow: [string, string][] }> = {
  hero: {
    name: "Hero",
    flow: [["Mouse move", "Smart animate, canvas follows the cursor"], ["On load", "Name types in, surname outlines"], ["Click toggle", "Open design details"]],
    type: [["Fraunces Italic", "name, 15vw"], ["Fraunces", "tagline, 30px"], ["Krub", "labels, caps"]],
    colours: [["Maroon", "#52003a"], ["Cream", "#f6efe4"], ["Coral", "#ff6b4a"], ["Highlight", "#f0d08c"]],
    note: "Outlined surname is a 2px text stroke. The board on the right is drawn live on a canvas.",
  },
  ticker: {
    name: "Ticker",
    flow: [["While loading", "Marquee, linear, 28s, loops"], ["Row 2", "Same loop, reversed"]],
    type: [["Fraunces Italic", "48px"]],
    colours: [["Coral", "#ff6b4a"], ["Ink", "#16110f"], ["Cream", "#f6efe4"]],
    note: "Two marquees tilted 1 degree each way, running opposite directions.",
  },
  work: {
    name: "Selected work",
    flow: [["While scrolling", "Pinned. Page scroll moves the row sideways"], ["Hover card", "Video plays, tabs switch clips"]],
    type: [["Fraunces", "project titles"], ["Krub", "body, 18px"]],
    colours: [["Ink", "#16110f"], ["Cream", "#f6efe4"], ["Coral", "#ff6b4a"]],
    note: "Pinned horizontal scroll. One project per screen, driven by scroll position.",
  },
  experience: {
    name: "Experience",
    flow: [["Click row", "Open, grid rows 0fr to 1fr, 500ms"], ["Click again", "Close"], ["Hover title", "Italic, maroon"]],
    type: [["Fraunces", "role, 48px"], ["Krub", "dates, 14px at 60% ink"]],
    colours: [["Ink", "#16110f"], ["Maroon", "#52003a"], ["Coral", "#ff6b4a"]],
    note: "Accordion rows. The open row animates its height with a grid track, not a fixed pixel value.",
  },
  cases: {
    name: "Case studies",
    flow: [["Click card", "Navigate to the write-up"], ["Hover", "Card lifts, arrow slides"]],
    type: [["Fraunces", "titles"], ["Krub", "body"]],
    colours: [["Ink", "#16110f"], ["Cream", "#f6efe4"], ["Maroon", "#52003a"]],
    note: "Every card uses one 16:9 frame, so a video and a text-only study sit side by side evenly.",
  },
  more: {
    name: "More on GitHub",
    flow: [["Click title", "Open the repo on GitHub"]],
    type: [["Fraunces", "heading"], ["Krub", "body"]],
    colours: [["Cream", "#f6efe4"], ["Maroon", "#52003a"], ["Ink", "#16110f"]],
    note: "Smaller projects as a short list, so the big four keep the attention.",
  },
  skills: {
    name: "Skills",
    flow: [["On scroll", "Groups fade up, 60ms apart"]],
    type: [["Fraunces", "heading"], ["Krub", "lists"]],
    colours: [["Highlight", "#f0d08c"], ["Maroon", "#52003a"], ["Ink", "#16110f"]],
    note: "Plain grouped lists. No bars or percentages, because those are made up.",
  },
  contact: {
    name: "Contact",
    flow: [["Hover email", "Button follows the cursor, magnetic"], ["Click", "Opens your mail app"]],
    type: [["Fraunces Italic", "22vw"]],
    colours: [["Coral", "#ff6b4a"], ["Ink", "#16110f"]],
    note: "One action: email.",
  },
};

const figmaBlue = "#0d99ff";

// blue selection frame that draws itself around a section as it scrolls into view
function SpecFrame({ id, audit, current, onDims }: { id: string; audit: boolean; current: string; onDims: (id: string, d: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState("");
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!audit || !ref.current) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.02 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [audit]);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!audit || !el) return;
    const set = () => {
      const d = `${Math.round(el.offsetWidth)} × ${Math.round(el.offsetHeight)}`;
      setDims(d);
      onDims(id, d);
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [audit, id, onDims]);
  const handle = "absolute w-2.5 h-2.5 bg-white border-2 rounded-[2px]";
  return (
    <div ref={ref} aria-hidden="true" data-spec={id} className="pointer-events-none absolute inset-0 z-[60]">
      <AnimatePresence>
        {audit && (
          <motion.div
            initial={{ clipPath: "inset(0 100% 100% 0)", opacity: 0 }}
            animate={seen ? { clipPath: "inset(0 0% 0% 0)", opacity: 1 } : { clipPath: "inset(0 100% 100% 0)", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
            className="absolute inset-0"
            style={{ boxShadow: `inset 0 0 0 2px ${figmaBlue}`, background: current === id ? "rgba(13,153,255,.05)" : "transparent" }}
          >
            <span className="absolute left-0 top-0 font-mono text-[11px] text-white px-2 py-0.5" style={{ background: figmaBlue }}>
              {specs[id].name}
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 bottom-2 font-mono text-[11px] text-white px-2 py-0.5 rounded" style={{ background: figmaBlue }}>
              {dims}
            </span>
            {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((c) => (
              <i key={c} className={`${handle} ${c}`} style={{ borderColor: figmaBlue }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// the right-hand panel from Figma, rewritten for whichever section is in the middle of the screen
function Inspector({ open, current, dims }: { open: boolean; current: string; dims: Record<string, string> }) {
  const [tab, setTab] = useState<"design" | "prototype">("design");
  const sp = specs[current] ?? specs.hero;
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.35, ease }}
          className="fixed right-4 bottom-4 z-[90] w-[16.5rem] rounded-lg bg-[#2c2c2c] text-white shadow-2xl border border-white/10 font-mono text-[12px] overflow-hidden"
        >
          <div className="flex gap-4 px-4 pt-3 pb-2 border-b border-white/10 text-white/50">
            {(["design", "prototype"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                className={`capitalize pb-1 border-b-2 transition-colors ${tab === t ? "text-white" : "text-white/50 border-transparent hover:text-white/80"}`}
                style={tab === t ? { borderColor: figmaBlue } : undefined}
              >
                {t}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current + tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="p-4 space-y-4"
            >
              {tab === "design" ? (
                <>
              <div>
                <p className="text-white text-[13px]">{sp.name}</p>
                <p className="text-white/50">Frame {dims[current] ?? ""}</p>
              </div>
              <div>
                <p className="text-white/45 tracking-widest mb-1.5">TEXT</p>
                {sp.type.map(([f, u]) => (
                  <p key={f} className="flex justify-between gap-3">
                    <span>{f}</span>
                    <span className="text-white/50 text-right">{u}</span>
                  </p>
                ))}
              </div>
              <div>
                <p className="text-white/45 tracking-widest mb-1.5">FILL</p>
                <ul className="space-y-1">
                  {sp.colours.map(([n, h]) => (
                    <li key={h} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-[3px] border border-white/30" style={{ background: h }} />
                      <span>{n}</span>
                      <span className="ml-auto text-white/55">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
                </>
              ) : (
                <>
              <div>
                <p className="text-white text-[13px]">{sp.name}</p>
                <p className="text-white/50">Interactions</p>
              </div>
              <ul className="space-y-2.5">
                {sp.flow.map(([trig, act]) => (
                  <li key={trig} className="rounded bg-white/5 px-2.5 py-2">
                    <span style={{ color: figmaBlue }}>{trig}</span>
                    <span className="text-white/40"> → </span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
                </>
              )}
              <p className="text-white/60 leading-snug font-sans text-[12.5px]">{sp.note}</p>
            </motion.div>
          </AnimatePresence>
        </motion.aside>
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
          {p.clips ? (
            <motion.div
              initial={{ rotate: -2.5, y: 30, opacity: 0 }}
              whileInView={{ rotate: -2.5, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease }}
              data-hover
              className="rounded-md border-2 border-cream/80 overflow-hidden shadow-[14px_14px_0_#ff6b4a]"
            >
              <ProjectVideo clips={p.clips} title={p.title} tabsClass="px-3 pt-3 text-cream" />
            </motion.div>
          ) : p.image ? (
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

function Work({ items, audit, current, onDims }: { items: Project[]; audit: boolean; current: string; onDims: (id: string, d: string) => void }) {
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
      <SpecFrame id="work" audit={audit} current={current} onDims={onDims} />
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
      <div
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,.8,.2,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div className="overflow-hidden min-h-0">
          <p className="text-ink2/60 pt-1 mb-4">{r.org}</p>
          <ul className="pb-8 space-y-2 list-disc pl-5 marker:text-coral max-w-3xl text-lg">
            {r.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {r.caseStudy && (
            <p className="pb-8">
              <Link href="/case-studies/hirezapp" className="link" tabIndex={open ? 0 : -1}>
                Read the HireZapp case study
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UxTemplate() {
  const [audit, setAudit] = useState(false);
  const [openRow, setOpenRow] = useState(0);
  const [current, setCurrent] = useState("hero");
  const [dims, setDims] = useState<Record<string, string>>({});
  const onDims = useCallback((id: string, d: string) => setDims((p) => (p[id] === d ? p : { ...p, [id]: d })), []);
  // whichever frame crosses the middle of the screen drives the side panel
  useEffect(() => {
    if (!audit) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCurrent((e.target as HTMLElement).dataset.spec || "hero")),
      { rootMargin: "-48% 0px -48% 0px" }
    );
    document.querySelectorAll("[data-spec]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [audit]);
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
        {audit ? "Hide design details" : "Show design details"}
      </button>

      <Inspector open={audit} current={current} dims={dims} />

      <section
        className="relative min-h-screen bg-maroon text-cream overflow-hidden flex flex-col justify-between"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
          my.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
      >
        <SpecFrame id="hero" audit={audit} current={current} onDims={onDims} />
        <div className="absolute inset-y-0 right-0 left-0 md:left-[47%] pointer-events-none opacity-40 md:opacity-100">
          <DesignCanvas />
        </div>

        <div className="relative px-6 md:px-14 pt-24">
          <p className="text-sm md:text-base tracking-[0.2em] uppercase text-cream/80">Chief Marketing Officer, TMSA <span className="text-coral">/</span> software <span className="text-coral">/</span> UX <span className="text-coral">/</span> product</p>
        </div>

        <div className="relative px-6 md:px-14">
          <motion.h1 style={{ x: tx }} className="font-display leading-[0.82] tracking-tight">
            <span className="block italic" style={{ fontSize: "clamp(5.5rem, 15vw, 15rem)" }}>
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
                fontSize: "clamp(5.5rem, 15vw, 15rem)",
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
            className="hidden md:block absolute left-[30rem] bottom-2 w-36 h-36"
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

        <div className="relative px-6 md:px-14 pb-28 md:pb-32 pt-8 flex flex-wrap items-end justify-between gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="font-display text-2xl md:text-4xl max-w-xl leading-snug"
          >
            What if you&apos;re solving the <em className="text-mark">wrong</em> problem?
          </motion.p>
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex gap-8 text-sm text-cream/80"
          >
            <div>
              <dt className="text-cream/50">Leading</dt>
              <dd className="text-xl font-display">TMSA, Ontario Tech</dd>
            </div>
            <div>
              <dt className="text-cream/50">Looking for</dt>
              <dd className="text-xl font-display">Winter 2027 internships</dd>
            </div>
          </motion.dl>
        </div>
      </section>

      <div className="relative">
        <SpecFrame id="ticker" audit={audit} current={current} onDims={onDims} />
        <Marquee className="bg-coral text-ink2 -rotate-1 scale-105 relative z-10" />
        <Marquee rev className="bg-ink2 text-cream rotate-1 scale-105 -mt-4" />
      </div>

      <section id="case-studies" className="relative px-6 md:px-14 py-24 md:py-32">
        <SpecFrame id="cases" audit={audit} current={current} onDims={onDims} />
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl md:text-8xl tracking-tight mb-6">
            Case <em className="text-maroon">studies</em>
          </h2>
          <p className="text-xl max-w-2xl text-ink2/75">
            Two from my HireZapp internship and one from school. Each one is short: the problem, what I did,
            how I worked, and what came out of it.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {caseStudies.map((c, i) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                data-hover
                className="group block rounded-md border-2 border-ink2 overflow-hidden hover:-translate-y-1 hover:shadow-[8px_8px_0_#ff6b4a] transition-all bg-paper"
              >
                <div className="aspect-video bg-maroon text-cream flex items-center justify-center overflow-hidden">
                  {c.video ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.video.poster} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <span className="font-display italic text-6xl">Aa</span>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-display italic text-maroon mb-1">0{i + 1}{c.video ? " / video inside" : ""}</p>
                  <h3 className="font-display text-xl leading-snug mb-2">{c.title}</h3>
                  <p className="text-sm text-ink2/70">{c.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Work items={items} audit={audit} current={current} onDims={onDims} />


      <section className="relative px-6 md:px-14 py-24 bg-cream">
        <SpecFrame id="more" audit={audit} current={current} onDims={onDims} />
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
        <SpecFrame id="experience" audit={audit} current={current} onDims={onDims} />
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

      <section className="relative px-6 md:px-14 py-24 bg-mark/40">
        <SpecFrame id="skills" audit={audit} current={current} onDims={onDims} />
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
        <SpecFrame id="contact" audit={audit} current={current} onDims={onDims} />
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
          <ul className="mt-12 flex flex-wrap gap-4">
            {links
              .filter((l) => l.label !== "Email")
              .map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l.label}
                    className="group flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full border-2 border-ink2 hover:bg-ink2 hover:text-cream transition-colors"
                  >
                    <span className="w-9 h-9 rounded-full bg-ink2 text-cream group-hover:bg-coral group-hover:text-ink2 grid place-items-center transition-colors">
                      {l.label === "LinkedIn" ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" /></svg>
                      )}
                    </span>
                    <span className="text-base">{l.label}</span>
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
