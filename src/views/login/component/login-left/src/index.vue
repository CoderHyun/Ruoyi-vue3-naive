<script lang="ts" setup>
  const appTitle = import.meta.env.VITE_GLOB_APP_TITLE;
</script>

<template>
  <div class="login-left">
    <div class="login-left-container">
      <img src="~@/assets/images/logo.png" />
      {{ appTitle }}
    </div>
  </div>
</template>

<style lang="less" scoped>
  .login-left {
    width: 60%;
    display: flex;
    align-items: center;
  }

  .login-left-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000000;
    font-size: 2.571rem;
    font-weight: 500;
    border-radius: 24px;
  }
</style>
