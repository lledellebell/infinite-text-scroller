/**
 * 스타일 관리
 * @module styles
 */

// 인스턴스별 스타일 캐시 (Map으로 관리)
const styleCache = new Map();

/**
 * 문서 헤드에 기본 스타일 주입
 */
export function injectStyles() {
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

    /* 키보드 포커스 표시 */
    .its-scroller-container:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    .its-scroller-container:focus:not(:focus-visible) {
      outline: none;
    }

    .its-scroller-wrapper {
      overflow: hidden;
      display: flex;
      position: relative;
      padding-block: var(--its-padding, clamp(1rem, 2vw, 2rem));
      isolation: isolate;
      background-color: var(--its-bg-color, #ffffff);
    }

    /* Fade 타입 스타일 */
    .its-scroller-wrapper.its-fade-type {
      justify-content: center;
      align-items: center;
      min-height: 48px;
    }

    .its-scroller-wrapper.its-fade-type .its-scroller-track {
      animation: none;
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

    /* 애니메이션 상태 제어 클래스 */
    .its-scroller-track.its-paused {
      animation-play-state: paused !important;
    }

    .its-scroller-track.its-reset {
      animation: none !important;
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

    /* Fade 타입 아이템 */
    .its-scroller-wrapper.its-fade-type .its-scroller-item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
      pointer-events: none;
      width: 100%;
      max-width: 800px;
      justify-content: center;
      text-align: center;
    }

    .its-scroller-wrapper.its-fade-type .its-scroller-item.its-active {
      opacity: 1;
      transform: translate(-50%, -50%);
      pointer-events: auto;
    }

    .its-scroller-wrapper.its-fade-type .its-scroller-item.its-prev {
      opacity: 0;
      transform: translate(-50%, -65%);
    }

    .its-scroller-wrapper.its-fade-type .its-scroller-item.its-next {
      opacity: 0;
      transform: translate(-50%, -35%);
    }

    .its-scroller-text {
      padding-inline: var(--its-gap, calc(var(--its-padding, 1rem) * 2));
      font-size: var(--its-font-size, 1.2rem);
      font-weight: var(--its-font-weight, 400);
      font-family: var(--its-font-family, inherit);
      color: var(--its-text-color, #000000);
      letter-spacing: var(--its-letter-spacing, -0.01em);
      user-select: none;
    }

    .its-scroller-separator {
      color: var(--its-separator-color, var(--its-text-color, #000000));
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

    /* prefers-reduced-motion 지원 (WCAG 2.3.3) */
    @media (prefers-reduced-motion: reduce) {
      .its-scroller-track {
        animation-duration: 60s !important;
      }

      .its-scroller-wrapper.its-fade-type .its-scroller-item {
        position: relative !important;
        opacity: 1 !important;
        transform: none !important;
        display: block;
        margin-bottom: 0.5rem;
        pointer-events: auto;
      }

      .its-scroller-wrapper.its-fade-type {
        display: block;
        overflow-y: auto;
        max-height: 200px;
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
 * 인스턴스별 스타일 태그 생성 (캐싱 포함)
 * @param {string} containerId - 컨테이너 ID
 * @param {Object} styles - 스타일 객체
 * @returns {HTMLStyleElement} 생성된 스타일 태그
 */
export function createInstanceStyles(containerId, styles) {
  const styleId = `its-instance-${containerId}`;
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
export function updateInstanceStyles(containerId, styles) {
  const styleId = `its-instance-${containerId}`;
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
  const cssVars = Array.from(styles.entries())
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n    ');

  styleTag.textContent = `
    #${containerId} .its-scroller-wrapper {
      ${cssVars}
    }
  `;
}

/**
 * 인스턴스 스타일 제거
 * @param {string} containerId - 컨테이너 ID
 */
export function removeInstanceStyles(containerId) {
  const styleId = `its-instance-${containerId}`;
  const styleTag = document.getElementById(styleId);
  if (styleTag) {
    styleTag.remove();
  }
  styleCache.delete(containerId);
}

/**
 * 스타일 캐시 가져오기 (디버깅용)
 * @param {string} containerId - 컨테이너 ID
 * @returns {Map|undefined} 캐시된 스타일
 */
export function getStyleCache(containerId) {
  return styleCache.get(containerId);
}
