# 介绍

欢迎使用 VitePress 文档站点！这是一个基于 VitePress 构建的现代化文档解决方案。

## 什么是 VitePress？

VitePress 是一个静态站点生成器，专为构建快速、以内容为中心的网站而设计。它采用了 Markdown 驱动的方式，让你可以专注于编写内容，而不用担心复杂的配置和样式问题。

## 主要特性

- **📝 Markdown 驱动**: 使用简单的 Markdown 语法编写文档
- **⚡️ 极速开发**: 基于 Vite 的快速热重载
- **🎨 主题美观**: 内置精美的默认主题
- **📱 响应式**: 完美适配各种设备
- **🔍 全文搜索**: 内置搜索功能
- **🚀 易于部署**: 生成静态文件，部署简单

## 快速开始

如果你想立即开始使用，请查看 [快速开始](/guide/getting-started) 指南。

## 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # 配置文件
│   ├── guide/                 # 指南目录
│   ├── api/                   # API 参考目录
│   └── index.md               # 首页
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions 部署配置
└── package.json               # 项目配置
```

## 下一步

- 阅读 [快速开始](/guide/getting-started) 了解如何使用
- 查看 [配置](/guide/configuration) 了解如何自定义
- 学习 [部署](/guide/deployment) 了解如何发布你的文档