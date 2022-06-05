import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './router-guards';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils';
import { DashboardOutlined } from '@vicons/antd';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

export const Dashboard = [
  {
    path: '/index',
    name: 'Index',
    redirect: '/index',
    component: Layout,
    meta: {
      title: '主控台',
      icon: renderIcon(DashboardOutlined),
      sort: 0,
    },
    children: [
      {
        path: '',
        name: `index_console`,
        meta: {
          title: '主控台',
          permissions: ['dashboard_console'],
          affix: true,
        },
        component: () => import('@/views/dashboard/console/console.vue'),
      },
    ],
  },
];

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
// TODO: 这里暂时把首页加入为无需权限
export const constantRouter: any[] = [LoginRoute, RootRoute, ...Dashboard, RedirectRoute];

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
