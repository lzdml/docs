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
touch docs/tech/new-page.md
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

![图片描述](./images/example.png)
```

### 代码块

VitePress 支持语法高亮的代码块：

````markdown
```javascript
const message = 'Hello VitePress!';
console.log(message);
```

```python
def hello():
    print("Hello VitePress!")
```
````

### 提示框

VitePress 提供了多种提示框样式：

```markdown
::: tip 提示
这是一个提示信息。
:::

::: warning 警告
这是一个警告信息。
:::

::: danger 危险
这是一个危险警告信息。
:::

::: info 信息
这是一个普通信息。
:::

::: details 点击查看详情
这里是详细内容，默认折叠。
:::
```

## 构建和预览

### 构建生产版本

```bash
pnpm run build
```

这将在 `docs/.vitepress/dist` 目录中生成静态文件。

### 预览构建结果

```bash
pnpm run preview
```

这将启动一个本地服务器来预览构建后的站点。

## 下一步

现在你已经成功运行了 VitePress 文档站点！接下来你可以：

1. [配置站点](./configuration) - 了解如何配置你的文档站点
2. [主题定制](./theme-customization) - 学习如何定制站点外观
3. [部署指南](./deployment) - 了解如何部署到各种平台

## 常见问题

### 端口被占用

如果默认端口 5173 被占用，VitePress 会自动选择下一个可用端口。你也可以手动指定端口：

```bash
pnpm run dev -- --port 3000
```

### 热重载不工作

确保你的文件保存在 `docs` 目录下，并且文件扩展名是 `.md`。如果问题仍然存在，尝试重启开发服务器。

### 样式不生效

检查你的自定义 CSS 文件路径是否正确，并确保在 VitePress 配置中正确引用了样式文件。