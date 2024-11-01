import path from 'path';
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack';
import './ast';

const config = {
  projectName: 'myApplet',
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@taro-hooks/plugin-react',
    '@tarojs/plugin-html',
    'taro-plugin-react-svg',
  ],
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: true,
    },
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: false,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain) {
      chain.merge({
        plugin: {
          install: {
            plugin: UnifiedWebpackPluginV5,
            args: [
              {
                appType: 'taro',
              },
            ],
          },
        },
      });
    },
  },
};

export default (merge) => {
  return merge({}, config, {
    env: {
      NODE_ENV: `"${process.env.NODE_ENV}"`,
    },
  });
};
