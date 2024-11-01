import { SortDirection } from 'mongodb';
import { MongoParser } from './utils';

export class QueryFilter implements QueryFilterProps {
  // relation: RelationKey;
  field: string;
  value: unknown;
  operator: OperatorKey;
  constructor(props: QueryFilterProps) {
    this.field = props.field;
    this.value = props.value;
    this.operator = props.operator || OperatorKey.eq;
    // this.relation = props.relation || RelationKey.and;
  }

  get toValue() {
    return MongoParser.toFilterValue(this.operator, this.value);
  }
}

export class Options {
  limit: number = -1;
  skip: number = -1;
  // 排序
  sort: Record<string, SortDirection> = {};
}

// export enum RelationKey {
//   and = 'AND',
//   or = 'OR',
// }

export enum OperatorKey {
  eq = '$eq',
  ne = '$ne',
  gt = '$gt',
  gte = '$gte',
  lt = '$lt',
  lte = '$lte',
  contain = '$elemMatch',
  include = '$in',
  fuzzy = 'BETWEEN', // 模糊查询
}

export interface QueryFilterProps {
  field: string;
  value: unknown;
  // relation?: RelationKey;
  operator?: OperatorKey;
}
