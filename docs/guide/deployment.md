# 部署

本指南将介绍如何将你的 VitePress 文档站点部署到各种平台。

## GitHub Pages 部署

### 自动部署（推荐）

项目已经配置了 GitHub Actions 工作流，可以自动部署到 GitHub Pages。

#### 设置步骤

1. **推送代码到 GitHub**：
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **启用 GitHub Pages**：
   - 进入你的 GitHub 仓库
   - 点击 "Settings" 选项卡
   - 滚动到 "Pages" 部分
   - 在 "Source" 下选择 "GitHub Actions"

3. **配置仓库权限**：
   - 在 "Settings" > "Actions" > "General" 中
   - 确保 "Workflow permissions" 设置为 "Read and write permissions"

4. **触发部署**：
   - 推送到 `main` 分支会自动触发部署
   - 或者在 "Actions" 选项卡中手动运行工作流

#### 自定义域名

如果你有自定义域名：

1. 在 `docs/public` 目录下创建 `CNAME` 文件：
   ```
   your-domain.com
   ```

2. 在 DNS 提供商处添加 CNAME 记录：
   ```
   CNAME  your-domain.com  your-username.github.io
   ```

### 手动部署

如果你想手动部署到 GitHub Pages：

```bash
# 构建项目
pnpm run build

# 进入构建目录
cd docs/.vitepress/dist

# 初始化 git 仓库
git init
git add -A
git commit -m 'deploy'

# 推送到 gh-pages 分支
git push -f git@github.com:your-username/your-repo.git main:gh-pages

cd -
```

## Netlify 部署

### 通过 Git 连接

1. **连接仓库**：
   - 登录 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择你的 Git 提供商并授权
   - 选择你的仓库

2. **配置构建设置**：
   ```
   Build command: pnpm run build
   Publish directory: docs/.vitepress/dist
   ```

3. **环境变量**（如果需要）：
   ```
   NODE_VERSION=18
   NPM_FLAGS=--version
   ```

### 使用 netlify.toml

在项目根目录创建 `netlify.toml`：

```toml
[build]
  publish = "docs/.vitepress/dist"
  command = "pnpm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Vercel 部署

### 通过 Git 连接

1. **导入项目**：
   - 登录 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 Git 仓库

2. **配置项目**：
   ```
   Framework Preset: Other
   Build Command: pnpm run build
   Output Directory: docs/.vitepress/dist
   Install Command: pnpm install
   ```

### 使用 vercel.json

在项目根目录创建 `vercel.json`：

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "docs/.vitepress/dist",
  "installCommand": "pnpm install",
  "devCommand": "pnpm run dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 其他平台部署

### Cloudflare Pages

1. **连接仓库**：
   - 登录 Cloudflare Dashboard
   - 进入 "Pages" 部分
   - 点击 "Create a project"
   - 连接你的 Git 仓库

2. **构建配置**：
   ```
   Build command: pnpm run build
   Build output directory: docs/.vitepress/dist
   ```

### Firebase Hosting

1. **安装 Firebase CLI**：
   ```bash
   npm install -g firebase-tools
   ```

2. **初始化项目**：
   ```bash
   firebase init hosting
   ```

3. **配置 firebase.json**：
   ```json
   {
     "hosting": {
       "public": "docs/.vitepress/dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **部署**：
   ```bash
   pnpm run build
   firebase deploy
   ```

## 服务器部署

### 使用 Nginx

1. **构建项目**：
   ```bash
   pnpm run build
   ```

2. **上传文件**：
   将 `docs/.vitepress/dist` 目录中的文件上传到服务器

3. **Nginx 配置**：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/your/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # 缓存静态资源
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

### 使用 Apache

在 `docs/.vitepress/dist` 目录中创建 `.htaccess` 文件：

```apache
RewriteEngine On
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 缓存静态资源
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## Docker 部署

### 创建 Dockerfile

```dockerfile
# 构建阶段
FROM node:18-alpine as builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package 文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目
RUN pnpm run build

# 生产阶段
FROM nginx:alpine

# 复制构建结果
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 构建和运行

```bash
# 构建镜像
docker build -t my-docs .

# 运行容器
docker run -p 80:80 my-docs
```

## 部署优化

### 构建优化

1. **启用压缩**：
   ```typescript
   // config.ts
   export default defineConfig({
     vite: {
       build: {
         minify: 'terser',
         rollupOptions: {
           output: {
             manualChunks: {
               vue: ['vue']
             }
           }
         }
       }
     }
   })
   ```

2. **资源优化**：
   - 压缩图片
   - 使用 WebP 格式
   - 启用 CDN

### 缓存策略

```nginx
# 静态资源长期缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML 文件不缓存
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## 故障排除

### 常见问题

1. **404 错误**：
   - 确保服务器配置了正确的重写规则
   - 检查 `base` 配置是否正确

2. **资源加载失败**：
   - 检查 `base` 路径配置
   - 确保所有资源路径正确

3. **构建失败**：
   - 检查 Node.js 版本
   - 清除缓存：`rm -rf node_modules pnpm-lock.yaml && pnpm install`

### 调试技巧

```bash
# 本地预览构建结果
pnpm run build
pnpm run preview

# 检查构建输出
ls -la docs/.vitepress/dist

# 检查构建日志
pnpm run build --debug
```

## 最佳实践

1. **自动化部署**：使用 CI/CD 管道自动化部署流程
2. **环境分离**：为开发、测试和生产环境使用不同的配置
3. **监控**：设置监控和告警来跟踪站点性能
4. **备份**：定期备份你的内容和配置
5. **安全**：使用 HTTPS 和适当的安全头

## 下一步

现在你的 VitePress 文档站点已经成功部署！你可以：

- 开始编写你的文档内容
- 自定义主题和样式
- 添加更多功能和插件
- 优化 SEO 和性能