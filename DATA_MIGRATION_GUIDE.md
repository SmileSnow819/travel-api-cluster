# 数据库数据迁移指南

## 方法一：使用 MongoDB 工具（推荐）

### 步骤 1: 导出本地数据

```bash
# 导出整个数据库
mongodump --uri="mongodb://localhost:27017/natours-test" --out=./backup

# 或者导出特定集合
mongodump --uri="mongodb://localhost:27017/natours-test" --collection=tours --out=./backup
mongodump --uri="mongodb://localhost:27017/natours-test" --collection=users --out=./backup
mongodump --uri="mongodb://localhost:27017/natours-test" --collection=reviews --out=./backup
```

### 步骤 2: 导入到云数据库

```bash
# 导入整个数据库
mongorestore --uri="mongodb+srv://2465225759_db_user:9ZlhbNNQBc4SCDnP@cluster0.8b1xceb.mongodb.net/natours" ./backup/natours-test

# 或者导入特定集合
mongorestore --uri="mongodb+srv://2465225759_db_user:9ZlhbNNQBc4SCDnP@cluster0.8b1xceb.mongodb.net/natours" --collection=tours ./backup/natours-test/tours.bson
mongorestore --uri="mongodb+srv://2465225759_db_user:9ZlhbNNQBc4SCDnP@cluster0.8b1xceb.mongodb.net/natours" --collection=users ./backup/natours-test/users.bson
mongorestore --uri="mongodb+srv://2465225759_db_user:9ZlhbNNQBc4SCDnP@cluster0.8b1xceb.mongodb.net/natours" --collection=reviews ./backup/natours-test/reviews.bson
```

## 方法二：使用 MongoDB Compass（图形界面）

1. 下载并安装 [MongoDB Compass](https://www.mongodb.com/products/compass)
2. 同时连接本地数据库和云数据库
3. 在本地数据库中选择集合，点击 "Export Collection"
4. 选择 JSON 或 CSV 格式导出
5. 在云数据库中创建相同集合，点击 "Import Data"

## 方法三：使用 Node.js 脚本

创建一个迁移脚本：

```javascript
// migrate-data.js
const mongoose = require('mongoose');

// 连接本地数据库
const localDB = 'mongodb://localhost:27017/natours-test';
// 连接云数据库
const cloudDB =
  'mongodb+srv://2465225759_db_user:9ZlhbNNQBc4SCDnP@cluster0.8b1xceb.mongodb.net/natours';

async function migrateData() {
  try {
    // 连接本地数据库
    const localConn = await mongoose.createConnection(localDB).asPromise();
    console.log('✅ 本地数据库连接成功');

    // 连接云数据库
    const cloudConn = await mongoose.createConnection(cloudDB).asPromise();
    console.log('✅ 云数据库连接成功');

    // 迁移 tours 集合
    const localTours = await localConn.collection('tours').find({}).toArray();
    if (localTours.length > 0) {
      await cloudConn.collection('tours').insertMany(localTours);
      console.log(`✅ 迁移了 ${localTours.length} 条旅游数据`);
    }

    // 迁移 users 集合
    const localUsers = await localConn.collection('users').find({}).toArray();
    if (localUsers.length > 0) {
      await cloudConn.collection('users').insertMany(localUsers);
      console.log(`✅ 迁移了 ${localUsers.length} 条用户数据`);
    }

    // 迁移 reviews 集合
    const localReviews = await localConn
      .collection('reviews')
      .find({})
      .toArray();
    if (localReviews.length > 0) {
      await cloudConn.collection('reviews').insertMany(localReviews);
      console.log(`✅ 迁移了 ${localReviews.length} 条评论数据`);
    }

    console.log('🎉 数据迁移完成！');
    process.exit(0);
  } catch (error) {
    console.error('❌ 迁移失败:', error);
    process.exit(1);
  }
}

migrateData();
```

运行迁移脚本：

```bash
cd natours-backend
node migrate-data.js
```

## 方法四：使用应用自动创建数据

如果你的应用有种子数据功能，可以直接运行：

```bash
npm run start:prod
```

然后通过 API 接口创建初始数据。

## 推荐使用顺序：

1. 先尝试方法一（mongodump/mongorestore） - 最可靠
2. 如果方法一失败，使用方法三（Node.js 脚本）
3. 方法二适合小量数据迁移
4. 方法四适合重新生成测试数据

选择最适合你的方法开始迁移！
