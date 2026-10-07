"use client";

import { useEffect, useRef, useState } from "react";
import CodeRain from "../components/CodeRain";
import ProjectVideo from "../components/ProjectVideo";
import ViewPill from "../components/ViewPill";
import { useView } from "../components/ViewContext";
import { projects, softwareOrder, moreWork, githubUrl, roles, skills, links } from "../data";

// syntax colours
const K = ({ children }: { children: React.ReactNode }) => <span className="text-[#d28bff]">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-[#b6ff5c]">{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span className="text-[#ff5c8a]">{children}</span>;
const N = ({ children }: { children: React.ReactNode }) => <span className="text-[#ffb454]">{children}</span>;
const C = ({ children }: { children: React.ReactNode }) => <span className="text-[#6f73a8] italic">{children}</span>;
const F = ({ children }: { children: React.ReactNode }) => <span className="text-[#8b9bff]">{children}</span>;

const tree = [
  { id: "about", file: "about.ts" },
  { id: "projects", file: "projects/" },
  { id: "experience", file: "experience.log" },
  { id: "stack", file: "stack.json" },
  { id: "contact", file: "contact.sh" },
];

const heroLines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "khushi, fourth-year software engineering @ Ontario Tech" },
  { prompt: true, text: "cat status.txt" },
  { prompt: false, text: "CMO @ TMSA. Open to Winter 2027 internships." },
];

function useTyped(total: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(total);
      return;
    }
    const id = setInterval(() => setN((c) => (c >= total ? c : c + 1)), 24);
    return () => clearInterval(id);
  }, [total]);
  return n;
}

function Panel({ id, file, children }: { id: string; file: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-14 border border-ed-line bg-ed-panel rounded-md overflow-hidden shadow-[0_0_44px_-18px_rgba(139,155,255,0.55)] hover:border-[#8b9bff]/50 transition-colors">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-ed-line bg-[#181838] text-xs text-ed-dim">
        <span className="w-2 h-2 rounded-full bg-[#3df5c8]" />
        <span className="text-ed-text">{file}</span>
      </div>
      <div className="p-5 md:p-7 text-[13.5px] md:text-sm leading-[1.7]">{children}</div>
    </section>
  );
}

type Out = { id: number; node: React.ReactNode };

export default function SoftwareTemplate() {
  const { setView } = useView();
  const total = heroLines.reduce((a, l) => a + l.text.length, 0);
  const typed = useTyped(total);
  const [input, setInput] = useState("");
  const [out, setOut] = useState<Out[]>([
    { id: 0, node: <span className="text-ed-dim">type help, or tap a command below</span> },
  ]);
  const idRef = useRef(1);
  const outRef = useRef<HTMLDivElement>(null);

  const a = "underline decoration-[#3df5c8] underline-offset-4 hover:text-[#3df5c8]";

  function run(raw: string) {
    const [cmd, ...rest] = raw.trim().toLowerCase().split(/\s+/);
    const arg = rest.join(" ");
    const lines: React.ReactNode[] = [];
    const add = (n: React.ReactNode) => lines.push(n);

    if (!cmd) return;
    if (cmd === "clear") {
      setOut([]);
      return;
    }
    if (cmd === "help") {
      add("commands: about, projects, experience, stack, contact, farsight, github, linkedin, ux, clear");
    } else if (cmd === "about") {
      add("Fourth-year software engineering student at Ontario Tech. I build full-stack apps, ML pipelines and multi-agent systems.");
      add("CMO at the Tech Management Student Association. Looking for Winter 2027 internships.");
    } else if (cmd === "projects") {
      softwareOrder.forEach((k) => add(`${projects[k].title}: ${projects[k].stack}`));
      add("type farsight for the live demo");
    } else if (cmd === "experience") {
      roles.forEach((r) => add(`${r.dates}  ${r.role}, ${r.org}`));
    } else if (cmd === "stack") {
      skills.forEach((s) => add(`${s.label}: ${s.items}`));
    } else if (cmd === "contact") {
      links.forEach((l) =>
        add(
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={a}>
            {l.label}: {l.value}
          </a>,
        ),
      );
    } else if (cmd === "farsight" || (cmd === "open" && arg === "farsight")) {
      add(
        <a href="https://farsight-fawn.vercel.app" target="_blank" rel="noopener noreferrer" className={a}>
          opening farsight-fawn.vercel.app
        </a>,
      );
    } else if (cmd === "github") {
      add(
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={a}>
          github.com/Khushi-Patel-code
        </a>,
      );
    } else if (cmd === "linkedin") {
      add(
        <a href="https://www.linkedin.com/in/khushipatel-dev" target="_blank" rel="noopener noreferrer" className={a}>
          linkedin.com/in/khushipatel-dev
        </a>,
      );
    } else if (cmd === "ux") {
      add("switching to the UX & product side...");
      setTimeout(() => setView("ux"), 500);
    } else {
      add(`command not found: ${cmd}. try help`);
    }

    setOut((o) => [
      ...o,
      { id: idRef.current++, node: <span className="text-[#b6ff5c]">$ {raw}</span> },
      ...lines.map((n) => ({ id: idRef.current++, node: n })),
    ]);
  }

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [out]);

  const chips = ["about", "projects", "experience", "stack", "contact", "farsight", "ux"];
  let left = typed;

  return (
    <div className="bg-ed-bg text-ed-text font-mono min-h-screen selection:bg-[#3df5c8]/30">
      <ViewPill tone="software" />

      <div className="flex items-center gap-2 px-4 h-11 border-b border-ed-line bg-[#0d0d22] text-xs text-ed-dim">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden sm:inline">khushi_patel ~/portfolio</span>
      </div>

      <header className="relative h-[500px] md:h-[580px] border-b border-ed-line overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <CodeRain />
        </div>
        <div className="absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-[#7c3aed]/25 blur-[110px]" />
        <div className="absolute -top-10 right-0 w-[30rem] h-[30rem] rounded-full bg-[#06b6d4]/20 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 w-[28rem] h-[18rem] rounded-full bg-[#ff2d95]/15 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ed-bg via-ed-bg/40 to-transparent" />
        <div className="relative h-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.05] bg-gradient-to-r from-[#3df5c8] via-[#8b9bff] to-[#ff5c8a] bg-clip-text text-transparent w-fit">
            Khushi Patel<span className="text-white">.</span>
          </h1>
          <p className="text-lg md:text-2xl text-ed-text mb-5 max-w-3xl leading-snug [text-shadow:0_0_16px_#0a0a14,0_0_5px_#0a0a14]" style={{ fontFamily: "var(--font-body)" }}>
            I like to solve the problem <span className="text-[#3df5c8]">inside the problem</span>.
          </p>
          <div className="text-sm md:text-base space-y-1 min-h-[7.5rem] [text-shadow:0_0_12px_#0a0a14]">
            {heroLines.map((l, i) => {
              const take = Math.max(0, Math.min(l.text.length, left));
              left -= l.text.length;
              if (take === 0 && typed < total) return null;
              const done = take === l.text.length;
              return (
                <div key={i} className={l.prompt ? "text-[#b6ff5c]" : "text-ed-text"}>
                  {l.prompt && <span className="text-ed-dim">$ </span>}
                  {l.text.slice(0, take)}
                  {!done && <span className="caret">_</span>}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid md:grid-cols-[200px_1fr] gap-8">
        <aside className="hidden md:block">
          <nav className="sticky top-16 text-sm">
            <p className="text-[11px] tracking-widest text-ed-dim mb-3">EXPLORER</p>
            <ul className="space-y-1.5">
              {tree.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-ed-text/80 hover:text-[#3df5c8]">
                    <span className="text-ed-dim mr-2">{t.file.endsWith("/") ? ">" : "-"}</span>
                    {t.file}
                  </a>
                </li>
              ))}
              <li>
                <a href="#terminal" className="text-ed-text/80 hover:text-[#3df5c8]">
                  <span className="text-ed-dim mr-2">-</span>terminal
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="space-y-8 min-w-0">
          <section id="terminal" className="scroll-mt-14 border border-ed-line bg-[#07070f] rounded-md overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-ed-line text-xs text-ed-dim">terminal</div>
            <div ref={outRef} className="px-5 pt-4 h-44 overflow-y-auto text-sm space-y-1">
              {out.map((o) => (
                <div key={o.id}>{o.node}</div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
              className="flex items-center gap-2 px-5 py-3 border-t border-ed-line"
            >
              <span className="text-[#b6ff5c]">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="terminal command"
                placeholder="try: projects"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent outline-none text-ed-text placeholder:text-ed-dim"
              />
            </form>
            <div className="flex flex-wrap gap-2 px-5 pb-4">
              {chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => run(c)}
                  className="text-xs border border-ed-line px-2.5 py-1 rounded text-ed-dim hover:text-[#3df5c8] hover:border-[#3df5c8]/60"
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          <Panel id="about" file="about.ts">
            <ol className="code">
              <li><C>{"// about me"}</C></li>
              <li><span><K>const</K> <F>khushi</F> = {"{"}</span></li>
              <li><span>{"  "}<P>role</P>: <S>&quot;Software engineer (student)&quot;</S>,</span></li>
              <li><span>{"  "}<P>school</P>: <S>&quot;Ontario Tech University, B.Eng. Software Engineering&quot;</S>,</span></li>
              <li><span>{"  "}<P>gpa</P>: <S>&quot;4.06 / 4.30&quot;</S>,</span></li>
              <li><span>{"  "}<P>graduating</P>: <S>&quot;June 2028&quot;</S>,</span></li>
              <li><span>{"  "}<P>languages</P>: [<S>&quot;JavaScript&quot;</S>, <S>&quot;TypeScript&quot;</S>, <S>&quot;Python&quot;</S>, <S>&quot;Java&quot;</S>, <S>&quot;C++&quot;</S>],</span></li>
              <li><span>{"  "}<P>recent</P>: <S>&quot;Top 100 of 11,000+ at FAR AWAY 2026&quot;</S>,</span></li>
              <li><span>{"  "}<P>also</P>: <S>&quot;Top 10 across Canada, TECHNATION AI Equity Data Challenge&quot;</S>,</span></li>
              <li><span>{"  "}<P>leads</P>: <S>&quot;CMO, Tech Management Student Association&quot;</S>,</span></li>
              <li><span>{"  "}<P>lookingFor</P>: <S>&quot;co-op from Winter 2027 (Summer 2027 too)&quot;</S>,</span></li>
              <li>{"};"}</li>
            </ol>
          </Panel>

          <section id="projects" className="scroll-mt-14 space-y-8">
            {softwareOrder.map((k, i) => {
              const p = projects[k];
              return (
                <Panel key={p.id} id={`p-${p.id}`} file={`projects/${p.id}.tsx`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      <span className="text-[#3df5c8] mr-2">0{i + 1}</span>
                      {p.title}
                    </h3>
                    <span className="flex gap-5 text-xs">
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" className={a}>
                          live demo
                        </a>
                      )}
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className={a}>
                        source
                      </a>
                    </span>
                  </div>
                  <p className="text-ed-text/90 max-w-2xl mb-4 font-sans text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {p.line}
                  </p>
                  <p className="text-xs">
                    <P>stack</P>: [{p.stack.split(", ").map((s, j, arr) => (
                      <span key={s}>
                        <S>&quot;{s}&quot;</S>
                        {j < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}]
                  </p>
                  {p.id === "farsight" && (
                    <p className="mt-4 text-xs flex flex-wrap items-center gap-2">
                      <C>{"// decision loop"}</C>
                      {["observe", "predict", "reason", "recommend", "act"].map((s, j, arr) => (
                        <span key={s} className="flex items-center gap-2">
                          <span className="border border-ed-line px-2 py-0.5 rounded text-[#8b9bff]">{s}</span>
                          {j < arr.length - 1 && <span className="text-ed-dim">&gt;</span>}
                        </span>
                      ))}
                    </p>
                  )}
                  {p.clips ? (
                    <div className="mt-5 text-ed-text">
                      <ProjectVideo clips={p.clips} title={p.title} className="rounded border border-ed-line" />
                    </div>
                  ) : (
                    p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.alt ?? p.title} loading="lazy" className="mt-5 w-full rounded border border-ed-line" />
                    )
                  )}
                </Panel>
              );
            })}

            <Panel id="more" file="projects/more.md">
              <p className="text-ed-dim text-xs mb-3">more on github</p>
              <ul className="space-y-3">
                {moreWork.map((m) => (
                  <li key={m.title} style={{ fontFamily: "var(--font-body)" }} className="text-[15px]">
                    <a href={m.github} target="_blank" rel="noopener noreferrer" className={`${a} font-medium text-white`}>
                      {m.title}
                    </a>
                    <span className="text-ed-text/80">. {m.line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs">
                the rest is on{" "}
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={a}>
                  github.com/Khushi-Patel-code
                </a>
              </p>
            </Panel>
          </section>

          <Panel id="experience" file="experience.log">
            <div className="space-y-8">
              {roles.map((r) => (
                <div key={r.org + r.role}>
                  <p className="text-xs text-ed-dim">
                    <span className="text-[#3df5c8]">*</span> {r.dates}
                  </p>
                  <h3 className="text-base md:text-lg font-bold text-white mt-1">{r.role}</h3>
                  <p className="text-ed-dim text-xs mb-3">{r.org}</p>
                  <ul className="space-y-2" style={{ fontFamily: "var(--font-body)" }}>
                    {r.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] text-ed-text/90 leading-relaxed">
                        <span className="text-[#b6ff5c] shrink-0">+</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>

          <Panel id="stack" file="stack.json">
            <ol className="code">
              <li>{"{"}</li>
              {skills.map((g, i) => (
                <li key={g.label}>
                  <span>
                    {"  "}
                    <P>&quot;{g.label.toLowerCase()}&quot;</P>: <S>&quot;{g.items}&quot;</S>
                    {i < skills.length - 1 ? "," : ""}
                  </span>
                </li>
              ))}
              <li>{"}"}</li>
            </ol>
          </Panel>

          <Panel id="contact" file="contact.sh">
            <p className="mb-4" style={{ fontFamily: "var(--font-body)" }}>
              I&apos;m looking for a co-op from Winter 2027, Summer 2027 too. Happy to talk about what you&apos;re
              building.
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <span className="text-ed-dim">{l.label.toLowerCase()}</span>{" "}
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`${a} break-all`}
                  >
                    {l.value}
                  </a>
                </li>
              ))}
            </ul>
          </Panel>

          <footer className="text-xs text-ed-dim pb-6">
            © {new Date().getFullYear()} Khushi Patel. Set in JetBrains Mono.
          </footer>
        </main>
      </div>
    </div>
  );
}
