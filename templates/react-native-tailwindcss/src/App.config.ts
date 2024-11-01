import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

import zhCN from '@/locales/zh-CN.json';
import enUS from '@/locales/en-US.json';

export const i18nConfig: I18nConfig = {
  initialLang: 'zh-CN',
  locales: {
    'zh-CN': {
      title: '中文简体',
      messages: zhCN,
    },
    'en-US': {
      title: 'English(US)',
      messages: enUS,
    },
  },
};

export const storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  storageBackend: AsyncStorage,
});

export const website_name = 'react-native-tailwindcss';

export const API_BASE_URL = 'http://localhost:9999';
