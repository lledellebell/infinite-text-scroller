/**
 * 인스턴스 메서드 생성
 * @module instance
 */

import { TIMING } from './constants.js';
import { sanitizeHTML, validateNumber } from './helpers.js';
import { updateInstanceStyles, removeInstanceStyles } from './styles.js';

/**
 * 인스턴스 메서드 생성
 * @param {Object} params - 파라미터
 * @returns {Object} 인스턴스 메서드
 */
export function createInstanceMethods({
  config,
  wrapper,
  track,
  container,
  mediaQuery,
  isReducedMotion,
  instancesMap
}) {
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
    config: { ...config },
    isPlaying,
    isReducedMotion,
    fadeTimer,
    fadeCurrentIndex,
    fadeIsPaused,

    updateText: (newText) => {
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

    updateHtml: (newHtml) => {
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

    updateSpeed: (newSpeed) => {
      const validSpeed = validateNumber(newSpeed, 'speed');
      updateInstanceStyles(config.containerId, {
        '--its-animation-speed': `${validSpeed}s`
      });
      instance.config.speed = validSpeed;
      return instance;
    },

    updateDirection: (newDirection) => {
      if (!['horizontal', 'vertical'].includes(newDirection)) {
        console.error('[TextScroller] updateDirection: "horizontal" 또는 "vertical"만 사용 가능합니다');
        return instance;
      }
      wrapper.classList.remove('its-horizontal', 'its-vertical');
      wrapper.classList.add(`its-${newDirection}`);
      instance.config.direction = newDirection;
      return instance;
    },

    updateColors: ({ textColor, backgroundColor, borderColor } = {}) => {
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

    updateChildren: (newChildren) => {
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

    updateConfig: (newConfig) => {
      Object.assign(instance.config, newConfig);

      const styleMap = new Map([
        ['speed', '--its-animation-speed'],
        ['fontSize', '--its-font-size'],
        ['fontWeight', '--its-font-weight'],
        ['fontFamily', '--its-font-family'],
        ['textColor', '--its-text-color'],
        ['backgroundColor', '--its-bg-color'],
        ['fadeWidth', '--its-fade-width'],
        ['borderColor', '--its-border-color'],
        ['borderWidth', '--its-border-width'],
        ['padding', '--its-padding'],
        ['gap', '--its-gap'],
        ['letterSpacing', '--its-letter-spacing'],
        ['separatorOpacity', '--its-separator-opacity'],
        ['separatorColor', '--its-separator-color']
      ]);

      const updates = {};
      for (const [key, value] of Object.entries(newConfig)) {
        if (styleMap.has(key)) {
          const cssValue = key === 'speed' ? `${value}s` : value;
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
    fadeShowItem: (index) => {
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

    setDelay: (delay) => {
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
      config: { ...instance.config },
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
export function setupEventListeners(instance, config, container, mediaQuery) {
  // 키보드 제어 (Space로 일시정지/재생)
  if (config.enableKeyboardControl) {
    instance._keyboardHandler = (e) => {
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
    instance._focusOutHandler = (e) => {
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
  instance._reducedMotionHandler = (e) => {
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
