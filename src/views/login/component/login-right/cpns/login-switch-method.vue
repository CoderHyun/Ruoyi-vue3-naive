<script lang="ts" setup>
  import { reactive, ref, onMounted, Ref, defineEmits } from 'vue';
  import { IRelativePos } from '../types/swithLoginType';

  const emits = defineEmits<{ (e: 'switch-active', index: number): void }>();

  const CHILDREN_REF = 'childrenRef';
  // 父元素
  const mainRef = ref();
  // activeBj
  const activeBj = ref();
  const activeIndex = ref(1);

  const configList = ref([
    { index: 1, text: '密码登录' },
    { index: 2, text: '验证码登录' },
  ]);
  // activeBj的宽高
  const activeBjWidth: Ref<string> = ref('0px');
  const activeBjHeight: Ref<string> = ref('0px');
  const allChildrenEle: any = reactive({});
  // 最终的元素偏移量
  const relativePos: Ref<IRelativePos> = ref({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  /**
   * 切换事件
   * @param index
   */
  function switchActive(index: number) {
    // 当前点击的元素
    const children = allChildrenEle[CHILDREN_REF + index];
    // 父元素
    const parent = mainRef.value;
    if (children && parent) {
      const childrenPos = children.getBoundingClientRect();
      const parentPos = parent.getBoundingClientRect();
      if (childrenPos && parentPos) {
        relativePos.value = {
          top: childrenPos.top - parentPos.top,
          right: childrenPos.right - parentPos.right,
          bottom: childrenPos.bottom - parentPos.bottom,
          left: childrenPos.left - parentPos.left,
        };
      }
    }
    activeIndex.value = index;
    activeBj.value.style = `transform: translateX(${relativePos.value?.left - 5}px);`;
    emits('switch-active', index);
  }

  /**
   * 获取元素
   * @param el
   * @param index
   */
  function getCurrentRef(el: HTMLElement, index: number) {
    allChildrenEle[CHILDREN_REF + index] = el;
  }

  /* 渲染事件 */
  onMounted(() => {
    // 获取第一个子元素, 设置切换背景的宽高
    const children = allChildrenEle[CHILDREN_REF + 1];
    if (children) {
      activeBjWidth.value = children.offsetWidth + 'px';
      activeBjHeight.value = children.offsetHeight + 'px';
    }
  });
</script>

<template>
  <div ref="mainRef" class="switch-main">
    <div
      v-for="config in configList"
      :ref="(e) => getCurrentRef(e, config.index)"
      :key="config.index"
      :class="['switch-main-flex', config.index === activeIndex ? 'switch-main-flex-active' : '']"
      @click="switchActive(config.index)"
    >
      {{ config.text }}
    </div>
    <div ref="activeBj" class="switch-main-flex-active-bj"></div>
  </div>
</template>

<style lang="less" scoped>
  .switch-main {
    position: relative;
    display: flex;
    width: 100%;
    background: #f3f7fb;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 8px;
  }

  .switch-main-flex {
    flex: 1;
    position: relative;
    z-index: 9;
    text-align: center;
    cursor: pointer;
    padding: 8px 0;
    color: #828a95;
    font-size: 16px;
    box-sizing: border-box;
  }

  .switch-main-flex-active {
    color: #000;
  }

  .switch-main-flex-active-bj {
    width: v-bind(activeBjWidth);
    height: v-bind(activeBjHeight);
    position: absolute;
    transition: all 0.5s;
    box-shadow: 0 2px 4px rgba(23, 28, 39, 0.14);
    background: #ffff;
    border-radius: 11px;
  }
</style>
