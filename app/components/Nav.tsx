"use client";

import Link from "next/link";
import { useView, View } from "./ViewContext";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const views: { id: View; label: string }[] = [
  { id: "ux", label: "UX & Product" },
  { id: "software", label: "Software" },
];

export default function Nav() {
  const { view, setView } = useView();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0c]/80 backdrop-blur border-b border-white/5">
      <div className="flex items-center justify-between gap-4 px-6 md:px-16 py-3">
        <Link
          href="/"
          className="text-white font-bold tracking-wide text-lg"
          style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
        >
          KP
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div
          role="group"
          aria-label="Portfolio view"
          className="flex rounded-full border border-white/10 p-0.5 text-xs"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              aria-pressed={view === v.id}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                view === v.id ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
