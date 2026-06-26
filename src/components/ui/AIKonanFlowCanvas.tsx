import { useEffect, useRef } from "react";

interface Stream {
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

interface Floater {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

/** 코난테크놀로지 히어로 스타일 — 흐르는 빛줄기·상승 파티클 */
export function AIKonanFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let streams: Stream[] = [];
    let floaters: Floater[] = [];
    let animationId = 0;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const h = canvas.offsetHeight;
      const w = canvas.offsetWidth;
      streams = Array.from({ length: 12 }, (_, i) => ({
        y: (h / 12) * i + Math.random() * 20,
        speed: 0.4 + Math.random() * 1.2,
        length: 80 + Math.random() * 160,
        opacity: 0.08 + Math.random() * 0.15,
      }));
      floaters = Array.from({ length: 40 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.6,
        size: Math.random() * 2 + 0.5,
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      streams.forEach((s, i) => {
        if (!reducedMotion) {
          s.y += Math.sin(time * 0.001 + i) * 0.15;
        }
        const offset = reducedMotion ? 0 : (time * s.speed) % (w + s.length);
        const x = w - offset;

        const grad = ctx.createLinearGradient(x - s.length, s.y, x, s.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.6, `rgba(59, 130, 246, ${s.opacity})`);
        grad.addColorStop(1, `rgba(34, 211, 238, ${s.opacity * 1.5})`);

        ctx.beginPath();
        ctx.moveTo(x - s.length, s.y);
        ctx.lineTo(x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${s.opacity * 2})`;
        ctx.fill();
      });

      floaters.forEach((f) => {
        if (!reducedMotion) {
          f.x += f.vx;
          f.y += f.vy;
          if (f.y < -10) {
            f.y = h + 10;
            f.x = Math.random() * w;
          }
          if (f.x < 0 || f.x > w) f.vx *= -1;
        }

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96, 165, 250, 0.45)";
        ctx.fill();
      });

      const pulseR = (time * 0.05) % (Math.min(w, h) * 0.6);
      if (!reducedMotion) {
        ctx.beginPath();
        ctx.arc(w * 0.64, h * 0.46, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 * (1 - pulseR / (Math.min(w, h) * 0.6))})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (!reducedMotion) time += 16;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
