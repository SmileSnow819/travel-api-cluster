import { createRouter, createWebHistory } from 'vue-router/auto';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // 在GitHub Pages上总是滚动到顶部
    return { top: 0 };
  },
});

export default router;
