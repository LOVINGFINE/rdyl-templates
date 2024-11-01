import path from 'path';
import { defineConfig } from '@/utils/config';

/** @description 全局配置 */
const AppConfig = defineConfig({
  prefix: 'api',
  upload: {
    rootDir: path.resolve(__dirname, '../public/upload'),
  },
  mongod: {
    database: 'AssistIQ',
  },
});

export default AppConfig;
