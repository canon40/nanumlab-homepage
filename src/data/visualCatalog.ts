import type { MotionId } from "./motionCatalog";

/** 섹션별 비주얼 이미지 경로 + 모션 ID */
export const aboutImages = [
  "/images/about/platform.svg",
  "/images/about/everyday-ai.svg",
  "/images/about/automation.svg",
] as const;

export const aboutMotionIds: MotionId[] = ["platform", "everyday-ai", "automation"];

export const edgeImages = [
  "/images/edge/security.svg",
  "/images/edge/mydata.svg",
  "/images/edge/inclusion.svg",
] as const;

export const edgeMotionIds: MotionId[] = ["security", "mydata", "inclusion"];

export const roadmapImages = [
  "/images/roadmap/phase-1.svg",
  "/images/roadmap/phase-2.svg",
  "/images/roadmap/phase-3.svg",
] as const;

export const roadmapMotionIds: MotionId[] = ["phase-1", "phase-2", "phase-3"];

export const techImages: Record<string, string> = {
  frontend: "/images/tech/frontend.svg",
  backend: "/images/tech/backend.svg",
  database: "/images/tech/database.svg",
  ai: "/images/tech/ai.svg",
};

export const solutionMotionIds: Record<string, MotionId> = {
  "smart-ticket": "smart-ticket",
  ocr: "ocr",
  callcenter: "callcenter",
  local: "local",
  geo: "geo",
  xr: "xr",
};
