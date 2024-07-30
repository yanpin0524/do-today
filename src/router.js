import { createRouter, createWebHistory } from "vue-router";
import TodoList from "./pages/TodoList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/todos" },
    { path: "/todos", component: TodoList },
    // { path: "/auth/login", component: null },
    // { path: "/auth/signup", component: null },
  ],
});

export default router;
