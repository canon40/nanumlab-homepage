/**
 * 히어로 우측 비주얼 모드 설정
 *
 * 배포 시 적용할 모드를 defaultMode에 지정하세요.
 * 개발 중에는 화면 우하단 피커로 실시간 미리보기가 가능합니다.
 */
export const HERO_VISUAL_MODES = {
  none: {
    label: '삭제',
    description: '텍스트·버튼만 남기고 깔끔하게',
  },
  code: {
    label: '유지',
    description: '코드 스니펫 — 기술 기업 느낌',
  },
  mockup: {
    label: '서비스 목업',
    description: '스마트 티켓 서비스 화면 목업',
  },
  architecture: {
    label: '아키텍처',
    description: 'DX 플랫폼 아키텍처 다이어그램',
  },
  screenshot: {
    label: '스크린샷',
    description: '실제 제품 스크린샷 이미지',
  },
};

export const heroVisualConfig = {
  /** 배포 시 사용할 기본 모드: none | code | mockup | architecture | screenshot */
  defaultMode: 'code',

  /** 개발 서버에서 우하단 피커 표시 여부 */
  showPicker: import.meta.env.DEV,

  /** screenshot 모드에서 사용할 이미지 경로 (public 폴더 기준) */
  screenshotSrc: '/images/product-screenshot.png',
  screenshotAlt: '나눔랩 제품 스크린샷',
};
