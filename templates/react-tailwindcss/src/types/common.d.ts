interface DbSchema {
  id: string;
  createTime: string;
  updateTime: string;
}

interface ResData<T> {
  msg: string;
  code: number;
  data: T;
}

interface QueryPaged {
  page: number;
  pageSize: number;
}

interface PagedData<T> {
  total: number;
  page: number;
  pageSize: number;
  records: T[];
}
