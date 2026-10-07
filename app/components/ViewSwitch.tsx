"use client";

import { useView, View } from "./ViewContext";

const views: { id: View; label: string }[] = [
  { id: "software", label: "Software" },
  { id: "ux", label: "UX & product" },
];

export default function ViewSwitch() {
  const { view, setView } = useView();
  return (
    <div role="group" aria-label="Switch view" className="flex items-center justify-center gap-3 text-sm">
      <span className="text-muted">View</span>
      {views.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => setView(v.id)}
          aria-pressed={view === v.id}
          className={view === v.id ? "text-ink font-medium mark" : "text-muted hover:text-ink"}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
