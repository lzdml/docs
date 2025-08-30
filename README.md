# VitePress 文档站点

基于 VitePress + GitHub Pages + GitHub Workflows + pnpm 构建的现代化文档站点。

## 🚀 特性

- ⚡️ **快速构建** - 基于 Vite 的极速热重载
- 📝 **Markdown 优先** - 专注于内容创作
- 🎨 **主题定制** - 灵活的主题配置和样式定制
- 🔍 **内置搜索** - 全文搜索功能
- 📱 **响应式设计** - 完美适配各种设备
- 🚀 **自动部署** - GitHub Actions 自动部署到 GitHub Pages
- 🌐 **SEO 友好** - 优化的 SEO 配置

## 📦 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - Vue.js 驱动的静态站点生成器
- **包管理器**: [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器
- **部署**: [GitHub Pages](https://pages.github.com/) - 免费的静态网站托管
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) - 自动化构建和部署

## 🛠️ 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 本地开发

```bash
# 启动开发服务器
pnpm dev
# 或者
pnpm docs:dev
```

访问 `http://localhost:5173` 查看文档站点。

### 构建生产版本

```bash
# 构建静态文件
pnpm build
# 或者
pnpm docs:build
```

### 预览构建结果

```bash
# 预览构建后的站点
pnpm preview
# 或者
pnpm docs:preview
```

## 📁 项目结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── docs/
│   ├── .vitepress/
│   │   └── config.ts           # VitePress 配置文件
│   ├── guide/                  # 指南文档
│   │   ├── index.md
│   │   ├── getting-started.md
│   │   ├── configuration.md
│   │   ├── theme-customization.md
│   │   └── deployment.md
│   ├── api/                    # API 文档
│   │   ├── index.md
│   │   ├── core.md
│   │   └── utils.md
│   ├── index.md                # 首页
│   ├── about.md                # 关于页面
│   └── changelog.md            # 更新日志
├── .gitignore                  # Git 忽略文件
├── package.json                # 项目配置
└── README.md                   # 项目说明
```

## ⚙️ 配置说明

### VitePress 配置

主要配置文件位于 `docs/.vitepress/config.ts`，包含：

- **站点信息**: 标题、描述、语言等
- **主题配置**: 导航栏、侧边栏、页脚等
- **功能配置**: 搜索、编辑链接、社交链接等
- **构建配置**: Vite 相关配置

### GitHub Pages 部署

1. **启用 GitHub Pages**:
   - 进入仓库设置 → Pages
   - Source 选择 "GitHub Actions"

2. **配置 base 路径**:
   ```ts
   // docs/.vitepress/config.ts
   export default defineConfig({
     base: '/your-repo-name/', // 替换为你的仓库名
     // ...
   })
   ```

3. **推送代码**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

### 自定义域名（可选）

1. 在 `docs/.vitepress/public/` 目录下创建 `CNAME` 文件
2. 文件内容为你的域名，如：`docs.example.com`
3. 在域名提供商处配置 CNAME 记录指向 `username.github.io`

## 📝 内容编写

### 创建新页面

1. 在 `docs/` 目录下创建 `.md` 文件
2. 在 `docs/.vitepress/config.ts` 中配置导航和侧边栏
3. 使用 Markdown 语法编写内容

### Markdown 扩展

VitePress 支持多种 Markdown 扩展：

- **代码块高亮**: 支持语法高亮和行号
- **自定义容器**: 提示框、警告框等
- **数学公式**: 支持 LaTeX 数学公式
- **图表**: 支持 Mermaid 图表

### 示例

```markdown
# 页面标题

## 代码块

```javascript
const message = 'Hello VitePress!';
console.log(message);
```

## 提示框

::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险提示框
:::
```

## 🔧 开发指南

### 添加新的导航项

编辑 `docs/.vitepress/config.ts`：

```ts
export default defineConfig({
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '新页面', link: '/new-page' }, // 添加新导航
    ],
  },
})
```

### 配置侧边栏

```ts
export default defineConfig({
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
      ],
    },
  },
})
```

### 自定义样式

创建 `docs/.vitepress/theme/custom.css`：

```css
/* 自定义样式 */
:root {
  --vp-c-brand-1: #646cff;
  --vp-c-brand-2: #747bff;
}

.custom-block {
  padding: 16px;
  border-radius: 8px;
}
```

## 🚀 部署

### 自动部署

推送到 `main` 分支会自动触发 GitHub Actions 部署：

```bash
git add .
git commit -m "Update documentation"
git push origin main
```

### 手动部署

```bash
# 构建
pnpm build

# 部署到 GitHub Pages
# 需要先配置 gh-pages 分支
npx gh-pages -d docs/.vitepress/dist
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -am 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🔗 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue.js 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [pnpm 官方文档](https://pnpm.io/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)

## 📞 支持

如果你在使用过程中遇到问题，可以：

- 查看 [常见问题](docs/guide/faq.md)
- 提交 [Issue](../../issues)
- 参与 [讨论](../../discussions)

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！