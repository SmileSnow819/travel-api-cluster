const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 全局处理未捕获的异常
process.on('uncaughtException', (err) => {
  console.log('未捕获异常! 💥 正在关闭app...');
  console.log(err.name, err.message);
  process.exit(1);
});

// 加载环境变量
dotenv.config({ path: '../config.env' });

const app = require('../app');

// 连接数据库
const DB = process.env.DATABASE_CLOUD || process.env.DATABASE_LOCAL;

console.log(
  `连接数据库: ${process.env.DATABASE_CLOUD ? '云数据库' : '本地数据库'}`,
);

if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(DB)
    .then(() => {
      console.log('数据库连接成功！');
    })
    .catch((err) => {
      console.log('数据库连接失败:', err);
    });
}

// 全局处理拒绝的Promise
process.on('unhandledRejection', (err) => {
  console.log('未处理的拒绝! 💥 正在关闭app...');
  console.log(err.name, err.message);
  process.exit(1);
});

// 导出 app 供 Vercel 使用
module.exports = app;
