import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export class InterceptorManager {
  private static instance: InterceptorManager;
  private requestInterceptors: Array<
    (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  >;
  private responseInterceptors: Array<{
    onFulfilled: (response: AxiosResponse) => AxiosResponse;
    onRejected: (error: any) => Promise<any>;
  }>;

  private constructor() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  static getInstance(): InterceptorManager {
    if (!InterceptorManager.instance) {
      InterceptorManager.instance = new InterceptorManager();
    }
    return InterceptorManager.instance;
  }

  addRequestInterceptor(
    interceptor: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig
  ) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(
    onFulfilled: (response: AxiosResponse) => AxiosResponse,
    onRejected: (error: any) => Promise<any>
  ) {
    this.responseInterceptors.push({ onFulfilled, onRejected });
  }

  getRequestInterceptors() {
    return this.requestInterceptors;
  }

  getResponseInterceptors() {
    return this.responseInterceptors;
  }

  clear() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }
}
