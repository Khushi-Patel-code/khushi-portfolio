"use client";

import { useEffect, useRef, useState } from "react";

export type Clip = { label: string; src: string; poster: string };

// muted looping clip that only plays while it is on screen; tabs switch between clips
export default function ProjectVideo({
  clips,
  title,
  className = "",
  tabsClass = "",
}: {
  clips: Clip[];
  title: string;
  className?: string;
  tabsClass?: string;
}) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);
  const clip = clips[i];

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [i]);

  return (
    <div>
      {clips.length > 1 && (
        <div className={`flex gap-2 mb-3 ${tabsClass}`} role="tablist">
          {clips.map((c, k) => (
            <button
              key={c.label}
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                k === i ? "bg-current/0 border-current font-medium" : "border-current/30 opacity-60 hover:opacity-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
      <video
        key={clip.src}
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label={`${title}: ${clip.label}`}
        className={`w-full block ${className}`}
      />
    </div>
  );
}
