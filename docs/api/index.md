# API 参考

欢迎来到 API 参考文档。这里包含了所有可用的 API 接口、函数和配置选项的详细说明。

## 概述

本 API 参考文档涵盖以下内容：

- **[核心 API](/api/core)** - 主要的 API 接口和方法
- **[工具函数](/api/utils)** - 辅助工具和实用函数

## 快速导航

### 核心功能

| API | 描述 | 版本 |
|-----|------|------|
| `createApp()` | 创建应用实例 | v1.0+ |
| `mount()` | 挂载应用到 DOM | v1.0+ |
| `unmount()` | 卸载应用 | v1.0+ |

### 工具函数

| 函数 | 描述 | 版本 |
|------|------|------|
| `formatDate()` | 格式化日期 | v1.0+ |
| `debounce()` | 防抖函数 | v1.0+ |
| `throttle()` | 节流函数 | v1.0+ |

## 使用说明

### 基本用法

```javascript
import { createApp } from './core'
import { formatDate } from './utils'

// 创建应用
const app = createApp({
  // 配置选项
})

// 挂载应用
app.mount('#app')

// 使用工具函数
const formatted = formatDate(new Date())
```

### TypeScript 支持

所有 API 都提供了完整的 TypeScript 类型定义：

```typescript
import type { AppConfig, AppInstance } from './types'

const config: AppConfig = {
  // 类型安全的配置
}

const app: AppInstance = createApp(config)
```

## 版本兼容性

| 版本 | 状态 | 发布日期 | 主要变更 |
|------|------|----------|----------|
| v1.2.0 | 最新 | 2024-01-15 | 新增工具函数 |
| v1.1.0 | 稳定 | 2023-12-01 | 性能优化 |
| v1.0.0 | 稳定 | 2023-10-01 | 初始版本 |

## 错误处理

所有 API 都遵循统一的错误处理模式：

```javascript
try {
  const result = await someApiCall()
  // 处理成功结果
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // 处理验证错误
  } else if (error.code === 'NETWORK_ERROR') {
    // 处理网络错误
  } else {
    // 处理其他错误
  }
}
```

### 常见错误码

| 错误码 | 描述 | 解决方案 |
|--------|------|----------|
| `VALIDATION_ERROR` | 参数验证失败 | 检查传入参数的类型和格式 |
| `NETWORK_ERROR` | 网络请求失败 | 检查网络连接和服务器状态 |
| `PERMISSION_ERROR` | 权限不足 | 确认用户权限和认证状态 |
| `NOT_FOUND_ERROR` | 资源不存在 | 检查资源路径和标识符 |

## 性能考虑

### 最佳实践

1. **批量操作**：尽可能使用批量 API 减少请求次数
2. **缓存策略**：合理使用缓存避免重复计算
3. **异步处理**：使用 Promise 和 async/await 处理异步操作
4. **资源清理**：及时清理不需要的资源和监听器

### 性能监控

```javascript
// 启用性能监控
const app = createApp({
  performance: {
    enabled: true,
    threshold: 100 // ms
  }
})

// 监听性能事件
app.on('performance', (metrics) => {
  console.log('API 调用耗时:', metrics.duration)
})
```

## 配置选项

### 全局配置

```javascript
const config = {
  // 基础配置
  baseURL: 'https://api.example.com',
  timeout: 5000,
  
  // 认证配置
  auth: {
    type: 'bearer',
    token: 'your-token'
  },
  
  // 重试配置
  retry: {
    attempts: 3,
    delay: 1000
  },
  
  // 缓存配置
  cache: {
    enabled: true,
    ttl: 300000 // 5分钟
  }
}
```

## 示例代码

### 完整示例

```javascript
import { createApp, mount } from './core'
import { formatDate, debounce } from './utils'

// 创建应用实例
const app = createApp({
  baseURL: 'https://api.example.com',
  timeout: 5000
})

// 添加请求拦截器
app.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})

// 添加响应拦截器
app.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API 错误:', error)
    throw error
  }
)

// 挂载应用
mount(app, '#app')

// 使用防抖函数优化搜索
const debouncedSearch = debounce(async (query) => {
  const results = await app.get('/search', { params: { q: query } })
  updateUI(results)
}, 300)
```

## 迁移指南

### 从 v1.0 升级到 v1.1

```javascript
// v1.0
const app = createApp(options)
app.start()

// v1.1
const app = createApp(options)
app.mount('#app') // 新的挂载方法
```

### 从 v1.1 升级到 v1.2

```javascript
// v1.1
import { utils } from './core'
utils.formatDate(date)

// v1.2
import { formatDate } from './utils' // 独立的工具模块
formatDate(date)
```

## 社区资源

- **GitHub**: [项目仓库](https://github.com/your-username/your-repo)
- **问题反馈**: [Issue Tracker](https://github.com/your-username/your-repo/issues)
- **讨论区**: [GitHub Discussions](https://github.com/your-username/your-repo/discussions)
- **更新日志**: [Changelog](/changelog)

## 下一步

- 查看 [核心 API](/api/core) 了解主要接口
- 探索 [工具函数](/api/utils) 了解辅助功能
- 阅读 [指南](/guide/) 了解最佳实践