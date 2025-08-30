# 主题定制

本指南将介绍如何自定义 VitePress 主题的外观和样式。

## 自定义 CSS

### 创建自定义样式文件

在 `docs/.vitepress/theme` 目录下创建自定义样式：

```bash
mkdir docs/.vitepress/theme
touch docs/.vitepress/theme/index.ts
touch docs/.vitepress/theme/custom.css
```

### 主题入口文件

在 `docs/.vitepress/theme/index.ts` 中：

```typescript
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

### 自定义 CSS 变量

在 `docs/.vitepress/theme/custom.css` 中自定义样式：

```css
:root {
  /* 品牌色彩 */
  --vp-c-brand-1: #646cff;
  --vp-c-brand-2: #747bff;
  --vp-c-brand-3: #9499ff;
  
  /* 背景色 */
  --vp-c-bg: #ffffff;
  --vp-c-bg-alt: #f6f6f7;
  --vp-c-bg-elv: #ffffff;
  
  /* 文字色 */
  --vp-c-text-1: rgba(60, 60, 67);
  --vp-c-text-2: rgba(60, 60, 67, 0.78);
  --vp-c-text-3: rgba(60, 60, 67, 0.56);
}

/* 深色模式 */
.dark {
  --vp-c-bg: #1b1b1f;
  --vp-c-bg-alt: #161618;
  --vp-c-bg-elv: #202127;
  
  --vp-c-text-1: rgba(255, 255, 245, 0.86);
  --vp-c-text-2: rgba(235, 235, 245, 0.6);
  --vp-c-text-3: rgba(235, 235, 245, 0.38);
}
```

## 常用自定义样式

### 自定义首页样式

```css
/* 自定义首页 hero 区域 */
.VPHero .name {
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 自定义按钮样式 */
.VPButton.brand {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-1);
}

.VPButton.brand:hover {
  border-color: var(--vp-c-brand-2);
  background-color: var(--vp-c-brand-2);
}
```

### 自定义导航栏

```css
/* 导航栏样式 */
.VPNav {
  backdrop-filter: blur(10px);
}

/* 导航栏标题 */
.VPNavBarTitle .title {
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
```

### 自定义侧边栏

```css
/* 侧边栏样式 */
.VPSidebar {
  background-color: var(--vp-c-bg-alt);
}

/* 侧边栏链接 */
.VPSidebarItem.level-0 .item .link {
  font-weight: 600;
}

.VPSidebarItem.is-active > .item > .link {
  color: var(--vp-c-brand-1);
}
```

### 自定义代码块

```css
/* 代码块样式 */
.vp-code-group .tabs {
  background-color: var(--vp-c-bg-alt);
}

/* 行号样式 */
.line-numbers-wrapper {
  color: var(--vp-c-text-3);
}

/* 代码高亮行 */
.highlighted {
  background-color: var(--vp-c-brand-soft);
}
```

## 添加自定义组件

### 创建 Vue 组件

在 `docs/.vitepress/theme/components` 目录下创建组件：

```vue
<!-- docs/.vitepress/theme/components/CustomCard.vue -->
<template>
  <div class="custom-card">
    <div class="card-header">
      <h3>{{ title }}</h3>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style scoped>
.custom-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.card-header h3 {
  margin: 0 0 12px 0;
  color: var(--vp-c-brand-1);
}

.card-content {
  color: var(--vp-c-text-2);
}
</style>
```

### 注册全局组件

在主题入口文件中注册组件：

```typescript
// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import CustomCard from './components/CustomCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CustomCard', CustomCard)
  }
}
```

### 在 Markdown 中使用

```markdown
<CustomCard title="自定义卡片">
这是一个自定义的卡片组件内容。
</CustomCard>
```

## 自定义布局

### 创建自定义布局

```vue
<!-- docs/.vitepress/theme/Layout.vue -->
<template>
  <Layout>
    <template #nav-bar-title-after>
      <span class="version-badge">v1.0.0</span>
    </template>
    
    <template #doc-before>
      <div class="custom-doc-header">
        <!-- 自定义文档头部内容 -->
      </div>
    </template>
    
    <template #doc-after>
      <div class="custom-doc-footer">
        <!-- 自定义文档底部内容 -->
      </div>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<style>
.version-badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
}
</style>
```

### 使用自定义布局

```typescript
// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout
}
```

## 响应式设计

### 移动端适配

```css
/* 移动端样式 */
@media (max-width: 768px) {
  .VPHero .name {
    font-size: 32px;
  }
  
  .VPHero .text {
    font-size: 18px;
  }
  
  .VPFeatures {
    padding: 0 24px;
  }
}

/* 平板端样式 */
@media (min-width: 769px) and (max-width: 1024px) {
  .VPHero .name {
    font-size: 48px;
  }
}
```

## 字体自定义

### 引入自定义字体

```css
/* 引入 Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --vp-font-family-base: 'Inter', 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}
```

## 动画效果

### 添加过渡动画

```css
/* 页面切换动画 */
.VPContent {
  transition: opacity 0.25s;
}

/* 悬停效果 */
.VPFeature {
  transition: transform 0.25s, box-shadow 0.25s;
}

.VPFeature:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 按钮动画 */
.VPButton {
  transition: all 0.25s;
}

.VPButton:hover {
  transform: translateY(-1px);
}
```

## 调试技巧

### 查看 CSS 变量

在浏览器开发者工具中，你可以查看所有可用的 CSS 变量：

1. 打开开发者工具
2. 选择 Elements 面板
3. 选择 `:root` 元素
4. 在 Styles 面板中查看所有 CSS 变量

### 实时调试

使用开发模式进行实时调试：

```bash
pnpm run dev
```

修改 CSS 文件后，页面会自动刷新显示更改。

## 最佳实践

1. **保持一致性**: 使用 CSS 变量确保颜色和间距的一致性
2. **响应式设计**: 确保在所有设备上都有良好的显示效果
3. **性能优化**: 避免过度的动画和复杂的样式
4. **可访问性**: 确保足够的颜色对比度和键盘导航支持
5. **渐进增强**: 从基础样式开始，逐步添加高级效果

## 下一步

- 查看 [部署指南](/guide/deployment) 了解如何发布你的自定义主题
- 探索 [VitePress 官方文档](https://vitepress.dev/) 了解更多高级功能