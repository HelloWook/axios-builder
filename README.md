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
APIBuilder.post("/users", { name: "John Doe", email: "john@example.com" })
  .build()
  .call()
  .then((response) => {
    console.log(response.data);
  });

// PUT request example
APIBuilder.put("/users/1", { name: "Updated Name" })
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
  .headers({
    "Content-Type": "application/json",
    "Custom-Header": "value",
  })
  .timeout(5000)
  .build()
  .call();

// Base URL configuration
APIBuilder.post("/auth/login", {
  username: "user",
  password: "pass",
})
  .baseUrl("https://api.example.com")
  .build()
  .call();

// WithCredentials setting
APIBuilder.get("/protected-resource").withCredentials(true).build().call();
```

## Using Global Interceptors

```typescript
import { InterceptorManager } from "@wookgi/axios-builder";

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

## Request-Specific Interceptors

You can also add interceptors to specific API instances:

```typescript
const api = APIBuilder.get("/users").build();

// Add request interceptor to this specific API instance
api.setRequestInterceptor((config) => {
  console.log("Request intercepted:", config);
  return config;
});

// Add response interceptor to this specific API instance
api.setResponseInterceptor(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Error intercepted:", error);
    return Promise.reject(error);
  }
);

api.call();
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

- `APIBuilder.get(url)` - Create a GET request
- `APIBuilder.post(url, data)` - Create a POST request with data
- `APIBuilder.put(url, data)` - Create a PUT request with data
- `APIBuilder.patch(url)` - Create a PATCH request
- `APIBuilder.delete(url)` - Create a DELETE request

### Configuration Methods

- `.headers(headers)` - Set HTTP headers
- `.timeout(timeout)` - Set request timeout in milliseconds
- `.withCredentials(boolean)` - Set credentials inclusion
- `.baseUrl(url)` - Set base URL for the request
- `.build()` - Create API instance
- `.call<T>()` - Execute API call with optional response type

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
<script src="https://cdn.jsdelivr.net/npm/@wookgi/axios-builder/dist/index.umd.js"></script>
<script>
  // Global AxiosBuilder object
  const api = AxiosBuilder.APIBuilder.get("/users")
    .baseUrl("https://api.example.com")
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
const { APIBuilder } = require("@wookgi/axios-builder");

// or ESM
// import { APIBuilder } from '@wookgi/axios-builder';

const api = APIBuilder.get("/users").baseUrl("https://api.example.com").build();

api
  .call()
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
```

## License

MIT License - See the [LICENSE](LICENSE) file for details.

## Author

([@HelloWook](https://github.com/HelloWook))
