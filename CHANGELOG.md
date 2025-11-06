# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-11-06

### Added
- **Fade 애니메이션**: `animationType: 'fade'` 옵션으로 페이드 인/아웃 전환 지원
- **새로운 프리셋 3종**: `announcement` (fade), `currency`, `stock`
- **WCAG 2.2.2 준수**:
  - `pauseOnFocus` 옵션 (포커스 시 자동 일시정지)
  - `enableKeyboardControl` (Space 키로 재생/일시정지)
  - `reducedMotionFallback` (`prefers-reduced-motion` 대응)
- **접근성 옵션**: `role`, `ariaLabel`, `ariaLive` 설정 가능
- **Fade 애니메이션 전용 메서드**:
  - `fadeShowItem(index)` - 특정 인덱스 아이템 표시
  - `fadeNext()` - 다음 아이템으로 전환
  - `fadeStart()` - 자동 전환 시작
  - `fadeStop()` - 자동 전환 정지
  - `fadePause()` / `fadeResume()` - 전환 일시정지/재개
- **스타일 옵션**: `fontFamily`, `separatorColor` 독립 설정 가능
- **다크 모드 예제**: `examples/advanced.html`에 테마 토글 기능 추가
- **Lucide 아이콘 통합**: 예제에서 SVG 아이콘 라이브러리 사용

### Changed
- **인라인 스타일 제거**: 모든 스타일이 `<style>` 태그로 관리되어 CSP (Content Security Policy) 준수
  - 마이그레이션 불필요: 자동으로 `<style>` 태그 주입
  - CSP 사용 시: `style-src 'unsafe-inline'` 제거 가능
- **코드베이스 모듈화**: `src/index.js`를 5개 파일로 분리하여 유지보수성 향상
  - `src/constants.js` - 기본 설정, 프리셋, 상수
  - `src/helpers.js` - sanitize, validate, generateId 유틸리티
  - `src/styles.js` - CSS 생성 및 주입 로직
  - `src/instance.js` - 인스턴스 생성 및 메서드
  - `src/index.js` - Public API 진입점
- **예제 페이지 전면 재작성**: `examples/advanced.html`을 8가지 서비스 사례로 교체(추후 레퍼런스 스타일 수정 예정)
  - 뉴스 속보 (실시간 업데이트, 링크 포함)
  - 긴급 공지 (경고 스타일, 아이콘 배지)
  - 금융 티커 (주식 시세, 회사 로고, 상승/하락 표시)
  - 이벤트 배너 (프로모션, 그라데이션 배경)
  - 시스템 상태 (모노스페이스 폰트, 상태 표시)
  - 소셜 피드 (사용자 아바타, 활동 피드)
  - 스포츠 스코어 (팀 로고, 실시간 경기 결과)
  - 날씨 정보 (날씨 아이콘, 전국 날씨 현황)
- **README 대폭 개선**: v1.4.0 기능 소개, API 참조 테이블 재구성, 예제 설명 추가

### Removed
- `examples/basic.html` 삭제 (`advanced.html`로 통합)

### Performance
- **Map 기반 스타일 캐싱**: 동일한 설정의 인스턴스는 스타일을 재사용하여 메모리 효율 향상
- **Set 사용 O(1) 조회**: 인스턴스 관리에 Set 자료구조 활용
- **이벤트 리스너 정리 개선**: `destroy()` 호출 시 모든 이벤트 리스너 및 타이머 해제

### Migration Guide

#### 1.3.x → 1.4.0

**변경사항 없음 (하위 호환성 100% 보장)**

모든 기존 코드는 수정 없이 작동합니다. 1.4.0에서 추가된 기능은 선택 사항입니다.

**새로운 기능 활용하기:**

```js
// Fade 애니메이션 사용
InfiniteTextScroller.create({
  containerId: 'announcement',
  text: '중요 공지사항',
  preset: 'announcement'  // 자동으로 animationType: 'fade' 적용
});

// 접근성 향상
InfiniteTextScroller.create({
  containerId: 'news',
  text: '최신 뉴스',
  pauseOnFocus: true,           // 포커스 시 일시정지 (WCAG 2.2.2)
  enableKeyboardControl: true,   // Space 키 제어
  ariaLabel: '뉴스 속보 티커',
  reducedMotionFallback: 'slow'  // 모션 감소 설정 대응
});
```

**CSP 정책 개선:**

인라인 스타일이 제거되어 엄격한 CSP 정책을 사용할 수 있습니다:

```html
<!-- Before (1.3.x) -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; style-src 'self' 'unsafe-inline';">

<!-- After (1.4.0) - 'unsafe-inline' 제거 가능 -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; style-src 'self';">
```

---

## [1.3.0] - 2024-XX-XX

### Added
- 프리셋 시스템: `minimal`, `news`, `ticker`, `banner`, `alert`
- React 통합 개선 (`InfiniteTextScrollerWrapper`)
- 보안 강화: XSS 방어를 위한 HTML sanitization

### Changed
- React 예제 업데이트

---

## [1.2.0] - 2024-XX-XX

### Added
- RTL (Right-to-Left) 지원
- `updateColors()` 메서드
- `updateConfig()` 메서드로 여러 옵션 동시 업데이트

---

## [1.1.0] - 2024-XX-XX

### Added
- TypeScript 타입 정의 (.d.ts)
- ES 모듈 빌드 (index.esm.js)
- 메서드 체이닝 지원

### Changed
- 빌드 시스템 개선 (Rollup)

---

## [1.0.0] - 2024-XX-XX

### Added
- 초기 릴리스
- 가로/세로 스크롤 지원
- 기본 스타일 옵션
- `pause()`, `play()`, `destroy()` 메서드
- UMD 및 ES 모듈 지원

---

## Links

- [GitHub Repository](https://github.com/lledellebell/infinite-text-scroller)
- [npm Package](https://www.npmjs.com/package/infinite-text-scroller)
- [Architecture Documentation](./docs/ARCHITECTURE.md)
