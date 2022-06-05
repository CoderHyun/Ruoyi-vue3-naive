<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { loginFrom, fromRules } from '@/views/login/hook/account-hook';
  import {
    PersonCircle,
    LockClosedOutline,
    ShieldCheckmarkOutline as ShieldCode,
  } from '@vicons/ionicons5';
  import { NForm, useMessage } from 'naive-ui';
  import Cookies from 'js-cookie';
  import { getCodeImg } from '@/api/system/user';
  import { decrypt, encrypt } from '@/utils/jsencrypt';
  import { useUserStore } from '@/store/modules/user';
  import { PageEnum } from '@/enums/pageEnum';
  import router from '@/router';

  /**
   * data
   */
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;
  const userStore = useUserStore();
  const route = useRoute();
  const codeUrl = ref('');
  const message = useMessage();
  const pageLoading = ref(false);
  const accountLoginRef = ref<InstanceType<typeof NForm>>();

  /**
   * 获取Cookies中的账号密码数据
   */
  function getCookies() {
    const userName = Cookies.get('username');
    const password = Cookies.get('password');
    const remember = Cookies.get('remember');
    let finalPass = '';
    if (password) {
      finalPass = decrypt(password).toString();
    }
    loginFrom.value = {
      username: userName || '',
      password: finalPass,
      remember: userName ? Number(remember) : 0,
    };
  }

  /**
   * 获取验证码
   */
  function getCode() {
    getCodeImg().then((res) => {
      const { uuid, img } = res;
      loginFrom.value.uuid = uuid;
      codeUrl.value = 'data:image/gif;base64,' + img;
    });
  }

  /**
   * 记住密码
   */
  function rememberPassword() {
    if (loginFrom.value.remember) {
      Cookies.set('username', loginFrom.value.username, { expires: 30 });
      Cookies.set('password', encrypt(loginFrom.value.password).toString(), { expires: 30 });
      Cookies.set('remember', loginFrom.value.remember.toString(), { expires: 30 });
    } else {
      Cookies.remove('username');
      Cookies.remove('password');
      Cookies.remove('remember');
    }
  }

  // 登录按钮点击事件
  function handleValidateButtonClick(e: any) {
    e.preventDefault();
    accountLoginRef.value?.validate((error) => {
      if (error) {
        message.error('请检查必填项是否填写完成！', {
          closable: true,
        });
        return false;
      }
      pageLoading.value = true;
      // 记住密码
      rememberPassword();
      // 登录
      userStore
        .login(loginFrom.value)
        .then((res) => {
          if (res?.code !== 200) return;
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          message.success('登录成功，即将进入系统');
          if (route.name === LOGIN_NAME) {
            router.push('/');
            pageLoading.value = false;
          } else router.push(toPath);
        })
        .catch((_) => {
          console.error('登录失败');
          pageLoading.value = false;
          getCode();
        });
    });
  }

  getCode();
  getCookies();
</script>

<template>
  <div>
    <n-form ref="accountLoginRef" :model="loginFrom" :rules="fromRules">
      <n-form-item path="username" class="login-base-item">
        <n-input placeholder="请输入用户名" v-model:value="loginFrom.username">
          <template #prefix>
            <n-icon :component="PersonCircle" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password" class="login-base-item">
        <n-input
          placeholder="请输入密码"
          type="password"
          show-password-on="mousedown"
          v-model:value="loginFrom.password"
        >
          <template #prefix>
            <n-icon :component="LockClosedOutline" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="code" class="login-base-item form-item-code">
        <n-input placeholder="请输入验证码" v-model:value="loginFrom.code">
          <template #prefix>
            <n-icon :component="ShieldCode" />
          </template>
        </n-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" alt="" @click="getCode" />
        </div>
      </n-form-item>
      <div>
        <n-checkbox v-model:checked="loginFrom.remember" :checked-value="1" :unchecked-value="0">
          记住密码
        </n-checkbox>
        <n-button type="text" class="forgot_password">忘记密码</n-button>
      </div>
    </n-form>
    <div class="login-form-btn-container">
      <n-button
        type="primary"
        :block="true"
        :loading="pageLoading"
        class="login-form-submit"
        @click="handleValidateButtonClick"
      >
        登 录
      </n-button>
      <div class="to-register"> 没有账号? <a class="to-register-a">去注册</a> </div>
    </div>
  </div>
</template>

<style></style>
