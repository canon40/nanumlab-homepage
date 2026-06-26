import { Bot, Cpu, FileScan, Layers, MapPinned, TicketCheck } from "lucide-react";

export const products = [
  {
    icon: TicketCheck,
    name: "SmartTicket AI",
    category: "Public DX Platform",
    description: "공공마이데이터 연동 스마트 발권·검표·감면·정산 통합 플랫폼",
    path: "/solutions",
  },
  {
    icon: FileScan,
    name: "DocuScan OCR",
    category: "AI Document Engine",
    description: "영수증·증빙·행정문서 OCR 인식 및 AI 후처리 자동화",
    path: "/solutions",
  },
  {
    icon: Bot,
    name: "VoiceCare AI",
    category: "AI Call Center",
    description: "STT·상담 요약·민원 분류·감정 분석 기반 AI 민원 지원",
    path: "/solutions",
  },
  {
    icon: MapPinned,
    name: "LocalMind",
    category: "Regional AI Platform",
    description: "자연어 검색·위치 기반 추천·상권 분석 로컬 AI 서비스",
    path: "/solutions",
  },
  {
    icon: Cpu,
    name: "GeoInsight",
    category: "Public Data AI",
    description: "위성·공간정보·행정 데이터 기반 AI 분석·시각화",
    path: "/use-cases",
  },
  {
    icon: Layers,
    name: "Nanum AX",
    category: "AI Framework",
    description: "LLM·Vector DB·API Gateway·온프레미스 AI 운영 프레임워크",
    path: "/technology",
  },
] as const;
