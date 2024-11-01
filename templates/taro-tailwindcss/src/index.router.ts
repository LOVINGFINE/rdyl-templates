export const pages: RouteOption[] = [
  {
    path: 'pages/index/index',
    name: 'homepage',
    public: true,
    meta: {
      title: '首页',
    },
  },
];

export const tabs: RouteOption[] = [
  {
    path: 'pages/message/index',
    name: 'message',
    meta: {
      title: '消息通知',
    },
  },
  {
    path: 'pages/personal/index',
    name: 'personal',
    meta: {
      title: '个人中心',
    },
  },
];
