const links = [
  { label: "Email", href: "mailto:khuship2708@gmail.com", value: "khuship2708@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khushipatel-dev", value: "linkedin.com/in/khushipatel-dev" },
  { label: "GitHub", href: "https://github.com/Khushi-Patel-code", value: "github.com/Khushi-Patel-code" },
];

export default function Closing() {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 md:px-10 py-24 border-t border-rule">
      <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-8">
        Say <em className="text-maroon">hi.</em>
      </h2>
      <p className="text-xl max-w-xl mb-12">
        I&apos;m looking for a co-op from Winter 2027, Summer 2027 too. I&apos;m also happy to talk
        about product, UX, or whatever you&apos;re building.
      </p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label} className="grid md:grid-cols-12 gap-x-10">
            <span className="md:col-span-3 text-muted">{l.label}</span>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="md:col-span-9 link break-all"
            >
              {l.value}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
