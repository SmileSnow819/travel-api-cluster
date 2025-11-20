<template>
  <v-app>
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

const authStore = useAuthStore();

// 应用启动时初始化用户状态
onMounted(async () => {
  await authStore.initialize();
});
</script>
