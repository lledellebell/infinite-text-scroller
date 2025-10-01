/**
 * 무한 텍스트 스크롤러 팩토리
 * 무한 스크롤 텍스트 애니메이션 생성을 위한 현대적이고 가벼운 라이브러리
 * @version 1.0.0
 */

export class InfiniteTextScroller {
  static VERSION = '1.0.0';
  static instances = new Map();

  static defaultConfig = {
    text: '',
    direction: 'horizontal',
    speed: 20,
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
    rtl: false
  };

  // 비공개 헬퍼: DOM 요소 생성
  static #createElement = (tag, className, textContent = '') => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
  };

  // 비공개 헬퍼: CSS 커스텀 속성 적용
  static #applyStyles = (element, styles) => {
    Object.entries(styles).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        element.style.setProperty(key, value);
      }
    });
  };

  // 비공개 헬퍼: 개별 스크롤러 아이템 생성
  static #createScrollerItem = (text, separator, direction, config) => {
    const item = InfiniteTextScroller.#createElement('div', 'its-scroller-item');
    const textSpan = InfiniteTextScroller.#createElement('span', 'its-scroller-text', text);
    
    if (config.fontFamily) {
      textSpan.style.fontFamily = config.fontFamily;
    }
    
    item.appendChild(textSpan);
    
    if (direction === 'horizontal' && separator) {
      const separatorSpan = InfiniteTextScroller.#createElement('span', 'its-scroller-separator', separator);
      if (config.separatorColor && config.separatorColor !== 'inherit') {
        separatorSpan.style.color = config.separatorColor;
      }
      item.appendChild(separatorSpan);
    }
    
    return item;
  };

  // 비공개 헬퍼: 복제된 스크롤러 트랙 생성
  static #createTrack = (text, separator, direction, duplicates, config) => {
    const track = InfiniteTextScroller.#createElement('div', 'its-scroller-track');
    const totalItems = duplicates * 2;

    const fragment = document.createDocumentFragment();
    Array.from({ length: totalItems }).forEach(() => {
      fragment.appendChild(
        InfiniteTextScroller.#createScrollerItem(text, separator, direction, config)
      );
    });
    
    track.appendChild(fragment);
    return track;
  };

  // 문서 헤드에 스타일 주입
  static injectStyles() {
    if (document.getElementById('infinite-text-scroller-styles')) return;

    const style = document.createElement('style');
    style.id = 'infinite-text-scroller-styles';
    style.textContent = `
      .its-scroller-container {
        position: relative;
      }

      .its-scroller-container.its-border-top {
        border-block-start: var(--its-border-width, 1px) solid var(--its-border-color, #000000);
      }

      .its-scroller-container.its-border-bottom {
        border-block-end: var(--its-border-width, 1px) solid var(--its-border-color, #000000);
      }

      .its-scroller-container:not(:last-child).its-border-bottom {
        border-block-end: none;
      }

      .its-scroller-wrapper {
        overflow: hidden;
        display: flex;
        position: relative;
        padding-block: var(--its-padding, clamp(1rem, 2vw, 2rem));
        isolation: isolate;
        background-color: var(--its-bg-color, #ffffff);
      }

      .its-scroller-wrapper::before,
      .its-scroller-wrapper::after {
        content: '';
        position: absolute;
        inset-block: 0;
        inline-size: var(--its-fade-width, clamp(60px, 10vw, 100px));
        z-index: 1;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .its-scroller-wrapper.its-fade-enabled::before,
      .its-scroller-wrapper.its-fade-enabled::after {
        opacity: 1;
      }

      .its-scroller-wrapper.its-horizontal::before {
        inset-inline-start: 0;
        background: linear-gradient(to right, var(--its-bg-color, #ffffff), transparent);
      }

      .its-scroller-wrapper.its-horizontal::after {
        inset-inline-end: 0;
        background: linear-gradient(to left, var(--its-bg-color, #ffffff), transparent);
      }

      .its-scroller-wrapper.its-rtl.its-horizontal .its-scroller-track {
        flex-direction: row-reverse;
      }

      .its-scroller-wrapper.its-vertical {
        block-size: var(--its-vertical-height, clamp(250px, 30vh, 300px));
        align-items: center;
        justify-content: center;
      }

      .its-scroller-wrapper.its-vertical::before {
        inline-size: 100%;
        block-size: 60px;
        background: linear-gradient(to bottom, var(--its-bg-color, #ffffff), transparent);
      }

      .its-scroller-wrapper.its-vertical::after {
        inline-size: 100%;
        block-size: 60px;
        background: linear-gradient(to top, var(--its-bg-color, #ffffff), transparent);
        inset-block-start: auto;
        inset-block-end: 0;
      }

      .its-scroller-track {
        display: flex;
        animation-duration: var(--its-animation-speed, 20s);
        animation-timing-function: var(--its-animation-timing, linear);
        animation-iteration-count: infinite;
        animation-delay: var(--its-animation-delay, 0s);
        will-change: transform;
        backface-visibility: hidden;
        transform: translateZ(0);
      }

      .its-scroller-wrapper.its-horizontal .its-scroller-track {
        animation-name: its-scroll-horizontal;
      }

      .its-scroller-wrapper.its-vertical .its-scroller-track {
        flex-direction: column;
        animation-name: its-scroll-vertical;
      }

      .its-scroller-wrapper:hover .its-scroller-track.its-pause-on-hover {
        animation-play-state: paused;
      }

      .its-scroller-item {
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .its-scroller-wrapper.its-vertical .its-scroller-item {
        flex-direction: column;
        padding-block: calc(var(--its-padding, 1rem) / 2);
      }

      .its-scroller-text {
        padding-inline: var(--its-gap, calc(var(--its-padding, 1rem) * 2));
        font-size: var(--its-font-size, 1.2rem);
        font-weight: var(--its-font-weight, 400);
        color: var(--its-text-color, #000000);
        letter-spacing: var(--its-letter-spacing, -0.01em);
        user-select: none;
      }

      .its-scroller-separator {
        color: var(--its-text-color, #000000);
        font-size: var(--its-font-size, 1.2rem);
        padding-inline: 0.5rem;
        user-select: none;
        opacity: var(--its-separator-opacity, 0.5);
      }

      @keyframes its-scroll-horizontal {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @keyframes its-scroll-vertical {
        from { transform: translateY(0); }
        to { transform: translateY(-50%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .its-scroller-track {
          animation-duration: 60s !important;
        }
      }

      @media (forced-colors: active) {
        .its-scroller-wrapper::before,
        .its-scroller-wrapper::after {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 새로운 텍스트 스크롤러 인스턴스 생성
   * @param {Object} options - 설정 옵션
   * @returns {Object|null} 제어 메서드가 포함된 스크롤러 인스턴스
   */
  static create(options) {
    const config = { ...InfiniteTextScroller.defaultConfig, ...options };

    // 필수 옵션 검증
    if (!config.containerId) {
      console.error('[TextScroller] containerId는 필수입니다');
      return null;
    }

    if (!config.text) {
      console.warn('[TextScroller] text가 비어있습니다');
    }

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
      `its-${config.direction}`,
      config.fadeEdges ? 'its-fade-enabled' : '',
      config.rtl ? 'its-rtl' : '',
      config.className
    ].filter(Boolean).join(' ');

    const wrapper = InfiniteTextScroller.#createElement('div', wrapperClasses);
    
    InfiniteTextScroller.#applyStyles(wrapper, {
      '--its-animation-speed': `${config.speed}s`,
      '--its-font-size': config.fontSize,
      '--its-font-weight': config.fontWeight,
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
      '--its-separator-opacity': config.separatorOpacity
    });

    // 트랙 생성
    const track = InfiniteTextScroller.#createTrack(
      config.text,
      config.separator,
      config.direction,
      config.duplicates,
      config
    );

    if (config.pauseOnHover) {
      track.classList.add('its-pause-on-hover');
    }

    track.style.animationDuration = `${config.speed}s`;

    wrapper.appendChild(track);
    container.appendChild(wrapper);

    // 인스턴스 객체 생성
    const instance = {
      id: config.containerId,
      element: wrapper,
      track,
      container,
      config: { ...config },
      isPlaying: true,

      updateText: (newText) => {
        const items = track.querySelectorAll('.its-scroller-text');
        items.forEach(item => item.textContent = newText);
        instance.config.text = newText;
        return instance;
      },

      updateSpeed: (newSpeed) => {
        wrapper.style.setProperty('--its-animation-speed', `${newSpeed}s`);
        track.style.animationDuration = `${newSpeed}s`;
        instance.config.speed = newSpeed;
        return instance;
      },

      updateDirection: (newDirection) => {
        wrapper.classList.remove('its-horizontal', 'its-vertical');
        wrapper.classList.add(`its-${newDirection}`);
        instance.config.direction = newDirection;
        return instance;
      },

      updateColors: ({ textColor, backgroundColor, borderColor } = {}) => {
        if (textColor) {
          wrapper.style.setProperty('--its-text-color', textColor);
          instance.config.textColor = textColor;
        }
        if (backgroundColor) {
          wrapper.style.setProperty('--its-bg-color', backgroundColor);
          instance.config.backgroundColor = backgroundColor;
        }
        if (borderColor) {
          wrapper.style.setProperty('--its-border-color', borderColor);
          instance.config.borderColor = borderColor;
        }
        return instance;
      },

      updateConfig: (newConfig) => {
        Object.assign(instance.config, newConfig);
        
        const styleMap = {
          speed: '--its-animation-speed',
          fontSize: '--its-font-size',
          fontWeight: '--its-font-weight',
          textColor: '--its-text-color',
          backgroundColor: '--its-bg-color',
          fadeWidth: '--its-fade-width',
          borderColor: '--its-border-color',
          borderWidth: '--its-border-width',
          padding: '--its-padding',
          gap: '--its-gap',
          letterSpacing: '--its-letter-spacing',
          separatorOpacity: '--its-separator-opacity'
        };

        Object.entries(newConfig).forEach(([key, value]) => {
          if (styleMap[key]) {
            const cssValue = key === 'speed' ? `${value}s` : value;
            wrapper.style.setProperty(styleMap[key], cssValue);
          }
        });

        if (newConfig.text) instance.updateText(newConfig.text);
        if (newConfig.direction) instance.updateDirection(newConfig.direction);
        if (newConfig.fadeEdges !== undefined) {
          wrapper.classList.toggle('its-fade-enabled', newConfig.fadeEdges);
        }
        if (newConfig.rtl !== undefined) {
          wrapper.classList.toggle('its-rtl', newConfig.rtl);
        }

        return instance;
      },

      pause: () => {
        track.style.animationPlayState = 'paused';
        instance.isPlaying = false;
        return instance;
      },

      play: () => {
        track.style.animationPlayState = 'running';
        instance.isPlaying = true;
        return instance;
      },

      toggle: () => {
        instance.isPlaying ? instance.pause() : instance.play();
        return instance;
      },

      reset: () => {
        track.style.animation = 'none';
        requestAnimationFrame(() => {
          track.style.animation = '';
        });
        return instance;
      },

      setDelay: (delay) => {
        wrapper.style.setProperty('--its-animation-delay', delay);
        instance.config.animationDelay = delay;
        return instance;
      },

      destroy: () => {
        wrapper.remove();
        InfiniteTextScroller.instances.delete(config.containerId);
      },

      getState: () => ({
        isPlaying: instance.isPlaying,
        config: { ...instance.config }
      })
    };

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
    InfiniteTextScroller.instances.forEach(instance => instance.destroy());
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
    InfiniteTextScroller.instances.forEach(instance => instance.pause());
  }

  /**
   * 모든 인스턴스 재생
   */
  static playAll() {
    InfiniteTextScroller.instances.forEach(instance => instance.play());
  }
}

export default InfiniteTextScroller;

export const createScroller = InfiniteTextScroller.create.bind(InfiniteTextScroller);
export const getScroller = InfiniteTextScroller.getInstance.bind(InfiniteTextScroller);
export const destroyAllScrollers = InfiniteTextScroller.destroyAll.bind(InfiniteTextScroller);
export const pauseAllScrollers = InfiniteTextScroller.pauseAll.bind(InfiniteTextScroller);
export const playAllScrollers = InfiniteTextScroller.playAll.bind(InfiniteTextScroller);

(function (global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else {
    global.InfiniteTextScroller = factory();
  }
})(typeof window !== "undefined" ? window : this, function () {
  return InfiniteTextScroller;
});
