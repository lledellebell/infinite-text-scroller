/**
 * 상수 및 기본 설정
 * @module constants
 */

// 타이밍 상수
export const TIMING = {
  HOVER_RESUME_DELAY: 2000,
  FOCUS_RESUME_DELAY: 2000,
  VISIBILITY_RESUME_DELAY: 500
};

// 기본 설정
export const DEFAULT_CONFIG = {
  text: '',
  html: '',
  children: '',
  direction: 'horizontal',
  animationType: 'scroll', // 'scroll' | 'fade'
  speed: 20,
  interval: 5000, // fade 타입용 (ms)
  fontSize: '1.2rem',
  fontWeight: '400',
  fontFamily: 'inherit',
  textColor: '#000000',
  backgroundColor: '#ffffff',
  separator: '—',
  separatorColor: 'inherit',
  separatorOpacity: 0.5,
  duplicates: 3,
  pauseOnHover: true,
  pauseOnFocus: true,
  autoInjectStyles: true,
  className: '',
  fadeEdges: true,
  fadeWidth: 'clamp(60px, 10vw, 100px)',
  borderTop: true,
  borderBottom: true,
  borderColor: '#000000',
  borderWidth: '1px',
  padding: 'clamp(1rem, 2vw, 2rem)',
  gap: 'calc(var(--its-spacing-base) * 2)',
  letterSpacing: '-0.01em',
  animationTimingFunction: 'linear',
  animationDelay: '0s',
  rtl: false,
  // ARIA/접근성
  ariaLabel: '',
  ariaLive: 'off', // 'off' | 'polite' | 'assertive'
  role: 'marquee', // 'marquee' | 'region'
  // 키보드 제어
  enableKeyboardControl: true,
  // prefers-reduced-motion 대응
  reducedMotionFallback: 'slow' // 'slow' | 'static' | 'none'
};

// 프리셋 설정
export const PRESETS = {
  minimal: {
    borderTop: false,
    borderBottom: false,
    fadeEdges: false,
    padding: '1rem',
    backgroundColor: 'transparent'
  },
  news: {
    speed: 15,
    separator: '•',
    borderTop: true,
    borderBottom: true,
    fadeEdges: true,
    ariaLabel: '뉴스 티커'
  },
  ticker: {
    speed: 10,
    separator: '|',
    separatorOpacity: 0.3,
    fontSize: '1rem',
    fadeEdges: true,
    ariaLabel: '실시간 정보 티커'
  },
  banner: {
    speed: 25,
    separator: '—',
    borderTop: false,
    borderBottom: false,
    fadeEdges: true,
    fadeWidth: '100px',
    padding: '2rem'
  },
  alert: {
    speed: 12,
    separator: '⚠',
    separatorColor: '#ff0000',
    textColor: '#ff0000',
    backgroundColor: '#fff3cd',
    borderTop: true,
    borderBottom: true,
    borderColor: '#ff0000',
    ariaLive: 'polite'
  },
  // 새로운 프리셋: 공지사항 (fade-in/out)
  announcement: {
    animationType: 'fade',
    interval: 5000,
    separator: '',
    borderTop: true,
    borderBottom: true,
    fadeEdges: false,
    backgroundColor: '#fef3c7',
    textColor: '#92400e',
    borderColor: '#fbbf24',
    ariaLabel: '공지사항',
    pauseOnHover: true,
    pauseOnFocus: true
  },
  // 환율/주식 티커
  currency: {
    speed: 20,
    separator: '|',
    separatorOpacity: 0.3,
    fontSize: '1rem',
    fadeEdges: true,
    borderTop: true,
    borderBottom: false,
    backgroundColor: '#1e3a8a',
    textColor: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ariaLabel: '실시간 환율 정보',
    pauseOnHover: true
  },
  stock: {
    speed: 15,
    separator: '•',
    separatorOpacity: 0.5,
    fontSize: '0.95rem',
    fadeEdges: true,
    borderTop: true,
    borderBottom: true,
    backgroundColor: '#0f172a',
    textColor: '#e2e8f0',
    borderColor: '#334155',
    ariaLabel: '실시간 주식 정보',
    pauseOnHover: true
  }
};

// 검증 범위
export const VALIDATION_RANGES = {
  speed: { min: 0.1, max: 1000, default: 20 },
  duplicates: { min: 1, max: 20, default: 3 },
  separatorOpacity: { min: 0, max: 1, default: 0.5 }
};

// 허용된 HTML 태그 및 속성
export const ALLOWED_HTML = {
  tags: new Set(['b', 'strong', 'i', 'em', 'u', 'span', 'br', 'mark']),
  attributes: new Set(['style', 'class'])
};
