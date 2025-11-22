<template>
  <v-card class="review-card" elevation="4" rounded="lg">
    <v-card-text class="pa-4">
      <!-- 用户头像和姓名 -->
      <div class="d-flex align-center mb-3">
        <v-avatar size="45" class="mr-3">
          <v-img
            :src="userPhoto"
            :alt="review.user.name"
            class="review-avatar"
          ></v-img>
        </v-avatar>
        <div>
          <div class="text-body-1 font-weight-bold">{{ review.user.name }}</div>
          <div class="text-caption text-grey">
            {{ formatDate(review.createdAt) }}
          </div>
        </div>
      </div>

      <!-- 评分 -->
      <div class="d-flex align-center mb-3">
        <div class="rating-stars">
          <v-icon
            v-for="star in 5"
            :key="star"
            :color="star <= review.rating ? 'amber' : 'grey-lighten-2'"
            size="18"
            class="mr-1"
          >
            mdi-star
          </v-icon>
        </div>
        <span class="text-caption text-grey ml-2">{{ review.rating }}/5</span>
      </div>

      <!-- 评论内容 -->
      <div class="review-text text-body-2">
        {{ review.review }}
      </div>

      <!-- 操作按钮（如果是自己的评论） -->
      <div v-if="isOwnReview" class="d-flex justify-end mt-3">
        <v-btn
          variant="text"
          color="error"
          size="small"
          @click="handleDelete"
          :loading="deleting"
        >
          <v-icon start>mdi-delete</v-icon>
          删除
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import reviewService from '@/services/reviewService';
import type { Review } from '@/types/api';

interface Props {
  review: Review;
}

const props = defineProps<Props>();
const authStore = useAuthStore();
const deleting = ref(false);

// 计算用户照片URL
const userPhoto = computed(() => {
  const basePath =
    import.meta.env.MODE === 'production' ? '/travel-api-cluster' : '';
  return `${basePath}/img/users/${props.review.user.photo}`;
});

// 检查是否是自己的评论
const isOwnReview = computed(() => {
  const currentUser = authStore.user;
  return currentUser && currentUser._id === props.review.user._id;
});

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// 删除评论
const handleDelete = async () => {
  if (!confirm('确定要删除这条评论吗？')) {
    return;
  }

  try {
    deleting.value = true;
    await reviewService.deleteReview(props.review._id);
    // 触发删除事件
    emit('deleted', props.review._id);
  } catch (error) {
    console.error('删除评论失败:', error);
    alert('删除评论失败，请稍后重试');
  } finally {
    deleting.value = false;
  }
};

const emit = defineEmits<{
  deleted: [reviewId: string];
}>();
</script>

<style scoped>
.review-card {
  transition: all 0.3s ease;
  min-width: 300px;
  max-width: 400px;
}

.review-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.review-avatar {
  border: 2px solid #e0e0e0;
}

.rating-stars {
  display: flex;
  align-items: center;
}

.review-text {
  line-height: 1.6;
  color: #424242;
  word-break: break-word;
}
</style>
