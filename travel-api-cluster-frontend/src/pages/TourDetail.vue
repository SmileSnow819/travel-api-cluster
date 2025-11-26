<template>
  <div class="tour-detail">
    <!-- 加载状态 -->
    <div v-if="loading" class="text-center pa-16">
      <v-progress-circular
        indeterminate
        color="green"
        size="64"
      ></v-progress-circular>
      <p class="mt-4 text-body-1">正在加载旅游详情...</p>
    </div>

    <!-- 旅游详情内容 -->
    <template v-else-if="tour">
      <!-- 头部英雄区域 -->
      <section class="section-header">
        <div class="header-hero">
          <div class="header-hero-overlay"></div>
          <v-img
            :src="tourImageCover"
            :alt="tour.name"
            class="header-hero-img"
            cover
          ></v-img>
        </div>

        <div class="heading-box">
          <h1 class="heading-primary">
            <span>{{ tour.name }} 旅游</span>
          </h1>
          <div class="heading-box-group">
            <div class="heading-box-detail">
              <v-icon size="20" class="mr-2">mdi-clock</v-icon>
              <span>{{ tour.duration }} 天</span>
            </div>
            <div class="heading-box-detail">
              <v-icon size="20" class="mr-2">mdi-map-marker</v-icon>
              <span>{{ tour.startLocation.description }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 描述区域 -->
      <section class="section-description">
        <div class="overview-box">
          <div class="overview-box-group">
            <h2 class="heading-secondary mb-4">快速信息</h2>

            <div class="overview-box-detail">
              <v-icon size="22" color="green" class="mr-3">mdi-calendar</v-icon>
              <span class="overview-box-label">下次出发</span>
              <span class="overview-box-text">{{
                formatDate(tour.startDates[0])
              }}</span>
            </div>

            <div class="overview-box-detail">
              <v-icon size="22" color="green" class="mr-3"
                >mdi-trending-up</v-icon
              >
              <span class="overview-box-label">难度</span>
              <span class="overview-box-text">{{
                getDifficultyText(tour.difficulty)
              }}</span>
            </div>

            <div class="overview-box-detail">
              <v-icon size="22" color="green" class="mr-3"
                >mdi-account-group</v-icon
              >
              <span class="overview-box-label">参与者</span>
              <span class="overview-box-text">{{ tour.maxGroupSize }} 人</span>
            </div>

            <div class="overview-box-detail">
              <v-icon size="22" color="green" class="mr-3">mdi-star</v-icon>
              <span class="overview-box-label">评分</span>
              <span class="overview-box-text"
                >{{ tour.ratingsAverage }} / 5</span
              >
            </div>

            <!-- 地理位置信息 -->
            <div class="overview-box-detail location-highlight">
              <v-icon size="32" color="red" class="mr-3">mdi-map-marker</v-icon>
              <div class="location-info">
                <span class="overview-box-label">起始位置</span>
                <span class="overview-box-text location-description">{{
                  tour.startLocation.description
                }}</span>
                <div v-if="tour.startLocation.address" class="location-address">
                  {{ tour.startLocation.address }}
                </div>
                <div class="location-coordinates">
                  经纬度: {{ tour.startLocation.coordinates[0].toFixed(6) }},
                  {{ tour.startLocation.coordinates[1].toFixed(6) }}
                </div>
              </div>
            </div>

            <!-- 旅游地点列表 -->
            <div class="overview-box-detail">
              <v-icon size="22" color="blue" class="mr-3">mdi-map</v-icon>
              <span class="overview-box-label">旅游地点</span>
              <span class="overview-box-text"
                >{{ tour.locations.length }} 个地点</span
              >
            </div>
          </div>

          <div class="overview-box-group">
            <h2 class="heading-secondary mb-4">您的导游</h2>

            <div
              v-for="guide in tour.guides"
              :key="guide._id"
              class="overview-box-detail"
            >
              <v-avatar size="35" class="mr-3">
                <v-img :src="guidePhoto(guide)" :alt="guide.name"></v-img>
              </v-avatar>
              <span class="overview-box-label">{{
                getGuideRole(guide.role)
              }}</span>
              <span class="overview-box-text">{{ guide.name }}</span>
            </div>
          </div>
        </div>

        <div class="description-box">
          <h2 class="heading-secondary mb-4">关于 {{ tour.name }} 旅游</h2>
          <p
            v-for="(paragraph, index) in tour.description.split('\n')"
            :key="index"
            class="description-text"
          >
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- 图片区域 -->
      <section class="section-pictures">
        <div
          v-for="(img, index) in tour.images"
          :key="index"
          class="picture-box"
        >
          <v-img
            :src="tourImage(img)"
            :alt="`${tour.name} 图片 ${index + 1}`"
            class="picture-box-img"
            :class="`picture-box-img--${index + 1}`"
            cover
          ></v-img>
        </div>
      </section>

      <!-- 地图区域 -->
      <section class="section-map">
        <div class="map-wrapper">
          <div class="map-header">
            <h2 class="heading-secondary">旅游路线地图</h2>
            <p class="map-subtitle">
              探索精彩的旅程路线，感受每一个目的地的魅力
            </p>
          </div>
          <div class="map-container">
            <AMapComponent
              :start-location="mapStartLocation"
              :locations="mapLocations"
              :map-height="500"
              :show-controls="true"
            />
          </div>
        </div>
      </section>

      <!-- 评论区域 -->
      <section class="section-reviews">
        <div class="reviews-container">
          <div class="reviews-header">
            <h2 class="reviews-title">用户评论</h2>
            <div class="reviews-stats">
              <v-icon color="white" class="mr-1">mdi-star</v-icon>
              <span class="reviews-rating">{{ tour.ratingsAverage }}</span>
              <span class="reviews-count"
                >({{ tour.ratingsQuantity }} 条评论)</span
              >
            </div>
          </div>

          <!-- 添加评论表单（仅登录用户可见） -->
          <div v-if="user" class="add-review-section">
            <AddReview :tour-id="tour._id" @success="fetchReviews" />
          </div>

          <!-- 登录提示 -->
          <div v-else class="login-prompt">
            <v-card class="login-prompt-card" elevation="2" rounded="lg">
              <v-card-text class="text-center pa-6">
                <v-icon size="48" color="green" class="mb-3">mdi-login</v-icon>
                <h3 class="text-h6 mb-2">登录后发表评论</h3>
                <p class="text-body-2 text-grey mb-4">
                  登录您的账户，分享您的旅游体验
                </p>
                <v-btn color="green" to="/login" class="text-none">
                  <v-icon start>mdi-login</v-icon>
                  立即登录
                </v-btn>
              </v-card-text>
            </v-card>
          </div>

          <!-- 评论列表 -->
          <div v-if="reviews.length > 0" class="reviews-list">
            <ReviewCard
              v-for="review in reviews"
              :key="review._id"
              :review="review"
              @deleted="handleReviewDeleted"
            />
          </div>

          <!-- 空状态 -->
          <div v-else-if="!loadingReviews" class="empty-reviews">
            <v-card class="empty-card" elevation="2" rounded="lg">
              <v-card-text class="text-center pa-8">
                <v-icon size="64" color="grey" class="mb-4"
                  >mdi-comment-text-outline</v-icon
                >
                <h3 class="text-h6 mb-2">暂无评论</h3>
                <p class="text-body-2 text-grey">
                  成为第一个分享体验的用户吧！
                </p>
              </v-card-text>
            </v-card>
          </div>

          <!-- 加载状态 -->
          <div v-if="loadingReviews" class="reviews-loading">
            <v-progress-circular
              indeterminate
              color="white"
              size="32"
            ></v-progress-circular>
            <p class="text-body-2 text-white mt-2">正在加载评论...</p>
          </div>
        </div>
      </section>

      <!-- 行动号召区域 -->
      <section class="section-cta">
        <div class="cta">
          <div class="cta-img cta-img--logo">
            <div class="logo-placeholder">
              <v-icon size="64" color="white">mdi-pine-tree</v-icon>
            </div>
          </div>
          <v-img
            v-if="tour.images[1]"
            :src="tourImage(tour.images[1])"
            alt="旅游图片"
            class="cta-img cta-img--1"
            cover
          ></v-img>
          <v-img
            v-if="tour.images[2]"
            :src="tourImage(tour.images[2])"
            alt="旅游图片"
            class="cta-img cta-img--2"
            cover
          ></v-img>
          <div class="cta-content">
            <h2 class="heading-secondary mb-2">还在等什么？</h2>
            <p class="cta-text mb-4">
              {{ tour.duration }} 天。1 次冒险。无限回忆。今天就让它成为你的！
            </p>
            <v-btn
              v-if="user"
              color="green"
              size="large"
              class="text-none"
              @click="bookTour"
            >
              立即预订
            </v-btn>
            <v-btn
              v-else
              color="green"
              size="large"
              class="text-none"
              to="/login"
            >
              登录预订
            </v-btn>
          </div>
        </div>
      </section>
    </template>

    <!-- 错误状态 -->
    <div v-else class="text-center pa-16">
      <v-icon size="64" color="grey" class="mb-4">mdi-alert-circle</v-icon>
      <h3 class="text-h5 mb-2">加载失败</h3>
      <p class="text-body-1 text-grey">无法加载旅游详情，请稍后重试。</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import tourService from '@/services/tourService';
import reviewService from '@/services/reviewService';
import authService from '@/services/authService';
import ReviewCard from '@/components/ReviewCard.vue';
import AddReview from '@/components/AddReview.vue';
import AMapComponent from '@/components/AMapComponent.vue';
import type { Tour, User, Review } from '@/types/api';

const route = useRoute();
const tour = ref<Tour | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const user = ref<User | null>(null);
const reviews = ref<Review[]>([]);
const loadingReviews = ref(false);

// 计算旅游图片URL - 统一处理路径
const tourImage = (imageName: string) => {
  const basePath =
    import.meta.env.MODE === 'production' ? '/travel-api-cluster' : '';
  return `${basePath}/img/tours/${imageName}`;
};

// 计算旅游封面图片URL
const tourImageCover = computed(() => {
  if (!tour.value) return '';
  return tourImage(tour.value.imageCover);
});

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
  });
};

// 获取导游照片URL
const guidePhoto = (guide: { photo: string }) => {
  const basePath =
    import.meta.env.MODE === 'production' ? '/travel-api-cluster' : '';
  return `${basePath}/img/users/${guide.photo}`;
};

// 获取导游角色显示文本
const getGuideRole = (role: string) => {
  const roles: Record<string, string> = {
    'lead-guide': '首席导游',
    guide: '导游',
    admin: '管理员',
  };
  return roles[role] || role;
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

// 转换地图数据格式
const mapStartLocation = computed(() => {
  if (!tour.value?.startLocation) return undefined;

  const startLoc = {
    coordinates: tour.value.startLocation.coordinates,
    description: tour.value.startLocation.description,
    address: tour.value.startLocation.address,
  };
  console.log('地图起始位置:', startLoc);
  return startLoc;
});

const mapLocations = computed(() => {
  if (!tour.value?.locations) return [];

  const locations = tour.value.locations.map((location) => ({
    coordinates: location.coordinates,
    description: location.description,
    day: location.day,
  }));
  console.log('地图旅游地点:', locations);
  return locations;
});

// 预订旅游
const bookTour = () => {
  console.log('预订旅游:', tour.value?._id);
  // 实际项目中应该调用API
};

// 获取评论
const fetchReviews = async () => {
  if (!tour.value) return;

  try {
    loadingReviews.value = true;
    const response = await reviewService.getTourReviews(tour.value._id);
    reviews.value = response.reviews;
  } catch (err) {
    console.error('获取评论失败:', err);
  } finally {
    loadingReviews.value = false;
  }
};

// 处理评论删除
const handleReviewDeleted = (reviewId: string) => {
  reviews.value = reviews.value.filter((review) => review._id !== reviewId);
  // 更新旅游评分统计
  if (tour.value) {
    tour.value.ratingsQuantity -= 1;
    // 这里可以重新计算平均分，但为了简单起见，我们保持原样
  }
};

// API调用获取旅游详情和评论
const fetchTourDetail = async () => {
  try {
    loading.value = true;
    error.value = null;

    const tourId = route.params.slug as string;
    tour.value = await tourService.getTourById(tourId);

    // 检查用户登录状态
    if (authService.isLoggedIn()) {
      user.value = authService.getCurrentUserFromStorage();
    }

    // 获取评论
    await fetchReviews();
  } catch (err) {
    console.error('获取旅游详情失败:', err);
    error.value = '获取旅游详情失败，请稍后重试';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTourDetail();
});
</script>

<style scoped>
.tour-detail {
  min-height: 100vh;
}

/* 头部英雄区域样式 */
.section-header {
  position: relative;
  height: 38vw;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 9vw), 0 100%);
}

.header-hero {
  height: 100%;
  position: relative;
}

.header-hero-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right bottom, #7dd56f, #28b487);
  opacity: 0.85;
  z-index: 1;
}

.header-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 25%;
}

.heading-box {
  position: absolute;
  bottom: 13vw;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
}

.heading-primary {
  color: white;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 5rem;
  margin-bottom: 2rem;
}

.heading-primary span {
  padding: 1rem 1.5rem;
  line-height: 1;
  background: linear-gradient(
    to bottom right,
    rgba(125, 213, 111, 0.85),
    rgba(40, 180, 135, 0.85)
  );
  box-decoration-break: clone;
}

.heading-box-group {
  color: #f7f7f7;
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
}

.heading-box-detail {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  text-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.15);
}

/* 描述区域样式 */
.section-description {
  background-color: #fcfcfc;
  margin-top: -9vw;
  display: flex;
}

.section-description > * {
  padding: 0 8vw;
  padding-top: 14vw;
  padding-bottom: calc(1vw + 9vw);
  flex: 0 0 50%;
}

.overview-box {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.overview-box-group:not(:last-child) {
  margin-bottom: 7rem;
}

.overview-box-detail {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: 400;
  margin-bottom: 2.25rem;
}

.overview-box-label {
  font-weight: 700;
  margin-right: 2.25rem;
  text-transform: uppercase;
  font-size: 1.4rem;
  min-width: 100px;
}

.overview-box-text {
  text-transform: capitalize;
}

.description-box {
  margin-right: 5rem;
}

.heading-secondary {
  font-size: 2.25rem;
  text-transform: uppercase;
  font-weight: 700;
  background: linear-gradient(to right, #7dd56f, #28b487);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  display: inline-block;
}

.description-text {
  font-size: 1.7rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* 图片区域样式 */
.section-pictures {
  display: flex;
  clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);
  margin-top: -9vw;
  position: relative;
  z-index: 1000;
}

.picture-box {
  flex: 1;
}

.picture-box-img {
  display: block;
  width: 100%;
  height: 110%;
  object-fit: cover;
}

.picture-box-img--1 {
  padding-top: 15%;
}

.picture-box-img--2 {
  padding-bottom: 15%;
}

.picture-box-img--3 {
  padding-bottom: 27%;
}

/* 评论区域样式 */
.section-reviews {
  margin-top: -9vw;
  padding: calc(5rem + 9vw) 0;
  position: relative;
  z-index: 1000;
  background: linear-gradient(to right bottom, #7dd56f, #28b487);
  clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);
}

.reviews-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.reviews-header {
  text-align: center;
  margin-bottom: 3rem;
}

.reviews-title {
  color: white;
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.reviews-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.reviews-rating {
  font-weight: 700;
  margin: 0 0.5rem;
}

.reviews-count {
  opacity: 0.9;
}

.add-review-section {
  margin-bottom: 3rem;
}

.login-prompt {
  margin-bottom: 3rem;
}

.login-prompt-card {
  max-width: 400px;
  margin: 0 auto;
}

.reviews-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.empty-reviews {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.empty-card {
  max-width: 400px;
}

.reviews-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: white;
}

/* 行动号召区域样式 */
.section-cta {
  margin-top: -9vw;
  padding: 3rem;
  padding-bottom: 11rem;
  padding-top: calc(15rem + 9vw);
  background-color: #f7f7f7;
}

.cta {
  position: relative;
  max-width: 105rem;
  margin: 0 auto;
  overflow: hidden;
  background-color: #fff;
  padding: 9rem 5rem 9rem 21rem;
  border-radius: 2rem;
  box-shadow: 0 3rem 8rem 0.5rem rgba(0, 0, 0, 0.15);
}

.cta-img {
  height: 15rem;
  width: 15rem;
  position: absolute;
  left: 0;
  top: 50%;
  border-radius: 50%;
  box-shadow: 1rem 0.5rem 3rem rgba(0, 0, 0, 0.15);
}

.cta-img--logo {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right bottom, #7dd56f, #28b487);
  z-index: 10;
  transform: translate(-35%, -50%);
}

.cta-img--1 {
  transform: translate(-10%, -50%) scale(0.97);
  z-index: 9;
}

.cta-img--2 {
  transform: translate(15%, -50%) scale(0.94);
  z-index: 8;
}

.cta-content {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr auto;
  grid-gap: 0.7rem;
  grid-auto-flow: column;
  align-items: center;
}

.cta-text {
  font-size: 1.9rem;
  font-weight: 400;
  grid-column: 1 / -1;
}

.logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* 地图区域样式 - 完整的Natours设计风格 */
.section-map {
  background-color: #f7f7f7;
  position: relative;
  z-index: 1000;
  padding: calc(8rem + 9vw) 0 8rem 0;
  /* Natours 倾斜设计 */
  clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);
  margin-top: -9vw;
  padding-bottom: 80px;
}

.map-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
}

.map-header {
  text-align: center;
  margin-bottom: 4rem;
}

.map-header .heading-secondary {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.map-header .heading-secondary::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #55c57a, #28b487, #7dd56f);
  border-radius: 2px;
}

.map-subtitle {
  font-size: 1.6rem;
  color: #666;
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  background: linear-gradient(
    135deg,
    rgba(125, 213, 111, 0.05),
    rgba(40, 180, 135, 0.05)
  );
  padding: 1.5rem 2rem;
  border-radius: 12px;
  border: 1px solid rgba(125, 213, 111, 0.2);
  /* 轻微倾斜 */
  clip-path: polygon(0 0, 100% 0%, 98% 100%, 0% 100%);
}

.map-container {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border: 4px solid transparent;
  background-clip: padding-box;
  /* Natours 倾斜设计 */
  clip-path: polygon(0 0, 100% 0%, 100% 94%, 0% 100%);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.map-container::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(135deg, #7dd56f, #28b487);
  border-radius: 20px;
  z-index: -1;
  /* 倾斜边框 */
  clip-path: polygon(0 0, 100% 0%, 100% 94%, 0% 100%);
}

.map-container:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-map {
    padding: calc(6rem + 6vw) 0 6rem 0;
    clip-path: polygon(0 6vw, 100% 0, 100% calc(100% - 6vw), 0 100%);
    margin-top: -6vw;
  }

  .map-header .heading-secondary {
    font-size: 2.2rem;
  }

  .map-subtitle {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
  }

  .map-wrapper {
    padding: 0 1rem;
  }
}

/* 地理位置信息样式 - Natours 设计风格 */
.location-highlight {
  background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  border: 3px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 15px 35px rgba(40, 180, 135, 0.15);
  position: relative;
  /* Natours 倾斜设计 */
  clip-path: polygon(0 0, 100% 0%, 100% 92%, 0% 100%);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.location-highlight::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(135deg, #7dd56f, #28b487);
  border-radius: 16px;
  z-index: -1;
  clip-path: polygon(0 0, 100% 0%, 100% 92%, 0% 100%);
}

.location-highlight:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 50px rgba(40, 180, 135, 0.25);
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.location-description {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2e7d32;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #55c57a, #28b487);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
}

.location-description::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #55c57a, #28b487);
  border-radius: 2px;
}

.location-address {
  font-size: 1.4rem;
  color: #666;
  font-style: italic;
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 4px solid #28b487;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.location-coordinates {
  font-size: 1.3rem;
  color: #2e7d32;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  background: white;
  padding: 10px 14px;
  border-radius: 10px;
  display: inline-block;
  border: 2px solid #7dd56f;
  box-shadow: 0 4px 12px rgba(40, 180, 135, 0.1);
  transition: all 0.3s ease;
}

.location-coordinates:hover {
  transform: translateX(4px);
  box-shadow: 0 6px 16px rgba(40, 180, 135, 0.2);
  border-color: #55c57a;
}

/* 地图区域样式更新 */
.section-map {
  background-color: #fcfcfc;
  position: relative;
  z-index: 1000;
  padding: 4rem 2rem;
  /* 添加倾斜设计 */
  clip-path: polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%);
  margin-top: -5vw;
}

.map-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.map-container::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: linear-gradient(
    135deg,
    rgba(125, 213, 111, 0.1),
    rgba(40, 180, 135, 0.1)
  );
  border-radius: 20px;
  z-index: -1;
  /* 倾斜背景 */
  clip-path: polygon(0 0, 100% 0%, 100% 90%, 0% 100%);
}
</style>
