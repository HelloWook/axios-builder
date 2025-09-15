import { InterceptorManager, APIBuilder } from "./dist/index";

// 전역 인터셉터 설정 예제
const interceptorManager = InterceptorManager.getInstance();

// 요청 인터셉터 추가
interceptorManager.addRequestInterceptor((config) => {
  config.headers = config.headers || {};
  return config;
});

interceptorManager.addResponseInterceptor(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await refreshToken();
      return error.config;
    }
    return Promise.reject(error);
  }
);

// API 사용 예제
APIBuilder.get("/users")
  .baseUrl("https://jsonplaceholder.typicode.com") // 기본 URL 설정
  .build()
  .call<User[]>()
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

// 타입 정의
interface User {
  id: number;
  name: string;
}

async function refreshToken() {
  console.log("Token refreshed");
}
