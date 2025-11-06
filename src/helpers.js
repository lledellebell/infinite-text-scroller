
/**
 * 헬퍼 함수들
 * @module helpers
 */

import { ALLOWED_HTML, VALIDATION_RANGES } from './constants.js';

/**
 * HTML 새니타이징 (XSS 방지)
 * @param {string} html - 새니타이징할 HTML 문자열
 * @returns {string} 새니타이징된 HTML
 */
export function sanitizeHTML(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const walker = document.createTreeWalker(
    temp,
    NodeFilter.SHOW_ELEMENT,
    null,
    false
  );

  const nodesToRemove = [];
  let node;

  while ((node = walker.nextNode())) {
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
export function validateNumber(value, paramName) {
  const range = VALIDATION_RANGES[paramName];
  if (!range) {
    console.warn(`[TextScroller] ${paramName}에 대한 검증 범위가 정의되지 않았습니다`);
    return value;
  }

  const { min, max, default: defaultValue } = range;

  if (typeof value !== 'number' || isNaN(value)) {
    console.warn(`[TextScroller] ${paramName}는 숫자여야 합니다. 기본값(${defaultValue}) 사용`);
    return defaultValue;
  }
  if (min !== null && value < min) {
    console.warn(`[TextScroller] ${paramName}는 ${min} 이상이어야 합니다. 최소값 사용`);
    return min;
  }
  if (max !== null && value > max) {
    console.warn(`[TextScroller] ${paramName}는 ${max} 이하여야 합니다. 최대값 사용`);
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
export function createElement(tag, className, textContent = '') {
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
export function createScrollerItem(text, separator, direction, config) {
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
export function createTrack(text, separator, direction, duplicates, config) {
  const track = createElement('div', 'its-scroller-track');
  const totalItems = duplicates * 2;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < totalItems; i++) {
    fragment.appendChild(
      createScrollerItem(text, separator, direction, config)
    );
  }

  track.appendChild(fragment);
  return track;
}
