# GitHub Pages 部署指南

## 🚀 部署准备

### 已完成配置：

1. ✅ 创建了 GitHub Actions 工作流文件 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
2. ✅ 配置了 Vite 基础路径为 `/natours/`
3. ✅ 路由配置已支持子路径部署
4. ✅ 前端已配置生产环境 API 地址

## 📋 部署步骤

### 步骤 1: 推送代码到 GitHub

```bash
git add .
git commit -m "feat: 添加 GitHub Pages 部署配置"
git push origin main
```

### 步骤 2: 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 保存设置

### 步骤 3: 触发部署

- 每次推送到 `main` 分支时，GitHub Actions 会自动运行
- 部署完成后，你的网站将发布在：`https://[你的用户名].github.io/natours/`

## 🔧 工作流程说明

### GitHub Actions 流程：

1. **Checkout** - 检出代码
2. **Setup Node** - 设置 Node.js 环境 (v20)
3. **Install dependencies** - 安装前端依赖
4. **Build** - 构建生产版本 (`npm run build:prod`)
5. **Setup Pages** - 配置 GitHub Pages
6. **Upload artifact** - 上传构建产物
7. **Deploy** - 部署到 GitHub Pages

### 环境配置：

- **开发环境**：`http://localhost:3000`
- **生产环境**：`https://[你的用户名].github.io/natours/`
- **API 地址**：生产环境使用云数据库后端

## ⚙️ 配置文件说明

### 1. GitHub Actions 配置 ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      # ... 构建和部署步骤
```

### 2. Vite 配置 ([`vite.config.mts`](natours-frontend/vite.config.mts))

```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/natours/' : '/',
  // ... 其他配置
});
```

### 3. 路由配置 ([`src/router/index.ts`](natours-frontend/src/router/index.ts))

```typescript
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
```

### 4. API 配置 ([`src/services/api.ts`](natours-frontend/src/services/api.ts))

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
```

## 🎯 部署验证

### 部署成功后检查：

1. ✅ GitHub Actions 运行成功（绿色对勾）
2. ✅ 网站可访问：`https://[你的用户名].github.io/natours/`
3. ✅ 页面加载正常，无控制台错误
4. ✅ 导航功能正常（首页、关于我们、联系我们）
5. ✅ API 连接正常（需要后端服务运行）

## 🔄 后端部署说明

### 当前配置：

- 前端部署在 GitHub Pages（静态文件）
- 后端需要单独部署到云平台（如 Vercel、Railway、Heroku）
- 数据库使用 MongoDB Atlas 云数据库

### 后端部署选项：

1. **Vercel** - 免费，适合 Node.js 应用
2. **Railway** - 免费额度，支持数据库
3. **Heroku** - 经典选择，有免费选项
4. **Render** - 免费套餐，自动部署

## 🛠️ 故障排除

### 常见问题：

**1. 页面 404 错误**

- 检查 Vite `base` 配置是否正确
- 确认路由配置使用 `import.meta.env.BASE_URL`

**2. API 连接失败**

- 确保后端服务正在运行
- 检查生产环境 API 地址配置

**3. 资源加载失败**

- 检查静态资源路径
- 确认图片等资源在构建后正确复制

**4. 路由刷新 404**

- GitHub Pages 需要 SPA 回退配置
- 确保所有路由都指向 `index.html`

## 📞 支持

如果部署遇到问题：

1. 检查 GitHub Actions 日志
2. 验证配置文件语法
3. 确保所有依赖正确安装
4. 确认构建过程无错误

---

**🎉 现在你的 Natours 前端已经准备好部署到 GitHub Pages！**
