<template>
  <v-footer class="footer-main">
    <v-container>
      <v-row>
        <!-- Logo和描述 -->
        <v-col cols="12" md="4" class="footer-section">
          <div class="footer-logo mb-4">
            <v-img
              :src="logoGreen"
              alt="Natours 标志"
              height="40"
              width="auto"
              class="logo-img"
            ></v-img>
          </div>
          <p class="footer-description text-body-2">
            探索世界，发现自然之美。Natours为您提供最优质的户外旅游体验，
            让每一次旅行都成为难忘的回忆。
          </p>
          <div class="social-links mt-4">
            <v-btn
              v-for="social in socialLinks"
              :key="social.name"
              :icon="social.icon"
              variant="text"
              size="small"
              color="white"
              class="social-btn"
            ></v-btn>
          </div>
        </v-col>

        <!-- 导航链接 -->
        <v-col cols="12" md="4" class="footer-section">
          <h4 class="footer-heading mb-4">快速导航</h4>
          <div class="footer-nav">
            <router-link
              v-for="item in navItems"
              :key="item.text"
              :to="item.href"
              class="footer-nav-item"
            >
              <span class="nav-text text-body-2">
                {{ item.text }}
              </span>
            </router-link>
          </div>
        </v-col>

        <!-- 联系信息 -->
        <v-col cols="12" md="4" class="footer-section">
          <h4 class="footer-heading mb-4">联系我们</h4>
          <div class="contact-info">
            <div class="contact-item d-flex align-center mb-3">
              <v-icon size="18" color="white" class="mr-3"
                >mdi-map-marker</v-icon
              >
              <span class="text-body-2">123 自然大道, 旅游城市</span>
            </div>
            <div class="contact-item d-flex align-center mb-3">
              <v-icon size="18" color="white" class="mr-3">mdi-phone</v-icon>
              <span class="text-body-2">+86 123 4567 8900</span>
            </div>
            <div class="contact-item d-flex align-center mb-3">
              <v-icon size="18" color="white" class="mr-3">mdi-email</v-icon>
              <span class="text-body-2">info@natours.com</span>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- 版权信息 -->
      <v-divider class="my-6" color="rgba(255,255,255,0.2)"></v-divider>
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="auto" class="text-center text-md-left">
          <p class="copyright-text text-body-2">
            &copy; {{ currentYear }} Natours. 保留所有权利。
          </p>
        </v-col>
        <v-col cols="12" md="auto" class="text-center text-md-right">
          <p class="attribution-text text-body-2">
            设计灵感来自 Jonas Schmedtmann
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// Logo路径
const logoGreen = '/img/logo-green.png';

// 当前年份
const currentYear = computed(() => new Date().getFullYear());

// 导航项
const navItems = [
  { text: '所有旅游', href: '/' },
  { text: '关于我们', href: '/about' },
  { text: '联系我们', href: '/contact' },
];

// 社交媒体链接
const socialLinks = [
  { name: 'facebook', icon: 'mdi-facebook' },
  { name: 'twitter', icon: 'mdi-twitter' },
  { name: 'instagram', icon: 'mdi-instagram' },
  { name: 'youtube', icon: 'mdi-youtube' },
];
</script>

<style scoped>
.footer-main {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  color: white;
  padding: 60px 0 30px 0;
}

.footer-section {
  margin-bottom: 30px;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.logo-img {
  filter: brightness(0) invert(1);
  opacity: 0.9;
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 300px;
}

.footer-heading {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  padding-bottom: 8px;
}

.footer-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #4caf50, #81c784);
  border-radius: 2px;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-nav-item {
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.footer-nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.nav-text {
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
}

.footer-nav-item:hover .nav-text {
  color: white;
}

.footer-nav-item :deep(.v-list-item-title) {
  color: rgba(255, 255, 255, 0.8) !important;
  transition: color 0.3s ease;
}

.footer-nav-item:hover :deep(.v-list-item-title) {
  color: white !important;
}

.contact-info {
  color: rgba(255, 255, 255, 0.8);
}

.contact-item {
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateX(4px);
  color: white;
}

.social-links {
  display: flex;
  gap: 8px;
}

.social-btn {
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.copyright-text {
  color: rgba(255, 255, 255, 0.7);
}

.attribution-text {
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

@media (max-width: 960px) {
  .footer-main {
    padding: 40px 0 20px 0;
    text-align: center;
  }

  .footer-section {
    margin-bottom: 40px;
  }

  .footer-description {
    max-width: none;
    margin: 0 auto;
  }

  .footer-heading::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-links {
    justify-content: center;
  }

  .footer-nav {
    display: inline-block;
  }
}

@media (max-width: 600px) {
  .footer-main {
    padding: 30px 0 15px 0;
  }

  .footer-section {
    margin-bottom: 30px;
  }
}
</style>
