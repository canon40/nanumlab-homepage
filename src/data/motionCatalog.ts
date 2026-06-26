export type MotionId =
  | "platform"
  | "everyday-ai"
  | "automation"
  | "security"
  | "mydata"
  | "inclusion"
  | "smart-ticket"
  | "ocr"
  | "callcenter"
  | "local"
  | "geo"
  | "xr"
  | "phase-1"
  | "phase-2"
  | "phase-3"
  | "frontend"
  | "backend"
  | "database"
  | "ai";

/** 섹션 카드용 루프 영상 (CDN) — 실패 시 캔버스 폴백 */
export const motionVideos: Partial<Record<MotionId, string>> = {
  platform: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4",
  "everyday-ai": "https://cdn.pixabay.com/video/2022/10/31/137155-768682066_large.mp4",
  automation: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-27389-large.mp4",
  security: "https://assets.mixkit.co/videos/preview/mixkit-cyber-security-concept-animation-42195-large.mp4",
  mydata: "https://assets.mixkit.co/videos/preview/mixkit-data-center-server-room-40271-large.mp4",
  "smart-ticket": "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-phone-with-stock-market-charts-44775-large.mp4",
  ocr: "https://assets.mixkit.co/videos/preview/mixkit-scanning-a-document-with-a-smartphone-44776-large.mp4",
  callcenter: "https://assets.mixkit.co/videos/preview/mixkit-woman-talking-on-the-phone-44778-large.mp4",
  local: "https://assets.mixkit.co/videos/preview/mixkit-map-with-location-markers-44774-large.mp4",
  geo: "https://assets.mixkit.co/videos/preview/mixkit-planet-earth-rotating-in-space-16016-large.mp4",
  xr: "https://assets.mixkit.co/videos/preview/mixkit-virtual-reality-headset-interaction-44772-large.mp4",
  ai: "https://assets.mixkit.co/videos/preview/mixkit-artificial-intelligence-animation-42456-large.mp4",
};
