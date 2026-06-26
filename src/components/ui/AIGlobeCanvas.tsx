import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Projected {
  x: number;
  y: number;
  z: number;
  scale: number;
}

function fibonacciSphere(count: number, radius: number): Point3D[] {
  const points: Point3D[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
    });
  }
  return points;
}

function rotateY(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
}

function rotateX(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

function project(p: Point3D, cx: number, cy: number, fov: number): Projected {
  const scale = fov / (fov + p.z);
  return { x: cx + p.x * scale, y: cy + p.y * scale, z: p.z, scale };
}

type Variant = "background" | "hero" | "fullscreen";

interface AIGlobeCanvasProps {
  variant?: Variant;
  className?: string;
}

export function AIGlobeCanvas({ variant = "background", className = "" }: AIGlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isHero = variant === "hero";
    const isFullscreen = variant === "fullscreen";
    const pointCount = isFullscreen ? 200 : isHero ? 180 : 120;
    const radius = isHero ? 1 : 1;
    const basePoints = fibonacciSphere(pointCount, radius);

    const arcs = Array.from({ length: isFullscreen ? 12 : isHero ? 8 : 5 }, (_, i) => ({
      from: Math.floor((i / 8) * pointCount),
      to: Math.floor(((i + 3) / 8) * pointCount) % pointCount,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    }));

    let animationId = 0;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w * (isFullscreen ? 0.64 : isHero ? 0.5 : 0.55);
      const cy = h * (isFullscreen ? 0.46 : isHero ? 0.5 : 0.48);
      const globeR = Math.min(w, h) * (isFullscreen ? 0.44 : isHero ? 0.38 : 0.42);
      const fov = isFullscreen ? 3.2 : isHero ? 3.5 : 4;
      const tilt = 0.35;
      const spin = reducedMotion ? 0.6 : time * 0.00035;

      const projected = basePoints.map((p) => {
        const scaled = { x: p.x * globeR, y: p.y * globeR, z: p.z * globeR };
        const rotated = rotateX(rotateY(scaled, spin), tilt);
        return project(rotated, cx, cy, fov * globeR);
      });

      if (isHero || isFullscreen) {
        const glow = ctx.createRadialGradient(cx, cy, globeR * 0.1, cx, cy, globeR * 1.2);
        glow.addColorStop(0, `rgba(37, 99, 235, ${isFullscreen ? 0.28 : 0.18})`);
        glow.addColorStop(0.5, "rgba(34, 211, 238, 0.12)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = 0; lon <= 360; lon += 4) {
          const latR = (lat * Math.PI) / 180;
          const lonR = (lon * Math.PI) / 180;
          const px = Math.cos(latR) * Math.cos(lonR) * globeR;
          const py = Math.sin(latR) * globeR;
          const pz = Math.cos(latR) * Math.sin(lonR) * globeR;
          const pr = project(rotateX(rotateY({ x: px, y: py, z: pz }, spin), tilt), cx, cy, fov * globeR);
          if (pr.z < -globeR * 0.15) continue;
          if (!started) {
            ctx.moveTo(pr.x, pr.y);
            started = true;
          } else {
            ctx.lineTo(pr.x, pr.y);
          }
        }
        ctx.strokeStyle = `rgba(96, 165, 250, ${isFullscreen ? 0.32 : isHero ? 0.22 : 0.12})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 4) {
          const latR = (lat * Math.PI) / 180;
          const lonR = (lon * Math.PI) / 180;
          const px = Math.cos(latR) * Math.cos(lonR) * globeR;
          const py = Math.sin(latR) * globeR;
          const pz = Math.cos(latR) * Math.sin(lonR) * globeR;
          const pr = project(rotateX(rotateY({ x: px, y: py, z: pz }, spin), tilt), cx, cy, fov * globeR);
          if (pr.z < -globeR * 0.15) continue;
          if (!started) {
            ctx.moveTo(pr.x, pr.y);
            started = true;
          } else {
            ctx.lineTo(pr.x, pr.y);
          }
        }
        ctx.strokeStyle = `rgba(59, 130, 246, ${isFullscreen ? 0.26 : isHero ? 0.18 : 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          if (a.z < 0 || b.z < 0) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < globeR * 0.35) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const depth = (a.z + b.z) / (2 * globeR);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.06 + depth * 0.12})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      projected.forEach((p) => {
        if (p.z < 0) return;
        const depth = p.z / globeR;
        const r = (isHero ? 2.2 : 1.6) * p.scale * (0.6 + depth * 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${0.35 + depth * 0.55})`;
        ctx.fill();
        if (depth > 0.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${0.04 * depth})`;
          ctx.fill();
        }
      });

      arcs.forEach((arc) => {
        if (reducedMotion) return;
        arc.progress = (arc.progress + arc.speed) % 1;
        const from = projected[arc.from % projected.length];
        const to = projected[arc.to % projected.length];
        if (from.z < 0 || to.z < 0) return;

        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2 - globeR * 0.15;
        const t = arc.progress;
        const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * mx + t * t * to.x;
        const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * my + t * t * to.y;

        ctx.beginPath();
        ctx.arc(x, y, isHero ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.9)";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(mx, my, to.x, to.y);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 + Math.sin(t * Math.PI) * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

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
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
