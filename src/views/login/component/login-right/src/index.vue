<script lang="ts" setup>
  import { ref } from 'vue';
  import AccountLogin from './cpns/login-account.vue';
  import SwitchLoginMethod from './cpns/login-switch-method.vue';

  const activeIndex = ref(1);

  function switchActive(e: number) {
    activeIndex.value = e;
  }
</script>

<template>
  <div class="login-card-right">
    <div class="login-form-title">欢迎登录</div>
    <SwitchLoginMethod @switch-active="switchActive" />
    <AccountLogin v-if="activeIndex === 1" ref="accountLoginRef" />
    <div v-else>手机验证码登录</div>
  </div>
</template>

<style lang="less" scoped>
  .login-card-right {
    background: #fff;
    width: 50%;
    padding: 20px 25px;
    box-sizing: border-box;
    border-radius: 24px;
    //float: right;
    //display: inline-block;

    :deep(.n-row) {
      height: 75px;
    }
  }

  .login-form-title {
    width: 95%;
    line-height: 120px;
    text-align: center;
    color: #000000;
    font-size: 2rem;
    margin: 0 auto;
  }

  .login-form-btn-container {
    width: 85%;
    margin: 10px auto;
  }

  :deep(.login-form-submit) {
    padding: 20px 0;
    font-size: 16px;
  }

  :deep(.n-form) {
    margin-top: 20px;
  }

  :deep(.login-base-item) {
    grid-template-rows: none !important;
  }

  :deep(.n-tabs .n-tab-pane) {
    padding: 0 !important;
  }

  :deep(.n-input),
  :deep(.n-input__input-el) {
    height: 50px;
    border-radius: 24px;
    font-size: 16px;
  }

  :deep(.n-input__placeholder) {
    font-size: 16px;
  }

  :deep(.n-icon) {
    font-size: 22px !important;
  }

  :deep(.forgot_password) {
    color: #1890ff;
  }

  :deep(.n-form-item .n-form-item-blank) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    align-content: stretch;
    justify-content: space-between;
  }

  :deep(.to-register) {
    margin-top: 10px;
    font-size: 14px;
    color: #999;

    .to-register-a {
      color: #1890ff;
    }
  }

  :deep(.n-tabs-tab__label) {
    font-size: 14px;
  }

  :deep(.form-item-code .n-input) {
    width: 250px !important;
  }

  :deep(.login-code-img) {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    z-index: 99;
    height: 100%;
  }
</style>
