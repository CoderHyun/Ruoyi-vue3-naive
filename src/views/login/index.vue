<template>
  <div class="login">
    <div class="login-container">
      <LoginLeft />
      <LoginRight />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import LoginRight from './component/login-right';
  import LoginLeft from './component/login-left';

  export default defineComponent({
    name: 'Login',
    components: {
      LoginRight,
      LoginLeft,
    },
    setup() {},
  });
</script>

<style lang="less" scoped>
  @import './login.less';
</style>
