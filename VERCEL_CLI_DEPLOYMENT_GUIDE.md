# Vercel CLI 详细部署指南

## 第一步：安装和登录

### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

### 2. 登录 Vercel

```bash
vercel login
```

这会打开浏览器，让你登录 Vercel 账户。

## 第二步：准备部署

### 1. 进入后端目录

```bash
cd natours-backend
```

### 2. 检查当前目录

确保你在 `natours-backend` 目录中，包含以下文件：

- `server.js`
- `package.json`
- `vercel.json`
- `config.env`

## 第三步：部署命令

### 选项 A：交互式部署（推荐新手）

```bash
vercel
```

然后按照提示操作：

1. 确认项目设置
2. 选择作用域（个人账户）
3. 链接到现有项目或创建新项目
4. 设置环境变量

### 选项 B：直接生产部署

```bash
vercel --prod
```

### 选项 C：跳过构建的部署

```bash
vercel --prod --build-env NODE_ENV=production
```

## 第四步：部署过程中的配置

### 1. 项目设置

- **项目名称**: 使用默认或自定义名称
- **目录**: 确认是当前目录 (./)
- **覆盖设置**: 选择 No（使用现有配置）

### 2. 环境变量配置

部署过程中会提示设置环境变量，输入以下值：

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

## 第五步：部署后操作

### 1. 获取部署 URL

部署完成后，Vercel 会显示类似这样的 URL：

```
https://your-project-name.vercel.app
```

### 2. 测试 API

在浏览器中测试：

```
https://your-project-name.vercel.app/api/v1/tours
```

应该返回 JSON 格式的旅游路线数据。

### 3. 更新前端配置

编辑 `natours-frontend/.env.production`：

```
VITE_API_BASE_URL=https://your-project-name.vercel.app/api/v1
```

### 4. 重新部署前端

提交更改到 GitHub，GitHub Actions 会自动重新部署前端。

## 常见问题和解决方案

### 问题 1：构建失败

**错误信息**：`npm run build` failed
**解决方案**：

```bash
# 使用跳过构建的部署
vercel --prod --build-env NODE_ENV=production
```

### 问题 2：环境变量未设置

**解决方案**：

```bash
# 重新部署并设置环境变量
vercel --prod --env NODE_ENV=production --env DATABASE_CLOUD="your-connection-string"
```

### 问题 3：数据库连接失败

**检查**：

1. MongoDB Atlas 网络访问设置
2. 环境变量中的连接字符串是否正确

## 有用的 Vercel CLI 命令

```bash
# 查看部署状态
vercel list

# 查看部署日志
vercel logs

# 重新部署
vercel --prod

# 删除部署
vercel remove
```

## 自动部署设置

部署成功后，每次推送到 GitHub 的 `main` 分支，Vercel 会自动重新部署。

## 故障排除

如果部署失败：

1. 检查 `vercel logs` 查看错误信息
2. 确认所有环境变量已正确设置
3. 检查 MongoDB Atlas 网络访问
4. 确保 `server.js` 文件存在且语法正确
