# Natours 项目状态

## 当前状态

### ✅ 已完成

1. **数据库部署**：MongoDB Atlas 云数据库已配置并包含数据
2. **前端部署**：Vue 3 前端已部署到 GitHub Pages
3. **后端配置**：Node.js 后端已配置好云数据库连接
4. **部署文件**：Vercel 部署配置文件已创建

### ⚠️ 待完成

1. **后端部署**：需要将后端部署到 Vercel
2. **API 连接**：需要更新前端配置以连接部署后的后端

## 部署步骤

### 第一步：部署后端到 Vercel

#### 方法一：使用 Vercel CLI（推荐）

1. 安装 Vercel CLI：

   ```bash
   npm install -g vercel
   ```

2. 运行部署脚本：
   ```bash
   # 在项目根目录运行
   deploy-backend.bat
   ```

#### 方法二：通过 Vercel 网站

1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 选择 `natours-backend` 文件夹
5. 配置环境变量（参考 `VERCEL_DEPLOYMENT_GUIDE.md`）
6. 点击 "Deploy"

### 第二步：获取后端 API 地址

部署完成后，Vercel 会提供一个类似这样的 URL：

```
https://your-project-name.vercel.app
```

### 第三步：更新前端配置

1. 编辑 `natours-frontend/.env.production` 文件
2. 将 `VITE_API_BASE_URL` 设置为你的 Vercel 部署地址：

   ```
   VITE_API_BASE_URL=https://your-project-name.vercel.app/api/v1
   ```

3. 提交更改到 GitHub
4. GitHub Actions 会自动重新部署前端

## 环境变量配置

在 Vercel 项目中需要设置以下环境变量：

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

## 测试部署

部署完成后，可以通过以下方式测试：

1. **测试后端 API**：

   ```
   https://your-project-name.vercel.app/api/v1/tours
   ```

2. **测试前端**：
   访问你的 GitHub Pages 地址，检查是否能正常显示旅游路线

## 故障排除

### 常见问题

1. **数据库连接失败**：

   - 检查 MongoDB Atlas 网络访问设置
   - 确保 IP 地址在白名单中

2. **CORS 错误**：

   - 后端已配置 CORS，允许所有来源
   - 检查 Vercel 环境变量是否正确

3. **前端无法加载数据**：
   - 检查前端 API 配置是否正确
   - 查看浏览器控制台错误信息

### 日志查看

- **Vercel 日志**：在 Vercel 控制台查看部署和运行日志
- **前端错误**：在浏览器开发者工具中查看控制台错误

## 项目结构

```
natours/
├── natours-backend/          # Node.js 后端
│   ├── vercel.json          # Vercel 部署配置
│   ├── package.json         # 依赖和脚本
│   └── server.js           # 服务器入口
├── natours-frontend/        # Vue 3 前端
│   ├── .env.production     # 生产环境配置
│   └── src/services/api.ts # API 配置
├── deploy-backend.bat      # Windows 部署脚本
├── VERCEL_DEPLOYMENT_GUIDE.md
└── PROJECT_STATUS.md
```

## 下一步

完成上述部署步骤后，你的 Natours 应用将完全运行在云端：

- 前端：GitHub Pages
- 后端：Vercel
- 数据库：MongoDB Atlas

所有功能都将正常工作，包括旅游路线展示、用户认证等。
