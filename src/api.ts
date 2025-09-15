import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { InterceptorManager } from "./interceptorManager";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type HTTPHeaders = Record<string, string>;

export type HTTPParams = Record<string, string | number | boolean>;

class API {
  readonly method: HTTPMethod;
  readonly url: string;

  headers?: HTTPHeaders;

  params?: HTTPParams;

  data?: unknown;

  timeout?: number;

  withCredentials?: boolean;

  baseURL?: string;

  private http;

  constructor(method: HTTPMethod, url: string) {
    this.method = method;
    this.url = url;
    this.http = axios.create();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    const interceptorManager = InterceptorManager.getInstance();

    // 전역 요청 인터셉터 설정
    interceptorManager.getRequestInterceptors().forEach((interceptor) => {
      this.http.interceptors.request.use(interceptor);
    });

    // 전역 응답 인터셉터 설정
    interceptorManager
      .getResponseInterceptors()
      .forEach(({ onFulfilled, onRejected }) => {
        this.http.interceptors.response.use(onFulfilled, onRejected);
      });
  }

  setRequestInterceptor(
    interceptor: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig
  ) {
    this.http.interceptors.request.use(interceptor);
  }

  setResponseInterceptor(
    onFulfilled: (response: AxiosResponse) => AxiosResponse,
    onRejected: (error: any) => Promise<any>
  ) {
    this.http.interceptors.response.use(onFulfilled, onRejected);
  }

  call<T>(): Promise<AxiosResponse<T>> {
    return this.http.request({
      method: this.method,
      url: this.url,
      headers: this.headers,
      params: this.params,
      data: this.data,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      baseURL: this.baseURL,
    });
  }
}

export default API;
