# Axios Builder

A TypeScript-based HTTP request builder library using Axios. Create intuitive and type-safe API requests through method chaining.

## Features

- 🔨 Intuitive builder pattern API
- 📝 Full TypeScript support
- 🎯 Clean code through method chaining
- 🌐 Global interceptor management
- ⚡ Simple and clear usage
- 🛡️ Strong type inference
- 🔄 UMD/ESM/CommonJS support for all environments

## Installation

```bash
npm install @wookgi/axios-builder
```

## Basic Usage

```typescript
import { APIBuilder } from "@wookgi/axios-builder";

// GET request example
APIBuilder.get("/users")
  .build()
  .call<User[]>()
  .then((response) => {
    console.log(response.data);
  });

// POST request example
APIBuilder.post("/users")
  .setData({ name: "John Doe", email: "john@example.com" })
  .build()
  .call()
  .then((response) => {
    console.log(response.data);
  });

// GET request with query parameters
APIBuilder.get("/users")
  .setParams({ search: "john", page: 1 })
  .build()
  .call()
  .then((response) => {
    console.log(response.data);
  });
```

## Advanced Configuration Examples

```typescript
// Headers and timeout settings
APIBuilder.get("/users")
  .setHeaders({
    "Content-Type": "application/json",
    "Custom-Header": "value",
  })
  .setTimeout(5000)
  .build()
  .call();

// Base URL configuration
APIBuilder.post("/auth/login")
  .setBaseURL("https://api.example.com")
  .setData({
    username: "user",
    password: "pass",
  })
  .build()
  .call();

// WithCredentials setting
APIBuilder.get("/protected-resource").setWithCredentials(true).build().call();
```

## Using Global Interceptors

```typescript
import { InterceptorManager } from "@your-username/axios-builder";

const interceptorManager = InterceptorManager.getInstance();

// Request interceptor to add authentication token
interceptorManager.addRequestInterceptor((config) => {
  config.headers = config.headers || {};
  config.headers["Authorization"] = `Bearer ${getToken()}`;
  return config;
});

// Response interceptor for error handling
interceptorManager.addResponseInterceptor(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await refreshToken();
      return error.config;
    }
    return Promise.reject(error);
  }
);
```

## TypeScript Support

```typescript
// Specify response type
interface User {
  id: number;
  name: string;
  email: string;
}

// Type-safe response handling
APIBuilder.get("/users")
  .build()
  .call<User[]>()
  .then((response) => {
    const users: User[] = response.data;
    users.forEach((user) => console.log(user.name));
  });
```

## API Methods

### HTTP Methods

- `APIBuilder.get(url)`
- `APIBuilder.post(url)`
- `APIBuilder.put(url)`
- `APIBuilder.delete(url)`
- `APIBuilder.patch(url)`

### Configuration Methods

- `.setHeaders(headers)` - Set HTTP headers
- `.setParams(params)` - Set query parameters
- `.setData(data)` - Set request body data
- `.setTimeout(timeout)` - Set request timeout
- `.setWithCredentials(boolean)` - Set credentials inclusion
- `.setBaseURL(url)` - Set base URL
- `.build()` - Create API instance
- `.call<T>()` - Execute API call

## Error Handling

```typescript
APIBuilder.get("/users")
  .build()
  .call()
  .then((response) => {
    console.log("Success:", response.data);
  })
  .catch((error) => {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
      console.error("Status Code:", error.response?.status);
    } else {
      console.error("Unknown Error:", error);
    }
  });
```

## Using in Different Environments

### Browser via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@your-username/axios-builder/dist/index.umd.js"></script>
<script>
  // Global AxiosBuilder object
  const api = AxiosBuilder.APIBuilder.get("/users")
    .setBaseURL("https://api.example.com")
    .build();

  api
    .call()
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
</script>
```

### Node.js

```javascript
// CommonJS
const { APIBuilder } = require("@your-username/axios-builder");

// or ESM
// import { APIBuilder } from '@your-username/axios-builder';

const api = APIBuilder.get("/users")
  .setBaseURL("https://api.example.com")
  .build();

api
  .call()
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

## License

MIT License - See the [LICENSE](LICENSE) file for details.

## Author

([@HelloWook](https://github.com/HelloWook))
