import { Ref, ref } from 'vue';

export interface ILoginForm {
  username: string;
  password: string;
  uuid?: string;
  code?: string;
  remember?: number;
}

export const loginFrom: Ref<ILoginForm> = ref({
  uuid: '',
  username: '',
  password: '',
  code: '',
  remember: 0,
});

export const fromRules = ref({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['input', 'blur'],
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: ['input', 'blur'],
    },
  ],
  // reenteredPassword: [
  //   {
  //     required: true,
  //     message: "请再次输入密码",
  //     trigger: ["input", "blur"]
  //   },
  //   {
  //     validator: validatePasswordStartWith,
  //     message: "两次密码输入不一致",
  //     trigger: "input"
  //   },
  //   {
  //     validator: validatePasswordSame,
  //     message: "两次输入密码不一致",
  //     trigger: ["blur", "password-inpt"]
  //   }
  // ]
});

// function validatePasswordStartWith(rule: any, value: string) {
//   return (
//     loginFrom.value.password &&
//     loginFrom.value.password.startsWith(value) &&
//     loginFrom.value.password.length >= value.length
//   );
// }
// function validatePasswordSame(rule: any, value: string) {
//   return value === loginFrom.value.password;
// }
