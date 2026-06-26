import { useEffect, useRef, useState } from "react";
import { AIAnalyticsCanvas } from "./AIAnalyticsCanvas";
import { AIGlobeCanvas } from "./AIGlobeCanvas";
import { AIKonanFlowCanvas } from "./AIKonanFlowCanvas";
import { AIParticleCanvas } from "./AIParticleCanvas";

/** 로컬 영상 우선, 없으면 CDN 폴백 */
const VIDEO_SOURCES = [
  "/videos/ai-hero.mp4",
  "https://cdn.pixabay.com/video/2022/10/31/137155-768682066_large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-27389-large.mp4",
];

export function AIVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed || reducedMotion) return;
    video.play().catch(() => setVideoFailed(true));
  }, [sourceIndex, videoFailed, reducedMotion]);

  const handleVideoError = () => {
    if (sourceIndex < VIDEO_SOURCES.length - 1) {
      setSourceIndex((i) => i + 1);
    } else {
      setVideoFailed(true);
    }
  };

  const showVideo = !reducedMotion && !videoFailed;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {showVideo && (
        <video
          ref={videoRef}
          key={VIDEO_SOURCES[sourceIndex]}
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-25"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={handleVideoError}
        >
          <source src={VIDEO_SOURCES[sourceIndex]} type="video/mp4" />
        </video>
      )}

      {!reducedMotion && <AIKonanFlowCanvas />}
      {!reducedMotion && <AIAnalyticsCanvas />}

      {!reducedMotion && (
        <div className="absolute inset-0">
          <AIGlobeCanvas variant="fullscreen" />
        </div>
      )}

      {!reducedMotion && <AIParticleCanvas />}

      {/* 좌측 텍스트 가독용 · 우측 분석 배경 노출 */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/55 to-slate-950/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_45%,rgba(37,99,235,0.25),transparent)]" />
    </div>
  );
}
