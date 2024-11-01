/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
/** @type {import('@react-native/metro-config').MetroConfig} */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
  resolver: {
    sourceExts: ['jsx', 'js', 'tsx', 'ts'], // 添加 'ts' 和 'tsx' 到 sourceExts
  },
});
const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
