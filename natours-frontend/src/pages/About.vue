<template>
  <v-container class="about-page">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <!-- Hero Section -->
        <v-card class="pa-6 mb-8" elevation="4" rounded="lg">
          <v-row align="center">
            <v-col cols="12" md="4" class="text-center">
              <v-img
                :src="logo"
                alt="Natours Logo"
                height="120"
                contain
                class="mb-4"
              ></v-img>
            </v-col>
            <v-col cols="12" md="8">
              <h1 class="text-h4 font-weight-bold text-green-darken-4 mb-4">
                关于 Natours
              </h1>
              <p class="text-body-1 text-grey-darken-2">
                探索世界，发现自然之美。Natours
                致力于为您提供最优质的户外探险体验。
              </p>
            </v-col>
          </v-row>
        </v-card>

        <!-- Mission Section -->
        <v-card class="pa-6 mb-6" elevation="2" rounded="lg">
          <h2 class="text-h5 font-weight-bold text-green-darken-4 mb-4">
            我们的使命
          </h2>
          <p class="text-body-1 text-grey-darken-2 mb-4">
            我们相信旅行不仅仅是到达目的地，更是关于沿途的发现、成长和连接。Natours
            致力于创造难忘的户外体验，让每个人都能亲近自然，感受世界的壮丽。
          </p>
          <v-row>
            <v-col cols="12" sm="4" class="text-center">
              <v-icon size="48" color="green-darken-3" class="mb-2"
                >mdi-earth</v-icon
              >
              <h3 class="text-h6 font-weight-bold mb-2">全球覆盖</h3>
              <p class="text-caption text-grey">遍布全球的精选旅游路线</p>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-icon size="48" color="green-darken-3" class="mb-2"
                >mdi-shield-check</v-icon
              >
              <h3 class="text-h6 font-weight-bold mb-2">安全保障</h3>
              <p class="text-caption text-grey">专业导游和完备的安全措施</p>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-icon size="48" color="green-darken-3" class="mb-2"
                >mdi-heart</v-icon
              >
              <h3 class="text-h6 font-weight-bold mb-2">可持续旅游</h3>
              <p class="text-caption text-grey">保护环境，支持当地社区</p>
            </v-col>
          </v-row>
        </v-card>

        <!-- Team Section -->
        <v-card class="pa-6" elevation="2" rounded="lg">
          <h2 class="text-h5 font-weight-bold text-green-darken-4 mb-4">
            我们的团队
          </h2>
          <p class="text-body-1 text-grey-darken-2 mb-4">
            Natours
            由一群热爱自然、经验丰富的旅行专家创立。我们的团队包括专业导游、户外运动教练和当地文化专家，致力于为您提供最优质的旅行体验。
          </p>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card variant="outlined" class="pa-4 text-center">
                <v-avatar size="80" color="green-lighten-4" class="mb-3">
                  <v-icon size="40" color="green-darken-3">mdi-account</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-2">专业导游</h3>
                <p class="text-caption text-grey">持证上岗，经验丰富</p>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card variant="outlined" class="pa-4 text-center">
                <v-avatar size="80" color="green-lighten-4" class="mb-3">
                  <v-icon size="40" color="green-darken-3"
                    >mdi-medical-bag</v-icon
                  >
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-2">安全团队</h3>
                <p class="text-caption text-grey">急救认证，安全保障</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import logo from '/img/logo-green.png';
// 页面逻辑可以在这里添加
</script>

<style scoped>
.about-page {
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
