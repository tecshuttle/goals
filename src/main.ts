import { createApp } from 'vue';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';

createApp(App).use(store).use(Antd).use(router).mount('#app');
