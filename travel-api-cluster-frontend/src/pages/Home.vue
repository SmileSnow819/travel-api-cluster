<template>
  <div class="home-page">
    <!-- 主内容区域 -->
    <v-main class="bg-grey-lighten-4 pa-8">
      <v-container>
        <v-row>
          <v-col
            v-for="tour in tours"
            :key="tour._id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <TourCard :tour="tour" />
          </v-col>
        </v-row>

        <!-- 加载状态 -->
        <v-row v-if="loading">
          <v-col cols="12" class="text-center">
            <v-progress-circular
              indeterminate
              color="green"
              size="64"
            ></v-progress-circular>
          </v-col>
        </v-row>

        <!-- 空状态 -->
        <v-row v-else-if="tours.length === 0">
          <v-col cols="12" class="text-center">
            <v-card class="pa-8">
              <v-icon size="64" color="grey" class="mb-4"
                >mdi-map-marker-off</v-icon
              >
              <h3 class="text-h5 mb-2">暂无旅游项目</h3>
              <p class="text-body-1 text-grey">
                目前没有可用的旅游项目，请稍后再来查看。
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TourCard from '@/components/TourCard.vue';
import tourService from '@/services/tourService';
import type { Tour } from '@/types/api';

// 旅游数据
const tours = ref<Tour[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// API调用获取旅游数据
const fetchTours = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await tourService.getTours({
      limit: 12,
      sort: '-ratingsAverage',
    });

    tours.value = response.tours;
  } catch (err) {
    console.error('获取旅游数据失败:', err);
    error.value = '获取旅游数据失败，请稍后重试';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTours();
});
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* 保持原有样式效果 */
.v-main {
  padding: 80px 60px;
  flex: 1;
  position: relative;
}

@media (max-width: 960px) {
  .v-main {
    padding: 60px 30px;
  }
}

@media (max-width: 600px) {
  .v-main {
    padding: 40px 20px;
  }
}
</style>
