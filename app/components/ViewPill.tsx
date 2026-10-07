"use client";

import { useView, View } from "./ViewContext";

const views: { id: View; label: string }[] = [
  { id: "software", label: "Software" },
  { id: "ux", label: "UX & product" },
];

// small switch that stays in the corner on both themes
export default function ViewPill({ tone }: { tone: View }) {
  const { view, setView } = useView();
  const dark = tone === "software";
  return (
    <div
      role="group"
      aria-label="Switch view"
      className={`fixed top-3 right-3 z-[90] flex p-0.5 rounded-full text-xs backdrop-blur ${
        dark
          ? "font-mono bg-[#1b1e25]/90 border border-[#2a2e38] text-[#9aa3b2]"
          : "bg-cream/85 border border-ink2/15 text-ink2"
      }`}
    >
      {views.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => setView(v.id)}
          aria-pressed={view === v.id}
          className={`px-3 py-1.5 rounded-full transition-colors ${
            view === v.id
              ? dark
                ? "bg-[#e5c07b] text-[#15171c] font-medium"
                : "bg-maroon text-cream font-medium"
              : "hover:opacity-70"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
