import { EasyDate } from '@/utils/dateTime';

/**
 * @description
 * 使用$toMap时 不返回的字段名前面需要加$
 */
export class DbSchemaModel implements DbSchema {
  id = '';
  createTime = EasyDate.now();
  updateTime = EasyDate.now();

  $formMap(json: Record<string, unknown>) {
    Object.keys(json).forEach((k) => {
      if (k === 'id' || k === '_id') {
        this.id = json[k] as string;
      } else {
        // @ts-ignore
        this[k] = json[k];
      }
    });
  }

  get $toMap() {
    return Object.keys(this).reduce((obj: any, key: string) => {
      if (
        !key.startsWith('$') &&
        Object.prototype.hasOwnProperty.call(this, key)
      ) {
        // @ts-ignore
        obj[key] = this[key];
      }
      return obj;
    }, {}) as Record<string, any>;
  }
}
