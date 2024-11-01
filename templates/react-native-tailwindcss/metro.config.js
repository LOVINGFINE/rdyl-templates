/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 * @format
 */
/** @type {import('@react-native/metro-config').MetroConfig} */
import {getDefaultConfig} from '@react-native/metro-config';

const defaultConfig = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'tsx', 'ts', 'svg'],
  },
});

export default defaultConfig;
