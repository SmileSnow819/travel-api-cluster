#!/bin/bash

echo "=== Natours 后端部署脚本 ==="
echo ""

# 检查是否已安装 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "请先安装 Vercel CLI: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI 已安装"

# 进入后端目录
cd natours-backend

echo ""
echo "=== 开始部署到 Vercel ==="
echo ""

# 部署到 Vercel
vercel --prod

echo ""
echo "=== 部署完成 ==="
echo ""
echo "请按照以下步骤完成配置："
echo "1. 复制上面显示的部署 URL"
echo "2. 编辑 natours-frontend/.env.production 文件"
echo "3. 将 VITE_API_BASE_URL 设置为你的 Vercel 部署地址"
echo "4. 重新部署前端到 GitHub Pages"
echo ""
echo "示例配置："
echo "VITE_API_BASE_URL=https://your-project-name.vercel.app/api/v1"