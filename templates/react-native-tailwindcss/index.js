import { AppRegistry } from 'react-native';
import App from './src/App';
import tailwind from 'tailwind-rn';

global.$tw = tailwind;

AppRegistry.registerComponent('mobile', () => App);
