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
    { text: '技术点', link: '/tech/' },
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
    '/tech/': [
      {
        text: '管理体系标准',
        items: [
          { text: '标准分类说明', link: '/tech/management-systems/' },
          { text: '质量管理体系', link: '/tech/management-systems/quality' }
        ]
      },
      {
        text: '开发指南',
        items: [
          { text: '快速开始', link: '/tech/getting-started' },
          { text: '配置', link: '/tech/configuration' }
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

配置页面底部的页脚信息：

```typescript
themeConfig: {
  footer: {
    message: '基于 MIT 许可发布',
    copyright: 'Copyright © 2024-present Your Name'
  }
}
```

### 搜索

启用本地搜索功能：

```typescript
themeConfig: {
  search: {
    provider: 'local'
  }
}
```

### 编辑链接

添加"编辑此页面"链接：

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

启用代码块行号显示：

```typescript
export default defineConfig({
  markdown: {
    lineNumbers: true
  }
})
```

### 代码主题

配置代码块的语法高亮主题：

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

如果需要支持多语言，可以这样配置：

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

以下是一个完整的配置文件示例：

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
    siteTitle: 'VitePress 文档',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '技术点', link: '/tech/' },
      { text: 'API 参考', link: '/api/' },
      {
        text: '更多',
        items: [
          { text: '关于', link: '/about' },
          { text: '更新日志', link: '/changelog' }
        ]
      }
    ],
    
    sidebar: {
      '/tech/': [
        {
          text: '管理体系标准',
          items: [
            { text: '标准分类说明', link: '/tech/management-systems/' },
            { text: '质量管理体系', link: '/tech/management-systems/quality' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/your-repo' }
    ],
    
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present Your Name'
    },
    
    search: {
      provider: 'local'
    },
    
    editLink: {
      pattern: 'https://github.com/your-username/your-repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    }
  },
  
  // Markdown 配置
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
```

## 配置验证

配置完成后，重启开发服务器来查看更改：

```bash
pnpm run dev
```

如果遇到配置错误，VitePress 会在控制台中显示详细的错误信息。

## 下一步

- [主题定制](./theme-customization) - 学习如何定制站点外观
- [部署指南](./deployment) - 了解如何部署到各种平台