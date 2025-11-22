import api from './api';
import type {
  User,
  LoginRequest,
  SignupRequest,
  AuthResponse,
  UpdateUserRequest,
  UpdatePasswordRequest,
  ApiResponse,
} from '@/types/api';

class AuthService {
  // 用户注册
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/users/signup', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      if (response.data.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
    }
    return response.data;
  }

  // 用户登录
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      if (response.data.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
    }
    return response.data;
  }

  // 获取当前用户信息
  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<{ document: User }>>(
      '/users/getMe'
    );
    return response.data.data!.document;
  }

  // 更新用户信息
  async updateUser(userData: UpdateUserRequest): Promise<User> {
    const response = await api.patch<ApiResponse<{ use: User }>>(
      '/users/updateMe',
      userData
    );
    return response.data.data!.use;
  }

  // 更新密码
  async updatePassword(
    passwordData: UpdatePasswordRequest
  ): Promise<ApiResponse> {
    const response = await api.patch<ApiResponse>(
      '/users/updateMyPassword',
      passwordData
    );
    return response.data;
  }

  // 注销账户
  async deleteAccount(): Promise<void> {
    await api.delete('/users/deleteMe');
  }

  // 忘记密码
  async forgotPassword(email: string): Promise<ApiResponse> {
    const response = await api.post<ApiResponse>('/users/forgotPassword', {
      email,
    });
    return response.data;
  }

  // 重置密码
  async resetPassword(
    token: string,
    passwordData: { password: string; passwordConfirm: string }
  ): Promise<AuthResponse> {
    const response = await api.patch<AuthResponse>(
      `/users/resetPassword/${token}`,
      passwordData
    );
    return response.data;
  }

  // 退出登录
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // 检查是否已登录
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 获取当前用户信息（从本地存储）
  getCurrentUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // 获取token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
