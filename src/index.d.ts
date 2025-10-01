export interface ScrollerConfig {
  text?: string;
  html?: string;
  containerId: string;
  direction?: 'horizontal' | 'vertical';
  speed?: number;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: string;
  separator?: string;
  separatorColor?: string;
  separatorOpacity?: number;
  duplicates?: number;
  pauseOnHover?: boolean;
  autoInjectStyles?: boolean;
  className?: string;
  fadeEdges?: boolean;
  fadeWidth?: string;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderColor?: string;
  borderWidth?: string;
  padding?: string;
  gap?: string;
  letterSpacing?: string;
  animationTimingFunction?: string;
  animationDelay?: string;
  rtl?: boolean;
}

export interface ScrollerInstance {
  id: string;
  element: HTMLElement;
  track: HTMLElement;
  container: HTMLElement;
  config: ScrollerConfig;
  isPlaying: boolean;
  updateText: (newText: string) => ScrollerInstance;
  updateSpeed: (newSpeed: number) => ScrollerInstance;
  updateDirection: (newDirection: 'horizontal' | 'vertical') => ScrollerInstance;
  updateColors: (colors: { textColor?: string; backgroundColor?: string; borderColor?: string }) => ScrollerInstance;
  updateConfig: (config: Partial<ScrollerConfig>) => ScrollerInstance;
  pause: () => ScrollerInstance;
  play: () => ScrollerInstance;
  toggle: () => ScrollerInstance;
  reset: () => ScrollerInstance;
  setDelay: (delay: string) => ScrollerInstance;
  destroy: () => void;
  getState: () => { isPlaying: boolean; config: ScrollerConfig };
}

export class InfiniteTextScroller {
  static VERSION: string;
  static instances: Map<string, ScrollerInstance>;
  static defaultConfig: ScrollerConfig;
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