import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { userApi } from "@/apis";

export const useAuthConnect = defineStore("AuthConnect", () => {
  const token = ref(AuthToken.get());
  const userInfo = ref<UserInfo>({} as UserInfo);

  const isLogin = computed(
    () => !!token.value && Object.keys(userInfo.value).length > 0
  );

  function refresh() {
    if (token.value) {
      userApi.getUserInfo().then(v => {
        userInfo.value = v;
      });
    }
  }

  watch(token, refresh);

  return {
    token,
    isLogin,
    userInfo,
    refresh,
  };
});

export const AuthToken = {
  name: btoa("Auth-Token").toUpperCase(),
  get() {
    return localStorage.getItem(AuthToken.name) || "";
  },
  set(k: string) {
    localStorage.setItem(AuthToken.name, k);
  },
  remove() {
    localStorage.removeItem(AuthToken.name);
  },
};
