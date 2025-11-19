# 最终部署步骤

## 问题已修复：

✅ 更新了 MongoDB 连接配置（移除了过时的选项）
✅ 添加了根路径路由（避免 404 错误）

## 立即重新部署：

### 步骤 1：提交代码更改

```bash
# 在项目根目录运行
git add .
git commit -m "修复数据库连接和根路径路由"
git push
```

### 步骤 2：重新部署到 Vercel

Vercel 会自动检测到代码更改并重新部署。或者手动触发：

1. 访问 Vercel 控制台：`https://vercel.com`
2. 进入 `natours-backend` 项目
3. 点击 **Deployments** 选项卡
4. 找到最新的部署，点击 **...** 菜单
5. 选择 **Redeploy**

### 步骤 3：测试 API

部署完成后，测试以下 URL：

1. **根路径**：

   ```
   https://natours-backend-xi.vercel.app/
   ```

   应该返回：

   ```json
   {
     "status": "success",
     "message": "Natours API is running!",
     "documentation": "/api/v1/tours"
   }
   ```

2. **旅游路线 API**：
   ```
   https://natours-backend-xi.vercel.app/api/v1/tours
   ```
   应该返回 JSON 格式的旅游路线数据。

### 步骤 4：更新前端配置

编辑 `natours-frontend/.env.production`：

```
VITE_API_BASE_URL=https://natours-backend-xi.vercel.app/api/v1
```

### 步骤 5：重新部署前端

提交更改到 GitHub，GitHub Actions 会自动重新部署前端。

## 预期结果：

- 后端 API 正常工作
- 前端能正常显示旅游路线
- 数据库连接成功
- 没有 404 错误
