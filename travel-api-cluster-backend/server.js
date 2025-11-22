const mongoose = require('mongoose');
const dotenv = require('dotenv');
//全局处理未捕获的异常 同步代码错误
process.on('uncaughtException', (err) => {
  console.log('未捕获异常! 💥 正在关闭app...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

//连接数据库
// 在 Vercel 部署中总是使用云数据库
const DB = process.env.DATABASE_CLOUD || process.env.DATABASE_LOCAL;

console.log(
  `连接数据库: ${process.env.DATABASE_CLOUD ? '云数据库' : '本地数据库'}`,
);

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

const port = process.env.PORT || 3000;

// 对于 Vercel 部署，我们需要导出 app 而不是启动服务器
if (process.env.VERCEL) {
  module.exports = app;
} else {
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  //全局处理拒绝的Promise
  process.on('unhandledRejection', (err) => {
    console.log('未处理的拒绝! 💥 正在关闭app...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
}
