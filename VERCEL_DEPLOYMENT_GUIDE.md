# Vercel 后端部署指南

## 部署步骤

### 1. 注册 Vercel 账户

- 访问 [vercel.com](https://vercel.com)
- 使用 GitHub 账户登录（推荐）

### 2. 创建新项目

1. 在 Vercel 控制台点击 "New Project"
2. 导入你的 GitHub 仓库 `natours`
3. 选择 `natours-backend` 文件夹作为根目录

### 3. 配置环境变量

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

### 4. 部署配置

- **构建命令**: 留空（Vercel 会自动检测）
- **输出目录**: 留空
- **安装命令**: `npm install`

### 5. 部署

- 点击 "Deploy" 按钮
- Vercel 会自动构建和部署你的后端

## 获取部署后的 API 地址

部署完成后，Vercel 会提供一个类似这样的 URL：

```
https://your-project-name.vercel.app
```

## 更新前端配置

部署成功后，需要更新前端的 API 配置：

1. 编辑 `natours-frontend/.env.production` 文件
2. 将 `VITE_API_BASE_URL` 设置为你的 Vercel 部署地址：

```
VITE_API_BASE_URL=https://your-project-name.vercel.app/api/v1
```

3. 重新部署前端到 GitHub Pages

## 测试 API

部署完成后，可以通过以下 URL 测试 API：

- 获取所有旅游路线：`https://your-project-name.vercel.app/api/v1/tours`
- 获取特定旅游路线：`https://your-project-name.vercel.app/api/v1/tours/5c88fa8cf4afda39709c2955`

## 注意事项

1. **数据库连接**：确保 MongoDB Atlas 允许从 Vercel 的 IP 地址连接
2. **CORS 配置**：后端已经配置了 CORS，允许所有来源访问
3. **环境变量**：不要在代码中硬编码敏感信息，使用环境变量
4. **HTTPS**：Vercel 自动提供 HTTPS

## 故障排除

如果部署失败，检查：

- 环境变量是否正确设置
- MongoDB Atlas 网络访问设置
- Vercel 构建日志中的错误信息

## 自动部署

配置完成后，每次推送到 GitHub 的 `main` 分支，Vercel 会自动重新部署。
