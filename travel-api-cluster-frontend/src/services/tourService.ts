import api from './api';
import type {
  Tour,
  TourListResponse,
  TourDetailResponse,
  ApiResponse,
} from '@/types/api';

interface TourQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  difficulty?: string;
  price?: {
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
  };
  ratingsAverage?: {
    gte?: number;
  };
}

class TourService {
  // 获取所有旅游路线
  async getTours(
    params?: TourQueryParams
  ): Promise<{ tours: Tour[]; total: number }> {
    const response = await api.get<TourListResponse>('/tours', { params });
    return {
      tours: response.data.data.data,
      total: response.data.results,
    };
  }

  // 获取单个旅游路线
  async getTour(id: string): Promise<Tour> {
    const response = await api.get<TourDetailResponse>(`/tours/${id}`);
    return response.data.data.document;
  }

  // 通过ID获取旅游路线
  async getTourById(id: string): Promise<Tour> {
    const response = await api.get<TourDetailResponse>(`/tours/${id}`);
    return response.data.data.document;
  }

  // 获取旅游统计
  async getTourStats(): Promise<unknown> {
    const response = await api.get<ApiResponse>('/tours/tours-stats');
    return response.data.data;
  }

  // 获取月度计划
  async getMonthlyPlan(year: number): Promise<unknown> {
    const response = await api.get<ApiResponse>(`/tours/monthly-plan/${year}`);
    return response.data.data;
  }

  // 创建旅游路线（需要管理员权限）
  async createTour(tourData: Partial<Tour>): Promise<Tour> {
    const response = await api.post<TourDetailResponse>('/tours', tourData);
    return response.data.data.document;
  }

  // 更新旅游路线（需要管理员权限）
  async updateTour(id: string, tourData: Partial<Tour>): Promise<Tour> {
    const response = await api.patch<TourDetailResponse>(
      `/tours/${id}`,
      tourData
    );
    return response.data.data.document;
  }

  // 删除旅游路线（需要管理员权限）
  async deleteTour(id: string): Promise<void> {
    await api.delete(`/tours/${id}`);
  }

  // 构建查询参数
  buildQueryString(params: TourQueryParams): string {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.fields) queryParams.append('fields', params.fields);
    if (params.difficulty) queryParams.append('difficulty', params.difficulty);

    if (params.price) {
      if (params.price.lt)
        queryParams.append('price[lt]', params.price.lt.toString());
      if (params.price.lte)
        queryParams.append('price[lte]', params.price.lte.toString());
      if (params.price.gt)
        queryParams.append('price[gt]', params.price.gt.toString());
      if (params.price.gte)
        queryParams.append('price[gte]', params.price.gte.toString());
    }

    if (params.ratingsAverage?.gte) {
      queryParams.append(
        'ratingsAverage[gte]',
        params.ratingsAverage.gte.toString()
      );
    }

    return queryParams.toString();
  }
}

export default new TourService();
