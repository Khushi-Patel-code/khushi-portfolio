"use client";

import { motion } from "framer-motion";
import { useView, View } from "./ViewContext";

const views: { id: View; label: string }[] = [
  { id: "software", label: "Software" },
  { id: "ux", label: "UX & product" },
];

export default function ViewSwitch({ variant }: { variant: View }) {
  const { view, setView } = useView();

  if (variant === "software") {
    return (
      <div role="group" aria-label="Switch view" className="flex border border-sw-line font-mono text-xs">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            aria-pressed={view === v.id}
            className={`px-3 py-1.5 ${view === v.id ? "bg-sw-ink text-sw-bg" : "text-sw-dim hover:text-sw-ink"}`}
          >
            {v.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div role="group" aria-label="Switch view" className="flex items-center gap-1 text-sm">
      <span className="text-muted hidden sm:inline mr-2">Show me</span>
      {views.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => setView(v.id)}
          aria-pressed={view === v.id}
          className={`relative px-2.5 py-1 ${view === v.id ? "text-ink font-medium" : "text-muted hover:text-ink"}`}
        >
          {view === v.id && (
            <motion.span
              layoutId="ux-switch"
              className="absolute inset-x-1 bottom-0.5 h-[0.55em] bg-mark -z-10"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          {v.label}
        </button>
      ))}
    </div>
  );
}
