# 配置

本指南将介绍如何配置你的 VitePress 站点。

## 配置文件

VitePress 的主要配置文件位于 `docs/.vitepress/config.ts`。这个文件导出一个配置对象，用于定义站点的各种设置。

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点配置
  title: 'VitePress 文档站点',
  description: '基于 VitePress 构建的现代化文档站点',
  lang: 'zh-CN',
  base: '/',
  
  // 主题配置
  themeConfig: {
    // 配置选项...
  }
})
```

## 站点配置

### 基本信息

```typescript
export default defineConfig({
  title: '你的站点标题',           // 站点标题
  description: '站点描述',        // 站点描述，用于 SEO
  lang: 'zh-CN',                 // 站点语言
  base: '/',                     // 站点的基础路径
})
```

### 部署配置

如果你要部署到 GitHub Pages 的子路径，需要设置 `base` 选项：

```typescript
export default defineConfig({
  base: '/your-repo-name/',  // 替换为你的仓库名
})
```

## 主题配置

### 导航栏

配置顶部导航栏：

```typescript
themeConfig: {
  nav: [
    { text: '首页', link: '/' },
    { text: '指南', link: '/guide/' },
    { 
      text: '下拉菜单',
      items: [
        { text: '选项 1', link: '/option1' },
        { text: '选项 2', link: '/option2' }
      ]
    }
  ]
}
```

### 侧边栏

配置侧边栏导航：

```typescript
themeConfig: {
  sidebar: {
    '/guide/': [
      {
        text: '开始使用',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      }
    ]
  }
}
```

### 社交链接

添加社交媒体链接：

```typescript
themeConfig: {
  socialLinks: [
    { icon: 'github', link: 'https://github.com/your-username/your-repo' },
    { icon: 'twitter', link: 'https://twitter.com/your-username' },
    { icon: 'discord', link: 'https://discord.gg/your-invite' }
  ]
}
```

### 页脚

配置页脚信息：

```typescript
themeConfig: {
  footer: {
    message: '基于 MIT 许可发布',
    copyright: 'Copyright © 2024-present Your Name'
  }
}
```

### 搜索

启用本地搜索：

```typescript
themeConfig: {
  search: {
    provider: 'local'
  }
}
```

或者使用 Algolia 搜索：

```typescript
themeConfig: {
  search: {
    provider: 'algolia',
    options: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME'
    }
  }
}
```

### 编辑链接

添加"编辑此页"链接：

```typescript
themeConfig: {
  editLink: {
    pattern: 'https://github.com/your-username/your-repo/edit/main/docs/:path',
    text: '在 GitHub 上编辑此页面'
  }
}
```

## Markdown 配置

### 代码行号

启用代码块行号：

```typescript
export default defineConfig({
  markdown: {
    lineNumbers: true
  }
})
```

### 代码主题

配置代码高亮主题：

```typescript
export default defineConfig({
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
```

## 构建配置

### Vite 配置

你可以通过 `vite` 选项来配置 Vite：

```typescript
export default defineConfig({
  vite: {
    build: {
      minify: 'terser'
    },
    server: {
      port: 3000
    }
  }
})
```

## 多语言配置

如果你需要支持多语言，可以这样配置：

```typescript
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/'
    }
  }
})
```

## 完整配置示例

这里是一个完整的配置文件示例：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Docs',
  description: 'A VitePress Site',
  lang: 'zh-CN',
  base: '/',
  
  themeConfig: {
    siteTitle: 'My Docs',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Evan You'
    },
    
    search: {
      provider: 'local'
    }
  },
  
  markdown: {
    lineNumbers: true
  }
})
```

## 下一步

- 了解 [主题定制](/guide/theme-customization) 来个性化你的站点外观
- 查看 [部署指南](/guide/deployment) 了解如何发布你的文档