<template>
  <div>
    <h1>Vue 예제</h1>
    <div :id="containerId"></div>
    <button @click="updateText">텍스트 변경</button>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import InfiniteTextScroller from 'infinite-text-scroller';

export default defineComponent({
  name: 'VueTextScrollerExample',
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const scrollerInstance = ref(null);
    const containerId = `vue-scroller-${Date.now()}`;

    onMounted(() => {
      scrollerInstance.value = InfiniteTextScroller.create({
        ...props.config,
        containerId,
      });
    });

    onBeforeUnmount(() => {
      if (scrollerInstance.value) {
        scrollerInstance.value.destroy();
      }
    });

    const updateText = () => {
      if (scrollerInstance.value) {
        scrollerInstance.value.updateText('Vue에서 텍스트가 성공적으로 변경되었습니다!');
      }
    };

    return {
      containerId,
      updateText,
    };
  },
});

/*
// 컴포넌트 사용 예시
<template>
  <VueTextScrollerExample :config="scrollerConfig" />
</template>

<script>
import VueTextScrollerExample from './VueTextScrollerExample.vue';

export default {
  components: { VueTextScrollerExample },
  data() {
    return {
      scrollerConfig: {
        text: 'Vue와 함께 사용하는 무한 스크롤러',
        speed: 30,
        backgroundColor: '#42b883',
        textColor: '#ffffff',
      },
    };
  },
};
</script>
*/
</script>
