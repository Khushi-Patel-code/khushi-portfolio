import type { Metadata } from "next";
import Link from "next/link";
import { findings } from "./findings";

export const metadata: Metadata = {
  title: "HireZapp UX Audit | Khushi Patel",
  description:
    "Case study: auditing 15+ pages against 20+ competitors and redesigning the candidate communications hub at HireZapp.",
};

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
    <div>
      <header className="max-w-5xl mx-auto px-6 md:px-10 py-5 border-b border-rule">
        <Link href="/" className="link text-[15px]">
          ← Back to portfolio
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-10 py-20">
        <div className="font-display italic text-maroon text-lg mb-4">
          Case study
        </div>
        <h1
          className="font-display text-5xl md:text-6xl tracking-tight leading-[1.05] mb-8"
         
        >
          Finding what confused users, then fixing it
        </h1>
        <p className="text-xl leading-relaxed text-ink/90 mb-14">
          At HireZapp I audited the product and website the way a client would experience it, and
          the way a competitor would pick it apart. The work ended with a redesign of the candidate
          communications hub that shipped to production.
        </p>

        <dl className="grid sm:grid-cols-2 gap-6 mb-20 border-y border-rule py-8">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="font-display italic text-maroon mb-1">
                {f.label}
              </dt>
              <dd className="text-ink/90">{f.value}</dd>
            </div>
          ))}
        </dl>

        <section className="mb-20">
          <h2 className="font-display text-3xl tracking-tight mb-4">
            The problem
          </h2>
          <p className="text-ink/85">
            A recruiting product has two audiences who both need to trust it: the companies hiring
            and the candidates applying. If navigation is crowded or a key area is hard to find,
            both lose confidence quickly. I wanted to find where that was happening and prove it
            with a real comparison instead of opinion.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="font-display text-3xl tracking-tight mb-8">
            How I worked
          </h2>
          <ol className="grid sm:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-paper-deep rounded-sm p-6">
                <div className="font-display italic text-maroon mb-1">
                  0{i + 1}
                </div>
                <div className="font-display text-xl mb-2">
                  {s.title}
                </div>
                <p className="text-[15px] text-ink/80">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {findings.length > 0 && (
          <section className="mb-20">
            <h2 className="font-display text-3xl tracking-tight mb-8">
              What I found
            </h2>
            <div className="space-y-5">
              {findings.map((f) => (
                <div key={f.issue} className="bg-paper-deep rounded-sm p-6">
                  <div className="font-display italic text-maroon mb-2">
                    {f.page}
                  </div>
                  <p className="mb-3">{f.issue}</p>
                  <p className="text-[15px] text-ink/80 mb-2">
                    <span className="font-medium text-ink">Why it mattered: </span>
                    {f.whyItMattered}
                  </p>
                  <p className="text-[15px] text-ink/80">
                    <span className="font-medium text-ink">The fix: </span>
                    {f.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-20">
          <h2 className="font-display text-3xl tracking-tight mb-4">
            What shipped
          </h2>
          <ul className="space-y-3 text-ink/85 list-disc pl-5 marker:text-maroon">
            <li>
              Simplified navigation and a restructured candidate communications hub, live in
              production after CEO approval.
            </li>
            <li>
              FAQ sections with FAQPage schema in JSON-LD, so AI search tools can read the pages.
            </li>
            <li>
              An audit of 30+ blog posts and competitor comparison content built from the same
              research.
            </li>
          </ul>
        </section>

        <div className="border-t border-rule pt-8">
          <Link href="/#projects" className="link">
            See my projects →
          </Link>
        </div>
      </main>
    </div>
  );
}
