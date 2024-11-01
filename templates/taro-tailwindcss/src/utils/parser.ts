import Taro from '@tarojs/taro';

function encode(str: string) {
  return Taro.arrayBufferToBase64(new TextEncoder().encode(str));
}

function decode(str: string) {
  return new TextDecoder().decode(Taro.base64ToArrayBuffer(str));
}

export const base64 = {
  decode,
  encode,
};