import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig as AxiosReqConfig,
  AxiosRequestConfig,
} from "axios";
import { AuthToken } from "@/connect/Auth";
import { LangToken } from "@/connect/I18n";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({
  baseURL,
});

function before(config: AxiosReqConf) {
  if (config.headers) {
    config.headers["Auth-Token"] = AuthToken.get();
    config.headers["Lang-Token"] = LangToken.get();
  }
  return config;
}

function fail(error: AxiosResponse) {
  return Promise.reject(error);
}

request.interceptors.request.use(before, e => {
  return Promise.reject(e);
});

request.interceptors.response.use(response => {
  if (response.config.responseType !== "json") {
    return response.data.data;
  }
  return response.data;
}, fail);

export default request as <T>(e: AxiosRequestConfig) => Promise<T>;

/** @types */
interface AxiosReqConf extends AxiosReqConfig {
  ignore?: boolean;
  upload?: boolean;
}
