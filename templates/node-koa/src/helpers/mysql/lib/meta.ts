import { MysqlParser } from './utils';

export class Condition {
  relation: RelationKey;
  field: string;
  value: unknown;
  condition: ConditionKey;
  constructor(props: ConditionProps) {
    this.field = props.field;
    this.value = props.value;
    this.condition = props.condition || ConditionKey.eq;
    this.relation = props.relation || RelationKey.and;
  }

  get #valueSql() {
    let target: string = '';
    const { condition, value } = this;
    if (condition == ConditionKey.include) {
      if (Array.isArray(value) && value.length > 0) {
        target = MysqlParser.toValuesOf(value);
      }
    } else if (condition == ConditionKey.area) {
      if (Array.isArray(value) && value.length > 0) {
        target = `${value[0]} AND ${value[1]}`;
      }
    } else {
      target = MysqlParser.valueTypeOf(value);
    }
    return target;
  }

  get result() {
    let target: string = '';
    const { condition, field } = this;
    if (this.#valueSql) {
      if (condition == ConditionKey.not) {
        target += 'NOT ';
      }
      target += `${field} ${condition} ${this.#valueSql}`;
    }
    return target;
  }

  connect(prev: string) {
    const { relation, result } = this;
    if (!prev) {
      return result;
    }
    if (!result) {
      return prev;
    }
    return `${prev} ${relation} ${result}`;
  }
}

export class Options {
  limit: number = 0;
  skip: number = 0;
  // 排序
  sort: Record<string, SortKey> = {};

  get result() {
    let target: string = '';
    const { sort, limit, skip } = this;
    if (Object.keys(sort).length > 0) {
      const items: string[] = [];
      Object.keys(sort).forEach((name, v) => {
        items.push(`${name} ${v}`);
      });
      target += `ORDER BY ${items.join('), ')}`;
    }
    if (limit > 0) {
      target += `\nLIMIT ${limit} OFFSET ${skip}`;
    }
    return target;
  }
}

export enum RelationKey {
  and = 'AND',
  or = 'OR',
}

export enum SortKey {
  asc = 'ASC',
  desc = 'DESC',
}

export enum ConditionKey {
  eq = '=',
  ne = '!=',
  gt = '>',
  gte = '>=',
  lt = '<',
  lte = '<=',
  like = 'LIKE',
  include = 'IN',
  area = 'BETWEEN', // 范围
  not = '=', // 'NOT {name} = {value}'
}

export interface ConditionProps {
  field: string;
  value: unknown;
  relation?: RelationKey;
  condition?: ConditionKey;
}
