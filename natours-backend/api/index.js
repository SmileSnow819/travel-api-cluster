const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config({ path: '../config.env' });

const app = require('../app');

// 连接数据库
const DB = process.env.DATABASE_CLOUD || process.env.DATABASE_LOCAL;

if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('数据库连接成功！');
    })
    .catch((err) => {
      console.log('数据库连接失败:', err);
    });
}

// 导出 app 供 Vercel 使用
module.exports = app;
