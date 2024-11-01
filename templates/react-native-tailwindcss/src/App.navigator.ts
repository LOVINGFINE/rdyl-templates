import { lazy } from 'react';

export const stack: NavigatorOption[] = [
  {
    meta: {
      title: '登录页',
    },
    path: '/login',
    name: 'login',
    component: lazy(() => import(`@/pages/login`)),
  },
];

export const tabs: NavigatorOption[] = [
  {
    meta: {
      title: '首页',
      icon: '',
    },
    path: '/homepage',
    name: 'homepage',
    component: lazy(() => import(`@/pages/homepage`)),
  },
];

export const initialStack = 'tabs'; // 默认tabs

export const initialTab = 'homepage';
