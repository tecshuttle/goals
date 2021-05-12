import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../Home.vue';
import About from '../About.vue';
import Todo from '../Todo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHistory('' /*process.env.BASE_URL*/),
  routes,
});

export default router;
