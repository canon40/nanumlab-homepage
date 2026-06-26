export const technologyDecisions = [
  {
    category: "Frontend",
    choice: "React + Vite + TypeScript",
    rationale:
      "느리고 무거운 전자정부프레임워크 환경의 대민 포털을 경량화하고, 현장 관리자가 매일 쓰는 대시보드에 최상의 인터랙션을 구현하기 위한 기술적 결단입니다.",
    items: ["React", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Backend",
    choice: "FastAPI + Docker",
    rationale:
      "폐쇄망 온프레미스 서버에서 경량으로 구동되며, AI 파이프라인과 행정 API를 하나의 구조로 제어하기 위해 선택했습니다.",
    items: ["FastAPI", "REST API", "RBAC", "API Gateway", "감사 로그"],
  },
  {
    category: "Database",
    choice: "PostgreSQL + Supabase",
    rationale:
      "공공마이데이터 응답 필드 매핑, 예약·결제·정산 통합 트랜잭션을 스키마 단에서 끝까지 설계하기 위해 선택한 데이터 영속성 모델입니다.",
    items: ["PostgreSQL", "Supabase", "MySQL", "트랜잭션 설계", "필드 매핑"],
  },
  {
    category: "AI Engine",
    choice: "LLM + Vector DB + Tool Calling",
    rationale:
      "챗봇이 아닌 행정 워크플로우 실행기로서 AI를 설계하기 위해, RAG·OCR·STT·Tool Calling을 하나의 운영 구조로 묶었습니다.",
    items: ["LLM", "Vector DB", "OCR", "STT", "Tool Calling"],
  },
  {
    category: "Infra",
    choice: "On-Premise + Docker",
    rationale:
      "공공기관 내부망에서 외부 API 없이 AI와 데이터 파이프라인이 끊기지 않도록, 컨테이너 기반 폐쇄망 배포를 전제로 설계했습니다.",
    items: ["Docker", "On-Premise", "내부망", "모니터링", "백업"],
  },
];
