const links = [
  { label: "Email", href: "mailto:khuship2708@gmail.com", value: "khuship2708@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khushipatel-dev", value: "linkedin.com/in/khushipatel-dev" },
  { label: "GitHub", href: "https://github.com/Khushi-Patel-code", value: "github.com/Khushi-Patel-code" },
];

export default function Closing() {
  return (
    <section id="contact" className="py-32 px-8 md:px-24 xl:px-40 bg-[#08080f]">
      <div className="max-w-5xl mx-auto">
        <div
          className="text-xs tracking-[0.3em] uppercase text-indigo-400 mb-6"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Contact
        </div>
        <h2
          className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          Say hello
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mb-12 leading-relaxed">
          Open to co-op and internship roles from Winter 2027, and Summer 2027 too. I&apos;m also
          happy to talk about product, UX, or anything you&apos;re building.
        </p>

        <div className="space-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-4 group"
            >
              <span
                className="text-xs tracking-widest uppercase text-slate-500"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                {l.label}
              </span>
              <span className="text-slate-300 group-hover:text-white transition-colors break-all text-right">
                {l.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
