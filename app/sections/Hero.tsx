"use client";

import { useView } from "../components/ViewContext";

const intro = {
  ux: (
    <>
      I&apos;m a fourth-year Software Engineering student at Ontario Tech. My favourite part of any
      product is the moment someone gets confused, because then you get to figure out why and{" "}
      <span className="mark">fix it</span>. I do that as a developer, and more and more as a UX and
      product person.
    </>
  ),
  software: (
    <>
      I&apos;m a fourth-year Software Engineering student at Ontario Tech. I build full-stack and
      multi-agent systems, and I care a lot about{" "}
      <span className="mark">what it&apos;s like to use the thing</span> once it&apos;s built.
    </>
  ),
};

const facts = [
  {
    label: "Studying",
    value: "Software Engineering (Honours) at Ontario Tech. GPA 4.06 / 4.30, graduating June 2028.",
  },
  {
    label: "Recently",
    value:
      "Top 100 of 11,000+ at FAR AWAY 2026. Top 10 across Canada at the TECHNATION AI Equity Data Challenge.",
  },
  {
    label: "Around campus",
    value: "CMO of the Tech Management Student Association, and a peer educator.",
  },
];

export default function Hero() {
  const { view } = useView();

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20">
      <h1 className="font-display text-6xl md:text-8xl leading-[0.95] tracking-tight rise">
        Hi, I&apos;m <em className="text-maroon">Khushi.</em>
      </h1>

      <p
        className="mt-10 max-w-2xl text-xl md:text-2xl leading-relaxed text-ink/90 rise"
        style={{ animationDelay: "0.15s" }}
      >
        {intro[view]}
      </p>

      <dl
        className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-8 border-t border-rule pt-8 rise"
        style={{ animationDelay: "0.3s" }}
      >
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="font-display italic text-maroon text-lg mb-1">{f.label}</dt>
            <dd className="text-muted text-[15px] leading-relaxed">{f.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-[15px] text-muted rise" style={{ animationDelay: "0.4s" }}>
        Looking for a co-op from Winter 2027 (Summer 2027 works too).{" "}
        <a href="#contact" className="link text-ink">
          Say hi
        </a>
        .
      </p>
    </section>
  );
}
