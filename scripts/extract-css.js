import { writeFileSync, mkdirSync } from 'fs';

const css = `/* Infinite Text Scroller Styles */
:root {
  --its-color-bg: #ffffff;
  --its-color-text: #000000;
  --its-color-border: #000000;
  --its-spacing-base: clamp(1rem, 2vw, 2rem);
  --its-font-size-base: clamp(1rem, 1.2vw, 1.2rem);
  --its-border-width: 1px;
  --its-fade-width: clamp(60px, 10vw, 100px);
}

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
  animation: its-scroll var(--its-animation-timing, linear) infinite;
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

try {
  mkdirSync('dist', { recursive: true });
  writeFileSync('dist/styles.css', css);
  console.log('CSS 파일이 dist/styles.css로 생성되었습니다.');
} catch (error) {
  console.error('CSS 파일 생성 실패:', error);
  process.exit(1);
}
