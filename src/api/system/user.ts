import { BasicResponseModel } from '@/api';
import { http } from '@/utils/http/axios';
import { ILoginForm } from '@/views/login/hook/account-hook';
import { UserType } from '@/types/system/userType';

/**
 * 获取用户信息返回值type
 */
export type LoginType = {
  access_token: string;
  expires_in: number;
};
export type ILoginDataType = BasicResponseModel<LoginType>;

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

export interface ILoginReturnType extends BasicResponseModel {
  permissions: string[];
  roles: string[];
  user: UserType;
}

/**
 * 获取验证码
 */
export function getCodeImg() {
  return http.request<ICodeDataType>(
    {
      url: '/code',
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
  return http.request<ILoginReturnType>({
    url: '/system/user/getInfo',
    method: 'get',
  });
}

/**
 * @description: 用户登录
 */
export function login(params: ILoginForm) {
  return http.request<BasicResponseModel>({
    url: '/auth/login',
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
