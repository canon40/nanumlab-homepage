import { useEffect, useRef } from "react";

interface Sparkline {
  baseY: number;
  amplitude: number;
  speed: number;
  color: string;
  points: number;
}

/** 분석 대시보드 스타일 — 우측 영역에 흐르는 차트 라인 */
export function AIAnalyticsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lines: Sparkline[] = [];
    let animationId = 0;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const h = canvas.offsetHeight;
      lines = [
        { baseY: h * 0.22, amplitude: 28, speed: 0.012, color: "rgba(59, 130, 246, 0.35)", points: 80 },
        { baseY: h * 0.55, amplitude: 36, speed: 0.009, color: "rgba(34, 211, 238, 0.3)", points: 100 },
        { baseY: h * 0.78, amplitude: 22, speed: 0.015, color: "rgba(167, 139, 250, 0.28)", points: 70 },
      ];
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const regionX = w * 0.38;

      lines.forEach((line, li) => {
        ctx.beginPath();
        for (let i = 0; i <= line.points; i++) {
          const x = regionX + (i / line.points) * (w - regionX);
          const phase = reducedMotion ? 0 : time * line.speed + li * 1.2;
          const y =
            line.baseY +
            Math.sin(i * 0.15 + phase) * line.amplitude +
            Math.sin(i * 0.08 + phase * 1.4) * (line.amplitude * 0.4);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const fillGrad = ctx.createLinearGradient(0, line.baseY - line.amplitude, 0, h);
        fillGrad.addColorStop(0, line.color.replace(/[\d.]+\)$/, "0.08)"));
        fillGrad.addColorStop(1, "transparent");
        ctx.lineTo(w, h);
        ctx.lineTo(regionX, h);
        ctx.closePath();
        ctx.fillStyle = fillGrad;
        ctx.fill();
      });

      if (!reducedMotion) {
        const barX = regionX + ((time * 0.08) % (w - regionX));
        ctx.fillStyle = "rgba(96, 165, 250, 0.5)";
        ctx.fillRect(barX, h * 0.15, 2, h * 0.7);
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
