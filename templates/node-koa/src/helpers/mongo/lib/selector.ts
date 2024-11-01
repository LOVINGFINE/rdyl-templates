import { Collection, SortDirection } from 'mongodb';
import { OperatorKey, Options, QueryFilter, QueryFilterProps } from './meta';

/** @description 查询数据 */
export class MongoSelector {
  constructor(public $collection: Collection) {}
  filters: QueryFilter[] = [];
  options: Options = new Options();

  get _mapFilters() {
    return Object.fromEntries(
      this.filters.map((ele) => [ele.field, ele.toValue])
    );
  }

  async count() {
    const c = await this.$collection.countDocuments(this._mapFilters);
    return c;
  }

  pushFilter(...items: QueryFilterProps[]) {
    this.filters.push(...items.map((ele) => new QueryFilter(ele)));
  }

  /** @description 模糊查询 */
  fuzzy(keywords: string, fields: string[]) {
    if (keywords && fields.length > 0) {
      this.pushFilter(
        ...fields.map((field) => ({
          field,
          operator: OperatorKey.fuzzy,
          value: keywords,
        }))
      );
    }
    return this;
  }
  /** @description 等于 */
  eq(field: string, value: unknown) {
    this.pushFilter({
      field,
      value,
      operator: OperatorKey.eq,
    });
    return this;
  }
  /** @description 不等于 */
  ne(field: string, value: unknown) {
    this.pushFilter({
      field,
      value,
      operator: OperatorKey.ne,
    });
    return this;
  }
  /** @description 大于 */
  gt(field: string, value: unknown) {
    this.pushFilter({
      field,
      value,
      operator: OperatorKey.gt,
    });
    return this;
  }
  /** @description 大于等于 */
  gte(field: string, value: unknown) {
    this.pushFilter({
      field,
      value,
      operator: OperatorKey.gte,
    });
    return this;
  }
  /** @description 小于 */
  lt(field: string, value: unknown) {
    this.pushFilter({
      field,
      value,
      operator: OperatorKey.lt,
    });
    return this;
  }
  /** @description 小于等于 */
  lte(field: string, value: unknown) {
    this.pushFilter({
      field,
      value,
      operator: OperatorKey.lte,
    });
    return this;
  }
  /** @description 包含[字符匹配] */
  contain(field: string, value: unknown) {
    this.pushFilter({
      field,
      value,
      operator: OperatorKey.contain,
    });
    return this;
  }
  /** @description 包含[数组] */
  include(field: string, value: unknown[]) {
    this.pushFilter({
      field,
      value,
      operator: OperatorKey.include,
    });
    return this;
  }
  /** @description 排序 */
  sort(field: string, sort: SortDirection) {
    this.options.sort[field] = sort;
    return this;
  }
  /** @description 限制条数 */
  limit(n: number) {
    this.options.limit = n;
    return this;
  }
  /** @description 跳过几条 */
  skip(s: number) {
    this.options.skip = s;
    return this;
  }
  /**
   * @查询结果
   * @param isSingle 是否查询单个
   */
  async result<T extends DbSchema>(isSingle?: false) {
    if (isSingle) {
      // 单个
      return await this.$collection.findOne<T>(this._mapFilters);
    }
    return await this.$collection
      .find<T>(this._mapFilters)
      .skip(this.options.skip)
      .limit(this.options.limit)
      .sort(this.options.sort)
      .toArray();
  }
}

/** @description 插入数据 */
export class MongoInserter {
  constructor(public $collection: Collection) {}
  values: Record<string, unknown>[] = [];
  /** 加入数据 */
  push(...list: Record<string, unknown>[]) {
    this.values.push(...list);
    return this;
  }
  // 插入数据
  async result() {
    return await this.$collection.insertMany(this.values);
  }
}

/** @description 更新数据 */
export class MongoUpdater extends MongoSelector {
  constructor(public $collection: Collection) {
    super($collection);
  }
  updateMap: Record<string, unknown> = {};
  $set(field: string, value: unknown) {
    this.updateMap[field] = value;
    return this;
  }
  // 更新数据
  async update() {
    return await this.$collection.updateMany(this._mapFilters, this.updateMap);
  }
}

/** @description 删除数据 */
export class MongoDeleter extends MongoSelector {
  constructor(public $collection: Collection) {
    super($collection);
  }
  // 更新数据
  async remove() {
    return await this.$collection.deleteMany(this._mapFilters);
  }
}
