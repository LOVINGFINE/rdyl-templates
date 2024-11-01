import { OperatorKey } from './meta';

export class MongoParser {
  static toFilterValue(k: OperatorKey, v: unknown) {
    if (k === OperatorKey.fuzzy) {
      return {
        [k]: new RegExp('^.*' + v + '.*$'),
      };
    } else {
      return {
        [k]: v,
      };
    }
  }
}
