import { createRouter, createWebHistory } from "vue-router";
import TodoList from "./pages/TodoList.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/todos" },
    { path: "/todos", component: TodoList },
    { path: "/auth/login", component: Login },
    { path: "/auth/signup", component: Signup },
  ],
});

export default router;
