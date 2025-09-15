import API, { HTTPMethod, HTTPHeaders } from "./api";

class APIBuilder {
  private _instance: API;

  constructor(method: HTTPMethod, url: string, data?: unknown) {
    this._instance = new API(method, url);
  }

  static get = (url: string) => new APIBuilder("GET", url);

  static put = (url: string, data: unknown) => new APIBuilder("PUT", url, data);

  static post = (url: string, data: unknown) =>
    new APIBuilder("POST", url, data);

  static patch = (url: string) => new APIBuilder("PATCH", url);

  static delete = (url: string) => new APIBuilder("DELETE", url);

  headers(value: HTTPHeaders): APIBuilder {
    this._instance.headers = {
      ...this._instance.headers,
      ...value,
    };
    return this;
  }

  timeout(value: number): APIBuilder {
    this._instance.timeout = value;
    return this;
  }

  withCredentials(value: boolean): APIBuilder {
    this._instance.withCredentials = value;
    return this;
  }

  baseUrl(value: string): APIBuilder {
    this._instance.baseURL = value;
    return this;
  }

  build(): API {
    return this._instance;
  }
}

export default APIBuilder;
