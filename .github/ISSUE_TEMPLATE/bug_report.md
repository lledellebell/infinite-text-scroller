---
name: 버그 리포트
about: 동작하지 않거나 예상과 다른 동작을 보고합니다.
title: "[BUG] "
labels: bug
assignees: ''
---

## 버그 설명
어떤 문제가 발생했는지 명확하고 간결하게 설명해주세요.

## 재현 방법
1. 어떤 설정/옵션으로
2. 어떤 코드를 실행했는지
3. 어떤 결과가 나왔는지
4. 기대한 결과는 무엇인지

## 코드/설정 예시
```js
const scroller = InfiniteTextScroller.createScroller({
  containerId: 'scroller1',
  text: '예시 텍스트',
  // ...옵션
});
```

## 환경 정보
- OS: [예: macOS, Windows, Linux]
- 브라우저/Node 버전: [예: Chrome 120, Node 18]
- infinite-text-scroller 버전: [예: 1.1.0]

## 추가 정보
(필요하다면 스크린샷, 콘솔 에러, 기타 참고자료 등)