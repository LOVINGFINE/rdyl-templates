import { lazy } from "react";

export const routes: RouteOption[] = [
  {
    path: "/",
    name: "homepage",
    component: lazy(() => import("@/pages/homepage")),
  },
  {
    path: "/main",
    name: "main",
    redirect: "dashboard",
    component: lazy(() => import("@/pages/main")),
    routes: [
      {
        path: "dashboard",
        name: "dashboard",
        component: lazy(() => import("@/pages/main/dashboard")),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("@/pages/login")),
  },
  {
    path: "/exception",
    name: "exception",
    component: lazy(() => import("@/pages/exception")),
  },
  {
    path: "*",
    name: "not-found",
    component: lazy(() => import("@/pages/exception")),
  },
];
