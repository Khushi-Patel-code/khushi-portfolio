"use client";

import { useEffect, useRef } from "react";

// falling streams of real code and data tokens, brighter near the mouse
const TOKENS = [
  "const", "async", "await", "=>", "fetch()", "useState", "git push", "200 OK", "404", "{ }", "[ ]", "null",
  "SELECT *", "JOIN", "O(n log n)", "0x1F", "true", "npm run build", "def main():", "return", "import", "type",
  "JWT", "POST /api", "merge", "PASS", "agent.run()", "tensor", "docker up", "main", "</>", "++", "&&", "!==",
  "{ id: 7 }", "ms: 42", "git commit", "lint ok", "deploy", "cache hit",
];

type Col = { x: number; y: number; v: number; items: string[]; hue: number };

export default function CodeRain({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let cols: Col[] = [];
    const mouse = { x: -999, y: -999 };
    const LH = 18;

    const pick = () => TOKENS[(Math.random() * TOKENS.length) | 0];
    const colors = ["#8b9bff", "#b6ff5c", "#ffd166", "#d28bff", "#3df5c8"];

    function init() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const colW = w < 600 ? 90 : 110;
      const n = Math.ceil(w / colW);
      cols = Array.from({ length: n }, (_, i) => ({
        x: i * colW + 8,
        y: Math.random() * -h,
        v: 0.35 + Math.random() * 0.7,
        items: Array.from({ length: 14 }, pick),
        hue: (Math.random() * colors.length) | 0,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.font = "12px 'JetBrains Mono', ui-monospace, monospace";
      for (const c of cols) {
        for (let i = 0; i < c.items.length; i++) {
          const y = c.y + i * LH;
          if (y < -LH || y > h + LH) continue;
          const head = i === c.items.length - 1;
          const d = Math.hypot(c.x + 30 - mouse.x, y - mouse.y);
          const boost = Math.max(0, 1 - d / 160);
          const fade = (i + 1) / c.items.length;
          ctx!.globalAlpha = Math.min(1, fade * 0.6 + boost * 0.8 + (head ? 0.3 : 0));
          ctx!.fillStyle = head ? "#ffffff" : colors[c.hue];
          ctx!.fillText(c.items[i], c.x, y);
        }
      }
      ctx!.globalAlpha = 1;
    }

    function step() {
      for (const c of cols) {
        c.y += c.v;
        if (c.y > h + 10) {
          c.y = -c.items.length * LH * (0.4 + Math.random() * 0.6);
          c.items = Array.from({ length: 10 + ((Math.random() * 8) | 0) }, pick);
          c.hue = (Math.random() * colors.length) | 0;
          c.v = 0.35 + Math.random() * 0.7;
        }
        // keep scrolling the text by swapping a token now and then
        if (Math.random() < 0.01) c.items[(Math.random() * c.items.length) | 0] = pick();
      }
    }

    function frame() {
      if (visible && !document.hidden) {
        step();
        draw();
      }
      raf = requestAnimationFrame(frame);
    }

    const move = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener("mousemove", move);

    init();
    if (reduce) {
      for (let i = 0; i < 200; i++) step();
      draw();
    } else raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={`w-full h-full block ${className}`} aria-hidden="true" />;
}
