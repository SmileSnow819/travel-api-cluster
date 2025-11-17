<template>
  <v-card class="add-review-card" elevation="4" rounded="lg">
    <v-card-title class="pa-4">
      <v-icon start color="green">mdi-comment-plus</v-icon>
      添加评论
    </v-card-title>

    <v-card-text class="pa-4">
      <v-form @submit.prevent="handleSubmit" class="add-review-form">
        <!-- 评分 -->
        <div class="mb-4">
          <div class="text-body-2 font-weight-medium mb-2">评分</div>
          <div class="rating-selector">
            <v-btn
              v-for="rating in 5"
              :key="rating"
              :color="form.rating >= rating ? 'amber' : 'grey-lighten-2'"
              variant="text"
              size="small"
              @click="form.rating = rating"
              class="rating-btn"
            >
              <v-icon>mdi-star</v-icon>
              <span class="ml-1">{{ rating }}</span>
            </v-btn>
          </div>
        </div>

        <!-- 评论内容 -->
        <v-textarea
          v-model="form.review"
          label="评论内容"
          placeholder="请分享您的旅游体验..."
          variant="outlined"
          rows="4"
          :rules="[
            (v) => !!v || '评论内容不能为空',
            (v) => (v && v.length >= 10) || '评论内容至少需要10个字符',
          ]"
          class="mb-4"
        ></v-textarea>

        <!-- 提交按钮 -->
        <div class="d-flex justify-end">
          <v-btn
            type="submit"
            color="green"
            :loading="submitting"
            :disabled="!form.rating || !form.review || form.review.length < 10"
          >
            <v-icon start>mdi-send</v-icon>
            提交评论
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import reviewService from '@/services/reviewService';
import type { CreateReviewRequest } from '@/types/api';

interface Props {
  tourId: string;
}

const props = defineProps<Props>();
const submitting = ref(false);

const form = reactive<CreateReviewRequest>({
  rating: 0,
  review: '',
});

const handleSubmit = async () => {
  try {
    submitting.value = true;

    await reviewService.createReview(form, props.tourId);

    // 重置表单
    form.rating = 0;
    form.review = '';

    // 触发成功事件
    emit('success');
  } catch (error) {
    console.error('提交评论失败:', error);
    alert('提交评论失败，请稍后重试');
  } finally {
    submitting.value = false;
  }
};

const emit = defineEmits<{
  success: [];
}>();
</script>

<style scoped>
.add-review-card {
  max-width: 500px;
  margin: 0 auto;
}

.add-review-form {
  padding: 8px 0;
}

.rating-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.rating-btn {
  min-width: 60px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.rating-btn:hover {
  transform: scale(1.05);
}
</style>
