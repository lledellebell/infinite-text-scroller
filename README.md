# Infinite Text Scroller

<p align="center">
  <img src="https://img.shields.io/npm/v/infinite-text-scroller?color=blue&label=npm" alt="NPM Version" />
  <img src="https://img.shields.io/bundlephobia/minzip/infinite-text-scroller?label=gzipped" alt="Bundle Size" />
  <img src="https://img.shields.io/github/license/lledellebell/infinite-text-scroller" alt="License" />
  <img src="https://img.shields.io/npm/dm/infinite-text-scroller" alt="Downloads" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/WCAG-2.2.2-green" alt="WCAG 2.2.2" />
  <img src="https://img.shields.io/badge/Tree--shakeable-Yes-brightgreen" alt="Tree-shakeable" />
  <img src="https://img.shields.io/badge/dependencies-zero-success" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  <img src="https://img.shields.io/maintenance/yes/2025" alt="Maintained" />
  <img src="https://img.shields.io/github/stars/lledellebell/infinite-text-scroller?style=social" alt="GitHub Stars" />
</p>

의존성 없는 모던한 무한 텍스트 스크롤러 라이브러리

**📚 문서**: [CHANGELOG](./CHANGELOG.md)

---

## v1.4.0의 새로운 기능

### 접근성 & UX
- **WCAG 2.2.2 완전 준수** - Pause, Stop, Hide 기능 (포커스/호버 시 자동 일시정지)
- **prefers-reduced-motion 지원** - 사용자 모션 설정 자동 감지
- **키보드 제어** - Space 키로 일시정지/재생 (enableKeyboardControl)
- **ARIA 속성 완벽 지원** - role, aria-live, aria-label 설정 가능

### 애니메이션 & 스타일
- **Fade In/Out 애니메이션** - 공지사항에 적합한 부드러운 전환 (animationType: 'fade')
- **인라인 스타일 제거** - 모든 스타일이 `<style>` 태그로 관리되어 CSP 정책 준수
- **인스턴스별 스타일 캐싱** - Map 기반 캐싱으로 성능 최적화

### 아키텍처 & 성능
- **모듈화된 코드베이스** - 5개 파일로 분리 (constants, helpers, styles, instance, main)
- **성능 최적화** - Set을 사용한 O(1) 조회, for...of 루프, Map 캐싱
- **새로운 프리셋 3종** - announcement (fade), currency, stock

### 개선사항
- pauseOnFocus 옵션 추가
- fontFamily CSS 변수 지원
- separatorColor 독립 설정 가능
- 더 나은 메모리 관리 및 이벤트 리스너 정리

## 주요 기능

- **Zero Dependencies** - 바닐라 자바스크립트 (의존성 없음)
- **경량** - 5KB 미만 (gzip 압축)
- **완전한 접근성** - WCAG 2.2.2 준수 + ARIA 지원
- **2가지 애니메이션** - Scroll (연속) & Fade (전환)
- **8가지 프리셋** - minimal, news, ticker, banner, alert, announcement, currency, stock
- **TypeScript** - 완전한 타입 정의 포함
- **다중 인스턴스** - 여러 스크롤러를 쉽게 관리
- **RTL 지원** - 오른쪽에서 왼쪽 언어 지원
- **현대적 CSS** - 논리 속성, CSS 커스텀 속성 사용
- **모듈화** - 깔끔하고 유지보수가 쉬운 아키텍처
- **Tree-shakeable** - ES 모듈 지원

## 설치

```bash
npm install infinite-text-scroller
```

## 빌드 방법

프로젝트를 클론한 후:

```bash
npm install
npm run build
```

빌드 결과물은 dist/ 폴더에 생성됩니다:
- `dist/index.esm.js` - ES 모듈 버전
- `dist/index.js` - UMD 버전 (압축됨)
- `dist/index.debug.js` - UMD 디버그 버전
- `dist/index.d.ts` - TypeScript 정의 파일
- `dist/styles.css` - CSS 스타일시트 (선택사항)

## 빠른 시작

### ES6 모듈

```js
import InfiniteTextScroller from 'infinite-text-scroller';

// 기본 사용
const scroller = InfiniteTextScroller.create({
  text: '안녕하세요',
  containerId: 'scroller',
  speed: 20,
  direction: 'horizontal'
});

// 프리셋 사용 (가장 간단!)
const newsScroller = InfiniteTextScroller.create({
  text: '최신 뉴스 • 속보 업데이트 • 긴급 공지',
  containerId: 'news-scroller',
  preset: 'news'  // news, ticker, banner, alert, minimal
});
```

### UMD (브라우저)

```html
<div id="scroller"></div>
<script src="node_modules/infinite-text-scroller/dist/index.js"></script>
<script>
  const scroller = InfiniteTextScroller.create({
    text: '안녕하세요',
    containerId: 'scroller'
  });
</script>
```

### CSS 스타일 (선택사항)

라이브러리는 자동으로 스타일을 주입합니다. 별도의 CSS 파일이 필요한 경우:

```js
import 'infinite-text-scroller/dist/styles.css';
```

또는 HTML에서:

```html
<link rel="stylesheet" href="node_modules/infinite-text-scroller/dist/styles.css">
```


## API 참조

### 설정 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| **콘텐츠** ||||
| text | string | '' | 표시할 텍스트 |
| html | string | '' | 텍스트 대신 렌더링할 HTML |
| children | string | '' | React children을 HTML 문자열로 변환한 값 (우선순위: children > html > text) |
| containerId | string | 필수 | 컨테이너 요소 ID |
| **프리셋** ||||
| preset | string | - | 프리셋 이름 (minimal, news, ticker, banner, alert, announcement, currency, stock) |
| **애니메이션** ||||
| animationType | 'scroll' \| 'fade' | 'scroll' | 애니메이션 타입 (scroll: 연속 스크롤, fade: 페이드 전환) |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 스크롤 방향 (animationType이 'scroll'일 때만) |
| speed | number | 20 | 스크롤 애니메이션 속도 (초) |
| interval | number | 5000 | Fade 전환 간격 (밀리초, animationType이 'fade'일 때만) |
| animationTimingFunction | string | 'linear' | 애니메이션 타이밍 함수 |
| animationDelay | string | '0s' | 애니메이션 지연 |
| **스타일** ||||
| fontSize | string | '1.2rem' | 폰트 크기 |
| fontWeight | string | '400' | 폰트 두께 |
| fontFamily | string | 'inherit' | 폰트 패밀리 |
| textColor | string | '#000000' | 텍스트 색상 |
| backgroundColor | string | '#ffffff' | 배경 색상 |
| separator | string | '—' | 텍스트 구분자 |
| separatorColor | string | 'inherit' | 구분자 색상 (기본값은 textColor 상속) |
| separatorOpacity | number | 0.5 | 구분자 투명도 (0-1) |
| borderTop | boolean | true | 상단 테두리 |
| borderBottom | boolean | true | 하단 테두리 |
| borderColor | string | '#000000' | 테두리 색상 |
| borderWidth | string | '1px' | 테두리 두께 |
| padding | string | 'clamp(1rem, 2vw, 2rem)' | 패딩 |
| gap | string | 'calc(var(--its-spacing-base) * 2)' | 텍스트 간격 |
| letterSpacing | string | '-0.01em' | 자간 |
| fadeEdges | boolean | true | 가장자리 페이드 효과 |
| fadeWidth | string | 'clamp(60px, 10vw, 100px)' | 페이드 너비 |
| **동작** ||||
| duplicates | number | 3 | 텍스트 복제 개수 (스크롤 매끄럽게) |
| pauseOnHover | boolean | true | 호버 시 일시 정지 |
| pauseOnFocus | boolean | true | 포커스 시 일시 정지 (WCAG 2.2.2) |
| rtl | boolean | false | 오른쪽에서 왼쪽 방향 |
| **접근성** ||||
| role | string | 'marquee' | ARIA role 속성 ('marquee' \| 'region') |
| ariaLabel | string | '' | ARIA label 속성 |
| ariaLive | string | 'off' | ARIA live 속성 ('off' \| 'polite' \| 'assertive') |
| enableKeyboardControl | boolean | true | 키보드 제어 활성화 (Space 키로 일시정지/재생) |
| reducedMotionFallback | string | 'slow' | prefers-reduced-motion 대응 ('slow' \| 'static' \| 'none') |
| **기타** ||||
| autoInjectStyles | boolean | true | CSS 자동 주입 |
| className | string | '' | 추가 CSS 클래스 |

### 인스턴스 메서드

#### 콘텐츠 업데이트
- `updateText(newText)` - 텍스트 업데이트
- `updateHtml(newHtml)` - HTML 업데이트
- `updateChildren(newChildren)` - children HTML 업데이트

#### 스타일 업데이트
- `updateSpeed(newSpeed)` - 속도 업데이트
- `updateDirection(newDirection)` - 방향 업데이트
- `updateColors({ textColor, backgroundColor, borderColor })` - 색상 업데이트
- `updateConfig(config)` - 여러 옵션 동시 업데이트

#### 재생 제어
- `pause()` - 일시 정지
- `play()` - 재생
- `toggle()` - 재생/일시정지 토글
- `reset()` - 애니메이션 리셋
- `setDelay(delay)` - 애니메이션 지연 설정

#### Fade 애니메이션 전용 (animationType: 'fade')
- `fadeShowItem(index)` - 특정 인덱스 아이템 표시
- `fadeNext()` - 다음 아이템으로 전환
- `fadeStart()` - 자동 전환 시작
- `fadeStop()` - 자동 전환 정지
- `fadePause()` - 전환 일시정지
- `fadeResume()` - 전환 재개

#### 기타
- `destroy()` - DOM에서 제거 및 정리
- `getState()` - 현재 상태 가져오기 (isPlaying, config, fadeCurrentIndex, isReducedMotion)

> **참고**: 모든 메서드는 체이닝을 지원합니다.
>
> ```js
> scroller.updateSpeed(15).updateColors({ textColor: 'red' }).play();
> ```

### 정적 메서드
- InfiniteTextScroller.create(options) - 새 인스턴스 생성
- InfiniteTextScroller.getInstance(id) - ID로 인스턴스 가져오기
- InfiniteTextScroller.getAllInstances() - 모든 인스턴스 가져오기
- InfiniteTextScroller.destroyAll() - 모든 인스턴스 제거
- InfiniteTextScroller.pauseAll() - 모든 인스턴스 일시정지
- InfiniteTextScroller.playAll() - 모든 인스턴스 재생

## 개발

저장소 클론:

```bash
git clone https://github.com/lledellebell/infinite-text-scroller.git
cd infinite-text-scroller
```

의존성 설치:
```bash
npm install
```

개발 모드 (watch):
```bash
npm run dev
```

빌드:
```bash
npm run build
```

테스트:
```bash
npm test
```

예제 실행: 
```bash
# 간단한 HTTP 서버 실행
npx http-server -p 8080

# 또는
python -m http.server 8080

# 브라우저에서 접속
# http://localhost:8080/examples/advanced.html
```

## 예제 설명

### 기본 사용법

**1. 프리셋 사용 (가장 간단!)**
```js
// 뉴스 스타일
InfiniteTextScroller.create({
  containerId: 'news',
  text: '최신 뉴스 • 속보',
  preset: 'news'
});

// 티커 스타일
InfiniteTextScroller.create({
  containerId: 'ticker',
  text: 'AAPL: $150 ▲ | GOOGL: $2,850 ▼',
  preset: 'ticker'
});

// 배너 스타일
InfiniteTextScroller.create({
  containerId: 'banner',
  text: '특별 이벤트 진행중',
  preset: 'banner'
});

// Fade 애니메이션 (공지사항용)
InfiniteTextScroller.create({
  containerId: 'announcement',
  text: '중요 공지사항입니다',
  preset: 'announcement'
});
```

**사용 가능한 프리셋:**
- `minimal` - 테두리/페이드 없는 심플한 스타일
- `news` - 뉴스 티커 스타일 (속도 15초, 점 구분자)
- `ticker` - 주식/시세 스타일 (속도 10초, 파이프 구분자)
- `banner` - 프로모션 배너 스타일 (속도 25초, 페이드 강조)
- `alert` - 경고/알림 스타일 (빨간색, 노란 배경)
- `announcement` - 공지사항 (fade-in/out 애니메이션, 5초 간격)
- `currency` - 환율 정보 전용 (파란 배경, 흰색 텍스트)
- `stock` - 주식 시세 전용 (어두운 배경, 밝은 텍스트)

**2. HTML 모드**
```js
const scroller = InfiniteTextScroller.create({
  containerId: 'scroller1',
  html: '<b style="color:red;">중요 공지</b> <span>이벤트 안내</span>',
  direction: 'horizontal'
});
```

**3. React children 방식 (권장)**
```jsx
import { InfiniteTextScrollerWrapper } from './InfiniteTextScrollerWrapper';

// 프리셋 사용
function App() {
  return (
    <InfiniteTextScrollerWrapper preset="news">
      <span>최신 뉴스</span>
      <span>속보 업데이트</span>
    </InfiniteTextScrollerWrapper>
  );
}

// 그룹화된 설정
function App() {
  return (
    <InfiniteTextScrollerWrapper
      animation={{ speed: 25, pauseOnHover: true }}
      style={{ textColor: '#FF6B6B', backgroundColor: 'transparent' }}
      effect={{ fadeEdges: true }}
    >
      <span>커스텀 컨텐츠</span>
      <span className="font-bold">강조 텍스트</span>
    </InfiniteTextScrollerWrapper>
  );
}

// 개별 props (하위 호환성)
function App() {
  return (
    <InfiniteTextScrollerWrapper
      speed={20}
      direction="horizontal"
      textColor="#000"
    >
      <span>Custom content</span>
    </InfiniteTextScrollerWrapper>
  );
}
```

1. **advanced.html**: 실제 서비스 사용 사례 8가지
  - 뉴스 속보 (링크 포함, 실시간 업데이트)
  - 긴급 공지 (경고 스타일, 아이콘 배지)
  - 금융 티커 (주식 시세, 회사 로고, 상승/하락 표시)
  - 이벤트 배너 (프로모션, 그라데이션 배경)
  - 시스템 상태 (모노스페이스 폰트, 상태 표시)
  - 소셜 피드 (사용자 아바타, 활동 피드)
  - 스포츠 스코어 (팀 로고, 실시간 경기 결과)
  - 날씨 정보 (날씨 아이콘, 전국 날씨 현황)

2. **react-example.jsx**: React 훅과 컴포넌트 패턴
3. **vue-example.vue**: Vue 컴포넌트 통합

## 문서

- [CHANGELOG.md](./CHANGELOG.md) - 버전별 변경사항 및 마이그레이션 가이드

## 라이선스

MIT

