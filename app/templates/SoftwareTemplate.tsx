"use client";

import ViewSwitch from "../components/ViewSwitch";
import {
  projects,
  softwareOrder,
  moreWork,
  githubUrl,
  roles,
  skills,
  links,
  Project,
} from "../data";

const index = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "stack", label: "stack" },
  { id: "contact", label: "contact" },
];

const spec = [
  ["school", "Ontario Tech University, B.Eng. Software Engineering (Honours)"],
  ["gpa", "4.06 / 4.30"],
  ["graduating", "June 2028"],
  ["languages", "JavaScript, TypeScript, Python, Java, C++"],
  ["recent", "Top 100 of 11,000+ at FAR AWAY 2026"],
  ["also", "Top 10 across Canada, TECHNATION AI Equity Data Challenge"],
  ["looking for", "co-op from Winter 2027 (Summer 2027 too)"],
];

const loop = ["observe", "predict", "reason", "recommend", "act"];

function SectionTitle({ n, id, children }: { n: string; id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-mono text-sm text-sw-dim mb-8 flex items-center gap-3">
      <span className="text-maroon">{n}</span>
      <span className="uppercase tracking-widest">{children}</span>
      <span className="flex-1 h-px bg-sw-line" />
    </h2>
  );
}

function ProjectBlock({ p, n }: { p: Project; n: number }) {
  const isFarsight = p.id === "farsight";
  return (
    <article className="border border-sw-line bg-white/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sw-line px-5 py-3 font-mono text-sm">
        <span>
          <span className="text-maroon">0{n}</span> <span className="font-bold">{p.id}</span>
        </span>
        <span className="flex gap-5 text-[13px]">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-maroon hover:text-maroon">
              live demo
            </a>
          )}
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-maroon hover:text-maroon">
            source
          </a>
        </span>
      </div>

      {p.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={p.alt ?? p.title} loading="lazy" className="w-full block border-b border-sw-line" />
      )}

      <div className="p-5 md:p-7">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{p.title}</h3>
        <p className="text-sw-ink/85 max-w-2xl mb-5">{p.line}</p>
        <p className="font-mono text-[13px] text-sw-dim">stack: {p.stack}</p>

        {isFarsight && (
          <div className="mt-7 pt-6 border-t border-sw-line">
            <p className="font-mono text-[13px] text-sw-dim mb-3">the loop the operator dashboard walks through</p>
            <ol className="flex flex-wrap items-center gap-2 font-mono text-sm">
              {loop.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="border border-sw-ink px-3 py-1.5 bg-sw-bg">
                    <span className="text-maroon mr-2">{i + 1}</span>
                    {s}
                  </span>
                  {i < loop.length - 1 && <span className="text-sw-dim">→</span>}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </article>
  );
}

export default function SoftwareTemplate() {
  const list = softwareOrder.map((k) => projects[k]);

  return (
    <div className="bg-sw-bg text-sw-ink min-h-screen">
      <header className="sticky top-0 z-50 bg-sw-bg/95 backdrop-blur border-b border-sw-line">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4">
          <span className="font-mono font-bold tracking-tight">khushi_patel</span>
          <ViewSwitch variant="software" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-[170px_1fr] gap-x-14">
        <aside className="hidden md:block">
          <nav className="sticky top-24 pt-24 font-mono text-sm flex flex-col gap-2">
            {index.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="text-sw-dim hover:text-sw-ink">
                <span className="text-maroon mr-2">0{i + 1}</span>
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="py-16 md:py-24 space-y-28 min-w-0">
          <section id="about" className="scroll-mt-24">
            <p className="font-mono text-sm text-maroon mb-5">software engineer</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02] mb-6">
              Khushi Patel
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl text-sw-ink/90 mb-12">
              I build full-stack and multi-agent systems, and I care a lot about what it&apos;s like to use the
              thing once it&apos;s built.
            </p>

            <dl className="border border-sw-line bg-white/40 font-mono text-sm">
              {spec.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] md:grid-cols-[150px_1fr] border-b border-sw-line last:border-0">
                  <dt className="px-4 py-2.5 text-sw-dim border-r border-sw-line">{k}</dt>
                  <dd className="px-4 py-2.5">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <SectionTitle n="02" id="projects">projects</SectionTitle>
            <div className="space-y-8">
              {list.map((p, i) => (
                <ProjectBlock key={p.id} p={p} n={i + 1} />
              ))}
            </div>

            <h3 className="font-mono text-sm text-sw-dim mt-14 mb-4">more on github</h3>
            <ul className="border border-sw-line bg-white/40">
              {moreWork.map((m) => (
                <li key={m.title} className="grid md:grid-cols-[220px_1fr_auto] gap-x-6 gap-y-1 px-5 py-4 border-b border-sw-line last:border-0">
                  <span className="font-semibold">{m.title}</span>
                  <span className="text-sw-ink/80 text-[15px]">{m.line}</span>
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] underline underline-offset-4 decoration-maroon hover:text-maroon"
                  >
                    source
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px]">
              The rest is on{" "}
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-maroon hover:text-maroon">
                my GitHub
              </a>
              .
            </p>
          </section>

          <section>
            <SectionTitle n="03" id="experience">experience</SectionTitle>
            <div className="space-y-10">
              {roles.map((r) => (
                <div key={r.org + r.role} className="grid md:grid-cols-[150px_1fr] gap-x-8 gap-y-1">
                  <p className="font-mono text-[13px] text-sw-dim pt-1">{r.dates}</p>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug">{r.role}</h3>
                    <p className="text-sw-dim mb-3">{r.org}</p>
                    <ul className="space-y-2 list-disc pl-5 marker:text-maroon text-sw-ink/85">
                      {r.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle n="04" id="stack">stack</SectionTitle>
            <dl className="border border-sw-line bg-white/40 text-[15px]">
              {skills.map((g) => (
                <div key={g.label} className="grid md:grid-cols-[150px_1fr] border-b border-sw-line last:border-0">
                  <dt className="font-mono text-sm text-sw-dim px-4 py-3 md:border-r border-sw-line">{g.label}</dt>
                  <dd className="px-4 pb-3 md:py-3">{g.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <SectionTitle n="05" id="contact">contact</SectionTitle>
            <p className="text-xl max-w-xl mb-8">
              I&apos;m looking for a co-op from Winter 2027, Summer 2027 too. Happy to talk about what
              you&apos;re building.
            </p>
            <ul className="font-mono text-sm space-y-2">
              {links.map((l) => (
                <li key={l.label} className="grid grid-cols-[90px_1fr] gap-x-4">
                  <span className="text-sw-dim">{l.label}</span>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-maroon hover:text-maroon break-all"
                  >
                    {l.value}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>

      <footer className="max-w-6xl mx-auto px-6 md:px-10 py-10 border-t border-sw-line font-mono text-xs text-sw-dim">
        © {new Date().getFullYear()} Khushi Patel
      </footer>
    </div>
  );
}
