"use client";

import Link from "next/link";
import Reveal from "../components/Reveal";
import ViewSwitch from "../components/ViewSwitch";
import { useView } from "../components/ViewContext";
import {
  projects,
  uxOrder,
  softwareOrder,
  moreWork,
  githubUrl,
  roles,
  skills,
  links,
} from "../data";

const years: Record<string, string> = {
  farsight: "2026",
  neuro: "2026",
  ecom: "2025",
  coach: "2025",
};

const A = "link";

export default function MinimalTemplate() {
  const { view } = useView();
  const ux = view === "ux";
  const order = (ux ? uxOrder : softwareOrder).map((k) => projects[k]);

  // soft fade-up in the UX view, plain in the software view
  const F = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) =>
    ux ? <Reveal delay={delay}>{children}</Reveal> : <div>{children}</div>;

  return (
    <div className="bg-paper text-ink min-h-screen">
      <div className="max-w-2xl mx-auto px-6 pt-16 md:pt-24 pb-24">
        <header className={`text-center ${ux ? "rise" : ""}`}>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight">Khushi Patel</h1>

          {ux ? (
            <p className="mt-6 text-lg leading-relaxed text-ink/90">
              Software engineering student at Ontario Tech who likes the moment a product confuses someone,
              because then you get to find out why and <span className="mark">fix it</span>. I did UX and
              product work at HireZapp, built Farsight (top 100 of 11,000+ at FAR AWAY 2026), and I&apos;m
              looking for a co-op from Winter 2027.
            </p>
          ) : (
            <p className="mt-6 text-lg leading-relaxed text-ink/90">
              Software engineering student at Ontario Tech. I build full-stack and multi-agent systems, and I
              care a lot about what it&apos;s like to use the thing once it&apos;s built. Top 100 of 11,000+ at
              FAR AWAY 2026, CMO of the Tech Management Student Association, and looking for a co-op from
              Winter 2027.
            </p>
          )}

          <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
            <a href="#projects" className={A}>Projects</a>
            <a href="#experience" className={A}>Experience</a>
            <a href="#stack" className={A}>Stack</a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={A}>GitHub</a>
            <a href="https://www.linkedin.com/in/khushipatel-dev" target="_blank" rel="noopener noreferrer" className={A}>LinkedIn</a>
            <a href="mailto:khuship2708@gmail.com" className={A}>Email</a>
          </nav>

          <div className="mt-6">
            <ViewSwitch />
          </div>
        </header>

        <section id="projects" className="mt-20 md:mt-28">
          <h2 className="font-display text-2xl mb-8 pb-3 border-b border-rule">Projects</h2>

          <ol className="space-y-12">
            {ux && (
              <li>
                <F>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold">
                      <Link href="/case-studies/hirezapp" className={A}>
                        HireZapp UX audit
                      </Link>
                    </h3>
                    <span className="text-sm text-muted shrink-0">2026</span>
                  </div>
                  <p className="mt-2 text-ink/85">
                    I audited 15+ pages against 20+ competitors, then redesigned the candidate communications hub.
                    It shipped to production after CEO approval.
                  </p>
                  <p className="mt-2 text-[15px]">
                    <Link href="/case-studies/hirezapp" className={A}>Read the case study</Link>
                  </p>
                </F>
              </li>
            )}

            {order.map((p) => (
              <li key={p.id}>
                <F>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold">
                      <a href={p.demo ?? p.github} target="_blank" rel="noopener noreferrer" className={A}>
                        {p.title}
                      </a>
                    </h3>
                    <span className="text-sm text-muted shrink-0">{years[p.id]}</span>
                  </div>
                  <p className="mt-2 text-ink/85">{p.line}</p>
                  <p className="mt-2 text-sm text-muted">{p.stack}</p>
                  <p className="mt-2 flex gap-5 text-[15px]">
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className={A}>Live demo</a>
                    )}
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className={A}>Code</a>
                  </p>
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.alt ?? p.title}
                      loading="lazy"
                      className={`mt-5 w-full rounded-sm border border-rule ${ux ? "transition-transform duration-500 hover:-translate-y-1" : ""}`}
                    />
                  )}
                </F>
              </li>
            ))}
          </ol>

          <F>
            <h3 className="mt-16 mb-4 font-semibold">More on GitHub</h3>
            <ul className="space-y-3">
              {moreWork.map((m) => (
                <li key={m.title}>
                  <a href={m.github} target="_blank" rel="noopener noreferrer" className={A}>{m.title}</a>
                  <span className="text-ink/80">. {m.line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px]">
              Everything else is on{" "}
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={A}>my GitHub</a>.
            </p>
          </F>
        </section>

        <section id="experience" className="mt-24">
          <h2 className="font-display text-2xl mb-8 pb-3 border-b border-rule">Experience</h2>
          <div className="space-y-10">
            {roles.map((r) => (
              <F key={r.org + r.role}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold leading-snug">{r.role}</h3>
                  <span className="text-sm text-muted shrink-0 text-right">{r.dates}</span>
                </div>
                <p className="text-muted mb-3">{r.org}</p>
                <ul className="space-y-2 list-disc pl-5 marker:text-maroon text-ink/85">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {ux && r.caseStudy && (
                  <p className="mt-3 text-[15px]">
                    <Link href="/case-studies/hirezapp" className={A}>Read the HireZapp case study</Link>
                  </p>
                )}
              </F>
            ))}
          </div>
        </section>

        <section id="stack" className="mt-24">
          <h2 className="font-display text-2xl mb-8 pb-3 border-b border-rule">Stack</h2>
          <dl className="space-y-3">
            {skills.map((g) => (
              <div key={g.label} className="grid grid-cols-[100px_1fr] gap-x-4">
                <dt className="text-muted">{g.label}</dt>
                <dd className="text-ink/90">{g.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" className="mt-24">
          <h2 className="font-display text-2xl mb-6 pb-3 border-b border-rule">Contact</h2>
          <p className="mb-6 text-ink/90">
            I&apos;m looking for a co-op from Winter 2027, Summer 2027 too. Happy to talk about product, UX, or
            whatever you&apos;re building.
          </p>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.label} className="grid grid-cols-[100px_1fr] gap-x-4">
                <span className="text-muted">{l.label}</span>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`${A} break-all`}
                >
                  {l.value}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-24 pt-6 border-t border-rule text-sm text-muted text-center">
          © {new Date().getFullYear()} Khushi Patel
        </footer>
      </div>
    </div>
  );
}
