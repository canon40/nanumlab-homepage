/** 회사 소개 — whatWeDo.cards 순서 */
export const whatWeDoImages = [
  "/images/about/platform.svg",
  "/images/about/everyday-ai.svg",
  "/images/about/automation.svg",
] as const;

/** 솔루션 카드 — item.id 키 */
export const solutionCardImages: Record<string, string> = {
  "smart-ticket": "/images/solutions/smart-ticket.svg",
  ocr: "/images/solutions/ocr.svg",
  callcenter: "/images/solutions/callcenter.svg",
  local: "/images/solutions/local.svg",
};

/** 기술 스택 탭 — tab.id 키 */
export const techStackImages: Record<string, string> = {
  frontend: "/images/tech/frontend.svg",
  backend: "/images/tech/backend.svg",
  database: "/images/tech/database.svg",
  ai: "/images/tech/ai.svg",
};

/** 미래 기술 */
export const futureTechImages: Record<string, string> = {
  geo: "/images/solutions/geo.svg",
  xr: "/images/solutions/xr.svg",
};

export const corporateServiceImages: Record<string, string> = {
  "ai-ml": "/images/corporate/ai-ml.svg",
  datalake: "/images/corporate/datalake.svg",
  mobile: "/images/corporate/mobile.svg",
  iot: "/images/corporate/iot.svg",
  "app-dev": "/images/corporate/app-dev.svg",
};

export const processImages: Record<string, string> = {
  analyze: "/images/process/analyze.svg",
  develop: "/images/process/develop.svg",
  verify: "/images/process/verify.svg",
};

export const whyChooseImages: Record<string, string> = {
  "ai-ml": "/images/corporate/ai-ml.svg",
  datalake: "/images/corporate/datalake.svg",
  mobile: "/images/corporate/mobile.svg",
};

export const scenarioImages = {
  before: "/images/scenarios/before-manual.svg",
  after: "/images/scenarios/after-auto.svg",
  resident: "/images/scenarios/resident-mobile.svg",
} as const;
