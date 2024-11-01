import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    meta: {
      title: "首页",
    },
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/exception",
    name: "exception",
    component: () => import("@/pages/exception.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/pages/exception.vue"),
  },
];

export default routes;
