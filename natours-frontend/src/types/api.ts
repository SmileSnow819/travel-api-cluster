// 用户相关类型
export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: 'user' | 'guide' | 'lead-guide' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  photo?: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  data?: {
    user: User;
  };
}

// 旅游相关类型
export interface Tour {
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[];
  startLocation: {
    description: string;
    coordinates: [number, number];
    address: string;
  };
  locations: Array<{
    description: string;
    coordinates: [number, number];
    day: number;
  }>;
  guides: Array<{
    _id: string;
    name: string;
    photo: string;
    role: string;
  }>;
  slug: string;
}

export interface TourListResponse {
  status: string;
  results: number;
  data: {
    data: Tour[];
  };
}

export interface TourDetailResponse {
  status: string;
  data: {
    document: Tour;
  };
}

// 评论相关类型
export interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  tour: string;
}

export interface ReviewListResponse {
  status: string;
  results: number;
  data: {
    data: Review[];
  };
}

export interface CreateReviewRequest {
  review: string;
  rating: number;
}

// 用户设置相关类型
export interface UpdateUserRequest {
  name?: string;
  photo?: string;
}

export interface UpdatePasswordRequest {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

// 通用响应类型
export interface ApiResponse<T = unknown> {
  status: string;
  data?: T;
  message?: string;
  results?: number;
}
