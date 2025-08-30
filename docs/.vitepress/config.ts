import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  // 站点配置
  title: 'VitePress 文档站点',
  description: '基于 VitePress 构建的现代化文档站点',
  lang: 'zh-CN',
  base: '/sdl-docs/', // 如果部署到 GitHub Pages 子路径，需要修改为 '/repository-name/'
  
  // 主题配置
  themeConfig: {
    // 站点标题
    siteTitle: 'VitePress 文档',
    
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '知识点', link: '/tech/' },
      { text: 'AI', link: '/ai/' },
      { text: 'API 参考', link: '/api/' },
      {
        text: '更多',
        items: [
          { text: '关于', link: '/about' },
          { text: '更新日志', link: '/changelog' }
        ]
      }
    ],
    
    // 侧边栏
    sidebar: {
      '/tech/': [
        {
          text: '管理体系',
          link: '/tech/management-systems/'
        }
      ],
      '/ai/': [
        {
          text: 'AI知识点',
          link: '/ai/knowledge/'
        },
        {
          text: 'AI工具平台',
          link: '/ai/tools/'
        },
        {
          text: 'AI开发框架',
          link: '/ai/frameworks/'
        },
        {
          text: 'AI应用案例',
          link: '/ai/cases/'
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '概述', link: '/api/' },
            { text: '核心 API', link: '/api/core' },
            { text: '工具函数', link: '/api/utils' }
          ]
        }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/your-repo' }
    ],
    
    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present Your Name'
    },
    
    // 搜索
    search: {
      provider: 'local'
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/your-username/your-repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    
    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    
    // 文档页脚导航
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    // 大纲配置
    outline: {
      label: '页面导航'
    },
    
    // 返回顶部
    returnToTopLabel: '回到顶部',
    
    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',
    
    // 深色模式切换标签
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },
  
  // Markdown 配置
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  
  // 构建配置
  // vite: {
  //   build: {
  //     minify: 'terser'
  //   }
  // }
})
