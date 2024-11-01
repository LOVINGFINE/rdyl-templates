import { DbSchemaModel } from './common';
import { cloneDeep } from 'lodash';

export class User extends DbSchemaModel {
  username: string = '';
  nickname: string = '';
  password: string = '';
  email: string = '';
  phone: string = '';
  avatar: string = '';
  status: boolean = true;

  /** 返回用户信息 */
  get $toInfo() {
    const target = cloneDeep(this.$toMap);
    delete target.password;
    return target;
  }
}
