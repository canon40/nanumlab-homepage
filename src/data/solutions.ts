import { Bot, Building2, FileScan, MapPinned, Satellite, TicketCheck } from "lucide-react";

export const solutions = [
  {
    icon: TicketCheck,
    title: "공공마이데이터 스마트 티켓",
    description: "공공마이데이터 기반 자격 확인, 자동 감면, 모바일 발권, QR 검표, 정산·통계를 하나의 흐름으로 연결합니다.",
    features: ["모바일 예매", "QR 발권", "자동 감면", "정산 관리", "관리자 대시보드"],
  },
  {
    icon: FileScan,
    title: "OCR 문서·증빙자료 자동화",
    description: "영수증, 숙박 증빙, 행정문서 등 비정형 데이터를 OCR과 AI 후처리로 구조화합니다.",
    features: ["영수증 OCR", "필드 추출", "신뢰도 검수", "오류 재처리", "데이터 라벨링"],
  },
  {
    icon: Bot,
    title: "AI 민원콜센터",
    description: "STT, 상담 요약, 민원 분류, 감정 분석, 화자인증 기반의 공공기관 AI 상담지원 모델을 기획합니다.",
    features: ["STT", "상담 요약", "민원 분류", "감정 분석", "화자인증"],
  },
  {
    icon: MapPinned,
    title: "지역 기반 AI 추천 플랫폼",
    description: "지역 상권 데이터를 기반으로 음식점, 관광지, 상점을 자연어로 검색하고 추천하는 로컬 AI 플랫폼입니다.",
    features: ["자연어 검색", "위치 기반 추천", "리뷰 분석", "쿠폰·예약", "CRM 확장"],
  },
  {
    icon: Satellite,
    title: "공공데이터 AI 분석",
    description: "공개 위성자료, 공간정보, 행정 데이터를 활용하여 지자체 의사결정을 지원하는 분석 서비스를 기획합니다.",
    features: ["위성자료 검토", "공간정보 분석", "농지 변화 탐지", "데이터 시각화", "정책 리포트"],
  },
  {
    icon: Building2,
    title: "XR·3D 공간 데이터",
    description: "관광지, 전시관, 공공시설을 3D 공간 데이터와 XR 콘텐츠로 확장합니다.",
    features: ["3D 공간 스캔", "Matterport 활용", "디지털 공간 안내", "관광 콘텐츠", "전시 홍보"],
  },
];
