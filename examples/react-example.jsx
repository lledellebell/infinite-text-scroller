import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import InfiniteTextScroller from 'infinite-text-scroller';

// ============================================
// React 컴포넌트 래퍼 (권장)
// ============================================
export const InfiniteTextScrollerWrapper = ({
  children,
  preset,
  style,
  animation,
  separator,
  border,
  effect,
  // 개별 props (하위 호환성)
  speed,
  direction,
  fontSize,
  fontWeight,
  textColor,
  backgroundColor,
  separatorText,
  separatorColor,
  separatorOpacity,
  pauseOnHover,
  fadeEdges,
  fadeWidth,
  borderTop,
  borderBottom,
  padding,
  letterSpacing,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !children) return;

    const containerId = `scroller-${Math.random().toString(36).substring(2, 11)}`;
    containerRef.current.id = containerId;

    let childrenHtml = '';
    try {
      childrenHtml = renderToStaticMarkup(<>{children}</>);
    } catch (error) {
      console.error('Failed to render children:', error);
      return;
    }

    // 그룹화된 props와 개별 props 병합
    const config = {
      children: childrenHtml,
      containerId,
      preset,
      // animation config
      speed: animation?.speed ?? speed,
      direction: animation?.direction ?? direction,
      pauseOnHover: animation?.pauseOnHover ?? pauseOnHover,
      // style config
      fontSize: style?.fontSize ?? fontSize,
      fontWeight: style?.fontWeight ?? fontWeight,
      textColor: style?.textColor ?? textColor,
      backgroundColor: style?.backgroundColor ?? backgroundColor,
      padding: style?.padding ?? padding,
      letterSpacing: style?.letterSpacing ?? letterSpacing,
      // separator config
      separator: separator?.separator ?? separatorText,
      separatorColor: separator?.separatorColor ?? separatorColor,
      separatorOpacity: separator?.separatorOpacity ?? separatorOpacity,
      // border config
      borderTop: border?.borderTop ?? borderTop,
      borderBottom: border?.borderBottom ?? borderBottom,
      // effect config
      fadeEdges: effect?.fadeEdges ?? fadeEdges,
      fadeWidth: effect?.fadeWidth ?? fadeWidth,
    };

    scrollerRef.current = InfiniteTextScroller.create(config);

    return () => {
      scrollerRef.current?.destroy();
    };
  }, [
    children,
    preset,
    style,
    animation,
    separator,
    border,
    effect,
    speed,
    direction,
    fontSize,
    fontWeight,
    textColor,
    backgroundColor,
    separatorText,
    separatorColor,
    separatorOpacity,
    pauseOnHover,
    fadeEdges,
    fadeWidth,
    borderTop,
    borderBottom,
    padding,
    letterSpacing,
  ]);

  return <div ref={containerRef} />;
};

// ============================================
// 사용 예시
// ============================================

// 예시 1: 프리셋 사용 (가장 간단)
const PresetExample = () => {
  return (
    <div>
      <h2>프리셋 사용</h2>

      <h3>News 스타일</h3>
      <InfiniteTextScrollerWrapper preset="news">
        <span>최신 뉴스</span>
        <span>속보 업데이트</span>
        <span>긴급 공지</span>
      </InfiniteTextScrollerWrapper>

      <h3>Ticker 스타일</h3>
      <InfiniteTextScrollerWrapper preset="ticker">
        <span>AAPL: $150.25 ▲</span>
        <span>GOOGL: $2,850.00 ▼</span>
        <span>MSFT: $310.50 ▲</span>
      </InfiniteTextScrollerWrapper>

      <h3>Banner 스타일</h3>
      <InfiniteTextScrollerWrapper preset="banner">
        <span>🎉 특별 이벤트 진행중</span>
        <span>지금 바로 확인하세요</span>
      </InfiniteTextScrollerWrapper>

      <h3>Alert 스타일</h3>
      <InfiniteTextScrollerWrapper preset="alert">
        <span>⚠️ 긴급 공지</span>
        <span>시스템 점검 예정</span>
      </InfiniteTextScrollerWrapper>
    </div>
  );
};

// 예시 2: Children 방식 사용 (권장)
const ChildrenExample = () => {
  return (
    <div>
      <h2>Children 방식 (권장)</h2>
      <InfiniteTextScrollerWrapper
        animation={{ speed: 25, pauseOnHover: true }}
        style={{ textColor: '#FF6B6B', backgroundColor: 'transparent' }}
        effect={{ fadeEdges: true }}
      >
        <span style={{ fontWeight: 700, color: '#FF6B6B' }}>중요 공지</span>
        <span>일반 텍스트</span>
        <span style={{ fontWeight: 700, color: '#4ECDC4' }}>강조 텍스트</span>
      </InfiniteTextScrollerWrapper>
    </div>
  );
};

// 예시 3: 그룹화된 Config 사용
const GroupedConfigExample = () => {
  return (
    <div>
      <h2>그룹화된 Config</h2>
      <InfiniteTextScrollerWrapper
        animation={{
          speed: 30,
          direction: 'horizontal',
          pauseOnHover: true
        }}
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          textColor: '#2C3E50',
          backgroundColor: '#ECF0F1'
        }}
        separator={{
          separator: '•',
          separatorColor: '#95A5A6',
          separatorOpacity: 0.7
        }}
        border={{
          borderTop: true,
          borderBottom: true
        }}
        effect={{
          fadeEdges: true,
          fadeWidth: '120px'
        }}
      >
        <span>모던한 디자인</span>
        <span>깔끔한 인터페이스</span>
        <span>완벽한 UX</span>
      </InfiniteTextScrollerWrapper>
    </div>
  );
};

// 예시 4: 개별 Props 사용 (하위 호환성)
const IndividualPropsExample = () => {
  return (
    <div>
      <h2>개별 Props (하위 호환성)</h2>
      <InfiniteTextScrollerWrapper
        speed={35}
        direction="horizontal"
        fontSize="1.2rem"
        textColor="#FFFFFF"
        backgroundColor="transparent"
        separatorText="—"
        separatorColor="#FFFFFF"
        separatorOpacity={0.5}
        pauseOnHover={true}
        fadeEdges={true}
        fadeWidth="100px"
        borderTop={false}
        borderBottom={false}
      >
        <span>개별 Props 방식</span>
        <span>여전히 지원됩니다</span>
      </InfiniteTextScrollerWrapper>
    </div>
  );
};

// 예시 5: Tailwind CSS와 함께 사용
const TailwindExample = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600">
      <h2 className="text-white text-center py-4">Tailwind CSS 통합</h2>
      <InfiniteTextScrollerWrapper
        preset="banner"
        style={{
          textColor: '#FFFFFF',
          backgroundColor: 'transparent'
        }}
      >
        <span className="inline-flex items-center py-2 px-5 bg-white/15 border border-white/30 rounded-full backdrop-blur-2xl">
          <span className="font-bold text-white">프리미엄 디자인</span>
        </span>
        <span className="font-medium text-white/95">현대적인 UI/UX</span>
        <span className="inline-flex items-center py-2 px-5 bg-white/15 border border-white/30 rounded-full backdrop-blur-2xl">
          <span className="font-bold text-white">무료로 시작하기</span>
        </span>
      </InfiniteTextScrollerWrapper>
    </div>
  );
};

// 예시 6: 동적 상태 관리
const DynamicExample = () => {
  const [items, setItems] = useState([
    '첫 번째 아이템',
    '두 번째 아이템',
    '세 번째 아이템'
  ]);

  const addItem = () => {
    setItems([...items, `새 아이템 ${items.length + 1}`]);
  };

  return (
    <div>
      <h2>동적 상태 관리</h2>
      <InfiniteTextScrollerWrapper preset="ticker">
        {items.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </InfiniteTextScrollerWrapper>
      <button onClick={addItem} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        아이템 추가
      </button>
    </div>
  );
};

// 예시 7: 프리셋 + 커스터마이징
const PresetCustomizationExample = () => {
  return (
    <div>
      <h2>프리셋 + 커스터마이징</h2>
      <InfiniteTextScrollerWrapper
        preset="news"  // 기본 news 스타일 적용
        animation={{ speed: 40 }}  // 속도만 오버라이드
        style={{ textColor: '#E74C3C' }}  // 색상만 오버라이드
      >
        <span>커스터마이징된 뉴스 티커</span>
        <span>프리셋 + 개별 설정 조합</span>
      </InfiniteTextScrollerWrapper>
    </div>
  );
};

// 메인 앱
const App = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Infinite Text Scroller - React 예제</h1>

      <PresetExample />
      <hr style={{ margin: '40px 0' }} />

      <ChildrenExample />
      <hr style={{ margin: '40px 0' }} />

      <GroupedConfigExample />
      <hr style={{ margin: '40px 0' }} />

      <IndividualPropsExample />
      <hr style={{ margin: '40px 0' }} />

      <TailwindExample />
      <hr style={{ margin: '40px 0' }} />

      <DynamicExample />
      <hr style={{ margin: '40px 0' }} />

      <PresetCustomizationExample />
    </div>
  );
};

export default App;
