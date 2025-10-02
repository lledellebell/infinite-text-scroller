import React, { useEffect, useRef, useState } from 'react';
import InfiniteTextScroller from 'infinite-text-scroller';

// ============================================
// 방법 1: 기본 React 훅 사용 (기존 예제)
// ============================================
export const useTextScroller = (config) => {
  const scrollerRef = useRef(null);
  const containerId = `scroller-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (!config.text) return;

    const instance = InfiniteTextScroller.create({ ...config, containerId });
    scrollerRef.current = instance;

    return () => {
      if (scrollerRef.current) {
        scrollerRef.current.destroy();
      }
    };
  }, [config.text]); // 텍스트가 변경되면 다시 생성

  return { containerId, scroller: scrollerRef.current };
};

// 기본 컴포넌트 래퍼
export const TextScroller = ({ config }) => {
  const { containerId } = useTextScroller(config);
  return <div id={containerId} />;
};

// ============================================
// 방법 2: 개선된 컴포넌트 (YenToKRW 프로젝트에서 사용한 방법)
// ============================================
// 실제 프로젝트에서 많이 사용하는 props만 포함한 간소화 버전
export const InfiniteTextScrollerWrapper = ({
  text = '',
  html,  // HTML 문자열로 스타일링된 콘텐츠 사용 가능
  speed = 20,
  direction = 'horizontal',
  textColor = '#000000',
  backgroundColor = '#ffffff',
  separator = '—',
  separatorColor = 'inherit',
  separatorOpacity = 0.5,
  pauseOnHover = true,
  fadeEdges = true,
  fadeWidth = '100px',
  borderTop = false,
  borderBottom = false,
  padding = '1rem 0',
  letterSpacing = '0.01em',
  ...otherProps  // 나머지 props는 필요시 전달
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  // 초기 생성
  useEffect(() => {
    if (!containerRef.current) return;

    const containerId = `scroller-${Math.random().toString(36).substring(2, 11)}`;
    containerRef.current.id = containerId;

    scrollerRef.current = InfiniteTextScroller.create({
      text,
      html,
      containerId,
      speed,
      direction,
      textColor,
      backgroundColor,
      separator,
      separatorColor,
      separatorOpacity,
      pauseOnHover,
      fadeEdges,
      fadeWidth,
      borderTop,
      borderBottom,
      padding,
      letterSpacing,
      ...otherProps,
    });

    return () => {
      scrollerRef.current?.destroy();
    };
  }, []);

  // props 변경 시 업데이트
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.updateConfig({
        text,
        html,
        speed,
        direction,
        textColor,
        backgroundColor,
        separator,
        separatorColor,
        separatorOpacity,
        pauseOnHover,
        fadeEdges,
        fadeWidth,
        borderTop,
        borderBottom,
        padding,
        letterSpacing,
        ...otherProps,
      });
    }
  }, [
    text, html, speed, direction, textColor, backgroundColor,
    separator, separatorColor, separatorOpacity, pauseOnHover,
    fadeEdges, fadeWidth, borderTop, borderBottom, padding,
    letterSpacing, otherProps,
  ]);

  return <div ref={containerRef} />;
};

// ============================================
// 사용 예시
// ============================================

// 예시 1: 기본 사용
const BasicExample = () => {
  const [text, setText] = useState('React와 함께 사용하는 무한 스크롤러입니다.');

  const scrollerConfig = {
    text: text,
    speed: 25,
    textColor: 'blue',
  };

  return (
    <div>
      <h1>기본 예제</h1>
      <TextScroller config={scrollerConfig} />
      <button onClick={() => setText('텍스트가 업데이트 되었습니다!')}>
        텍스트 변경
      </button>
    </div>
  );
};

// 예시 2: 개선된 컴포넌트 사용 (HTML 지원)
const AdvancedExample = () => {
  return (
    <div>
      <h1>개선된 예제 - HTML 지원</h1>
      <InfiniteTextScrollerWrapper
        html={`
          <span style="font-weight: 700; color: #FF6B6B;">중요 공지</span>
          <span>일반 텍스트</span>
          <span style="font-weight: 700; color: #4ECDC4;">강조 텍스트</span>
        `}
        speed={30}
        direction="horizontal"
        backgroundColor="transparent"
        pauseOnHover={true}
      />
    </div>
  );
};

// 예시 3: Tailwind CSS와 함께 사용
const TailwindExample = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600">
      <InfiniteTextScrollerWrapper
        html={`
          <span class="inline-flex items-center py-2 px-5 bg-white/15 border border-white/30 rounded-full backdrop-blur-2xl">
            <span class="font-bold text-white">프리미엄 디자인</span>
          </span>
          <span class="font-medium text-white/95">현대적인 UI/UX</span>
        `}
        speed={35}
        backgroundColor="transparent"
        textColor="#FFFFFF"
        fadeEdges={true}
      />
    </div>
  );
};

// 메인 앱
const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <BasicExample />
      <hr style={{ margin: '40px 0' }} />
      <AdvancedExample />
      <hr style={{ margin: '40px 0' }} />
      <TailwindExample />
    </div>
  );
};

export default App;
