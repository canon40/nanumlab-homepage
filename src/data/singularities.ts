import { FileText, Lock, Workflow } from "lucide-react";

export const singularities = [
  {
    id: "on-premise",
    icon: Lock,
    tag: "Developer's Note #01",
    title: "공공망(폐쇄망) 환경과의 사투에서 얻은 보안 설계",
    edge: "외부 OpenAI API에 의존하지 않는 온프레미스 AI 파이프라인",
    body: "대부분의 스타트업은 API 연동만으로 챗봇을 만들지만, 나눔랩은 공공기관 내부망(폐쇄망) 환경을 상정하고 설계합니다. FastAPI와 Docker 기반의 경량 구조를 선택한 이유도, 외부망이 차단된 서버에서도 AI와 데이터 파이프라인이 끊기지 않도록 최적화하기 위함입니다.",
    log: "// deploy.config — on-premise verified\nstack: FastAPI + Docker + PostgreSQL\nnetwork: internal-only\ntarget: government-grade uptime",
  },
  {
    id: "mydata",
    icon: FileText,
    tag: "Developer's Note #02",
    title: "\"서류 제출 제로\" — 공공마이데이터 필드 설계의 執念",
    edge: "0.5초 이내 자격 대조 트랜잭션 최적화",
    body: "단순히 결제 모듈을 붙인 것이 아닙니다. 장애인, 국가유공자 등 법정 감면 대상자가 증빙서류를 들고 오지 않아도, Supabase와 PostgreSQL 스키마 단에서 공공마이데이터 API 응답 필드를 어떻게 매핑하고 실시간 트래픽을 처리할지 끝까지 파고들어 완성한 스마트 티켓팅 아키텍처입니다.",
    log: "// mydata.field-map.ts\nqualification_check: realtime < 500ms\nchannels: [GPS, QR, NFC]\npaperwork: zero",
  },
  {
    id: "tool-calling",
    icon: Workflow,
    tag: "Developer's Note #03",
    title: "LLM과 실무를 연결하는 Tool Calling 아키텍처",
    edge: "이쁜 답변이 아닌, 행정 프로세스를 직접 실행하는 AI",
    body: "AI가 챗봇에 머무르지 않고, 실제 관리자 대시보드 시스템의 API를 직접 호출(Tool Calling)하여 영수증 OCR 검증부터 통계 리포트 생성까지 행정 프로세스를 스스로 처리하는 지능형 워크플로우를 지향합니다.",
    log: "// agent.workflow.ts\nactions: [ocr_verify, report_gen, ticket_issue]\nmode: tool-calling\naudit: government-grade logs",
  },
];

export const fieldSingularities = [
  {
    title: "스마트 티켓팅의 독창성",
    description:
      "비콘이나 블록체인 같은 트렌디한 단어로 치장하지 않습니다. 모바일 GPS, QR, NFC라는 가장 검증되고 범용적인 매개체를 활용해 공공마이데이터 자격 대조를 0.5초 이내에 끝내는 트랜잭션 최적화 기술을 구현했습니다.",
  },
  {
    title: "AI 민원콜센터의 보안 철학",
    description:
      "개인정보 비식별화 처리 및 화자인증 기반 본인 확인 모델을 결합하여, 공공기관 감사 로그 기준을 충족하는 철저한 내부 통제형 AI 구조를 탑재했습니다.",
  },
];
