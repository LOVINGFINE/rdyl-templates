import "./styles/index.less";
import { createApp } from "vue";
import { createPinia } from "pinia";
import persistedstate from "pinia-plugin-persistedstate";
import router from "@/router";
import App from "./App.vue";

const pinia = createPinia();
pinia.use(persistedstate);

export const root = createApp(App);

/** @路由 */
root.use(router);

/** @store */
root.use(pinia);

/** @挂载 */
root.mount("#root");
