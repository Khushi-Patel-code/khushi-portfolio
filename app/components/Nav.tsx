"use client";

import Link from "next/link";
import { useView, View } from "./ViewContext";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

const views: { id: View; label: string }[] = [
  { id: "ux", label: "UX & product" },
  { id: "software", label: "Software" },
];

export default function Nav() {
  const { view, setView } = useView();

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-rule">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Khushi Patel
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[15px] text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-sm" role="group" aria-label="Which side of my work to show first">
          <span className="text-muted hidden sm:inline">Show me</span>
          {views.map((v, i) => (
            <span key={v.id} className="flex items-center gap-2">
              {i > 0 && <span className="text-rule">/</span>}
              <button
                type="button"
                onClick={() => setView(v.id)}
                aria-pressed={view === v.id}
                className={view === v.id ? "text-ink font-medium mark" : "text-muted hover:text-ink"}
              >
                {v.label}
              </button>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
