# Infinite Text Scroller

<p align="center">
  <img src="https://img.shields.io/npm/v/infinite-text-scroller?color=blue&label=npm" alt="NPM Version" />
  <img src="https://img.shields.io/bundlephobia/minzip/infinite-text-scroller?label=gzipped" alt="Bundle Size" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/WCAG-2.2.2-green" alt="WCAG 2.2.2" />
  <img src="https://img.shields.io/badge/dependencies-zero-success" alt="Zero Dependencies" />
  <img src="https://img.shields.io/github/license/lledellebell/infinite-text-scroller" alt="License" />
</p>

<p align="center">
  의존성 없는 모던한 무한 텍스트 스크롤러 라이브러리<br>
  <sub>WCAG 2.2.2 준수 • Fade/Scroll 애니메이션 • 8가지 프리셋 • TypeScript 지원</sub>
</p>

<p align="center">
  <a href="./docs/API.md">API 문서</a> •
  <a href="./CHANGELOG.md">변경 로그</a>
</p>

---

## 빠른 시작

### 설치

```bash
npm install infinite-text-scroller
```

### 기본 사용

```js
import InfiniteTextScroller from 'infinite-text-scroller';

// 프리셋 사용 (가장 간단!)
InfiniteTextScroller.create({
  containerId: 'news-ticker',
  text: '최신 뉴스 • 속보 업데이트 • 긴급 공지',
  preset: 'news'
});
```

```html
<div id="news-ticker"></div>
```

### CDN 사용 (UMD)

```html
<div id="scroller"></div>
<script src="https://unpkg.com/infinite-text-scroller"></script>
<script>
  InfiniteTextScroller.create({
    containerId: 'scroller',
    text: '안녕하세요',
    preset: 'minimal'
  });
</script>
```

---

## 주요 기능

```
Zero Dependencies     경량 (<5KB gzipped)     WCAG 2.2.2 준수
TypeScript 지원       8가지 프리셋            다중 인스턴스
Scroll & Fade         RTL 지원               CSP 정책 준수
```

### v1.4.0의 새로운 기능

- **Fade 애니메이션**: 공지사항에 적합한 페이드 인/아웃 전환
- **인라인 스타일 제거**: CSP 정책 완벽 준수
- **모듈화**: 5개 파일로 분리하여 유지보수성 향상
- **접근성 강화**: pauseOnFocus, 키보드 제어, prefers-reduced-motion 지원
- **새 프리셋 3종**: announcement, currency, stock

자세한 내용은 [CHANGELOG.md](./CHANGELOG.md)를 참조하세요.

---

## 프리셋

8가지 즉시 사용 가능한 프리셋 제공:

### Scroll 타입

```js
// 뉴스 티커
InfiniteTextScroller.create({
  containerId: 'news',
  text: '속보: 긴급 뉴스 • 최신 소식',
  preset: 'news'
});

// 주식/시세 티커
InfiniteTextScroller.create({
  containerId: 'stock',
  text: 'AAPL: $150 ▲ | GOOGL: $2,850 ▼',
  preset: 'ticker'
});

// 프로모션 배너
InfiniteTextScroller.create({
  containerId: 'banner',
  text: '특별 할인 이벤트 진행중',
  preset: 'banner'
});

// 경고/알림
InfiniteTextScroller.create({
  containerId: 'alert',
  text: '시스템 점검 안내',
  preset: 'alert'
});
```

### Fade 타입

```js
// 공지사항 (Fade 전환)
InfiniteTextScroller.create({
  containerId: 'announcement',
  text: '중요 공지사항입니다',
  preset: 'announcement'
});
```

### 커스텀 프리셋

```js
// 환율 정보
InfiniteTextScroller.create({
  containerId: 'currency',
  text: 'USD/KRW: 1,350 | EUR/KRW: 1,450',
  preset: 'currency'
});

// 주식 시세 (다크 스타일)
InfiniteTextScroller.create({
  containerId: 'stock-dark',
  text: 'AAPL • GOOGL • MSFT • TSLA',
  preset: 'stock'
});

// 미니멀 (테두리 없음)
InfiniteTextScroller.create({
  containerId: 'simple',
  text: '심플한 스크롤러',
  preset: 'minimal'
});
```

전체 프리셋 목록: [API 문서](./docs/API.md#프리셋)

---

## 커스터마이징

```js
InfiniteTextScroller.create({
  containerId: 'custom',
  text: '커스텀 스크롤러',

  // 애니메이션
  speed: 15,
  direction: 'horizontal',
  pauseOnHover: true,

  // 스타일
  fontSize: '1.5rem',
  textColor: '#ff0000',
  backgroundColor: '#ffffff',
  separator: '•',

  // 접근성
  ariaLabel: '커스텀 티커',
  enableKeyboardControl: true,
  pauseOnFocus: true
});
```

전체 옵션 목록: [API 문서](./docs/API.md#설정-옵션)

---

## 인스턴스 제어

```js
const scroller = InfiniteTextScroller.create({
  containerId: 'news',
  preset: 'news',
  text: '초기 텍스트'
});

// 메서드 체이닝
scroller
  .updateText('새로운 텍스트')
  .updateSpeed(10)
  .updateColors({ textColor: '#ff0000' })
  .play();

// 재생 제어
scroller.pause();
scroller.play();
scroller.toggle();
scroller.reset();

// 상태 조회
const state = scroller.getState();
console.log(state.isPlaying); // true

// 제거
scroller.destroy();
```

전체 메서드 목록: [API 문서](./docs/API.md#인스턴스-메서드)

---

## React 통합

```jsx
import { useEffect, useRef } from 'react';
import InfiniteTextScroller from 'infinite-text-scroller';

function NewsTicker({ text }) {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = InfiniteTextScroller.create({
      containerId: 'news-ticker',
      text,
      preset: 'news'
    });

    scrollerRef.current = scroller;

    return () => scroller.destroy();
  }, []);

  useEffect(() => {
    scrollerRef.current?.updateText(text);
  }, [text]);

  return <div id="news-ticker" />;
}
```

더 많은 React 예제: [examples/react-example.jsx](./examples/react-example.jsx)

---

## 예제

### 라이브 예제

[advanced.html](./examples/advanced.html)에서 8가지 실제 서비스 사례를 확인할 수 있습니다:

- 뉴스 속보 (링크 포함, 실시간 업데이트)
- 긴급 공지 (경고 스타일)
- 금융 티커 (주식 시세, 로고)
- 이벤트 배너 (그라데이션)
- 시스템 상태 (모노스페이스)
- 소셜 피드 (아바타)
- 스포츠 스코어 (팀 로고)
- 날씨 정보 (아이콘)

### 로컬에서 실행

```bash
git clone https://github.com/lledellebell/infinite-text-scroller.git
cd infinite-text-scroller
npm install
npm run build

# HTTP 서버 실행
npx http-server -p 8080

# 브라우저에서 http://localhost:8080/examples/advanced.html 접속
```

---

## 개발

```bash
# 저장소 클론
git clone https://github.com/lledellebell/infinite-text-scroller.git
cd infinite-text-scroller

# 의존성 설치
npm install

# 개발 모드 (watch)
npm run dev

# 빌드
npm run build

# 테스트
npm test
```

### 빌드 결과물

- `dist/index.esm.js` - ES 모듈
- `dist/index.js` - UMD (압축)
- `dist/index.debug.js` - UMD (디버그)
- `dist/index.d.ts` - TypeScript 정의
- `dist/styles.css` - CSS (선택)

---

## 문서

- [API 문서](./docs/API.md) - 전체 설정 옵션 및 메서드
- [CHANGELOG](./CHANGELOG.md) - 버전별 변경사항
- [아키텍처 가이드](./docs/ARCHITECTURE.md) - 코드 구조 및 설계 문서

---

## 브라우저 지원

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 모던 브라우저 (ES6+ 지원)

---

## 라이선스

MIT © [lledellebell](https://github.com/lledellebell)

---

<p align="center">
  <sub>Built with ❤️ by developers, for developers</sub>
</p>
