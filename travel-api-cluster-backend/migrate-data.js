const mongoose = require('mongoose');

// 数据库连接配置
const localDB = 'mongodb://localhost:27017/natours-test';
const cloudDB =
  'mongodb+srv://2465225759_db_user:9ZlhbNNQBc4SCDnP@cluster0.8b1xceb.mongodb.net/natours';

async function migrateData() {
  console.log('🚀 开始数据迁移...');

  try {
    // 连接本地数据库
    console.log('📡 连接本地数据库...');
    const localConn = await mongoose
      .createConnection(localDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .asPromise();
    console.log('✅ 本地数据库连接成功');

    // 连接云数据库
    console.log('☁️ 连接云数据库...');
    const cloudConn = await mongoose
      .createConnection(cloudDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .asPromise();
    console.log('✅ 云数据库连接成功');

    // 检查本地数据库中的集合
    const collections = await localConn.db.listCollections().toArray();
    console.log(
      `📊 发现 ${collections.length} 个集合:`,
      collections.map((c) => c.name),
    );

    let totalMigrated = 0;

    // 迁移每个集合
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;

      // 跳过系统集合
      if (collectionName.startsWith('system.')) {
        console.log(`⏭️  跳过系统集合: ${collectionName}`);
        continue;
      }

      console.log(`\n🔄 迁移集合: ${collectionName}`);

      try {
        // 获取本地数据
        const localData = await localConn
          .collection(collectionName)
          .find({})
          .toArray();

        if (localData.length === 0) {
          console.log(`ℹ️  集合 ${collectionName} 为空，跳过`);
          continue;
        }

        console.log(`📥 找到 ${localData.length} 条记录`);

        // 清空目标集合（可选）
        // await cloudConn.collection(collectionName).deleteMany({});

        // 插入数据到云数据库
        const result = await cloudConn
          .collection(collectionName)
          .insertMany(localData);
        console.log(
          `✅ 成功迁移 ${result.insertedCount} 条记录到 ${collectionName}`,
        );

        totalMigrated += result.insertedCount;
      } catch (error) {
        console.error(`❌ 迁移集合 ${collectionName} 失败:`, error.message);
      }
    }

    console.log(`\n🎉 数据迁移完成！`);
    console.log(`📈 总共迁移了 ${totalMigrated} 条记录`);

    // 关闭连接
    await localConn.close();
    await cloudConn.close();
    console.log('🔌 数据库连接已关闭');

    process.exit(0);
  } catch (error) {
    console.error('❌ 迁移失败:', error);
    process.exit(1);
  }
}

// 运行迁移
migrateData();
