const groups = [
  { label: "Languages", items: "JavaScript, TypeScript, Python, Java, C++" },
  {
    label: "Web",
    items: "React, Next.js, HTML, CSS, Tailwind, Node.js, Express, Firebase, REST APIs, JWT",
  },
  { label: "Design", items: "Figma, wireframing, prototyping, UX audits, responsive design, Canva" },
  { label: "Data", items: "MySQL, Pandas, NumPy" },
  { label: "Working", items: "Git, GitHub, Linux, Bash, Jira, Agile/Scrum, requirements gathering" },
];

export default function Skills() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 py-20 border-t border-rule">
      <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-12">
        What I <em className="text-maroon">use</em>
      </h2>
      <dl className="space-y-5">
        {groups.map((g) => (
          <div key={g.label} className="grid md:grid-cols-12 gap-x-10 gap-y-1">
            <dt className="md:col-span-3 font-display italic text-maroon text-lg">{g.label}</dt>
            <dd className="md:col-span-9 text-ink/85">{g.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
