import { useEffect, useState } from "react";
import type { MotionId } from "../../data/motionCatalog";
import { motionVideos } from "../../data/motionCatalog";
import { MotionCanvas } from "./MotionCanvas";

interface SectionMotionVisualProps {
  motionId: MotionId;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  aspect?: "video" | "banner";
}

export function SectionMotionVisual({ motionId, alt, fallbackSrc, className, aspect = "banner" }: SectionMotionVisualProps) {
  const videoSrc = motionVideos[motionId];
  const [videoOk, setVideoOk] = useState(!!videoSrc);
  const [showStatic, setShowStatic] = useState(false);

  useEffect(() => {
    if (!fallbackSrc) return;
    const timer = window.setInterval(() => setShowStatic((v) => !v), 5000);
    return () => window.clearInterval(timer);
  }, [fallbackSrc]);

  const aspectClass = aspect === "video" ? "aspect-[16/9]" : "aspect-[2/1]";

  return (
    <div className={`relative overflow-hidden bg-gov-blue-950 ${aspectClass} ${className ?? ""}`}>
      {/* 움직이는 레이어: 영상 또는 캔버스 */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
          showStatic && fallbackSrc ? "opacity-0" : "opacity-100"
        }`}
      >
        {videoOk && videoSrc ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
            onError={() => setVideoOk(false)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <MotionCanvas motionId={motionId} className="h-full w-full" />
        )}
      </div>

      {/* 정적 일러스트 — 5초마다 교차 */}
      {fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            showStatic ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gov-blue-950/50 via-transparent to-gov-blue-950/10" />
    </div>
  );
}
