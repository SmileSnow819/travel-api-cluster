<template>
  <v-card class="tour-card" elevation="4" hover>
    <!-- 图片区域 -->
    <div class="card-picture">
      <div class="card-picture-overlay"></div>
      <v-img
        :src="tourImage"
        :alt="tour.name"
        height="240"
        cover
        class="card-picture-img"
        gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4)"
      ></v-img>

      <!-- 难度标签 -->
      <div
        class="difficulty-badge"
        :class="getDifficultyClass(tour.difficulty)"
      >
        {{ getDifficultyText(tour.difficulty) }}
      </div>

      <!-- 标题 -->
      <h3 class="heading-tertiary">
        <span>{{ tour.name }}</span>
      </h3>
    </div>

    <!-- 详细信息 -->
    <v-card-text class="card-details pa-4">
      <h4 class="card-sub-heading mb-2">
        {{ `${getDifficultyText(tour.difficulty)} ${tour.duration}天旅游` }}
      </h4>
      <p class="card-text mb-4">{{ tour.summary }}</p>

      <div class="card-data">
        <v-icon size="20" color="green" class="mr-2">mdi-map-marker</v-icon>
        <span>{{ tour.startLocation.description }}</span>
      </div>

      <div class="card-data">
        <v-icon size="20" color="green" class="mr-2">mdi-calendar</v-icon>
        <span>{{ formatDate(tour.startDates[0]) }}</span>
      </div>

      <div class="card-data">
        <v-icon size="20" color="green" class="mr-2">mdi-flag</v-icon>
        <span>{{ tour.locations.length }} 个站点</span>
      </div>

      <div class="card-data">
        <v-icon size="20" color="green" class="mr-2">mdi-account-group</v-icon>
        <span>{{ tour.maxGroupSize }} 人</span>
      </div>
    </v-card-text>

    <!-- 底部信息 -->
    <v-card-actions class="card-footer pa-4">
      <div class="d-flex justify-space-between align-center w-100">
        <!-- 价格和评分 -->
        <div class="d-flex flex-column">
          <div class="d-flex align-center mb-1">
            <span class="card-price font-weight-bold text-green-darken-3">
              ￥{{ tour.price }}
            </span>
            <span class="card-price-text text-grey ml-1">每人</span>
          </div>
          <div class="d-flex align-center">
            <v-icon size="16" color="amber" class="mr-1">mdi-star</v-icon>
            <span class="card-rating font-weight-bold">
              {{ tour.ratingsAverage.toFixed(1) }}
            </span>
            <span class="card-rating-text text-grey ml-1">
              ({{ tour.ratingsQuantity }})
            </span>
          </div>
        </div>

        <!-- 详情按钮 -->
        <v-btn
          color="green-darken-3"
          variant="flat"
          size="small"
          :to="`/tour/${tour._id}`"
          class="text-none detail-btn"
          prepend-icon="mdi-arrow-right"
        >
          查看详情
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { Tour } from '@/types/api';

interface Props {
  tour: Tour;
}

const props = defineProps<Props>();

// 计算旅游图片URL - 在 GitHub Pages 上使用相对路径
const tourImage = computed(() => {
  const basePath =
    import.meta.env.MODE === 'production' ? '/travel-api-cluster' : '';
  return `${basePath}/img/tours/${props.tour.imageCover}`;
});

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
  });
};

// 获取难度显示文本
const getDifficultyText = (difficulty: string) => {
  const difficultyMap: Record<string, string> = {
    easy: '简单',
    medium: '中等',
    difficult: '困难',
  };
  return difficultyMap[difficulty] || difficulty;
};

// 获取难度样式类
const getDifficultyClass = (difficulty: string) => {
  const difficultyClassMap: Record<string, string> = {
    easy: 'difficulty-easy',
    medium: 'difficulty-medium',
    difficult: 'difficulty-difficult',
  };
  return difficultyClassMap[difficulty] || 'difficulty-easy';
};
</script>

<style scoped>
.tour-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.tour-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-color: rgba(40, 180, 135, 0.2);
}

.card-picture {
  position: relative;
  height: 240px;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0%, 100% 85%, 0% 95%);
}

.card-picture-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #7dd56f, #28b487);
  opacity: 0.6;
  z-index: 1;
}

.card-picture-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heading-tertiary {
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  z-index: 10;
  text-align: center;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.heading-tertiary span {
  padding: 12px 20px;
  line-height: 1.2;
  background: linear-gradient(
    135deg,
    rgba(125, 213, 111, 0.9),
    rgba(40, 180, 135, 0.9)
  );
  box-decoration-break: clone;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word;
}

/* 难度标签 */
.difficulty-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.difficulty-easy {
  background: linear-gradient(135deg, #4caf50, #66bb6a);
}

.difficulty-medium {
  background: linear-gradient(135deg, #ff9800, #ffb74d);
}

.difficulty-difficult {
  background: linear-gradient(135deg, #f44336, #ef5350);
}

.card-details {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
  padding: 24px !important;
}

.card-sub-heading {
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
  grid-column: 1 / -1;
  color: #2e7d32;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #e8f5e8, #f1f8e9);
  padding: 8px 12px;
  border-radius: 6px;
  margin: -8px 0 8px 0;
}

.card-text {
  grid-column: 1 / -1;
  font-size: 0.9rem;
  font-style: italic;
  margin-top: -4px;
  margin-bottom: 12px;
  color: #666;
  line-height: 1.5;
  background: rgba(40, 180, 135, 0.05);
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid #28b487;
}

.card-data {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  color: #555;
  padding: 4px 0;
}

.card-data .v-icon {
  background: rgba(40, 180, 135, 0.1);
  padding: 6px;
  border-radius: 8px;
  margin-right: 8px;
}

.card-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  font-size: 0.9rem;
  margin-top: auto;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.card-price {
  font-size: 1.2rem;
  font-weight: 700;
}

.card-price-text {
  font-size: 0.8rem;
}

.card-rating {
  font-size: 1rem;
  color: #ff9800;
}

.card-rating-text {
  font-size: 0.8rem;
}

.detail-btn {
  border-radius: 25px;
  padding: 8px 20px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.detail-btn:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(40, 180, 135, 0.3);
}
</style>
