import { useEffect, useRef } from "react";
import type { MotionId } from "../../data/motionCatalog";
import { motionVideos } from "../../data/motionCatalog";
import { drawMotionFrame } from "./motionDrawers";

interface MotionCanvasProps {
  motionId: MotionId;
  className?: string;
}

export function MotionCanvas({ motionId, className }: MotionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      drawMotionFrame(ctx, motionId, width, height, time);
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [motionId]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
