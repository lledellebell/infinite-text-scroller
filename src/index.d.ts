export interface ScrollerConfig {
  // 콘텐츠
  text?: string;
  html?: string;
  children?: string;
  containerId: string;

  // 프리셋
  preset?: 'minimal' | 'news' | 'ticker' | 'banner' | 'alert' | 'announcement' | 'currency' | 'stock';

  // 애니메이션
  animationType?: 'scroll' | 'fade';
  direction?: 'horizontal' | 'vertical';
  speed?: number;
  interval?: number;
  animationTimingFunction?: string;
  animationDelay?: string;

  // 스타일
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: string;
  separator?: string;
  separatorColor?: string;
  separatorOpacity?: number;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderColor?: string;
  borderWidth?: string;
  padding?: string;
  gap?: string;
  letterSpacing?: string;
  fadeEdges?: boolean;
  fadeWidth?: string;

  // 동작
  duplicates?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  rtl?: boolean;

  // 접근성
  role?: 'marquee' | 'region';
  ariaLabel?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
  enableKeyboardControl?: boolean;
  reducedMotionFallback?: 'slow' | 'static' | 'none';

  // 기타
  autoInjectStyles?: boolean;
  className?: string;
}

export interface ScrollerInstance {
  id: string;
  element: HTMLElement;
  track: HTMLElement;
  container: HTMLElement;
  config: ScrollerConfig;
  isPlaying: boolean;
  isReducedMotion: boolean;
  fadeCurrentIndex?: number;
  fadeIsPaused?: boolean;

  // 콘텐츠 업데이트
  updateText: (newText: string) => ScrollerInstance;
  updateHtml: (newHtml: string) => ScrollerInstance;
  updateChildren: (newChildren: string) => ScrollerInstance;

  // 스타일 업데이트
  updateSpeed: (newSpeed: number) => ScrollerInstance;
  updateDirection: (newDirection: 'horizontal' | 'vertical') => ScrollerInstance;
  updateColors: (colors: { textColor?: string; backgroundColor?: string; borderColor?: string }) => ScrollerInstance;
  updateConfig: (config: Partial<ScrollerConfig>) => ScrollerInstance;

  // 재생 제어
  pause: () => ScrollerInstance;
  play: () => ScrollerInstance;
  toggle: () => ScrollerInstance;
  reset: () => ScrollerInstance;
  setDelay: (delay: string) => ScrollerInstance;

  // Fade 애니메이션 전용
  fadeShowItem?: (index: number) => ScrollerInstance;
  fadeNext?: () => ScrollerInstance;
  fadeStart?: () => ScrollerInstance;
  fadeStop?: () => ScrollerInstance;
  fadePause?: () => ScrollerInstance;
  fadeResume?: () => ScrollerInstance;

  // 기타
  destroy: () => void;
  getState: () => {
    isPlaying: boolean;
    config: ScrollerConfig;
    fadeCurrentIndex?: number;
    isReducedMotion: boolean;
  };
}

export class InfiniteTextScroller {
  static VERSION: string;
  static instances: Map<string, ScrollerInstance>;
  static defaultConfig: ScrollerConfig;
  static presets: Record<string, Partial<ScrollerConfig>>;
  static create(options: ScrollerConfig): ScrollerInstance | null;
  static getInstance(containerId: string): ScrollerInstance | undefined;
  static destroyAll(): void;
  static getAllInstances(): ScrollerInstance[];
  static pauseAll(): void;
  static playAll(): void;
  static injectStyles(): void;
}

export default InfiniteTextScroller;

export function createScroller(options: ScrollerConfig): ScrollerInstance | null;
export function getScroller(containerId: string): ScrollerInstance | undefined;
export function destroyAllScrollers(): void;
export function pauseAllScrollers(): void;
export function playAllScrollers(): void;