import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginRequest } from '@/types/api';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  // 初始化时检查token有效性
  const initialize = async () => {
    if (token.value) {
      try {
        const userData = await authService.getCurrentUser();
        user.value = userData;
      } catch {
        // Token无效，清除本地存储
        localStorage.removeItem('token');
        token.value = null;
        user.value = null;
      }
    }
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    try {
      const loginData: LoginRequest = { email, password };
      const response = await authService.login(loginData);

      // 登录成功后，从本地存储获取用户信息
      const storedUser = authService.getCurrentUserFromStorage();
      user.value = storedUser || response.data?.user || null;
      token.value = response.token;

      return response;
    } catch (error) {
      // 清除可能已设置的状态
      user.value = null;
      token.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error; // 重新抛出错误让调用方处理
    } finally {
      isLoading.value = false;
    }
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    isLoading.value = true;
    try {
      const response = await authService.signup(userData);
      user.value = response.data?.user || null;
      token.value = response.token;
      if (token.value) {
        localStorage.setItem('token', token.value);
      }
      return response;
    } catch (error) {
      // 清除可能已设置的状态
      user.value = null;
      token.value = null;
      localStorage.removeItem('token');
      throw error; // 重新抛出错误让调用方处理
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };

  const updateUser = async (userData: Partial<User>) => {
    const response = await authService.updateUser(userData);
    if (user.value) {
      user.value = { ...user.value, ...response };
    }
    return response;
  };

  const updatePassword = async (passwordData: {
    passwordCurrent: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const response = await authService.updatePassword(passwordData);
    return response;
  };

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    initialize,
    login,
    signup,
    logout,
    updateUser,
    updatePassword,
  };
});
