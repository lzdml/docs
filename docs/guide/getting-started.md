# 快速开始

本指南将帮助你快速搭建和运行 VitePress 文档站点。

## 环境要求

在开始之前，请确保你的开发环境满足以下要求：

- **Node.js**: 版本 18.0.0 或更高
- **pnpm**: 版本 8.0.0 或更高（推荐使用 pnpm）

## 安装依赖

首先，克隆项目并安装依赖：

```bash
# 克隆项目
git clone <your-repo-url>
cd <your-repo-name>

# 安装依赖
pnpm install
```

## 本地开发

启动开发服务器：

```bash
pnpm run dev
```

这将启动一个本地开发服务器，通常在 `http://localhost:5173` 上运行。你可以在浏览器中打开这个地址来预览你的文档站点。

## 编写内容

### 创建新页面

在 `docs` 目录下创建新的 Markdown 文件即可创建新页面：

```bash
# 创建新的指南页面
touch docs/guide/new-page.md
```

### Markdown 语法

VitePress 支持标准的 Markdown 语法，以及一些扩展功能：

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*

- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2

[链接文本](https://example.com)

![图片描述](./image.png)
```

### 代码块

VitePress 对代码块有很好的支持：

````markdown
```javascript
function hello() {
  console.log('Hello, VitePress!');
}
```
````

### 提示框

VitePress 支持多种类型的提示框：

```markdown
::: info
这是一个信息提示框。
:::

::: tip
这是一个技巧提示框。
:::

::: warning
这是一个警告提示框。
:::

::: danger
这是一个危险提示框。
:::
```

## 构建和预览

### 构建生产版本

```bash
pnpm run build
```

这将在 `docs/.vitepress/dist` 目录中生成静态文件。

### 预览生产版本

```bash
pnpm run preview
```

这将启动一个本地服务器来预览构建后的站点。

## 下一步

现在你已经成功运行了 VitePress 文档站点！接下来你可以：

- 查看 [配置指南](/guide/configuration) 了解如何自定义站点
- 学习 [主题定制](/guide/theme-customization) 来个性化你的站点
- 阅读 [部署指南](/guide/deployment) 了解如何发布你的文档