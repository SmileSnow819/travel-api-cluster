<template>
  <v-main class="bg-grey-lighten-4">
    <v-container class="user-view">
      <v-row>
        <!-- 侧边导航 -->
        <v-col cols="12" md="4">
          <v-card class="user-view-menu" elevation="2">
            <v-list class="side-nav">
              <v-list-item
                v-for="item in navItems"
                :key="item.text"
                :class="{ 'side-nav--active': item.active }"
                @click="setActiveNav(item)"
              >
                <template v-slot:prepend>
                  <v-icon>{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>

            <!-- 管理员导航 -->
            <div v-if="user?.role === 'admin'" class="admin-nav mt-8">
              <h5 class="admin-nav__heading">管理员</h5>
              <v-list class="side-nav">
                <v-list-item
                  v-for="item in adminNavItems"
                  :key="item.text"
                  @click="setActiveNav(item as NavItem)"
                >
                  <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                  </template>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-col>

        <!-- 主要内容 -->
        <v-col cols="12" md="8">
          <v-card class="user-view-content" elevation="2">
            <v-card-text>
              <!-- 账户设置 -->
              <div
                v-if="activeNav === 'settings'"
                class="user-view-form-container"
              >
                <h2 class="heading-secondary mb-4">您的账户设置</h2>

                <v-form @submit.prevent="updateUserData" class="mt-4">
                  <v-text-field
                    v-model="userData.name"
                    label="姓名"
                    type="text"
                    required
                    variant="outlined"
                    class="mb-4"
                  ></v-text-field>

                  <v-text-field
                    v-model="userData.email"
                    label="邮箱地址"
                    type="email"
                    required
                    variant="outlined"
                    class="mb-6"
                  ></v-text-field>

                  <div class="form-photo-upload d-flex align-center mb-6">
                    <v-avatar size="75" class="mr-4">
                      <v-img :src="userPhoto" alt="用户头像"></v-img>
                    </v-avatar>
                    <div>
                      <v-btn
                        color="green"
                        variant="outlined"
                        class="text-none"
                        @click="handlePhotoButtonClick"
                      >
                        选择新照片
                      </v-btn>
                      <input
                        ref="photoInput"
                        type="file"
                        accept="image/*"
                        style="display: none"
                        @change="handlePhotoButtonClick"
                      />
                    </div>
                  </div>

                  <div class="text-right">
                    <v-btn
                      type="submit"
                      color="green"
                      size="small"
                      class="text-none"
                      :loading="saving"
                    >
                      保存设置
                    </v-btn>
                  </div>
                </v-form>

                <v-divider class="my-8"></v-divider>

                <h2 class="heading-secondary mb-4">修改密码</h2>
                <v-form @submit.prevent="updatePassword" class="mt-4">
                  <v-text-field
                    v-model="passwordData.currentPassword"
                    label="当前密码"
                    type="password"
                    placeholder="••••••••"
                    required
                    variant="outlined"
                    class="mb-4"
                  ></v-text-field>

                  <v-text-field
                    v-model="passwordData.newPassword"
                    label="新密码"
                    type="password"
                    placeholder="••••••••"
                    required
                    variant="outlined"
                    class="mb-4"
                    :rules="[(v) => v.length >= 8 || '密码至少需要8个字符']"
                  ></v-text-field>

                  <v-text-field
                    v-model="passwordData.passwordConfirm"
                    label="确认密码"
                    type="password"
                    placeholder="••••••••"
                    required
                    variant="outlined"
                    class="mb-6"
                    :rules="[
                      (v) => v === passwordData.newPassword || '密码不匹配',
                    ]"
                  ></v-text-field>

                  <div class="text-right">
                    <v-btn
                      type="submit"
                      color="green"
                      size="small"
                      class="text-none"
                      :loading="changingPassword"
                    >
                      保存密码
                    </v-btn>
                  </div>
                </v-form>
              </div>

              <!-- 其他页面内容 -->
              <div v-else class="text-center pa-8">
                <v-icon size="64" color="grey" class="mb-4">mdi-cog</v-icon>
                <h3 class="text-h5 mb-2">{{ getActiveNavTitle() }}</h3>
                <p class="text-body-1 text-grey">此功能正在开发中</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

// 模拟用户数据
const user = ref({
  name: '张三',
  email: 'zhangsan@example.com',
  photo: 'user-1.jpg',
  role: 'user', // 可以改为 'admin' 来测试管理员功能
});

const activeNav = ref('settings');
const saving = ref(false);
const changingPassword = ref(false);

// 用户数据表单
const userData = ref({
  name: user.value.name,
  email: user.value.email,
});

// 密码数据表单
const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  passwordConfirm: '',
});

// 计算用户照片URL
const userPhoto = computed(() => {
  return `${import.meta.env.BASE_URL}img/users/${user.value.photo}`;
});

// 导航项
const navItems = ref([
  { text: '设置', icon: 'mdi-cog', active: true, key: 'settings' },
  { text: '我的预订', icon: 'mdi-briefcase', active: false, key: 'bookings' },
  { text: '我的评论', icon: 'mdi-star', active: false, key: 'reviews' },
  { text: '账单', icon: 'mdi-credit-card', active: false, key: 'billing' },
]);

// 管理员导航项
const adminNavItems = ref([
  { text: '管理旅游', icon: 'mdi-map', key: 'manage-tours' },
  { text: '管理用户', icon: 'mdi-account-group', key: 'manage-users' },
  { text: '管理评论', icon: 'mdi-star', key: 'manage-reviews' },
  { text: '管理预订', icon: 'mdi-briefcase', key: 'manage-bookings' },
]);

// 设置活动导航
interface NavItem {
  text: string;
  icon: string;
  active: boolean;
  key: string;
}

const setActiveNav = (item: NavItem) => {
  navItems.value.forEach((nav) => (nav.active = false));
  item.active = true;
  activeNav.value = item.key;
};

// 获取活动导航标题
const getActiveNavTitle = () => {
  const item = [...navItems.value, ...adminNavItems.value].find(
    (item) => item.key === activeNav.value
  );
  return item?.text || '页面';
};

// 更新用户数据
const updateUserData = async () => {
  try {
    saving.value = true;

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 实际项目中应该调用API
    // await fetch('http://localhost:8000/api/v1/users/updateMe', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(userData.value)
    // });

    console.log('更新用户数据:', userData.value);

    // 更新本地用户数据
    user.value.name = userData.value.name;
    user.value.email = userData.value.email;
  } catch (error) {
    console.error('更新用户数据失败:', error);
  } finally {
    saving.value = false;
  }
};

// 更新密码
const updatePassword = async () => {
  try {
    changingPassword.value = true;

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 实际项目中应该调用API
    // await fetch('http://localhost:8000/api/v1/users/updateMyPassword', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(passwordData.value)
    // });

    console.log('更新密码:', passwordData.value);

    // 清空密码表单
    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
    };
  } catch (error) {
    console.error('更新密码失败:', error);
  } finally {
    changingPassword.value = false;
  }
};

// 处理照片按钮点击
const handlePhotoButtonClick = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      console.log('上传照片:', file);
      // 实际项目中应该上传文件到服务器
    }
  };
  input.click();
};
</script>

<style scoped>
.user-view {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
}

.user-view-menu {
  background: linear-gradient(to right bottom, #7dd56f, #28b487);
  padding: 40px 0;
}

.user-view-content {
  padding: 70px 0;
}

.user-view-form-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 80px;
}

.side-nav {
  background: transparent;
}

.side-nav .v-list-item {
  color: white;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 400;
  padding: 10px 40px;
  border-left: 0 solid #fff;
  transition: all 0.3s;
}

.side-nav .v-list-item:hover,
.side-nav--active .v-list-item {
  border-left: 4px solid #fff !important;
  transform: translateX(-3px);
}

.side-nav .v-icon {
  margin-right: 20px;
  fill: #f7f7f7;
}

.admin-nav {
  margin-top: 55px;
}

.admin-nav__heading {
  margin: 0 50px 15px 40px;
  padding-bottom: 3px;
  font-size: 12px;
  text-transform: uppercase;
  color: #f2f2f2;
  border-bottom: 1px solid currentColor;
}

.heading-secondary {
  font-size: 2.25rem;
  text-transform: uppercase;
  font-weight: 700;
  background: linear-gradient(to right, #7dd56f, #28b487);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.1rem;
  line-height: 1.3;
  display: inline-block;
}

.form-photo-upload {
  font-size: 16px;
}

@media (max-width: 960px) {
  .user-view-form-container {
    padding: 0 20px;
  }
}
</style>
