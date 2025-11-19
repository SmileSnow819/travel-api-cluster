/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// 连接到你的 MongoDB Atlas 集群
const database = 'natours'; // 数据库名称
const collection = 'tours'; // 集合名称

// 创建连接
use(database);

// 测试连接 - 列出所有数据库
// db.adminCommand({listDatabases: 1});

// 创建示例数据
db.tours.insertMany([
  {
    name: '森林探险之旅',
    duration: 5,
    maxGroupSize: 25,
    difficulty: 'easy',
    ratingsAverage: 4.7,
    ratingsQuantity: 37,
    price: 397,
    summary: '探索美丽的森林和自然风光',
    description: '这是一次令人难忘的森林探险之旅...',
    imageCover: 'tour-1-cover.jpg',
    images: ['tour-1-1.jpg', 'tour-1-2.jpg', 'tour-1-3.jpg'],
    startDates: [
      new Date('2025-12-01'),
      new Date('2025-12-15'),
      new Date('2026-01-01'),
    ],
  },
  {
    name: '雪山徒步之旅',
    duration: 7,
    maxGroupSize: 15,
    difficulty: 'difficult',
    ratingsAverage: 4.9,
    ratingsQuantity: 24,
    price: 997,
    summary: '挑战自我，征服雪山',
    description: '适合有经验的徒步爱好者的雪山之旅...',
    imageCover: 'tour-2-cover.jpg',
    images: ['tour-2-1.jpg', 'tour-2-2.jpg', 'tour-2-3.jpg'],
    startDates: [new Date('2025-11-20'), new Date('2025-12-10')],
  },
]);

// 查询所有旅游项目
const tours = db.tours.find();
print('所有旅游项目:');
tours.forEach((tour) => {
  print(`- ${tour.name}: $${tour.price} (${tour.duration}天)`);
});

// 创建用户集合
db.users.insertOne({
  name: '测试用户',
  email: 'test@example.com',
  password: '$2a$12$Q0grHjH9PXc6SxivC8m12.2mZJ9BbKcgFpwSG4Y1ZEII8HJVzWeyS',
  role: 'user',
  createdAt: new Date(),
});

print('数据库连接成功！数据已初始化。');
