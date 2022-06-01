import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

/**
 * 获取用户信息返回值type
 */
export interface ILoginDataType {
  token: string;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

export interface ICodeDataType extends BasicResponseModel {
  uuid: string;
  img: string;
  captchaOnOff: boolean;
}

/**
 * 获取验证码
 */
export function getCodeImg() {
  return http.request<ICodeDataType>(
    {
      url: '/captchaImage',
      method: 'GET',
    },
    {
      isTransformResponse: true,
    }
  );
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: '/getInfo',
    method: 'get',
  });
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request<BasicResponseModel>({
    url: '/login',
    method: 'POST',
    params,
  });
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params,
  });
}

/**
 * 获取用户列表信息
 * @param params
 */
export function getUserList(params) {
  return http.get({
    url: '/user/list',
    params,
  });
}
