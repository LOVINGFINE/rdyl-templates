import request from "@/utils/request";

const userApi = {
  /** @获取用户信息 */
  getUserInfo() {
    return request<UserInfo>({
      url: "/v1/users/user-info",
    });
  },
};

export default userApi;
