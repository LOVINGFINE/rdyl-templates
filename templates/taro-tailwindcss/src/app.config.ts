import { pages, tabs } from '@/index.router';

export default defineAppConfig({
  pages: [...pages.map((ele) => ele.path), ...tabs.map((ele) => ele.path)],
  tabBar: {
    custom: true,
    list: tabs.map(({ path, meta }) => ({
      pagePath: path,
      text: meta.title,
    })),
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
