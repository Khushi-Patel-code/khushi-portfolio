import Link from "next/link";

const roles = [
  {
    dates: "May to Aug 2026",
    role: "Full Stack Developer Intern, Product, UI/UX & Growth",
    org: "HireZapp",
    caseStudy: true,
    bullets: [
      "Audited 15+ webpages against 20+ competitors, documenting each issue, why it hurt the user, and the fix.",
      "Redesigned the candidate communications hub in Figma, restructuring tabs and navigation. It shipped to production after CEO approval.",
      "Made layout and frontend changes in the codebase alongside the senior developer and CTO, and audited 30+ blog posts for search and AI visibility.",
    ],
  },
  {
    dates: "Jan 2026 to now",
    role: "Chief Marketing Officer",
    org: "Tech Management Student Association, Ontario Tech",
    bullets: [
      "Helped build the event platform in React and Firebase, with real-time registration, team formation, and an admin dashboard.",
      "Ran social media and event promotion, designing visuals and reels and using analytics to adjust content. Instagram engagement grew 70% in 2 months and the flagship mixer drew 100+ attendees.",
    ],
  },
  {
    dates: "Jul to Aug 2025",
    role: "Web Development Intern",
    org: "CodePhoenix Web Solutions, India",
    bullets: [
      "Built 5+ responsive pages with HTML, CSS, JavaScript and Express.js, improving mobile load performance by 25%.",
      "Connected REST APIs across 5+ user workflows, cutting form submission errors by 40%.",
      "Led UI/UX design in Figma: wireframes, component structure, and visual consistency across feature updates.",
    ],
  },
  {
    dates: "2023 to now",
    role: "Peer Educator, Peer Mentor, Level One Ambassador",
    org: "Ontario Tech University",
    bullets: [
      "Mentored 5+ incoming engineering students through academic onboarding, and spoke with 50+ prospective students and families at recruitment events.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-rule">
      <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-14">
        Where I&apos;ve <em className="text-maroon">worked</em>
      </h2>

      <div className="space-y-14">
        {roles.map((r) => (
          <div key={r.org + r.role} className="grid md:grid-cols-12 gap-x-10 gap-y-2">
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
        ))}
      </div>
    </section>
  );
}
