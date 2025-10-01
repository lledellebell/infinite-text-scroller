import React, { useEffect, useRef, useState } from 'react';
import InfiniteTextScroller from 'infinite-text-scroller';

// 1. React 훅 사용 예시
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

// 2. React 컴포넌트 래퍼 예시
export const TextScroller = ({ config }) => {
  const { containerId } = useTextScroller(config);
  return <div id={containerId} />;
};

// 사용 예시
const App = () => {
  const [text, setText] = useState('React와 함께 사용하는 무한 스크롤러입니다.');

  const scrollerConfig = {
    text: text,
    speed: 25,
    textColor: 'blue',
  };

  return (
    <div>
      <h1>React 예제</h1>
      <TextScroller config={scrollerConfig} />
      <button onClick={() => setText('텍스트가 업데이트 되었습니다!')}>
        텍스트 변경
      </button>
    </div>
  );
};

export default App;
