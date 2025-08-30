# 工具函数

工具函数模块提供了一系列实用的辅助函数，帮助你更高效地开发应用。

## 日期时间工具

### formatDate()

格式化日期为指定格式的字符串。

#### 语法

```typescript
function formatDate(date: Date | string | number, format?: string): string
```

#### 参数

- `date` - 要格式化的日期（Date 对象、时间戳或日期字符串）
- `format` (可选) - 格式化模式，默认为 `'YYYY-MM-DD'`

#### 返回值

格式化后的日期字符串。

#### 示例

```javascript
import { formatDate } from './utils'

// 基本用法
formatDate(new Date()) // '2024-01-15'

// 自定义格式
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // '2024-01-15 14:30:25'
formatDate(new Date(), 'MM/DD/YYYY') // '01/15/2024'
formatDate(new Date(), 'YYYY年MM月DD日') // '2024年01月15日'

// 使用时间戳
formatDate(1705312225000, 'YYYY-MM-DD') // '2024-01-15'

// 使用日期字符串
formatDate('2024-01-15', 'MM-DD') // '01-15'
```

#### 格式化标记

| 标记 | 描述 | 示例 |
|------|------|------|
| `YYYY` | 四位年份 | 2024 |
| `YY` | 两位年份 | 24 |
| `MM` | 两位月份 | 01-12 |
| `M` | 月份 | 1-12 |
| `DD` | 两位日期 | 01-31 |
| `D` | 日期 | 1-31 |
| `HH` | 24小时制小时 | 00-23 |
| `H` | 24小时制小时 | 0-23 |
| `mm` | 分钟 | 00-59 |
| `m` | 分钟 | 0-59 |
| `ss` | 秒 | 00-59 |
| `s` | 秒 | 0-59 |

### parseDate()

解析日期字符串为 Date 对象。

#### 语法

```typescript
function parseDate(dateString: string, format?: string): Date
```

#### 示例

```javascript
import { parseDate } from './utils'

// 解析标准格式
parseDate('2024-01-15') // Date 对象

// 解析自定义格式
parseDate('15/01/2024', 'DD/MM/YYYY') // Date 对象
parseDate('2024年01月15日', 'YYYY年MM月DD日') // Date 对象
```

### getRelativeTime()

获取相对时间描述。

#### 语法

```typescript
function getRelativeTime(date: Date | string | number): string
```

#### 示例

```javascript
import { getRelativeTime } from './utils'

const now = new Date()
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

getRelativeTime(oneHourAgo) // '1小时前'
getRelativeTime(yesterday) // '1天前'
getRelativeTime(new Date(now.getTime() + 60 * 60 * 1000)) // '1小时后'
```

## 函数工具

### debounce()

创建一个防抖函数，在指定时间内只执行最后一次调用。

#### 语法

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate?: boolean
): T
```

#### 参数

- `func` - 要防抖的函数
- `delay` - 延迟时间（毫秒）
- `immediate` (可选) - 是否立即执行第一次调用

#### 示例

```javascript
import { debounce } from './utils'

// 搜索防抖
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query)
}, 300)

// 多次快速调用，只会执行最后一次
debouncedSearch('a')
debouncedSearch('ab')
debouncedSearch('abc') // 只有这次会执行

// 窗口大小调整防抖
const debouncedResize = debounce(() => {
  console.log('窗口大小改变')
}, 250)

window.addEventListener('resize', debouncedResize)
```

### throttle()

创建一个节流函数，在指定时间间隔内最多执行一次。

#### 语法

```typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T
```

#### 参数

- `func` - 要节流的函数
- `delay` - 时间间隔（毫秒）

#### 示例

```javascript
import { throttle } from './utils'

// 滚动节流
const throttledScroll = throttle(() => {
  console.log('页面滚动')
}, 100)

window.addEventListener('scroll', throttledScroll)

// 按钮点击节流
const throttledClick = throttle(() => {
  console.log('按钮被点击')
}, 1000)

button.addEventListener('click', throttledClick)
```

### once()

创建一个只能执行一次的函数。

#### 语法

```typescript
function once<T extends (...args: any[]) => any>(func: T): T
```

#### 示例

```javascript
import { once } from './utils'

const initialize = once(() => {
  console.log('初始化应用')
  // 初始化逻辑
})

// 多次调用，只会执行一次
initialize() // 输出: '初始化应用'
initialize() // 不会执行
initialize() // 不会执行
```

## 对象工具

### deepClone()

深度克隆对象。

#### 语法

```typescript
function deepClone<T>(obj: T): T
```

#### 示例

```javascript
import { deepClone } from './utils'

const original = {
  name: 'John',
  address: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: ['reading', 'swimming']
}

const cloned = deepClone(original)
cloned.address.city = 'Los Angeles'

console.log(original.address.city) // 'New York' (未被修改)
console.log(cloned.address.city) // 'Los Angeles'
```

### merge()

深度合并多个对象。

#### 语法

```typescript
function merge<T>(...objects: Partial<T>[]): T
```

#### 示例

```javascript
import { merge } from './utils'

const defaults = {
  timeout: 5000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json'
  }
}

const userConfig = {
  timeout: 3000,
  headers: {
    'Authorization': 'Bearer token'
  }
}

const config = merge(defaults, userConfig)
// {
//   timeout: 3000,
//   retries: 3,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer token'
//   }
// }
```

### pick()

从对象中选择指定的属性。

#### 语法

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

#### 示例

```javascript
import { pick } from './utils'

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret',
  role: 'admin'
}

const publicUser = pick(user, ['id', 'name', 'email'])
// { id: 1, name: 'John', email: 'john@example.com' }
```

### omit()

从对象中排除指定的属性。

#### 语法

```typescript
function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

#### 示例

```javascript
import { omit } from './utils'

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret',
  role: 'admin'
}

const safeUser = omit(user, ['password'])
// { id: 1, name: 'John', email: 'john@example.com', role: 'admin' }
```

## 数组工具

### unique()

数组去重。

#### 语法

```typescript
function unique<T>(array: T[]): T[]
function unique<T>(array: T[], key: keyof T): T[]
```

#### 示例

```javascript
import { unique } from './utils'

// 基本类型去重
const numbers = [1, 2, 2, 3, 3, 4]
const uniqueNumbers = unique(numbers) // [1, 2, 3, 4]

// 对象数组去重
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' }
]
const uniqueUsers = unique(users, 'id') // [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
```

### groupBy()

按指定键对数组进行分组。

#### 语法

```typescript
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]>
```

#### 示例

```javascript
import { groupBy } from './utils'

const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
]

const grouped = groupBy(users, 'role')
// {
//   admin: [{ name: 'John', role: 'admin' }, { name: 'Bob', role: 'admin' }],
//   user: [{ name: 'Jane', role: 'user' }]
// }
```

### chunk()

将数组分割成指定大小的块。

#### 语法

```typescript
function chunk<T>(array: T[], size: number): T[][]
```

#### 示例

```javascript
import { chunk } from './utils'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const chunks = chunk(numbers, 3)
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## 字符串工具

### capitalize()

首字母大写。

#### 语法

```typescript
function capitalize(str: string): string
```

#### 示例

```javascript
import { capitalize } from './utils'

capitalize('hello world') // 'Hello world'
capitalize('HELLO WORLD') // 'Hello world'
```

### camelCase()

转换为驼峰命名。

#### 语法

```typescript
function camelCase(str: string): string
```

#### 示例

```javascript
import { camelCase } from './utils'

camelCase('hello-world') // 'helloWorld'
camelCase('hello_world') // 'helloWorld'
camelCase('Hello World') // 'helloWorld'
```

### kebabCase()

转换为短横线命名。

#### 语法

```typescript
function kebabCase(str: string): string
```

#### 示例

```javascript
import { kebabCase } from './utils'

kebabCase('helloWorld') // 'hello-world'
kebabCase('HelloWorld') // 'hello-world'
kebabCase('hello_world') // 'hello-world'
```

### truncate()

截断字符串。

#### 语法

```typescript
function truncate(str: string, length: number, suffix?: string): string
```

#### 示例

```javascript
import { truncate } from './utils'

truncate('Hello World', 5) // 'Hello...'
truncate('Hello World', 5, '>>') // 'Hello>>'
truncate('Hello', 10) // 'Hello' (不截断)
```

## 验证工具

### isEmail()

验证邮箱格式。

#### 语法

```typescript
function isEmail(email: string): boolean
```

#### 示例

```javascript
import { isEmail } from './utils'

isEmail('user@example.com') // true
isEmail('invalid-email') // false
```

### isURL()

验证 URL 格式。

#### 语法

```typescript
function isURL(url: string): boolean
```

#### 示例

```javascript
import { isURL } from './utils'

isURL('https://example.com') // true
isURL('invalid-url') // false
```

### isPhone()

验证手机号格式。

#### 语法

```typescript
function isPhone(phone: string): boolean
```

#### 示例

```javascript
import { isPhone } from './utils'

isPhone('13812345678') // true
isPhone('138-1234-5678') // true
isPhone('invalid-phone') // false
```

## 数字工具

### formatNumber()

格式化数字。

#### 语法

```typescript
function formatNumber(num: number, options?: {
  decimals?: number
  separator?: string
  delimiter?: string
}): string
```

#### 示例

```javascript
import { formatNumber } from './utils'

formatNumber(1234567.89) // '1,234,567.89'
formatNumber(1234567.89, { decimals: 1 }) // '1,234,567.9'
formatNumber(1234567.89, { separator: '.', delimiter: ',' }) // '1.234.567,89'
```

### random()

生成随机数。

#### 语法

```typescript
function random(min: number, max: number): number
```

#### 示例

```javascript
import { random } from './utils'

random(1, 10) // 1-10 之间的随机整数
random(0, 1) // 0-1 之间的随机小数
```

## 存储工具

### storage

本地存储工具。

#### 方法

```typescript
interface Storage {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
  remove(key: string): void
  clear(): void
}
```

#### 示例

```javascript
import { storage } from './utils'

// 存储数据
storage.set('user', { id: 1, name: 'John' })
storage.set('token', 'abc123')

// 读取数据
const user = storage.get('user') // { id: 1, name: 'John' }
const token = storage.get('token') // 'abc123'

// 删除数据
storage.remove('token')

// 清空所有数据
storage.clear()
```

## 最佳实践

1. **按需导入**: 只导入需要的函数以减少包大小
2. **类型安全**: 在 TypeScript 项目中充分利用类型定义
3. **性能考虑**: 对于频繁调用的函数使用防抖或节流
4. **错误处理**: 在使用工具函数时添加适当的错误处理
5. **测试**: 为使用工具函数的代码编写单元测试

## 相关链接

- [核心 API](/api/core)
- [配置指南](/guide/configuration)
- [最佳实践](/guide/best-practices)