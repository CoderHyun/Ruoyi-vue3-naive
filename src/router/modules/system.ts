import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { OptionsSharp, PersonSharp, Menu } from '@vicons/ionicons5';
import { UsergroupAddOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    redirect: '/system/menu',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: renderIcon(OptionsSharp),
      sort: 1,
    },
    children: [
      {
        path: 'user/index',
        name: 'system_uer',
        meta: {
          title: '用户管理',
          icon: renderIcon(PersonSharp),
        },
        component: () => import('@/views/system/user-manager/index.vue'),
      },
      {
        path: 'menu/index',
        name: 'system_menu',
        meta: {
          title: '菜单权限管理',
          icon: renderIcon(Menu),
        },
        component: () => import('@/views/system/menu/menu.vue'),
      },
      {
        path: 'role',
        name: 'system_role',
        meta: {
          title: '角色权限管理',
          icon: renderIcon(UsergroupAddOutlined),
        },
        component: () => import('@/views/system/role/role.vue'),
      },
    ],
  },
];

export default routes;
