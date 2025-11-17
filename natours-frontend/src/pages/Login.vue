<template>
  <v-main class="auth-page pa-4">
    <v-container class="d-flex align-center justify-center">
      <!-- 成功提示 -->
      <v-snackbar
        v-model="successSnackbar"
        color="success"
        timeout="3000"
        location="top"
      >
        <v-icon start>mdi-check-circle</v-icon>
        登录成功！
      </v-snackbar>

      <!-- 错误提示 -->
      <v-snackbar
        v-model="errorSnackbar"
        color="error"
        timeout="5000"
        location="top"
      >
        <v-icon start>mdi-alert-circle</v-icon>
        {{ errorMessage }}
      </v-snackbar>

      <v-card class="auth-card" elevation="8" width="480">
        <!-- 卡片头部 -->
        <v-card-item class="auth-header">
          <div class="text-center mb-4">
            <v-img
              :src="logo"
              alt="Natours Logo"
              height="60"
              width="auto"
              class="auth-logo mx-auto"
            ></v-img>
          </div>
          <v-card-title class="text-center auth-title"> 欢迎回来 </v-card-title>
          <v-card-subtitle class="text-center auth-subtitle">
            登录您的Natours账户
          </v-card-subtitle>
        </v-card-item>

        <!-- 表单区域 -->
        <v-card-text class="pa-6">
          <v-form @submit.prevent="handleLogin" class="auth-form">
            <!-- 邮箱输入 -->
            <v-text-field
              v-model="form.email"
              label="邮箱地址"
              type="email"
              placeholder="you@example.com"
              required
              variant="outlined"
              color="green"
              prepend-inner-icon="mdi-email"
              class="mb-4"
              :rules="[
                (v) => !!v || '邮箱地址是必填项',
                (v) => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址',
              ]"
            ></v-text-field>

            <!-- 密码输入 -->
            <v-text-field
              v-model="form.password"
              label="密码"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
              variant="outlined"
              color="green"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              class="mb-2"
              :rules="[(v) => !!v || '密码是必填项']"
            ></v-text-field>

            <!-- 忘记密码链接 -->
            <div class="text-right mb-6">
              <v-btn
                variant="text"
                color="green"
                size="small"
                class="text-none"
                @click="forgotPassword"
              >
                忘记密码？
              </v-btn>
            </div>

            <!-- 登录按钮 -->
            <v-btn
              type="submit"
              color="green"
              size="large"
              block
              class="auth-btn text-none mb-4"
              :loading="loading"
              :disabled="!form.email || !form.password"
            >
              <v-icon start>mdi-login</v-icon>
              登录
            </v-btn>

            <!-- 分隔线 -->
            <v-divider class="my-6">
              <span class="text-caption text-grey">或</span>
            </v-divider>

            <!-- 注册链接 -->
            <div class="text-center">
              <span class="text-body-2 text-grey">还没有账户？</span>
              <v-btn
                variant="text"
                color="green"
                size="small"
                class="text-none ml-1"
                to="/signup"
              >
                立即注册
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import logo from '/favicon.png';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const showPassword = ref(false);
const successSnackbar = ref(false);
const errorSnackbar = ref(false);
const errorMessage = ref('');

const form = ref({
  email: '',
  password: '',
});

const handleLogin = async () => {
  try {
    loading.value = true;
    errorSnackbar.value = false;
    errorMessage.value = '';

    // 使用auth store进行登录
    await authStore.login(form.value.email, form.value.password);

    // 显示成功提示
    successSnackbar.value = true;

    // 延迟跳转到首页，让用户看到成功提示
    setTimeout(() => {
      router.push('/');
    }, 1000);
  } catch (error: unknown) {
    console.error('登录失败:', error);

    // 显示错误提示
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      errorMessage.value =
        axiosError.response?.data?.message || '登录失败，请检查邮箱和密码';
    } else {
      errorMessage.value = '登录失败，请检查邮箱和密码';
    }
    errorSnackbar.value = true;
  } finally {
    loading.value = false;
  }
};

const forgotPassword = () => {
  console.log('忘记密码功能');
  // 实际项目中应该跳转到忘记密码页面或显示模态框
};
</script>

<style scoped>
.auth-page {
  background: #f7f7f7;
}

.auth-card {
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.auth-header {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  padding: 40px 24px 24px 24px;
}

.auth-logo {
  filter: brightness(0) invert(1);
}

.auth-title {
  color: white;
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.auth-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

.auth-form {
  padding: 8px 0;
}

.auth-btn {
  border-radius: 12px;
  height: 48px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(40, 180, 135, 0.3);
  transition: all 0.3s ease;
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 180, 135, 0.4);
}

:deep(.v-field--outlined) {
  border-radius: 12px;
}

:deep(.v-field__prepend-inner) {
  align-items: center;
}

:deep(.v-field__input) {
  align-items: center;
}

@media (max-width: 600px) {
  .auth-card {
    margin: 20px;
    width: 100% !important;
    max-width: none;
  }

  .auth-header {
    padding: 32px 20px 20px 20px;
  }
}
</style>
