import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectVideo from "../../components/ProjectVideo";
import { caseStudies, getCaseStudy } from "../data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  return c ? { title: `${c.title} | Khushi Patel`, description: c.short } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const others = caseStudies.filter((x) => x.slug !== c.slug);

  return (
    <div>
      <header className="max-w-5xl mx-auto px-6 md:px-10 py-5 border-b border-rule">
        <Link href="/" className="link text-[15px]">
          ← Back to portfolio
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 md:px-10 py-20">
        <div className="font-display italic text-maroon text-lg mb-4">Case study</div>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] mb-8">{c.title}</h1>
        <p className="text-xl leading-relaxed text-ink/90 mb-10">{c.intro}</p>

        <div className="flex flex-wrap gap-2 mb-12">
          {c.tags.map((t) => (
            <span key={t} className="text-sm border border-rule rounded-full px-3 py-1 text-ink/70">
              {t}
            </span>
          ))}
        </div>

        {c.video && (
          <div className="mb-16 rounded-md overflow-hidden border border-rule shadow-[10px_10px_0_#52003a]">
            <ProjectVideo clips={[{ label: "Walkthrough", src: c.video.src, poster: c.video.poster }]} title={c.title} />
          </div>
        )}

        <dl className="grid sm:grid-cols-2 gap-6 mb-20 border-y border-rule py-8">
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt className="font-display italic text-maroon mb-1">{f.label}</dt>
              <dd className="text-ink/90">{f.value}</dd>
            </div>
          ))}
        </dl>

        {c.sections.map((s) => (
          <section key={s.h} className="mb-16">
            <h2 className="font-display text-3xl tracking-tight mb-5">{s.h}</h2>
            {s.body?.map((p, i) => (
              <p key={i} className="text-ink/85 mb-4">
                {p}
              </p>
            ))}
            {s.cards && (
              <div className="grid gap-5">
                {s.cards.map((card) => (
                  <div key={card.title} className="bg-paper-deep rounded-sm p-6">
                    <div className="font-display text-xl mb-2">{card.title}</div>
                    <p className="text-[15px] text-ink/80">{card.body}</p>
                  </div>
                ))}
              </div>
            )}
            {s.list && (
              <ul className="space-y-3 text-ink/85 list-disc pl-5 marker:text-maroon">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="border-t border-rule pt-8 grid gap-3">
          <p className="font-display italic text-maroon">More case studies</p>
          {others.map((o) => (
            <Link key={o.slug} href={`/case-studies/${o.slug}`} className="link">
              {o.title}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
