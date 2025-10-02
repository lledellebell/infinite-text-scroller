# Infinite Text Scroller

<p align="center">
  <img src="https://img.shields.io/npm/v/infinite-text-scroller?color=blue&label=npm" />
  <img src="https://img.shields.io/bundlephobia/minzip/infinite-text-scroller?label=gzipped" />
  <img src="https://img.shields.io/github/license/lledellebell/infinite-text-scroller" />
  <img src="https://img.shields.io/github/workflow/status/lledellebell/infinite-text-scroller/CI" />
  <img src="https://img.shields.io/npm/dm/infinite-text-scroller" />
  <img src="https://img.shields.io/github/stars/lledellebell/infinite-text-scroller?style=social" />
</p>

의존성 없는 모던한 무한 텍스트 스크롤러 라이브러리

## 주요 기능

- 의존성 없음 - 바닐라 자바스크립트
- 경량 - 5KB 미만 (gzip 압축)
- 현대적인 CSS - 논리 속성, 커스텀 속성 사용
- 접근성 지원 - prefers-reduced-motion 지원
- TypeScript 지원 - 완전한 타입 정의 포함
- 팩토리 패턴 - 깔끔하고 유지보수가 쉬운 아키텍처
- 다중 인스턴스 - 여러 스크롤러를 쉽게 관리

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
| preset | string | - | 프리셋 이름 (minimal, news, ticker, banner, alert) |
| **애니메이션** ||||
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 스크롤 방향 |
| speed | number | 20 | 애니메이션 속도 (초) |
| fontSize | string | '1.2rem' | 폰트 크기 |
| fontWeight | string | '400' | 폰트 두께 |
| fontFamily | string | 'inherit' | 폰트 패밀리 |
| textColor | string | '#000000' | 텍스트 색상 |
| backgroundColor | string | '#ffffff' | 배경 색상 |
| separator | string | '—' | 텍스트 구분자 |
| separatorColor | string | 'inherit' | 구분자 색상 |
| separatorOpacity | number | 0.5 | 구분자 투명도 |
| duplicates | number | 3 | 텍스트 복제 개수 |
| pauseOnHover | boolean | true | 호버 시 일시 정지 |
| autoInjectStyles | boolean | true | CSS 자동 주입 |
| className | string | '' | 추가 CSS 클래스 |
| fadeEdges | boolean | true | 가장자리 페이드 효과 |
| fadeWidth | string | 'clamp(60px, 10vw, 100px)' | 페이드 너비 |
| borderTop | boolean | true | 상단 테두리 |
| borderBottom | boolean | true | 하단 테두리 |
| borderColor | string | '#000000' | 테두리 색상 |
| borderWidth | string | '1px' | 테두리 두께 |
| padding | string | 'clamp(1rem, 2vw, 2rem)' | 패딩 |
| gap | string | 'calc(var(--its-spacing-base) * 2)' | 텍스트 간격 |
| letterSpacing | string | '-0.01em' | 자간 |
| animationTimingFunction | string | 'linear' | 애니메이션 타이밍 함수 |
| animationDelay | string | '0s' | 애니메이션 지연 |
| rtl | boolean | false | 오른쪽에서 왼쪽 방향 |

### 인스턴스 메서드
- updateText(newText) - 텍스트 업데이트
- updateHtml(newHtml) - HTML 업데이트
- updateChildren(newChildren) - children HTML 업데이트
- updateSpeed(newSpeed) - 속도 업데이트
- updateDirection(newDirection) - 방향 업데이트
- updateColors(colors) - 색상 업데이트
- updateConfig(config) - 여러 옵션 동시 업데이트
- pause() - 일시 정지
- play() - 재생
- toggle() - 재생/일시정지 토글
- reset() - 애니메이션 리셋
- setDelay(delay) - 애니메이션 지연 설정
- destroy() - DOM에서 제거
- getState() - 현재 상태 가져오기

모든 메서드는 체이닝을 지원합니다.

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
# http://localhost:8080/examples/basic.html
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
  text: '🎉 특별 이벤트 진행중',
  preset: 'banner'
});
```

**사용 가능한 프리셋:**
- `minimal` - 테두리/페이드 없는 심플한 스타일
- `news` - 뉴스 티커 스타일
- `ticker` - 주식/시세 스타일
- `banner` - 프로모션 배너 스타일
- `alert` - 경고/알림 스타일

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

**basic.html**: 3가지 기본 스크롤러와 제어 버튼
- 일반 가로 스크롤러
- 빠른 속도 스크롤러
- 세로 스크롤러

**advanced.html**: 실제 사용 사례 6가지
- 뉴스 티커
- 프로모션 배너
- 주식 시세 (자동 업데이트)
- 공지사항 (세로)
- 이벤트 배너 (지연 시작)
- RTL 지원

**react-example.jsx**: React 훅과 컴포넌트 패턴
**vue-example.vue**: Vue 컴포넌트 통합

## 라이선스

MIT

