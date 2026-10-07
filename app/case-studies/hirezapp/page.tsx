import type { Metadata } from "next";
import Link from "next/link";
import { findings } from "./findings";

export const metadata: Metadata = {
  title: "HireZapp UX Audit | Khushi Patel",
  description:
    "Case study: auditing 15+ pages against 20+ competitors and redesigning the candidate communications hub at HireZapp.",
};

const heading = { fontFamily: "var(--font-rajdhani), sans-serif" };
const mono = { fontFamily: "var(--font-dm-mono), monospace" };

const facts = [
  { label: "Role", value: "Full Stack Developer Intern (Product, UI/UX & Growth)" },
  { label: "Company", value: "HireZapp, an AI-native recruiting platform" },
  { label: "When", value: "May to August 2026" },
  { label: "Worked with", value: "CEO, senior developer, CTO" },
];

const steps = [
  {
    title: "Audit",
    body: "Went through 15+ webpages and compared each against 20+ competitors, looking at it as a client would and as a competitor would.",
  },
  {
    title: "Document",
    body: "Wrote down every issue with why it was a problem for the user and what the fix should be, so each recommendation could be defended.",
  },
  {
    title: "Redesign",
    body: "Rebuilt the candidate communications hub in Figma, restructuring the tabs and navigation so people could find things without hunting.",
  },
  {
    title: "Ship",
    body: "Presented the redesign, got CEO approval, and worked with the senior developer and CTO to get it into production.",
  },
];

export default function HireZappCaseStudy() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen text-slate-300 selection:bg-indigo-500/30">
      <header className="px-6 md:px-16 py-4 border-b border-white/5">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">
          ← Back to portfolio
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-8 py-20">
        <div className="text-xs tracking-[0.3em] uppercase text-indigo-400 mb-6" style={mono}>
          Case study
        </div>
        <h1
          className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8"
          style={heading}
        >
          Finding what confused users, then fixing it
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-14">
          At HireZapp I audited the product and website the way a client would experience it, and
          the way a competitor would pick it apart. The work ended with a redesign of the candidate
          communications hub that shipped to production.
        </p>

        <dl className="grid sm:grid-cols-2 gap-6 mb-20 border-y border-white/10 py-8">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs tracking-widest uppercase text-slate-500 mb-1" style={mono}>
                {f.label}
              </dt>
              <dd className="text-slate-200">{f.value}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-4" style={heading}>
            The problem
          </h2>
          <p className="leading-relaxed text-slate-400">
            A recruiting product has two audiences who both need to trust it: the companies hiring
            and the candidates applying. If navigation is crowded or a key area is hard to find,
            both lose confidence quickly. I wanted to find where that was happening and prove it
            with a real comparison instead of opinion.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8" style={heading}>
            How I worked
          </h2>
          <ol className="grid sm:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-[#0f0f1c] border border-white/6 rounded-2xl p-6">
                <div className="text-xs text-indigo-400 mb-2" style={mono}>
                  0{i + 1}
                </div>
                <div className="text-xl font-bold text-white mb-2" style={heading}>
                  {s.title}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {findings.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8" style={heading}>
              What I found
            </h2>
            <div className="space-y-5">
              {findings.map((f) => (
                <div key={f.issue} className="bg-[#0f0f1c] border border-white/6 rounded-2xl p-6">
                  <div className="text-xs tracking-widest uppercase text-slate-500 mb-2" style={mono}>
                    {f.page}
                  </div>
                  <p className="text-white mb-3">{f.issue}</p>
                  <p className="text-sm text-slate-400 mb-2">
                    <span className="text-slate-200">Why it mattered: </span>
                    {f.whyItMattered}
                  </p>
                  <p className="text-sm text-slate-400">
                    <span className="text-slate-200">The fix: </span>
                    {f.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-4" style={heading}>
            What shipped
          </h2>
          <ul className="space-y-3 text-slate-400 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-indigo-500">▸</span>
              Simplified navigation and a restructured candidate communications hub, live in
              production after CEO approval.
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-500">▸</span>
              FAQ sections with FAQPage schema in JSON-LD, so AI search tools can read the pages.
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-500">▸</span>
              An audit of 30+ blog posts and competitor comparison content built from the same
              research.
            </li>
          </ul>
        </section>

        <div className="border-t border-white/10 pt-8">
          <Link href="/#projects" className="text-indigo-400 hover:text-indigo-300">
            See my projects →
          </Link>
        </div>
      </main>
    </div>
  );
}
