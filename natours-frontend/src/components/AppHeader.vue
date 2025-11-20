<template>
  <v-app-bar app elevation="4" class="header-nav">
    <v-container class="d-flex align-center pa-0">
      <!-- Logo and Brand -->
      <router-link to="/" class="d-flex align-center text-decoration-none mr-8">
        <v-img
          :src="logo"
          alt="Natours Logo"
          height="45"
          width="45"
          class="logo-img"
        ></v-img>
        <span
          class="brand-text ml-2 text-h6 font-weight-bold text-green-darken-4"
          >Natours</span
        >
      </router-link>

      <!-- Desktop Navigation -->
      <div class="d-none d-lg-flex align-center navigation-links">
        <v-btn
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          variant="text"
          class="nav-btn text-green-darken-4 mx-1"
          size="large"
        >
          <v-icon v-if="item.icon" :icon="item.icon" class="mr-1"></v-icon>
          {{ item.title }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- User Menu / Auth Buttons -->
      <div class="d-flex align-center">
        <v-menu v-if="user" offset-y min-width="200">
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              v-bind="props"
              class="user-menu-btn text-green-darken-4"
              size="large"
            >
              <v-avatar size="36" class="mr-2">
                <v-img
                  :src="getUserPhotoUrl(user.photo || 'default.jpg')"
                  alt="User Avatar"
                  class="avatar-img"
                ></v-img>
              </v-avatar>
              <span class="user-name">{{ user.name }}</span>
              <v-icon icon="mdi-chevron-down" class="ml-1"></v-icon>
            </v-btn>
          </template>
          <v-list class="user-dropdown">
            <v-list-item :to="'/account'" class="dropdown-item">
              <template v-slot:prepend>
                <v-icon icon="mdi-account"></v-icon>
              </template>
              <v-list-item-title>我的账户</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout" class="dropdown-item">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout"></v-icon>
              </template>
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <template v-else>
          <v-btn
            :to="'/login'"
            variant="text"
            color="green-darken-4"
            class="auth-btn mx-1"
            size="large"
          >
            登录
          </v-btn>
          <v-btn
            :to="'/signup'"
            color="green-darken-4"
            class="auth-btn-signup mx-1"
            size="large"
          >
            注册
          </v-btn>
        </template>

        <!-- Mobile Menu Button -->
        <v-app-bar-nav-icon
          @click="toggleDrawer"
          class="d-lg-none ml-2"
          size="small"
        ></v-app-bar-nav-icon>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="right" width="280">
    <v-list class="mobile-nav">
      <v-list-subheader class="text-h6 font-weight-bold pa-4">
        菜单
      </v-list-subheader>
      <v-divider></v-divider>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        @click="drawer = false"
        class="mobile-nav-item"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title class="text-body-1">{{
          item.title
        }}</v-list-item-title>
      </v-list-item>

      <template v-if="!user">
        <v-divider class="my-2"></v-divider>
        <v-list-item
          :to="'/login'"
          @click="drawer = false"
          class="mobile-nav-item"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-login"></v-icon>
          </template>
          <v-list-item-title class="text-body-1">登录</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="'/signup'"
          @click="drawer = false"
          class="mobile-nav-item"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-account-plus"></v-icon>
          </template>
          <v-list-item-title class="text-body-1">注册</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import logo from '/favicon.png';

const authStore = useAuthStore();
const drawer = ref(false);

const user = computed(() => authStore.user);

// 获取用户头像URL（后端返回的 photo 包含 'default.jpg' 或具体的用户头像文件名）
const getUserPhotoUrl = (photo: string) => {
  return `${import.meta.env.BASE_URL}img/users/${photo}`;
};

const navItems = [
  { title: '所有旅游', to: '/', icon: 'mdi-map-marker' },
  { title: '关于我们', to: '/about', icon: 'mdi-information' },
  { title: '联系我们', to: '/contact', icon: 'mdi-email' },
];

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const logout = () => {
  authStore.logout();
  drawer.value = false;
};
</script>

<style scoped>
.header-nav {
  background: white !important;
  border-bottom: 1px solid #e0e0e0;
}

.logo-img {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.brand-text {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}

.nav-btn {
  font-weight: 600;
  letter-spacing: 0.3px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-1px);
}

.user-menu-btn {
  border-radius: 25px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.user-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.avatar-img {
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.user-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.auth-btn {
  font-weight: 600;
  border-radius: 8px;
}

.auth-btn-signup {
  font-weight: 600;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.auth-btn-signup:hover {
  background-color: rgba(255, 255, 255, 0.3) !important;
}

.user-dropdown {
  border-radius: 12px;
  overflow: hidden;
}

.dropdown-item {
  min-height: 48px;
}

.mobile-nav {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.mobile-nav-item {
  border-radius: 0;
  margin: 2px 8px;
}

.mobile-nav-item:hover {
  background-color: rgba(33, 150, 243, 0.1);
}

@media (max-width: 600px) {
  .brand-text {
    font-size: 1.1rem !important;
  }

  .logo-img {
    height: 35px !important;
    width: 35px !important;
  }
}
</style>
