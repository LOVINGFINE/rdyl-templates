import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PATH as string),
  routes,
});

router.beforeEach((to, from, next) => {
  // 判断跳转路由是否需要
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;
