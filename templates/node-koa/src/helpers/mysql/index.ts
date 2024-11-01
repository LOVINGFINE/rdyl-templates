import AppConfig from '@/App.config';
import mysql from 'mysql';

class MysqlHelper {
  static get mysqlPool() {
    const { host, port, user, password, database } = AppConfig.mysql;
    return mysql.createPool({
      host,
      port,
      database,
      user,
      password,
    });
  }
}

export * from './lib/selector';

export default MysqlHelper;
