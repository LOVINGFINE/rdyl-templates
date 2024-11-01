interface UserInfo extends DbSchema {
  username: string;
  nickname: string;
  status: 0 | 1;
  avatar: string;
  email: string;
  phone: string;
}
