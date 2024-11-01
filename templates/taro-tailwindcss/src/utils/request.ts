import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig as AxiosReqConfig,
  AxiosRequestConfig,
} from 'axios';
import { AuthToken, LangToken } from '@/connect';
import { API_BASE_URL } from '@/index.config';

interface AxiosReqConf extends AxiosReqConfig {
  ignore?: boolean;
  upload?: boolean;
}

const request = axios.create({
  baseURL: API_BASE_URL,
});

function before(config: AxiosReqConf) {
  if (config.headers) {
    config.headers['Auth-Token'] = AuthToken.value;
    config.headers['Lang-Token'] = LangToken.value;
  }
  return config;
}

function fail(error: AxiosResponse) {
  return Promise.reject(error);
}

request.interceptors.request.use(before, (e) => {
  return Promise.reject(e);
});

request.interceptors.response.use((response) => {
  if (response.config.responseType !== 'json') {
    return response.data.data;
  }
  return response.data;
}, fail);

export default request as <T>(e: AxiosRequestConfig) => Promise<T>;
