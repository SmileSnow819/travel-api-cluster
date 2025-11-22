<template>
  <v-container class="contact-page">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <!-- Hero Section -->
        <v-card class="pa-6 mb-8" elevation="4" rounded="lg">
          <div class="text-center">
            <v-icon size="64" color="green-darken-3" class="mb-4"
              >mdi-email-outline</v-icon
            >
            <h1 class="text-h4 font-weight-bold text-green-darken-4 mb-4">
              联系我们
            </h1>
            <p class="text-body-1 text-grey-darken-2">
              有任何问题或建议？我们很乐意听取您的意见！
            </p>
          </div>
        </v-card>

        <!-- Contact Form -->
        <v-card class="pa-6 mb-6" elevation="2" rounded="lg">
          <h2 class="text-h5 font-weight-bold text-green-darken-4 mb-4">
            发送消息
          </h2>
          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.name"
                  label="姓名"
                  variant="outlined"
                  required
                  :rules="[(v) => !!v || '请输入您的姓名']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.email"
                  label="邮箱"
                  variant="outlined"
                  type="email"
                  required
                  :rules="[
                    (v) => !!v || '请输入您的邮箱',
                    (v) => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.subject"
                  label="主题"
                  variant="outlined"
                  required
                  :rules="[(v) => !!v || '请输入主题']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.message"
                  label="消息内容"
                  variant="outlined"
                  rows="4"
                  required
                  :rules="[(v) => !!v || '请输入消息内容']"
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="text-center">
                <v-btn
                  type="submit"
                  color="green-darken-3"
                  size="large"
                  :loading="loading"
                  class="px-8"
                >
                  <v-icon class="mr-2">mdi-send</v-icon>
                  发送消息
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <!-- Contact Information -->
        <v-card class="pa-6" elevation="2" rounded="lg">
          <h2 class="text-h5 font-weight-bold text-green-darken-4 mb-4">
            联系信息
          </h2>
          <v-row>
            <v-col cols="12" sm="6" class="mb-4">
              <div class="d-flex align-center mb-3">
                <v-icon color="green-darken-3" class="mr-3"
                  >mdi-map-marker</v-icon
                >
                <div>
                  <h3 class="text-h6 font-weight-bold mb-1">地址</h3>
                  <p class="text-body-2 text-grey">北京市朝阳区户外探险中心</p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <div class="d-flex align-center mb-3">
                <v-icon color="green-darken-3" class="mr-3">mdi-phone</v-icon>
                <div>
                  <h3 class="text-h6 font-weight-bold mb-1">电话</h3>
                  <p class="text-body-2 text-grey">+86 400-123-4567</p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <div class="d-flex align-center mb-3">
                <v-icon color="green-darken-3" class="mr-3">mdi-email</v-icon>
                <div>
                  <h3 class="text-h6 font-weight-bold mb-1">邮箱</h3>
                  <p class="text-body-2 text-grey">contact@natours.com</p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="mb-4">
              <div class="d-flex align-center mb-3">
                <v-icon color="green-darken-3" class="mr-3"
                  >mdi-clock-outline</v-icon
                >
                <div>
                  <h3 class="text-h6 font-weight-bold mb-1">工作时间</h3>
                  <p class="text-body-2 text-grey">周一至周五 9:00-18:00</p>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Social Media -->
          <v-divider class="my-4"></v-divider>
          <div class="text-center">
            <h3 class="text-h6 font-weight-bold mb-3">关注我们</h3>
            <div class="d-flex justify-center">
              <v-btn
                icon
                variant="text"
                color="green-darken-3"
                size="large"
                class="mx-2"
              >
                <v-icon>mdi-wechat</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                color="green-darken-3"
                size="large"
                class="mx-2"
              >
                <v-icon>mdi-weibo</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                color="green-darken-3"
                size="large"
                class="mx-2"
              >
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const submitForm = async () => {
  loading.value = true;

  // 模拟表单提交
  setTimeout(() => {
    alert('感谢您的留言！我们会尽快回复您。');
    form.value = { name: '', email: '', subject: '', message: '' };
    loading.value = false;
  }, 1000);
};
</script>

<style scoped>
.contact-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.v-card {
  transition: transform 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
