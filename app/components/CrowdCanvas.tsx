"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; tx: number; ty: number; lane: number; stage: 0 | 1 | 2; stop: number; wait: number; v: number };

const LANES = 5;
const CELL = 26;

// a tiny crowd simulation: people enter on the left, queue for platforms, and platform 4 gets crowded
export default function CrowdCanvas({ className = "" }: { className?: string }) {
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
    let t = 0;
    let people: P[] = [];

    const laneY = (i: number) => h * (0.2 + (i * 0.6) / (LANES - 1));
    const platX0 = () => w * 0.36;
    const platX1 = () => w * 0.94;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(): P {
      // lane 3 (platform 4) is the popular one
      const r = Math.random();
      const lane = r < 0.4 ? 3 : Math.floor(Math.random() * LANES);
      const y = h * (0.12 + Math.random() * 0.76);
      return {
        x: -10 - Math.random() * 40,
        y,
        tx: platX0(),
        ty: laneY(lane) + (Math.random() - 0.5) * 10,
        lane,
        stage: 0,
        stop: platX0() + 24 + Math.random() * (platX1() - platX0() - 40),
        wait: 0,
        v: 0.5 + Math.random() * 0.5,
      };
    }

    function init() {
      resize();
      const n = w < 600 ? 110 : 230;
      people = Array.from({ length: n }, () => {
        const p = spawn();
        p.x = Math.random() * w * 0.9;
        return p;
      });
    }

    function step() {
      // density per grid cell so crowded spots slow down
      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      const grid = new Uint8Array(cols * rows);
      for (const p of people) {
        const c = Math.min(cols - 1, Math.max(0, (p.x / CELL) | 0));
        const r = Math.min(rows - 1, Math.max(0, (p.y / CELL) | 0));
        grid[r * cols + c]++;
      }

      for (let i = 0; i < people.length; i++) {
        const p = people[i];
        const c = Math.min(cols - 1, Math.max(0, (p.x / CELL) | 0));
        const r = Math.min(rows - 1, Math.max(0, (p.y / CELL) | 0));
        const d = grid[r * cols + c];
        const slow = 1 / (1 + Math.max(0, d - 3) * 0.35);

        if (p.stage === 0) {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          p.x += (dx / dist) * p.v * 1.4 * slow;
          p.y += (dy / dist) * p.v * 1.4 * slow;
          if (dist < 4) p.stage = 1;
        } else if (p.stage === 1) {
          p.x += p.v * 0.9 * slow;
          p.y += (laneY(p.lane) - p.y) * 0.04;
          if (p.x >= p.stop) {
            p.stage = 2;
            p.wait = 140 + Math.random() * 260;
          }
        } else {
          p.wait -= 1;
          if (p.wait <= 0) people[i] = spawn();
        }
      }
      return { grid, cols, rows };
    }

    function draw(g: { grid: Uint8Array; cols: number; rows: number }) {
      ctx!.clearRect(0, 0, w, h);

      // faint grid
      ctx!.strokeStyle = "rgba(255,255,255,0.035)";
      ctx!.lineWidth = 1;
      for (let x = 0; x < w; x += CELL * 2) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }
      for (let y = 0; y < h; y += CELL * 2) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();
      }

      // platforms
      for (let i = 0; i < LANES; i++) {
        const y = laneY(i);
        ctx!.strokeStyle = i === 3 ? "rgba(255,107,107,0.35)" : "rgba(150,170,200,0.18)";
        ctx!.lineWidth = 10;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(platX0(), y);
        ctx!.lineTo(platX1(), y);
        ctx!.stroke();
        ctx!.fillStyle = "rgba(150,170,200,0.45)";
        ctx!.font = "10px ui-monospace, monospace";
        ctx!.fillText("P" + (i + 1), platX0() - 26, y + 3);
      }

      // heat where it is crowded
      for (let r = 0; r < g.rows; r++) {
        for (let c = 0; c < g.cols; c++) {
          const d = g.grid[r * g.cols + c];
          if (d > 5) {
            const a = Math.min(0.28, (d - 5) * 0.05);
            const grad = ctx!.createRadialGradient(c * CELL + CELL / 2, r * CELL + CELL / 2, 0, c * CELL + CELL / 2, r * CELL + CELL / 2, CELL * 1.6);
            grad.addColorStop(0, `rgba(255,90,90,${a})`);
            grad.addColorStop(1, "rgba(255,90,90,0)");
            ctx!.fillStyle = grad;
            ctx!.fillRect(c * CELL - CELL, r * CELL - CELL, CELL * 3, CELL * 3);
          }
        }
      }

      // people
      for (const p of people) {
        const c = Math.min(g.cols - 1, Math.max(0, (p.x / CELL) | 0));
        const r = Math.min(g.rows - 1, Math.max(0, (p.y / CELL) | 0));
        const d = g.grid[r * g.cols + c];
        ctx!.fillStyle = d > 6 ? "#ff7a7a" : d > 4 ? "#e5c07b" : "#7aa2f7";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx!.fill();
      }

      // an alert when platform 4 fills up
      const onP4 = people.filter((p) => p.lane === 3 && p.stage > 0).length;
      if (onP4 > 28) {
        const y = laneY(3);
        const pulse = 10 + ((t / 8) % 24);
        ctx!.strokeStyle = `rgba(255,107,107,${1 - pulse / 36})`;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(platX0() + (platX1() - platX0()) * 0.5, y, pulse * 2.2, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.fillStyle = "#ff9a9a";
        ctx!.font = "11px ui-monospace, monospace";
        ctx!.fillText("RISK platform 4 crowding", platX0() + 12, y - 16);
        ctx!.fillStyle = "#98c379";
        ctx!.fillText("agent: reroute via gate 4B", platX0() + 12, y + 26);
      }
    }

    function frame() {
      t++;
      if (visible && !document.hidden) draw(step());
      raf = requestAnimationFrame(frame);
    }

    init();
    if (reduce) {
      for (let i = 0; i < 160; i++) step();
      draw(step());
    } else {
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={`w-full h-full block ${className}`} aria-hidden="true" />;
}
