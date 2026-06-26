/** 솔루션·제품 통합 카탈로그 — 이미지·ID 단일 소스 */
export const solutionCatalog = [
  {
    id: "smart-ticket",
    image: "/images/solutions/smart-ticket.svg",
    productName: "SmartTicket AI",
    productCategory: "Public DX Platform",
    path: "/solutions",
    hash: "#smart-ticket",
  },
  {
    id: "ocr",
    image: "/images/solutions/ocr.svg",
    productName: "DocuScan OCR",
    productCategory: "AI Document Engine",
    path: "/solutions",
    hash: "#ocr",
  },
  {
    id: "callcenter",
    image: "/images/solutions/callcenter.svg",
    productName: "VoiceCare AI",
    productCategory: "AI Call Center",
    path: "/solutions",
    hash: "#callcenter",
  },
  {
    id: "local",
    image: "/images/solutions/local.svg",
    productName: "LocalMind",
    productCategory: "Regional AI Platform",
    path: "/solutions",
    hash: "#local",
  },
  {
    id: "geo",
    image: "/images/solutions/geo.svg",
    productName: "GeoInsight",
    productCategory: "Public Data AI",
    path: "/solutions",
    hash: "#geo",
  },
  {
    id: "xr",
    image: "/images/solutions/xr.svg",
    productName: "XR·3D Spatial",
    productCategory: "Digital Space",
    path: "/solutions",
    hash: "#xr",
  },
] as const;

export type SolutionId = (typeof solutionCatalog)[number]["id"];

export function getSolutionById(id: string) {
  return solutionCatalog.find((s) => s.id === id);
}

export function getSolutionImage(id: string) {
  return getSolutionById(id)?.image ?? "/images/solutions/smart-ticket.svg";
}
