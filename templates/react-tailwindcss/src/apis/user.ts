import request from "@/utils/request";

const userApi = {
  /** @登录 */
  login(data: LoginParam) {
    return request<AuthRes>({
      url: "/login",
      method: "post",
      data,
    });
  },
};

export default userApi;
