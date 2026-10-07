"use client";

import { useEffect, useRef } from "react";

// a Figma-style board: wireframes draw themselves, a cursor selects them,
// and prototype arrows link one screen to the next
type Frame = { x: number; y: number; w: number; h: number; kind: number; label: string };

const FRAMES: Frame[] = [
  { x: 0.05, y: 0.12, w: 0.14, h: 0.5, kind: 0, label: "Onboarding" },
  { x: 0.25, y: 0.3, w: 0.14, h: 0.5, kind: 1, label: "Home" },
  { x: 0.45, y: 0.08, w: 0.14, h: 0.5, kind: 2, label: "Dashboard" },
  { x: 0.65, y: 0.34, w: 0.14, h: 0.5, kind: 3, label: "Detail" },
  { x: 0.85, y: 0.12, w: 0.12, h: 0.5, kind: 0, label: "Done" },
];

export default function DesignCanvas({ className = "" }: { className?: string }) {
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
    const CREAM = "246,239,228";
    const CORAL = "255,107,74";
    const MARK = "240,208,140";

    function init() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const rr = (x: number, y: number, ww: number, hh: number, r: number) => {
      ctx!.beginPath();
      ctx!.roundRect(x, y, ww, hh, r);
    };

    // each frame takes a while to draw in, then sits there living
    const DRAW = 150;
    const LOOP = FRAMES.length * DRAW + 420;

    function drawFrame(f: Frame, i: number, lt: number) {
      const x = f.x * w;
      const y = f.y * h;
      const fw = f.w * w;
      const fh = f.h * h;
      const p = Math.max(0, Math.min(1, (lt - i * DRAW) / DRAW));
      if (p === 0) return;
      ctx!.strokeStyle = `rgba(${CREAM},${0.55 * p})`;
      ctx!.lineWidth = 1.2;
      ctx!.setLineDash([fw * 2 * p, 9999]);
      rr(x, y, fw, fh, 10);
      ctx!.stroke();
      ctx!.setLineDash([]);
      if (p < 1) return;

      ctx!.fillStyle = `rgba(${CREAM},0.5)`;
      ctx!.font = "11px 'JetBrains Mono', monospace";
      ctx!.fillText(f.label, x, y - 8);

      // placeholder content by kind
      ctx!.fillStyle = `rgba(${CREAM},0.14)`;
      const px = x + 12;
      const pw = fw - 24;
      if (f.kind === 0) {
        rr(px, y + 18, pw, fh * 0.35, 6); ctx!.fill();
        rr(px, y + fh * 0.5, pw * 0.7, 8, 4); ctx!.fill();
        rr(px, y + fh * 0.5 + 18, pw, 6, 3); ctx!.fill();
        ctx!.fillStyle = `rgba(${CORAL},0.85)`;
        rr(px, y + fh - 44, pw, 28, 14); ctx!.fill();
      } else if (f.kind === 1) {
        for (let k = 0; k < 4; k++) {
          rr(px, y + 16 + k * (fh / 4.4), pw, fh / 5.4, 6); ctx!.fill();
        }
      } else if (f.kind === 2) {
        const bars = [0.5, 0.8, 0.35, 0.95, 0.6];
        bars.forEach((b, k) => {
          const bh = (fh * 0.4) * (0.4 + 0.6 * b * (0.85 + 0.15 * Math.sin(t / 30 + k)));
          rr(px + k * (pw / 5), y + fh * 0.55 - bh, pw / 5 - 5, bh, 3); ctx!.fill();
        });
        rr(px, y + fh * 0.65, pw, 8, 4); ctx!.fill();
        rr(px, y + fh * 0.65 + 16, pw * 0.6, 8, 4); ctx!.fill();
      } else {
        ctx!.beginPath(); ctx!.arc(x + fw / 2, y + 40, 22, 0, Math.PI * 2); ctx!.fill();
        rr(px, y + 82, pw, 8, 4); ctx!.fill();
        rr(px, y + 98, pw * 0.7, 8, 4); ctx!.fill();
        rr(px, y + 130, pw, fh * 0.3, 6); ctx!.fill();
      }
    }

    function arrow(a: Frame, b: Frame, lt: number, i: number) {
      const start = (i + 1) * DRAW;
      const p = Math.max(0, Math.min(1, (lt - start) / 90));
      if (p === 0) return;
      const x1 = (a.x + a.w) * w;
      const y1 = (a.y + a.h * 0.8) * h;
      const x2 = b.x * w;
      const y2 = (b.y + a.h * 0.2) * h;
      const cx = (x1 + x2) / 2;
      ctx!.strokeStyle = `rgba(${CORAL},0.8)`;
      ctx!.lineWidth = 1.5;
      ctx!.setLineDash([6, 5]);
      ctx!.lineDashOffset = -t / 3;
      ctx!.beginPath();
      ctx!.moveTo(x1, y1);
      const ex = x1 + (x2 - x1) * p;
      const ey = y1 + (y2 - y1) * p;
      ctx!.bezierCurveTo(cx, y1, cx, ey, ex, ey);
      ctx!.stroke();
      ctx!.setLineDash([]);
      ctx!.lineDashOffset = 0;
      if (p === 1) {
        ctx!.fillStyle = `rgba(${CORAL},0.9)`;
        ctx!.beginPath(); ctx!.arc(x2, y2, 3.5, 0, Math.PI * 2); ctx!.fill();
        // a dot travelling along the connection, like a prototype click-through
        const q = ((t / 90 + i * 0.3) % 1);
        const bx = (1 - q) ** 3 * x1 + 3 * (1 - q) ** 2 * q * cx + 3 * (1 - q) * q * q * cx + q ** 3 * x2;
        const by = (1 - q) ** 3 * y1 + 3 * (1 - q) ** 2 * q * y1 + 3 * (1 - q) * q * q * y2 + q ** 3 * y2;
        ctx!.fillStyle = `rgba(${MARK},1)`;
        ctx!.beginPath(); ctx!.arc(bx, by, 3, 0, Math.PI * 2); ctx!.fill();
      }
    }

    function selection(f: Frame) {
      const x = f.x * w - 4;
      const y = f.y * h - 4;
      const fw = f.w * w + 8;
      const fh = f.h * h + 8;
      ctx!.strokeStyle = `rgba(${MARK},0.95)`;
      ctx!.lineWidth = 1.5;
      ctx!.strokeRect(x, y, fw, fh);
      ctx!.fillStyle = "#52003a";
      [[x, y], [x + fw, y], [x, y + fh], [x + fw, y + fh], [x + fw / 2, y], [x + fw / 2, y + fh], [x, y + fh / 2], [x + fw, y + fh / 2]].forEach(([hx, hy]) => {
        ctx!.fillRect(hx - 3.5, hy - 3.5, 7, 7);
        ctx!.strokeRect(hx - 3.5, hy - 3.5, 7, 7);
      });
      ctx!.fillStyle = `rgba(${MARK},0.95)`;
      ctx!.font = "10px 'JetBrains Mono', monospace";
      ctx!.fillText(`${Math.round(fw)} x ${Math.round(fh)}`, x + fw / 2 - 22, y + fh + 18);
    }

    function cursor(lt: number) {
      // the cursor visits each frame in turn once they are drawn
      const total = FRAMES.length;
      const base = total * DRAW;
      const idx = Math.min(total - 1, Math.floor(lt / DRAW));
      let target = FRAMES[idx];
      let sel: Frame | null = null;
      if (lt > base) {
        const k = Math.floor((lt - base) / 84) % total;
        target = FRAMES[k];
        sel = target;
      }
      const tx = (target.x + target.w * 0.6) * w;
      const ty = (target.y + target.h * 0.55) * h;
      // ease towards the target
      cur.x += (tx - cur.x) * 0.06;
      cur.y += (ty - cur.y) * 0.06;
      if (sel) selection(sel);
      ctx!.save();
      ctx!.translate(cur.x, cur.y);
      ctx!.fillStyle = `rgb(${CORAL})`;
      ctx!.beginPath();
      ctx!.moveTo(0, 0); ctx!.lineTo(0, 17); ctx!.lineTo(4.5, 13); ctx!.lineTo(8, 20); ctx!.lineTo(10.5, 19); ctx!.lineTo(7, 12); ctx!.lineTo(13, 12);
      ctx!.closePath();
      ctx!.fill();
      ctx!.fillStyle = `rgb(${CORAL})`;
      rr(12, 18, 54, 18, 9); ctx!.fill();
      ctx!.fillStyle = "#16110f";
      ctx!.font = "11px 'JetBrains Mono', monospace";
      ctx!.fillText("Khushi", 20, 31);
      ctx!.restore();
    }

    const cur = { x: 0, y: 0 };

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      // dotted artboard grid
      ctx!.fillStyle = `rgba(${CREAM},0.1)`;
      for (let x = 0; x < w; x += 28) for (let y = 0; y < h; y += 28) ctx!.fillRect(x, y, 1.5, 1.5);

      const lt = t % LOOP;
      FRAMES.forEach((f, i) => drawFrame(f, i, lt));
      for (let i = 0; i < FRAMES.length - 1; i++) arrow(FRAMES[i], FRAMES[i + 1], lt, i);

      // colour swatches, bottom left
      const sw = ["#52003a", "#ff6b4a", "#f0d08c", "#f6efe4"];
      sw.forEach((c, i) => {
        ctx!.fillStyle = c;
        ctx!.beginPath(); ctx!.arc(w * 0.06 + i * 26, h * 0.9, 9, 0, Math.PI * 2); ctx!.fill();
        ctx!.strokeStyle = `rgba(${CREAM},0.5)`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      });
      ctx!.fillStyle = `rgba(${CREAM},0.45)`;
      ctx!.font = "11px 'JetBrains Mono', monospace";
      ctx!.fillText("Fraunces / Krub", w * 0.06 + 112, h * 0.9 + 4);
      cursor(lt);
    }

    function frame() {
      t++;
      if (visible && !document.hidden) draw();
      raf = requestAnimationFrame(frame);
    }

    init();
    cur.x = w * 0.1;
    cur.y = h * 0.4;
    if (reduce) {
      t = FRAMES.length * DRAW + 40;
      draw();
    } else raf = requestAnimationFrame(frame);

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
