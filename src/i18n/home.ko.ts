/** 홈페이지 10섹션 콘텐츠 — KO */
export const homeKo = {
  nav: {
    home: "홈",
    about: "회사 소개",
    solutions: "솔루션",
    technology: "기술",
    cases: "적용 사례",
    contact: "문의하기",
  },
  hero: {
    eyebrow: "나눔을 실현하는, 작지만 강한 스타트업",
    headline: "공공기관과 지역사회를 위해 가장 단순하고 강력한 AI 서비스를 설계함.",
    subcopy:
      "나눔랩은 생성형 AI, 머신러닝, 데이터레이크, 애플리케이션 개발에 특화된 스타트업입니다. 같은 기술 역량으로 공공마이데이터 연계, 지능형 OCR·민원 AI, 누구나 쉽게 쓰는 로컬 AI 플랫폼 등 공공 DX 솔루션을 설계·구축합니다.",
    ctaSolutions: "핵심 솔루션 확인",
    ctaContact: "지자체 도입 문의",
    chips: ["LLM", "OCR", "STT", "MyData", "Vector DB", "AI Agent"],
    stats: [
      { value: "0.5s", label: "마이데이터 자격 판정" },
      { value: "30+", label: "공공 API 연계 설계" },
      { value: "6", label: "통합 AI 엔진" },
      { value: "On-Prem", label: "폐쇄망 독립 구동" },
    ],
    terminal: {
      filename: "nanumlab-ai-core.ts",
      comment: "// 나눔랩 공공 AI 엔진 — 실시간 가동 중",
      status: "● AI Pipeline Active",
    },
    goBoard: {
      eyebrow: "AI Decision · 경우의수 분석",
      caption: "하나의 행정 상황에서 최적의 경로를 찾는 AI 의사결정 — 바둑의 수 읽기처럼 가능한 경우를 모두 검토합니다.",
      ariaLabel: "바둑판 위 경우의수 분석 애니메이션",
    },
    globe: {
      eyebrow: "글로벌 AI 네트워크",
      caption: "공공·지역 현장의 AI가 전 세계 데이터 흐름처럼 실시간으로 연결·학습·응답합니다.",
      ariaLabel: "회전하는 AI 지구 와이어프레임 애니메이션",
    },
    dashboard: {
      title: "nanumlab-ai-dashboard",
      status: "● 전체 시스템 정상",
      pipeline: "실시간 AI 파이프라인",
      caption: "OCR, STT, LLM, MyData가 하나의 화면에서 실시간으로 동작합니다.",
    },
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    title: "모든 역량을 모아 최적의 솔루션을 만듭니다",
    headline:
      "첨단기술을 활용하여 고객사의 다양한 비즈니스 문제를 해결하고, 기존 업무 프로세스를 최적화하는 솔루션을 제공합니다.",
    pillars: [
      {
        id: "ai-ml",
        title: "AI & 머신러닝 데이터 분석·예측",
        description:
          "데이터 수집부터 분석, 예측까지 전 과정을 책임지며 보다 정확하고 효율적인 의사결정을 돕습니다.",
      },
      {
        id: "datalake",
        title: "빅데이터 & 데이터레이크",
        description:
          "정형·비정형·반정형 데이터 소스 연계, 대용량 분석, 워크플로우·시각화까지 데이터 Lifecycle을 하나로 담은 통합 빅데이터 플랫폼을 제공합니다.",
      },
      {
        id: "mobile",
        title: "모바일 애플리케이션",
        description:
          "고객사 요구에 맞는 맞춤형 모바일·웹 솔루션을 제공하며, 전개와 유지보수 과정에서도 전문적이고 친절한 서비스를 제공합니다.",
      },
    ],
  },
  corporateServices: {
    eyebrow: "Services",
    title: "나눔랩이 제공하는 기술 서비스",
    description: "AI부터 IoT, 데이터레이크, 앱 개발까지 엔드투엔드로 지원합니다.",
    items: [
      {
        id: "ai-ml",
        title: "AI & 머신러닝 기술",
        description: "데이터 수집·분석·예측 전 과정을 책임지는 AI/ML 서비스",
      },
      {
        id: "iot",
        title: "IoT 시스템 구축·관리",
        description: "센서, 클라우드, 데이터 분석을 활용한 IoT 시스템 구축 및 안정적 운영",
      },
      {
        id: "datalake",
        title: "데이터레이크 구축·관리",
        description: "대용량 데이터 저장·처리 데이터레이크 구축과 데이터 관리·분석",
      },
      {
        id: "app-dev",
        title: "애플리케이션 개발·유지보수",
        description: "iOS, Android, 웹 등 다양한 플랫폼 앱 개발과 지속적 유지보수",
      },
    ],
  },
  ourServices: {
    eyebrow: "Our Services",
    title: "최선의 방법으로 최고의 솔루션을 만듭니다",
    description:
      "나눔랩은 기술 컨설팅과 문제 해결 컨설팅, 관련 분야 교육을 제공합니다. 기술 혁신과 고객 만족을 추구하며, 다양한 파트너와 협력해 성장 가능성 있는 기업으로 나아갑니다.",
    cta: "솔루션 전체 보기",
  },
  process: {
    eyebrow: "How It Works",
    title: "Our Process",
    description: "요구사항부터 검증까지 고객과 함께하는 표준 프로젝트 프로세스입니다.",
    steps: [
      {
        id: "analyze",
        step: "01",
        title: "요구사항 분석 및 계획 수립",
        body: "고객사 요구사항을 상세히 파악하고 문제점을 분석합니다. 최적의 기술·서비스 제공을 위한 계획을 수립합니다.",
      },
      {
        id: "develop",
        step: "02",
        title: "디자인 및 개발",
        body: "고객사와 협업하여 UI/UX 디자인과 시스템 개발을 수행합니다.",
      },
      {
        id: "verify",
        step: "03",
        title: "테스트 및 검증",
        body: "완성된 시스템이 요구사항을 충족하는지 테스트·검증을 수행합니다.",
      },
    ],
  },
  companyStats: [
    { value: "10+", label: "Project" },
    { value: "10+", label: "Satisfied Clients" },
    { value: "3", label: "Win Awards" },
    { value: "5+", label: "Team Member" },
  ],
  quickContact: {
    eyebrow: "Need Help",
    title: "무엇을 도와드릴까요?",
    description: "고객님의 불편사항이나 궁금증을 해결해 드리겠습니다.",
    onlineTitle: "온라인 문의",
    onlineDescription: "궁금하신 사항은 온라인 상담 문의로 질문해 주세요.",
    subjects: ["솔루션 문의", "견적 문의"],
  },
  aiCapabilities: {
    eyebrow: "AI 기술",
    title: "나눔랩이 제공하는 AI 기술",
    description: "LLM, OCR, STT, 검색 AI를 하나로 묶어 공공 서비스에 바로 적용합니다.",
    items: [
      { tag: "RAG", title: "LLM Chatbot", description: "공공서비스 안내, 관광 안내, 내부 업무 질의응답" },
      { tag: "Vision", title: "OCR Engine", description: "영수증·증빙자료·행정문서 AI 인식 및 자동 검증" },
      { tag: "Speech", title: "STT Pipeline", description: "민원 상담 음성 텍스트화 및 AI 요약·분류" },
      { tag: "ML", title: "AI Recommendation", description: "지역 상권·관광지 맞춤형 추천 모델" },
      { tag: "Embedding", title: "Vector Search", description: "문서 기반 자연어 검색과 RAG 질의응답" },
      { tag: "Agent", title: "AI Agent", description: "Tool Calling 기반 행정 업무 자동화 워크플로우" },
    ],
  },
  whatWeDo: {
    eyebrow: "우리가 하는 일",
    subtitle: "행정 현장과 주민 생활에 바로 쓰이는 AI 서비스를 만듭니다.",
    cards: [
      {
        title: "공공 디지털 플랫폼",
        description: "공공기관 보안 규격에 맞는 주민 서비스·행정 관리 시스템을 설계합니다.",
      },
      {
        title: "누구나 쓰는 AI",
        description: "복잡한 조작 없이 말로 검색하고, 음성으로 질문하는 AI 서비스를 제공합니다.",
      },
      {
        title: "업무 자동화",
        description: "반복되는 서류 검증·정산 업무를 AI가 대신 처리하도록 만듭니다.",
      },
    ],
  },
  edge: {
    title: "나눔랩을 선택하는 이유",
    quote: "공공 서비스는 화려한 기술이 아니라, 현장에서 실제로 돌아가야 합니다.",
    items: [
      {
        id: "security",
        badge: "보안",
        title: "공공 폐쇄망·내부망 맞춤형 AI 설계",
        body: "외부 클라우드 연결이 제한되는 관공서 보안 특성을 완벽히 반영함. 외부망 유출 없이 기관 내부 서버(On-Premise) 내에서 독립 구동되는 경량화 AI 아키텍처(FastAPI + Docker)를 표준화하여 행정 보안성 검토를 완벽히 충족함.",
      },
      {
        id: "mydata",
        badge: "실용",
        title: "서류 제출 없는 행정의 실현, 공공마이데이터 최적화",
        body: "법정 감면(장애인, 국가유공자, 다자녀 등) 자격 검증을 위해 주민에게 주민등록등본 등의 증빙서류 제출을 요구하지 않음. 행정안전부 공공마이데이터 API 응답 필드를 DB 스키마단에서 실시간 매핑하여 0.5초 만에 자격 확인과 감면 결제를 끝내는 독자적 트랜잭션 기술 보유.",
      },
      {
        id: "inclusion",
        badge: "포용",
        title: "디지털 취약계층을 위한 UI/UX 철학",
        body: "스마트폰 타이핑이나 복잡한 메뉴 찾기에 어려움을 겪는 어르신과 디지털 취약계층을 먼저 생각함. 시인성 높은 직관적인 UI 설계와 함께, 말 한마디로 원하는 시설 예약이나 상권 정보를 찾는 '자연어 음성 AI'를 결합하여 누구도 소외되지 않는 따뜻한 기술을 지향함.",
      },
    ],
  },
  solutions: {
    subtitle: "공공기관 현장에서 검증된 나눔랩의 핵심 솔루션입니다.",
    items: [
      {
        id: "smart-ticket",
        title: "공공마이데이터 스마트 티켓 플랫폼",
        flow: "모바일 예매 → 공공마이데이터 실시간 자격 조회 → 자동 감면 결제 → QR 발권 및 현장 검표 → 정산 대시보드 원스톱 통합",
      },
      {
        id: "ocr",
        title: "OCR 행정·증빙문서 자동화 엔진",
        flow: "공공지원금 정산 시 밀려드는 영수증·숙박 증빙에서 AI OCR이 상호명·금액·날짜를 정확히 추출하여 담당 공무원의 반복 검수 업무를 제로화함",
      },
      {
        id: "callcenter",
        title: "지능형 AI 민원콜센터 지원 시스템",
        flow: "민원인 음성 실시간 STT → AI 민원 유형 분류·핵심 상담 요약·감정 상태 시각화 → 상담 주무관 업무 효율 극대화",
      },
      {
        id: "local",
        title: "지역 상권 상생 AI 추천 플랫폼",
        flow: "주민 자연어 질의 인식 → 지역 상권 DB 기반 최적 매장 매칭 → 소상공인과 주민이 상생하는 로컬 커머스 모델",
      },
    ],
  },
  futureTech: {
    subtitle: "앞으로 지자체 정책과 문화·관광을 돕기 위해 준비 중인 기술입니다.",
    items: [
      {
        id: "geo",
        title: "공공데이터·위성정보 AI 분석",
        body: "공개 위성자료(Sentinel, Landsat)와 공간정보 데이터를 결합하여 농지 변화 탐지, 지자체 행정 모니터링 등 데이터 기반 정책 의사결정을 지원하는 AI 분석 체계 기획.",
      },
      {
        id: "xr",
        title: "XR·3D 공간 데이터 자산화",
        body: "Matterport 3D 스캔 기술을 활용해 공공시설, 박물관, 관광지를 디지털 트윈 공간 콘텐츠로 전환하고 시공간 제약 없는 디지털 안내 서비스를 제공함.",
      },
    ],
  },
  technology: {
    subtitle: "주민에게 보이는 쉬운 화면 뒤에는 안전하고 확장 가능한 기술 구조가 있습니다.",
    tabs: [
      {
        id: "frontend",
        label: "Frontend",
        body: "React, Vite, Tailwind CSS, shadcn/ui 조합으로 디지털 취약계층도 끊김 없이 사용하는 초경량·초고속 반응형 UI 및 관리자 포털 대시보드 구현.",
        tags: ["React", "Vite", "Tailwind CSS", "shadcn/ui", "반응형 UI"],
      },
      {
        id: "backend",
        label: "Backend & Security",
        body: "FastAPI, Node.js, API Gateway 기반으로 철저한 역할 기반 접근 제어(RBAC)와 공공 보안 가이드라인에 맞춘 감사 로그 체계 확립.",
        tags: ["FastAPI", "Node.js", "API Gateway", "RBAC", "감사 로그"],
      },
      {
        id: "database",
        label: "Database",
        body: "PostgreSQL, MySQL, Supabase, Neon 아키텍처를 활용하여 공공마이데이터 연계 트래픽을 안전하게 분산 처리하는 고신뢰성 데이터 모델링.",
        tags: ["PostgreSQL", "MySQL", "Supabase", "Neon"],
      },
      {
        id: "ai",
        label: "AI & Data",
        body: "LLM 챗봇, Vector DB 자연어 검색, STT/OCR 파이프라인, AI Tool Calling 지능형 워크플로우 엔진 구비.",
        tags: ["LLM", "Vector DB", "STT", "OCR", "Tool Calling"],
      },
    ],
  },
  architecture: {
    title: "Integrated Public Platform Architecture",
    flow: [
      "주민 모바일/웹 서비스",
      "초경량 Frontend Application",
      "보안 API Gateway",
      "FastAPI 백엔드 서비스",
      "내부 DB & AI 엔진 (폐쇄망)",
      "정부 공공 API / 공공마이데이터",
    ],
    footer:
      "공공 서비스는 단순 화면 개발보다 운영 관리, 접근 권한, 감사 로그, 통계 정산, 폐쇄망 보안 구조가 핵심임. 나눔랩은 이를 고려하여 설계 단계부터 조달 규격에 맞춘 아키텍처를 수립함.",
  },
  useCases: {
    subtitle: "지자체·공공기관에서 실제로 도입할 수 있는 분야입니다.",
    items: [
      {
        title: "지자체 문화·관광 시설",
        body: "모바일 스마트 예매, 마이데이터 자동 감면, QR 무인 검표 시스템 도입으로 운영비 절감.",
      },
      {
        title: "공공지원금 사업 부서",
        body: "영수증 및 증빙서류 AI OCR 자동 검증으로 수작업 정산 업무 시간 80% 단축.",
      },
      {
        title: "도청/구청 민원실",
        body: "AI 민원 요약 및 화자인증 본인 확인 결합으로 민원 처리 속도 및 행정 신뢰도 향상.",
      },
    ],
  },
  roadmap: {
    title: "Future Roadmap for Public DX",
    phases: [
      {
        phase: "Phase 1",
        label: "신속 도입",
        body: "스마트 티켓팅, OCR 증빙 검증, 표준 행정 관리자 시스템 구축.",
      },
      {
        phase: "Phase 2",
        label: "지능화",
        body: "대민 대화형 AI 챗봇, 로컬 상권 맞춤형 자연어 추천 엔진 탑재.",
      },
      {
        phase: "Phase 3",
        label: "행정 고도화",
        body: "AI 민원콜센터 STT 분석 파이프라인 및 위성정보·공간데이터 기반 행정 분석 서비스 연계.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    subtitle: "관공서의 행정 환경과 주민의 편리함을 깊이 이해하는 나눔랩이 공공 DX의 가장 확실한 이정표를 제시하겠음.",
    fields: {
      name: "이름",
      org: "기관명(지자체명)",
      dept: "부서명",
      email: "이메일",
      phone: "연락처",
      topic: "문의 분야",
      message: "문의 내용",
    },
    topics: [
      "솔루션 문의",
      "견적 문의",
      "공공 DX 플랫폼",
      "스마트 티켓팅",
      "OCR 행정 자동화",
      "AI 민원콜센터",
      "지역 AI 추천 플랫폼",
      "공공데이터 분석",
      "기타",
    ],
    cta: "프로젝트 도입 문의하기",
  },
  scenarios: {
    tabOfficial: "공무원 업무 효율",
    tabResident: "주민 사용 시나리오",
    before: "도입 전",
    after: "도입 후",
    residentStory: "주민 후기",
  },
  infographic: {
    mobileLabel: "주민용 모바일",
    adminLabel: "공무원 관리 화면",
    flowVerify: "자격 자동 검증",
    citizenApp: "주민 앱",
    benefitCheck: "감면 자격 확인",
    qrTicket: "QR 발권 완료",
    adminDash: "행정 관리 대시보드",
    oneClick: "클릭 한 번 승인",
    auditLog: "감사 로그 자동 기록",
  },
  footer: {
    desc: "나눔랩은 융합, 연결, 공유를 통해 기업의 디지털 전환(DX)에 새로운 방향을 제시합니다.",
    copyright: "© 주식회사 나눔랩 · Chuncheon, Gangwon-do",
    quickLinks: "Quick Links",
    support: "Support",
    quickContact: "Quick Contact",
    links: {
      home: "Home",
      about: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
    },
    address: "24372 강원도 춘천시 공지로 305, 춘천시1인창조기업지원센터 401-19",
    email: "june@nanumlab.com",
    phone: "+82 32-912-1004",
  },
} as const;
