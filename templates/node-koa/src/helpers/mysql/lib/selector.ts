import { SortKey, Condition, ConditionProps, Options } from './meta';
import { MysqlParser } from './utils';

/** @description 查询数据 */
export class MysqlSelector {
  constructor(public _tableName: string) {}
  conditions: Condition[] = [];
  options: Options = new Options();

  get sql() {
    const { conditions, options } = this;
    if (conditions.length === 0) {
      return '';
    }
    let target = 'SELECT * FROM $tableName\n';
    conditions.forEach((ele) => {
      target = ele.connect(target);
    });
    return `${target}\n${options.result};`;
  }

  select(opts: ConditionProps) {
    this.conditions.push(new Condition(opts));
    return this;
  }

  limit(n: number) {
    this.options.limit = n;
    return this;
  }

  skip(n: number) {
    this.options.skip = n;
    return this;
  }

  sort(field: string, v: SortKey) {
    this.options.sort[field] = v;
    return this;
  }

  /** @查询结果 */
  async result() {
    try {
    } catch {}
  }
}

/** @description 插入数据 */
export class MysqlInserter {
  constructor(public _tableName: string) {}
  fields: string[] = [];
  values: Array<Record<string, unknown>> = [];

  get #fieldSql() {
    return `(${this.fields.join(', ')})`;
  }

  get #valueSql() {
    const items: string[] = [];
    this.values.forEach((item) => {
      const list = this.fields.map((k) => item[k] || '');
      items.push(MysqlParser.toValuesOf(list));
    });
    return items.join(',\n');
  }

  get sql() {
    let target = 'INSERT INTO $tableName';
    target += this.#fieldSql;
    if (!this.#valueSql) {
      return `${target}\nVALUES\n${this.#valueSql};`;
    }
    return '';
  }

  push(...list: Record<string, unknown>[]) {
    if (list.length > 0) {
      Object.keys(list[0]).forEach((k) => {
        if (!this.fields.includes(k)) {
          this.fields.push(k);
        }
      });
    }
    this.values.push(...list);
  }

  // 插入数据
  async result() {
    return;
  }
}

/** @description 更新数据 */
export class MysqlUpdater {
  constructor(public _tableName: string) {}
}

/** @description 删除数据 */
export class MysqlDeleter {
  constructor(public _tableName: string) {}
}
