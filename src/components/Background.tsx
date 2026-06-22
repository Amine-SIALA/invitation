import { useEffect, useRef } from "react";

/**
 * Animated particle network on a canvas + soft floating geometric shapes.
 * Lightweight (no deps), pauses on reduced-motion and when tab is hidden.
 */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf = 0;
    let running = false;

    const count = Math.min(90, Math.floor((w * h) / 18000));
    const colors = ["#22d3ee", "#56b3ff", "#2563eb", "#fde047"];
    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    const parts: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    const pointer = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.7;
        ctx.fill();

        // links
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = dx * dx + dy * dy;
          if (dist < 13000) {
            ctx.globalAlpha = (1 - dist / 13000) * 0.22;
            ctx.strokeStyle = p.c;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // pointer attraction line
        const pdx = p.x - pointer.x;
        const pdy = p.y - pointer.y;
        const pd = pdx * pdx + pdy * pdy;
        if (pd < 26000) {
          ctx.globalAlpha = (1 - pd / 26000) * 0.5;
          ctx.strokeStyle = "#22d3ee";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function resize() {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    const onVis = () => {
      if (document.hidden) stop();
      else if (!reduce) start();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      draw(); // single static frame
    } else {
      start();
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <div className="app-bg" />
      <div className="app-grid animate-gridmove" />
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-[1]" aria-hidden />
      {/* floating geometric shapes */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
        <div className="absolute left-[8%] top-[18%] h-24 w-24 rounded-2xl border border-cyanx-400/30 bg-cyanx-400/5 animate-float" />
        <div className="absolute right-[12%] top-[24%] h-16 w-16 rotate-45 rounded-lg border border-electric-400/30 bg-electric-500/5 animate-floatSlow" />
        <div className="absolute left-[16%] bottom-[14%] h-20 w-20 rounded-full border border-gold-400/30 bg-gold-400/5 animate-floatSlow" />
        <div className="absolute right-[18%] bottom-[22%] h-12 w-12 rounded-md border border-sky2-300/40 bg-sky2-300/5 animate-float" />
        <div className="absolute left-[46%] top-[10%] h-10 w-10 rotate-12 rounded-md border border-cyanx-400/30 animate-floatSlow" />
      </div>
    </>
  );
}
