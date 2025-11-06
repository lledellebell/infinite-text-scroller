/*!
 * Infinite Text Scroller v1.4.0
 * (c) 2025 deep
 * Released under the MIT License
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.InfiniteTextScroller = {}));
})(this, (function (exports) { 'use strict';

  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  /**
   * 상수 및 기본 설정
   * @module constants
   */

  // 타이밍 상수
  const TIMING = {
    HOVER_RESUME_DELAY: 2000,
    FOCUS_RESUME_DELAY: 2000,
    VISIBILITY_RESUME_DELAY: 500
  };

  // 기본 설정
  const DEFAULT_CONFIG = {
    text: '',
    html: '',
    children: '',
    direction: 'horizontal',
    animationType: 'scroll',
    // 'scroll' | 'fade'
    speed: 20,
    interval: 5000,
    // fade 타입용 (ms)
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
    ariaLive: 'off',
    // 'off' | 'polite' | 'assertive'
    role: 'marquee',
    // 'marquee' | 'region'
    // 키보드 제어
    enableKeyboardControl: true,
    // prefers-reduced-motion 대응
    reducedMotionFallback: 'slow' // 'slow' | 'static' | 'none'
  };

  // 프리셋 설정
  const PRESETS = {
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
  const VALIDATION_RANGES = {
    speed: {
      min: 0.1,
      max: 1000,
      default: 20
    },
    duplicates: {
      min: 1,
      max: 20,
      default: 3
    },
    separatorOpacity: {
      min: 0,
      max: 1,
      default: 0.5
    }
  };

  // 허용된 HTML 태그 및 속성
  const ALLOWED_HTML = {
    tags: new Set(['b', 'strong', 'i', 'em', 'u', 'span', 'br', 'mark']),
    attributes: new Set(['style', 'class'])
  };

  /**
   * 헬퍼 함수들
   * @module helpers
   */


  /**
   * HTML 새니타이징 (XSS 방지)
   * @param {string} html - 새니타이징할 HTML 문자열
   * @returns {string} 새니타이징된 HTML
   */
  function sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const walker = document.createTreeWalker(temp, NodeFilter.SHOW_ELEMENT, null, false);
    const nodesToRemove = [];
    let node;
    while (node = walker.nextNode()) {
      const tagName = node.tagName.toLowerCase();
      if (!ALLOWED_HTML.tags.has(tagName)) {
        nodesToRemove.push(node);
        continue;
      }
      const attrs = Array.from(node.attributes);
      for (const attr of attrs) {
        if (!ALLOWED_HTML.attributes.has(attr.name.toLowerCase())) {
          node.removeAttribute(attr.name);
        }
      }
    }
    for (const node of nodesToRemove) {
      const text = document.createTextNode(node.textContent);
      node.parentNode.replaceChild(text, node);
    }
    return temp.innerHTML;
  }

  /**
   * 숫자 파라미터 검증
   * @param {number} value - 검증할 값
   * @param {string} paramName - 파라미터 이름
   * @returns {number} 검증된 값
   */
  function validateNumber(value, paramName) {
    const range = VALIDATION_RANGES[paramName];
    if (!range) {
      console.warn("[TextScroller] ".concat(paramName, "\uC5D0 \uB300\uD55C \uAC80\uC99D \uBC94\uC704\uAC00 \uC815\uC758\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4"));
      return value;
    }
    const {
      min,
      max,
      default: defaultValue
    } = range;
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn("[TextScroller] ".concat(paramName, "\uB294 \uC22B\uC790\uC5EC\uC57C \uD569\uB2C8\uB2E4. \uAE30\uBCF8\uAC12(").concat(defaultValue, ") \uC0AC\uC6A9"));
      return defaultValue;
    }
    if (min !== null && value < min) {
      console.warn("[TextScroller] ".concat(paramName, "\uB294 ").concat(min, " \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4. \uCD5C\uC18C\uAC12 \uC0AC\uC6A9"));
      return min;
    }
    if (max !== null && value > max) {
      console.warn("[TextScroller] ".concat(paramName, "\uB294 ").concat(max, " \uC774\uD558\uC5EC\uC57C \uD569\uB2C8\uB2E4. \uCD5C\uB300\uAC12 \uC0AC\uC6A9"));
      return max;
    }
    return value;
  }

  /**
   * DOM 요소 생성
   * @param {string} tag - 태그 이름
   * @param {string} className - 클래스 이름
   * @param {string} textContent - 텍스트 내용
   * @returns {HTMLElement} 생성된 요소
   */
  function createElement(tag, className) {
    let textContent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
  }

  /**
   * 개별 스크롤러 아이템 생성
   * @param {string} text - 텍스트
   * @param {string} separator - 구분자
   * @param {string} direction - 방향
   * @param {Object} config - 설정
   * @returns {HTMLElement} 생성된 아이템
   */
  function createScrollerItem(text, separator, direction, config) {
    const item = createElement('div', 'its-scroller-item');
    const textSpan = createElement('span', 'its-scroller-text');

    // children이 우선, 그 다음 html, 마지막으로 text
    if (config.children) {
      textSpan.innerHTML = sanitizeHTML(config.children);
    } else if (config.html) {
      textSpan.innerHTML = sanitizeHTML(config.html);
    } else {
      textSpan.textContent = text;
    }
    item.appendChild(textSpan);
    if (direction === 'horizontal' && separator) {
      const separatorSpan = createElement('span', 'its-scroller-separator', separator);
      item.appendChild(separatorSpan);
    }
    return item;
  }

  /**
   * 복제된 스크롤러 트랙 생성
   * @param {string} text - 텍스트
   * @param {string} separator - 구분자
   * @param {string} direction - 방향
   * @param {number} duplicates - 복제 수
   * @param {Object} config - 설정
   * @returns {HTMLElement} 생성된 트랙
   */
  function createTrack(text, separator, direction, duplicates, config) {
    const track = createElement('div', 'its-scroller-track');
    const totalItems = duplicates * 2;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < totalItems; i++) {
      fragment.appendChild(createScrollerItem(text, separator, direction, config));
    }
    track.appendChild(fragment);
    return track;
  }

  /**
   * 스타일 관리
   * @module styles
   */

  // 인스턴스별 스타일 캐시 (Map으로 관리)
  const styleCache = new Map();

  /**
   * 문서 헤드에 기본 스타일 주입
   */
  function injectStyles() {
    if (document.getElementById('infinite-text-scroller-styles')) return;
    const style = document.createElement('style');
    style.id = 'infinite-text-scroller-styles';
    style.textContent = "\n    .its-scroller-container {\n      position: relative;\n    }\n\n    .its-scroller-container.its-border-top {\n      border-block-start: var(--its-border-width, 1px) solid var(--its-border-color, #000000);\n    }\n\n    .its-scroller-container.its-border-bottom {\n      border-block-end: var(--its-border-width, 1px) solid var(--its-border-color, #000000);\n    }\n\n    .its-scroller-container:not(:last-child).its-border-bottom {\n      border-block-end: none;\n    }\n\n    /* \uD0A4\uBCF4\uB4DC \uD3EC\uCEE4\uC2A4 \uD45C\uC2DC */\n    .its-scroller-container:focus {\n      outline: 2px solid #0066cc;\n      outline-offset: 2px;\n    }\n\n    .its-scroller-container:focus:not(:focus-visible) {\n      outline: none;\n    }\n\n    .its-scroller-wrapper {\n      overflow: hidden;\n      display: flex;\n      position: relative;\n      padding-block: var(--its-padding, clamp(1rem, 2vw, 2rem));\n      isolation: isolate;\n      background-color: var(--its-bg-color, #ffffff);\n    }\n\n    /* Fade \uD0C0\uC785 \uC2A4\uD0C0\uC77C */\n    .its-scroller-wrapper.its-fade-type {\n      justify-content: center;\n      align-items: center;\n      min-height: 48px;\n    }\n\n    .its-scroller-wrapper.its-fade-type .its-scroller-track {\n      animation: none;\n    }\n\n    .its-scroller-wrapper::before,\n    .its-scroller-wrapper::after {\n      content: '';\n      position: absolute;\n      inset-block: 0;\n      inline-size: var(--its-fade-width, clamp(60px, 10vw, 100px));\n      z-index: 1;\n      pointer-events: none;\n      opacity: 0;\n      transition: opacity 0.3s ease;\n    }\n\n    .its-scroller-wrapper.its-fade-enabled::before,\n    .its-scroller-wrapper.its-fade-enabled::after {\n      opacity: 1;\n    }\n\n    .its-scroller-wrapper.its-horizontal::before {\n      inset-inline-start: 0;\n      background: linear-gradient(to right, var(--its-bg-color, #ffffff), transparent);\n    }\n\n    .its-scroller-wrapper.its-horizontal::after {\n      inset-inline-end: 0;\n      background: linear-gradient(to left, var(--its-bg-color, #ffffff), transparent);\n    }\n\n    .its-scroller-wrapper.its-rtl.its-horizontal .its-scroller-track {\n      flex-direction: row-reverse;\n    }\n\n    .its-scroller-wrapper.its-vertical {\n      block-size: var(--its-vertical-height, clamp(250px, 30vh, 300px));\n      align-items: center;\n      justify-content: center;\n    }\n\n    .its-scroller-wrapper.its-vertical::before {\n      inline-size: 100%;\n      block-size: 60px;\n      background: linear-gradient(to bottom, var(--its-bg-color, #ffffff), transparent);\n    }\n\n    .its-scroller-wrapper.its-vertical::after {\n      inline-size: 100%;\n      block-size: 60px;\n      background: linear-gradient(to top, var(--its-bg-color, #ffffff), transparent);\n      inset-block-start: auto;\n      inset-block-end: 0;\n    }\n\n    .its-scroller-track {\n      display: flex;\n      animation-duration: var(--its-animation-speed, 20s);\n      animation-timing-function: var(--its-animation-timing, linear);\n      animation-iteration-count: infinite;\n      animation-delay: var(--its-animation-delay, 0s);\n      will-change: transform;\n      backface-visibility: hidden;\n      transform: translateZ(0);\n    }\n\n    .its-scroller-wrapper.its-horizontal .its-scroller-track {\n      animation-name: its-scroll-horizontal;\n    }\n\n    .its-scroller-wrapper.its-vertical .its-scroller-track {\n      flex-direction: column;\n      animation-name: its-scroll-vertical;\n    }\n\n    .its-scroller-wrapper:hover .its-scroller-track.its-pause-on-hover {\n      animation-play-state: paused;\n    }\n\n    /* \uC560\uB2C8\uBA54\uC774\uC158 \uC0C1\uD0DC \uC81C\uC5B4 \uD074\uB798\uC2A4 */\n    .its-scroller-track.its-paused {\n      animation-play-state: paused !important;\n    }\n\n    .its-scroller-track.its-reset {\n      animation: none !important;\n    }\n\n    .its-scroller-item {\n      display: inline-flex;\n      align-items: center;\n      white-space: nowrap;\n      flex-shrink: 0;\n    }\n\n    .its-scroller-wrapper.its-vertical .its-scroller-item {\n      flex-direction: column;\n      padding-block: calc(var(--its-padding, 1rem) / 2);\n    }\n\n    /* Fade \uD0C0\uC785 \uC544\uC774\uD15C */\n    .its-scroller-wrapper.its-fade-type .its-scroller-item {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      opacity: 0;\n      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;\n      pointer-events: none;\n      width: 100%;\n      max-width: 800px;\n      justify-content: center;\n      text-align: center;\n    }\n\n    .its-scroller-wrapper.its-fade-type .its-scroller-item.its-active {\n      opacity: 1;\n      transform: translate(-50%, -50%);\n      pointer-events: auto;\n    }\n\n    .its-scroller-wrapper.its-fade-type .its-scroller-item.its-prev {\n      opacity: 0;\n      transform: translate(-50%, -65%);\n    }\n\n    .its-scroller-wrapper.its-fade-type .its-scroller-item.its-next {\n      opacity: 0;\n      transform: translate(-50%, -35%);\n    }\n\n    .its-scroller-text {\n      padding-inline: var(--its-gap, calc(var(--its-padding, 1rem) * 2));\n      font-size: var(--its-font-size, 1.2rem);\n      font-weight: var(--its-font-weight, 400);\n      font-family: var(--its-font-family, inherit);\n      color: var(--its-text-color, #000000);\n      letter-spacing: var(--its-letter-spacing, -0.01em);\n      user-select: none;\n    }\n\n    .its-scroller-separator {\n      color: var(--its-separator-color, var(--its-text-color, #000000));\n      font-size: var(--its-font-size, 1.2rem);\n      padding-inline: 0.5rem;\n      user-select: none;\n      opacity: var(--its-separator-opacity, 0.5);\n    }\n\n    @keyframes its-scroll-horizontal {\n      from { transform: translateX(0); }\n      to { transform: translateX(-50%); }\n    }\n\n    @keyframes its-scroll-vertical {\n      from { transform: translateY(0); }\n      to { transform: translateY(-50%); }\n    }\n\n    /* prefers-reduced-motion \uC9C0\uC6D0 (WCAG 2.3.3) */\n    @media (prefers-reduced-motion: reduce) {\n      .its-scroller-track {\n        animation-duration: 60s !important;\n      }\n\n      .its-scroller-wrapper.its-fade-type .its-scroller-item {\n        position: relative !important;\n        opacity: 1 !important;\n        transform: none !important;\n        display: block;\n        margin-bottom: 0.5rem;\n        pointer-events: auto;\n      }\n\n      .its-scroller-wrapper.its-fade-type {\n        display: block;\n        overflow-y: auto;\n        max-height: 200px;\n      }\n    }\n\n    @media (forced-colors: active) {\n      .its-scroller-wrapper::before,\n      .its-scroller-wrapper::after {\n        display: none;\n      }\n    }\n  ";
    document.head.appendChild(style);
  }

  /**
   * 인스턴스별 스타일 태그 생성 (캐싱 포함)
   * @param {string} containerId - 컨테이너 ID
   * @param {Object} styles - 스타일 객체
   * @returns {HTMLStyleElement} 생성된 스타일 태그
   */
  function createInstanceStyles(containerId, styles) {
    const styleId = "its-instance-".concat(containerId);
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    // 캐시에 저장
    const cachedStyles = new Map();
    for (const [key, value] of Object.entries(styles)) {
      if (value !== null && value !== undefined) {
        cachedStyles.set(key, value);
      }
    }
    styleCache.set(containerId, cachedStyles);

    // 스타일 태그 업데이트
    updateStyleTag(containerId, styleTag, cachedStyles);
    return styleTag;
  }

  /**
   * 인스턴스 스타일 태그 업데이트 (캐싱 사용)
   * @param {string} containerId - 컨테이너 ID
   * @param {Object} styles - 업데이트할 스타일
   */
  function updateInstanceStyles(containerId, styles) {
    const styleId = "its-instance-".concat(containerId);
    const styleTag = document.getElementById(styleId);
    if (!styleTag) return;

    // 캐시에서 기존 스타일 가져오기
    let cachedStyles = styleCache.get(containerId);
    if (!cachedStyles) {
      cachedStyles = new Map();
      styleCache.set(containerId, cachedStyles);
    }

    // 새 스타일로 업데이트
    for (const [key, value] of Object.entries(styles)) {
      if (value !== null && value !== undefined) {
        cachedStyles.set(key, value);
      }
    }

    // 스타일 태그 업데이트
    updateStyleTag(containerId, styleTag, cachedStyles);
  }

  /**
   * 스타일 태그 내용 업데이트 (내부 헬퍼)
   * @param {string} containerId - 컨테이너 ID
   * @param {HTMLStyleElement} styleTag - 스타일 태그
   * @param {Map} styles - 스타일 Map
   */
  function updateStyleTag(containerId, styleTag, styles) {
    const cssVars = Array.from(styles.entries()).map(_ref => {
      let [key, value] = _ref;
      return "".concat(key, ": ").concat(value, ";");
    }).join('\n    ');
    styleTag.textContent = "\n    #".concat(containerId, " .its-scroller-wrapper {\n      ").concat(cssVars, "\n    }\n  ");
  }

  /**
   * 인스턴스 스타일 제거
   * @param {string} containerId - 컨테이너 ID
   */
  function removeInstanceStyles(containerId) {
    const styleId = "its-instance-".concat(containerId);
    const styleTag = document.getElementById(styleId);
    if (styleTag) {
      styleTag.remove();
    }
    styleCache.delete(containerId);
  }

  /**
   * 인스턴스 메서드 생성
   * @param {Object} params - 파라미터
   * @returns {Object} 인스턴스 메서드
   */
  function createInstanceMethods(_ref) {
    let {
      config,
      wrapper,
      track,
      container,
      mediaQuery,
      isReducedMotion,
      instancesMap
    } = _ref;
    // Fade 애니메이션용 변수
    let fadeTimer = null;
    let fadeCurrentIndex = 0;
    let fadeIsPaused = false;
    let isPlaying = true;
    const instance = {
      id: config.containerId,
      element: wrapper,
      track,
      container,
      config: _objectSpread2({}, config),
      isPlaying,
      isReducedMotion,
      fadeTimer,
      fadeCurrentIndex,
      fadeIsPaused,
      updateText: newText => {
        if (typeof newText !== 'string') {
          console.error('[TextScroller] updateText: 문자열 타입이 필요합니다');
          return instance;
        }
        const items = track.querySelectorAll('.its-scroller-text');
        for (const item of items) {
          if (instance.config.html) {
            // html 모드에서는 무시
            continue;
          }
          item.textContent = newText;
        }
        instance.config.text = newText;
        return instance;
      },
      updateHtml: newHtml => {
        if (typeof newHtml !== 'string') {
          console.error('[TextScroller] updateHtml: 문자열 타입이 필요합니다');
          return instance;
        }
        const sanitized = sanitizeHTML(newHtml);
        const items = track.querySelectorAll('.its-scroller-text');
        for (const item of items) {
          item.innerHTML = sanitized;
        }
        instance.config.html = newHtml;
        return instance;
      },
      updateSpeed: newSpeed => {
        const validSpeed = validateNumber(newSpeed, 'speed');
        updateInstanceStyles(config.containerId, {
          '--its-animation-speed': "".concat(validSpeed, "s")
        });
        instance.config.speed = validSpeed;
        return instance;
      },
      updateDirection: newDirection => {
        if (!['horizontal', 'vertical'].includes(newDirection)) {
          console.error('[TextScroller] updateDirection: "horizontal" 또는 "vertical"만 사용 가능합니다');
          return instance;
        }
        wrapper.classList.remove('its-horizontal', 'its-vertical');
        wrapper.classList.add("its-".concat(newDirection));
        instance.config.direction = newDirection;
        return instance;
      },
      updateColors: function () {
        let {
          textColor,
          backgroundColor,
          borderColor
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const updates = {};
        if (textColor) {
          updates['--its-text-color'] = textColor;
          instance.config.textColor = textColor;
        }
        if (backgroundColor) {
          updates['--its-bg-color'] = backgroundColor;
          instance.config.backgroundColor = backgroundColor;
        }
        if (borderColor) {
          updates['--its-border-color'] = borderColor;
          instance.config.borderColor = borderColor;
        }
        if (Object.keys(updates).length > 0) {
          updateInstanceStyles(config.containerId, updates);
        }
        return instance;
      },
      updateChildren: newChildren => {
        if (typeof newChildren !== 'string') {
          console.error('[TextScroller] updateChildren: 문자열 타입이 필요합니다');
          return instance;
        }
        const sanitized = sanitizeHTML(newChildren);
        const items = track.querySelectorAll('.its-scroller-text');
        for (const item of items) {
          item.innerHTML = sanitized;
        }
        instance.config.children = newChildren;
        return instance;
      },
      updateConfig: newConfig => {
        Object.assign(instance.config, newConfig);
        const styleMap = new Map([['speed', '--its-animation-speed'], ['fontSize', '--its-font-size'], ['fontWeight', '--its-font-weight'], ['fontFamily', '--its-font-family'], ['textColor', '--its-text-color'], ['backgroundColor', '--its-bg-color'], ['fadeWidth', '--its-fade-width'], ['borderColor', '--its-border-color'], ['borderWidth', '--its-border-width'], ['padding', '--its-padding'], ['gap', '--its-gap'], ['letterSpacing', '--its-letter-spacing'], ['separatorOpacity', '--its-separator-opacity'], ['separatorColor', '--its-separator-color']]);
        const updates = {};
        for (const [key, value] of Object.entries(newConfig)) {
          if (styleMap.has(key)) {
            const cssValue = key === 'speed' ? "".concat(value, "s") : value;
            updates[styleMap.get(key)] = cssValue;
          }
        }
        if (Object.keys(updates).length > 0) {
          updateInstanceStyles(config.containerId, updates);
        }
        if (newConfig.children !== undefined) {
          instance.updateChildren(newConfig.children);
        } else if (newConfig.html !== undefined) {
          instance.updateHtml(newConfig.html);
        } else if (newConfig.text !== undefined) {
          instance.updateText(newConfig.text);
        }
        if (newConfig.direction) {
          instance.updateDirection(newConfig.direction);
        }
        if (newConfig.speed !== undefined) {
          instance.updateSpeed(newConfig.speed);
        }
        if (newConfig.fadeEdges !== undefined) {
          wrapper.classList.toggle('its-fade-enabled', newConfig.fadeEdges);
        }
        if (newConfig.rtl !== undefined) {
          wrapper.classList.toggle('its-rtl', newConfig.rtl);
        }
        return instance;
      },
      // Fade 애니메이션 전용 메서드
      fadeShowItem: index => {
        if (config.animationType !== 'fade') return instance;
        const items = track.querySelectorAll('.its-scroller-item');
        if (items.length === 0) return instance;
        for (const item of items) {
          item.classList.remove('its-active', 'its-prev', 'its-next');
        }
        items[index].classList.add('its-active');
        instance.fadeCurrentIndex = index;
        return instance;
      },
      fadeNext: () => {
        if (config.animationType !== 'fade' || instance.fadeIsPaused || instance.isReducedMotion) {
          return instance;
        }
        const items = track.querySelectorAll('.its-scroller-item');
        if (items.length === 0) return instance;
        const prevIndex = instance.fadeCurrentIndex;
        const nextIndex = (instance.fadeCurrentIndex + 1) % items.length;
        items[prevIndex].classList.add('its-prev');
        items[prevIndex].classList.remove('its-active');
        items[nextIndex].classList.add('its-active');
        items[nextIndex].classList.remove('its-next');
        instance.fadeCurrentIndex = nextIndex;
        return instance;
      },
      fadeStart: () => {
        if (config.animationType !== 'fade' || instance.isReducedMotion) return instance;
        instance.fadeTimer = setInterval(() => {
          instance.fadeNext();
        }, config.interval);
        return instance;
      },
      fadeStop: () => {
        if (instance.fadeTimer) {
          clearInterval(instance.fadeTimer);
          instance.fadeTimer = null;
        }
        return instance;
      },
      fadePause: () => {
        instance.fadeIsPaused = true;
        return instance;
      },
      fadeResume: () => {
        instance.fadeIsPaused = false;
        return instance;
      },
      pause: () => {
        if (config.animationType === 'fade') {
          instance.fadePause();
        } else {
          track.classList.add('its-paused');
        }
        instance.isPlaying = false;
        return instance;
      },
      play: () => {
        if (config.animationType === 'fade') {
          instance.fadeResume();
        } else {
          track.classList.remove('its-paused');
        }
        instance.isPlaying = true;
        return instance;
      },
      toggle: () => {
        instance.isPlaying ? instance.pause() : instance.play();
        return instance;
      },
      reset: () => {
        if (config.animationType === 'fade') {
          instance.fadeStop();
          instance.fadeShowItem(0);
          if (instance.isPlaying && !instance.isReducedMotion) {
            instance.fadeStart();
          }
        } else {
          track.classList.add('its-reset');
          requestAnimationFrame(() => {
            track.classList.remove('its-reset');
          });
        }
        return instance;
      },
      setDelay: delay => {
        updateInstanceStyles(config.containerId, {
          '--its-animation-delay': delay
        });
        instance.config.animationDelay = delay;
        return instance;
      },
      destroy: () => {
        // Fade 타이머 정리
        if (instance.fadeTimer) {
          clearInterval(instance.fadeTimer);
          instance.fadeTimer = null;
        }

        // 애니메이션 정지
        if (track) {
          track.classList.add('its-reset');
        }

        // 이벤트 리스너 제거
        if (instance._keyboardHandler) {
          container.removeEventListener('keydown', instance._keyboardHandler);
        }
        if (instance._hoverHandler) {
          container.removeEventListener('mouseenter', instance._hoverHandler);
          container.removeEventListener('mouseleave', instance._hoverLeaveHandler);
        }
        if (instance._focusHandler) {
          container.removeEventListener('focusin', instance._focusHandler);
          container.removeEventListener('focusout', instance._focusOutHandler);
        }
        if (instance._visibilityHandler) {
          document.removeEventListener('visibilitychange', instance._visibilityHandler);
        }
        if (instance._reducedMotionHandler) {
          mediaQuery.removeEventListener('change', instance._reducedMotionHandler);
        }

        // 인스턴스별 스타일 태그 제거
        removeInstanceStyles(config.containerId);

        // DOM 제거
        if (wrapper && wrapper.parentNode) {
          wrapper.remove();
        }

        // 참조 해제 (메모리 누수 방지)
        instance.element = null;
        instance.track = null;
        instance.container = null;

        // 인스턴스 맵에서 제거
        instancesMap.delete(config.containerId);
      },
      getState: () => ({
        isPlaying: instance.isPlaying,
        config: _objectSpread2({}, instance.config),
        fadeCurrentIndex: instance.fadeCurrentIndex,
        isReducedMotion: instance.isReducedMotion
      })
    };
    return instance;
  }

  /**
   * 이벤트 리스너 설정
   * @param {Object} instance - 인스턴스
   * @param {Object} config - 설정
   * @param {HTMLElement} container - 컨테이너
   * @param {MediaQueryList} mediaQuery - 미디어 쿼리
   */
  function setupEventListeners(instance, config, container, mediaQuery) {
    // 키보드 제어 (Space로 일시정지/재생)
    if (config.enableKeyboardControl) {
      instance._keyboardHandler = e => {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          instance.toggle();
        }
      };
      container.addEventListener('keydown', instance._keyboardHandler);
    }

    // 호버 시 일시정지 (WCAG 2.2.2)
    if (config.pauseOnHover) {
      instance._hoverHandler = () => instance.pause();
      instance._hoverLeaveHandler = () => {
        setTimeout(() => instance.play(), TIMING.HOVER_RESUME_DELAY);
      };
      container.addEventListener('mouseenter', instance._hoverHandler);
      container.addEventListener('mouseleave', instance._hoverLeaveHandler);
    }

    // 포커스 시 일시정지 (WCAG 2.2.2)
    if (config.pauseOnFocus) {
      instance._focusHandler = () => instance.pause();
      instance._focusOutHandler = e => {
        if (!container.contains(e.relatedTarget)) {
          setTimeout(() => instance.play(), TIMING.FOCUS_RESUME_DELAY);
        }
      };
      container.addEventListener('focusin', instance._focusHandler);
      container.addEventListener('focusout', instance._focusOutHandler);
    }

    // 페이지 visibility 변경 시
    instance._visibilityHandler = () => {
      if (document.hidden) {
        instance.pause();
      } else if (instance.isPlaying) {
        setTimeout(() => instance.play(), TIMING.VISIBILITY_RESUME_DELAY);
      }
    };
    document.addEventListener('visibilitychange', instance._visibilityHandler);

    // prefers-reduced-motion 변경 감지
    instance._reducedMotionHandler = e => {
      instance.isReducedMotion = e.matches;
      if (e.matches) {
        if (config.animationType === 'fade') {
          instance.fadeStop();
        } else {
          instance.pause();
        }
      } else {
        if (config.animationType === 'fade') {
          instance.fadeStart();
        } else {
          instance.play();
        }
      }
    };
    mediaQuery.addEventListener('change', instance._reducedMotionHandler);
  }

  class InfiniteTextScroller {
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
      const config = _objectSpread2(_objectSpread2(_objectSpread2({}, InfiniteTextScroller.defaultConfig), presetConfig), options);

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
        console.error("[TextScroller] ID \"".concat(config.containerId, "\"\uB97C \uAC00\uC9C4 \uC694\uC18C\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"));
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
      const wrapperClasses = ['its-scroller-wrapper', config.animationType === 'fade' ? 'its-fade-type' : "its-".concat(config.direction), config.fadeEdges && config.animationType !== 'fade' ? 'its-fade-enabled' : '', config.rtl ? 'its-rtl' : '', config.className].filter(Boolean).join(' ');
      const wrapper = createElement('div', wrapperClasses);

      // 인스턴스별 스타일 태그 생성
      createInstanceStyles(config.containerId, {
        '--its-animation-speed': "".concat(config.speed, "s"),
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
      const track = createTrack(config.text, config.separator, config.direction, config.duplicates, config);
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
  _defineProperty(InfiniteTextScroller, "VERSION", '1.4.0');
  _defineProperty(InfiniteTextScroller, "instances", new Map());
  _defineProperty(InfiniteTextScroller, "defaultConfig", DEFAULT_CONFIG);
  _defineProperty(InfiniteTextScroller, "presets", PRESETS);
  /**
   * 문서 헤드에 스타일 주입
   */
  _defineProperty(InfiniteTextScroller, "injectStyles", injectStyles);
  const createScroller = InfiniteTextScroller.create.bind(InfiniteTextScroller);
  const getScroller = InfiniteTextScroller.getInstance.bind(InfiniteTextScroller);
  const destroyAllScrollers = InfiniteTextScroller.destroyAll.bind(InfiniteTextScroller);
  const pauseAllScrollers = InfiniteTextScroller.pauseAll.bind(InfiniteTextScroller);
  const playAllScrollers = InfiniteTextScroller.playAll.bind(InfiniteTextScroller);

  exports.InfiniteTextScroller = InfiniteTextScroller;
  exports.createScroller = createScroller;
  exports.default = InfiniteTextScroller;
  exports.destroyAllScrollers = destroyAllScrollers;
  exports.getScroller = getScroller;
  exports.pauseAllScrollers = pauseAllScrollers;
  exports.playAllScrollers = playAllScrollers;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.debug.js.map
