import axios from "axios";
import config from "@/config";
import { getLocal } from "./";

class HttpRequest {
  constructor() {
    this.baseURL = config.baseURL;
    this.timeout = 3000;
  }

  setInterceptors(instance) {
    // 请求拦截
    instance.interceptors.request.use((config) => {
      console.log(getLocal("token"));
      // jwt
      config.headers.authorization = `Bear ${getLocal("token")}`;
      return config;
    });
    // 相应拦截
    instance.interceptors.response.use(
      (response) => {
        if (response.status == 200) {
          if (response.data.err === 0) {
            return Promise.resolve(response.data);
          } else {
            return Promise.reject(response.data.data);
          }
        } else {
          return Promise.reject(response.data.data);
        }
      },
      (err) => {
        switch (err.response.status) {
          case "401":
            console.log(err);
            break;
          default:
            break;
        }
        return Promise.reject(err);
      }
    );
  }

  mergeOptions(options) {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options,
    };
  }

  request(options) {
    const instance = axios.create();
    this.setInterceptors(instance);
    const opts = this.mergeOptions(options);
    return instance(opts);
  }

  get(url, config) {
    return this.request({
      method: "get",
      url,
      ...config,
    });
  }

  post(url, data) {
    return this.request({
      method: "post",
      url,
      data,
    });
  }
}

export default new HttpRequest();
