# Vercel 项目设置说明

## 重要：手动配置步骤

由于 Vercel 默认尝试运行构建命令，但我们的 Node.js 后端不需要构建步骤，请按照以下步骤配置：

### 1. 在 Vercel 控制台设置

部署时或部署后，在项目设置中：

1. 进入项目设置 → "General"
2. 找到 "Build & Development Settings"
3. 设置以下配置：
   - **Build Command**: (留空)
   - **Output Directory**: (留空)
   - **Install Command**: `npm install`

### 2. 或者使用 Vercel CLI 部署

```bash
# 在 travel-api-cluster-backend 目录中运行
vercel --prod --build-env NODE_ENV=production
```

### 3. 环境变量配置

在 Vercel 项目设置中，添加以下环境变量：

```
NODE_ENV=production
DATABASE_CLOUD=mongodb+srv://2465225759_db_user:9ZlhbNNQBc4SCDnP@cluster0.8b1xceb.mongodb.net/natours
JWT_SECRET=your-secret-key-for-development-smile_snow
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=725ab918b597c4
EMAIL_PASSWORD=ac37ccb78e90d6
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
```

## 替代方案：使用 Railway

如果 Vercel 配置太复杂，可以考虑使用 Railway：

1. 访问 [railway.app](https://railway.app)
2. 连接 GitHub 仓库
3. 选择 `travel-api-cluster-backend` 目录
4. Railway 会自动检测 Node.js 应用并部署

Railway 对 Node.js 应用的支持更好，部署更简单。
