import { registerPlugins } from '@/plugins';
import App from './App.vue';
import { createApp } from 'vue';

// 导入全局样式
import './styles/natours.css';

const app = createApp(App);
registerPlugins(app);
app.mount('#app');
