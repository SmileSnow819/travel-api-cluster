import api from './api';
import type {
  Review,
  ReviewListResponse,
  CreateReviewRequest,
  ApiResponse,
} from '@/types/api';

class ReviewService {
  // 获取所有评论
  async getReviews(): Promise<{ reviews: Review[]; total: number }> {
    const response = await api.get<ReviewListResponse>('/reviews');
    return {
      reviews: response.data.data.data,
      total: response.data.results,
    };
  }

  // 获取特定旅游的评论
  async getTourReviews(
    tourId: string
  ): Promise<{ reviews: Review[]; total: number }> {
    const response = await api.get<ReviewListResponse>(
      `/tours/${tourId}/reviews`
    );
    return {
      reviews: response.data.data.data,
      total: response.data.results,
    };
  }

  // 创建评论
  async createReview(
    reviewData: CreateReviewRequest,
    tourId?: string
  ): Promise<Review> {
    let url = '/reviews';
    if (tourId) {
      url = `/tours/${tourId}/reviews`;
    }

    const response = await api.post<ApiResponse<{ document: Review }>>(
      url,
      reviewData
    );
    return response.data.data!.document;
  }

  // 更新评论
  async updateReview(
    reviewId: string,
    reviewData: Partial<CreateReviewRequest>
  ): Promise<Review> {
    const response = await api.patch<ApiResponse<{ document: Review }>>(
      `/reviews/${reviewId}`,
      reviewData
    );
    return response.data.data!.document;
  }

  // 删除评论
  async deleteReview(reviewId: string): Promise<void> {
    await api.delete(`/reviews/${reviewId}`);
  }

  // 获取单个评论
  async getReview(reviewId: string): Promise<Review> {
    const response = await api.get<ApiResponse<{ document: Review }>>(
      `/reviews/${reviewId}`
    );
    return response.data.data!.document;
  }
}

export default new ReviewService();
