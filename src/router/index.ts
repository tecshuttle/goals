import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../Home.vue";
import About from "../About.vue";
import Project from "../View/Project.vue";
import Category from "../View/Category.vue";
import ProjectForm from "../View/ProjectForm.vue";
import Today from "../View/Today.vue";
import TheWeek from "../View/TheWeek.vue";
import TheMonth from "../View/TheMonth.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
  },
  {
    path: "/project-form",
    name: "ProjectForm",
    component: ProjectForm,
  },
  {
    path: "/today",
    name: "Today",
    component: Today,
  },
  {
    path: "/the-week",
    name: "TheWeek",
    component: TheWeek,
  },
  {
    path: "/the-month",
    name: "TheMonth",
    component: TheMonth,
  },
];

const router = createRouter({
  history: createWebHistory("" /*process.env.BASE_URL*/),
  routes,
});

export default router;
