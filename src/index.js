/**
 * 무한 텍스트 스크롤러
 * @version 1.4.0
 * @author deep
 * @description 무한 스크롤 텍스트 애니메이션을 위한 경량 라이브러리
 * WCAG 2.2.2 (Pause, Stop, Hide) 준수
 * prefers-reduced-motion 지원
 * @license MIT
 */

import { DEFAULT_CONFIG, PRESETS } from './constants.js';
import { validateNumber, createElement, createTrack } from './helpers.js';
import { injectStyles, createInstanceStyles } from './styles.js';
import { createInstanceMethods, setupEventListeners } from './instance.js';

export class InfiniteTextScroller {
  static VERSION = '1.4.0';
  static instances = new Map();

  static defaultConfig = DEFAULT_CONFIG;
  static presets = PRESETS;

  /**
   * 문서 헤드에 스타일 주입
   */
  static injectStyles = injectStyles;

  /**
   * 새로운 텍스트 스크롤러 인스턴스 생성
   * @param {Object} options - 설정 옵션
   * @param {string} options.preset - 프리셋 이름 (minimal, news, ticker, banner, alert, announcement, currency, stock)
   * @returns {Object|null} 제어 메서드가 포함된 스크롤러 인스턴스
   */
  static create(options) {
    // 프리셋 적용
    let presetConfig = {};
    if (options.preset && InfiniteTextScroller.presets[options.preset]) {
      presetConfig = InfiniteTextScroller.presets[options.preset];
    }

    // 우선순위: defaultConfig < preset < options
    const config = {
      ...InfiniteTextScroller.defaultConfig,
      ...presetConfig,
      ...options
    };

    // 필수 옵션 검증
    if (!config.containerId) {
      console.error('[TextScroller] containerId는 필수입니다');
      return null;
    }

    if (!config.text && !config.html && !config.children) {
      console.error('[TextScroller] text, html, children 중 하나는 필수입니다');
      return null;
    }

    // 숫자 파라미터 검증
    config.speed = validateNumber(config.speed, 'speed');
    config.duplicates = validateNumber(config.duplicates, 'duplicates');
    config.separatorOpacity = validateNumber(config.separatorOpacity, 'separatorOpacity');

    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error(`[TextScroller] ID "${config.containerId}"를 가진 요소를 찾을 수 없습니다`);
      return null;
    }

    // 스타일 주입 (활성화된 경우)
    if (config.autoInjectStyles) {
      InfiniteTextScroller.injectStyles();
    }

    // 컨테이너 클래스 추가
    if (!container.classList.contains('its-scroller-container')) {
      container.classList.add('its-scroller-container');
    }

    // ARIA 속성 설정
    container.setAttribute('role', config.role);
    if (config.ariaLabel) {
      container.setAttribute('aria-label', config.ariaLabel);
    }
    if (config.ariaLive !== 'off') {
      container.setAttribute('aria-live', config.ariaLive);
    } else {
      container.setAttribute('aria-live', 'off');
    }

    // 키보드 제어 활성화
    if (config.enableKeyboardControl) {
      container.setAttribute('tabindex', '0');
    }

    // 테두리 클래스 추가
    if (config.borderTop) {
      container.classList.add('its-border-top');
    }
    if (config.borderBottom) {
      container.classList.add('its-border-bottom');
    }

    // 래퍼 생성
    const wrapperClasses = [
      'its-scroller-wrapper',
      config.animationType === 'fade' ? 'its-fade-type' : `its-${config.direction}`,
      config.fadeEdges && config.animationType !== 'fade' ? 'its-fade-enabled' : '',
      config.rtl ? 'its-rtl' : '',
      config.className
    ].filter(Boolean).join(' ');

    const wrapper = createElement('div', wrapperClasses);

    // 인스턴스별 스타일 태그 생성
    createInstanceStyles(config.containerId, {
      '--its-animation-speed': `${config.speed}s`,
      '--its-font-size': config.fontSize,
      '--its-font-weight': config.fontWeight,
      '--its-font-family': config.fontFamily,
      '--its-text-color': config.textColor,
      '--its-bg-color': config.backgroundColor,
      '--its-fade-width': config.fadeWidth,
      '--its-border-color': config.borderColor,
      '--its-border-width': config.borderWidth,
      '--its-padding': config.padding,
      '--its-gap': config.gap,
      '--its-letter-spacing': config.letterSpacing,
      '--its-animation-timing': config.animationTimingFunction,
      '--its-animation-delay': config.animationDelay,
      '--its-separator-opacity': config.separatorOpacity,
      '--its-separator-color': config.separatorColor !== 'inherit' ? config.separatorColor : config.textColor
    });

    // 트랙 생성
    const track = createTrack(
      config.text,
      config.separator,
      config.direction,
      config.duplicates,
      config
    );

    if (config.pauseOnHover) {
      track.classList.add('its-pause-on-hover');
    }

    wrapper.appendChild(track);
    container.appendChild(wrapper);

    // prefers-reduced-motion 감지
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = mediaQuery.matches;

    // 인스턴스 메서드 생성
    const instance = createInstanceMethods({
      config,
      wrapper,
      track,
      container,
      mediaQuery,
      isReducedMotion,
      instancesMap: InfiniteTextScroller.instances
    });

    // 이벤트 리스너 설정
    setupEventListeners(instance, config, container, mediaQuery);

    // Fade 타입 초기화
    if (config.animationType === 'fade' && !isReducedMotion) {
      instance.fadeShowItem(0);
      instance.fadeStart();
    }

    // 인스턴스 저장
    InfiniteTextScroller.instances.set(config.containerId, instance);

    return instance;
  }

  /**
   * 컨테이너 ID로 기존 스크롤러 인스턴스 가져오기
   * @param {string} containerId - 컨테이너 요소 ID
   * @returns {Object|undefined} 스크롤러 인스턴스
   */
  static getInstance(containerId) {
    return InfiniteTextScroller.instances.get(containerId);
  }

  /**
   * 모든 스크롤러 인스턴스 제거
   */
  static destroyAll() {
    for (const instance of InfiniteTextScroller.instances.values()) {
      instance.destroy();
    }
  }

  /**
   * 모든 활성 인스턴스 가져오기
   * @returns {Array} 스크롤러 인스턴스 배열
   */
  static getAllInstances() {
    return Array.from(InfiniteTextScroller.instances.values());
  }

  /**
   * 모든 인스턴스 일시 정지
   */
  static pauseAll() {
    for (const instance of InfiniteTextScroller.instances.values()) {
      instance.pause();
    }
  }

  /**
   * 모든 인스턴스 재생
   */
  static playAll() {
    for (const instance of InfiniteTextScroller.instances.values()) {
      instance.play();
    }
  }
}

export default InfiniteTextScroller;

export const createScroller = InfiniteTextScroller.create.bind(InfiniteTextScroller);
export const getScroller = InfiniteTextScroller.getInstance.bind(InfiniteTextScroller);
export const destroyAllScrollers = InfiniteTextScroller.destroyAll.bind(InfiniteTextScroller);
export const pauseAllScrollers = InfiniteTextScroller.pauseAll.bind(InfiniteTextScroller);
export const playAllScrollers = InfiniteTextScroller.playAll.bind(InfiniteTextScroller);
