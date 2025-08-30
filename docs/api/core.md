# 核心 API

核心 API 提供了应用的主要功能和接口。

## createApp()

创建一个新的应用实例。

### 语法

```typescript
function createApp(config?: AppConfig): AppInstance
```

### 参数

- `config` (可选) - 应用配置对象

### 返回值

返回一个 `AppInstance` 对象。

### 示例

```javascript
import { createApp } from './core'

// 基本用法
const app = createApp()

// 带配置的用法
const app = createApp({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  debug: true
})
```

### AppConfig 接口

```typescript
interface AppConfig {
  baseURL?: string          // API 基础 URL
  timeout?: number          // 请求超时时间（毫秒）
  debug?: boolean           // 是否启用调试模式
  retries?: number          // 重试次数
  headers?: Record<string, string>  // 默认请求头
}
```

## mount()

将应用实例挂载到 DOM 元素。

### 语法

```typescript
function mount(app: AppInstance, selector: string | Element): void
```

### 参数

- `app` - 应用实例
- `selector` - CSS 选择器字符串或 DOM 元素

### 示例

```javascript
import { createApp, mount } from './core'

const app = createApp()

// 使用选择器
mount(app, '#app')

// 使用 DOM 元素
const element = document.getElementById('app')
mount(app, element)
```

## unmount()

卸载应用实例。

### 语法

```typescript
function unmount(app: AppInstance): void
```

### 参数

- `app` - 要卸载的应用实例

### 示例

```javascript
import { createApp, mount, unmount } from './core'

const app = createApp()
mount(app, '#app')

// 稍后卸载
unmount(app)
```

## AppInstance

应用实例提供了以下方法和属性。

### 属性

#### config

应用的配置对象。

```typescript
app.config: AppConfig
```

#### version

当前版本号。

```typescript
app.version: string
```

### 方法

#### get()

发送 GET 请求。

```typescript
app.get(url: string, config?: RequestConfig): Promise<any>
```

**示例：**

```javascript
// 基本 GET 请求
const data = await app.get('/users')

// 带参数的 GET 请求
const user = await app.get('/users/123', {
  params: { include: 'profile' }
})
```

#### post()

发送 POST 请求。

```typescript
app.post(url: string, data?: any, config?: RequestConfig): Promise<any>
```

**示例：**

```javascript
// 创建用户
const newUser = await app.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
```

#### put()

发送 PUT 请求。

```typescript
app.put(url: string, data?: any, config?: RequestConfig): Promise<any>
```

**示例：**

```javascript
// 更新用户
const updatedUser = await app.put('/users/123', {
  name: 'Jane Doe'
})
```

#### delete()

发送 DELETE 请求。

```typescript
app.delete(url: string, config?: RequestConfig): Promise<any>
```

**示例：**

```javascript
// 删除用户
await app.delete('/users/123')
```

#### use()

添加中间件。

```typescript
app.use(middleware: Middleware): void
```

**示例：**

```javascript
// 添加认证中间件
app.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})
```

#### on()

监听事件。

```typescript
app.on(event: string, handler: Function): void
```

**示例：**

```javascript
// 监听请求事件
app.on('request', (config) => {
  console.log('发送请求:', config.url)
})

// 监听响应事件
app.on('response', (response) => {
  console.log('收到响应:', response.status)
})

// 监听错误事件
app.on('error', (error) => {
  console.error('请求错误:', error.message)
})
```

#### off()

移除事件监听器。

```typescript
app.off(event: string, handler?: Function): void
```

**示例：**

```javascript
const handler = (data) => console.log(data)

// 添加监听器
app.on('data', handler)

// 移除特定监听器
app.off('data', handler)

// 移除所有监听器
app.off('data')
```

## 拦截器

拦截器允许你在请求发送前和响应返回后进行处理。

### 请求拦截器

```javascript
// 添加请求拦截器
app.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
```

### 响应拦截器

```javascript
// 添加响应拦截器
app.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 处理未授权错误
      redirectToLogin()
    }
    return Promise.reject(error)
  }
)
```

## 错误处理

### 错误类型

```typescript
interface ApiError {
  code: string
  message: string
  status?: number
  data?: any
}
```

### 常见错误

```javascript
try {
  const data = await app.get('/api/data')
} catch (error) {
  switch (error.code) {
    case 'NETWORK_ERROR':
      console.error('网络错误:', error.message)
      break
    case 'TIMEOUT_ERROR':
      console.error('请求超时:', error.message)
      break
    case 'VALIDATION_ERROR':
      console.error('参数验证失败:', error.data)
      break
    default:
      console.error('未知错误:', error.message)
  }
}
```

## 配置选项

### RequestConfig

```typescript
interface RequestConfig {
  params?: Record<string, any>     // URL 参数
  headers?: Record<string, string> // 请求头
  timeout?: number                 // 超时时间
  retries?: number                 // 重试次数
  cache?: boolean                  // 是否缓存
}
```

### 示例

```javascript
const config = {
  params: { page: 1, limit: 10 },
  headers: { 'Content-Type': 'application/json' },
  timeout: 3000,
  retries: 2,
  cache: true
}

const data = await app.get('/api/users', config)
```

## 高级用法

### 自定义实例

```javascript
// 创建多个实例用于不同的 API
const userApi = createApp({
  baseURL: 'https://user-api.example.com'
})

const orderApi = createApp({
  baseURL: 'https://order-api.example.com'
})
```

### 插件系统

```javascript
// 创建插件
const authPlugin = {
  install(app) {
    app.use((config) => {
      config.headers.Authorization = `Bearer ${getToken()}`
      return config
    })
  }
}

// 使用插件
app.use(authPlugin)
```

### 批量请求

```javascript
// 并行请求
const [users, orders, products] = await Promise.all([
  app.get('/users'),
  app.get('/orders'),
  app.get('/products')
])

// 串行请求
const user = await app.get('/users/123')
const orders = await app.get(`/users/${user.id}/orders`)
```

## 最佳实践

1. **错误处理**: 始终使用 try-catch 处理异步请求
2. **类型安全**: 在 TypeScript 项目中定义接口类型
3. **拦截器**: 使用拦截器处理通用逻辑（如认证、错误处理）
4. **配置管理**: 将 API 配置集中管理
5. **性能优化**: 合理使用缓存和批量请求

## 相关链接

- [工具函数](/api/utils)
- [配置指南](/guide/configuration)
- [错误处理最佳实践](/guide/error-handling)