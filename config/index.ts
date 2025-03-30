import { Platform } from 'react-native';

const Config = {
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
};

export default Config;
