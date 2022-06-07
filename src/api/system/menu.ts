import { http } from '@/utils/http/axios';
import { MenuType } from '@/types/system/menuType';
import { BasicResponseModel } from '@/api';

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return http.request({
    url: '/menus',
    method: 'GET',
  });
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
  return http.request<BasicResponseModel<MenuType[]>>({
    url: '/system/menu/list',
    method: 'GET',
    params,
  });
}

// 获取路由
export const getRouters = () => {
  return http.request({
    url: '/system/menu/getRouters',
    method: 'get',
  });
};
