import 'dart:mirrors';

import 'package:dart_shelf/App.config.dart';
import 'package:dart_shelf/models/common.dart';
import 'package:mysql_client/mysql_client.dart';

export 'lib/selector.dart';
export 'lib/meta.dart';

class MysqlHelper {
  //数据库连接池
  static final MySQLConnectionPool pool = MySQLConnectionPool(
    host: 'localhost',
    port: 3306,
    userName: 'root',
    password: '',
    maxConnections: 10,
    databaseName: AppConfig.name.toLowerCase(), // optional,
  );

  static create(List<DbSchema> schemaList) async {
    List<String> sqlList = [];
    for (var schema in schemaList) {
      var mirror = reflect(schema);
      List<String> items = ['id INT AUTO_INCREMENT PRIMARY KEY'];
      schema.toDbMap.forEach((k, v) {
        var value = mirror.getField(Symbol(k));
        if (k != 'id') {
          if (value is int) {
            items.add('$k INT');
          } else if (value is double) {
            items.add('$k DOUBLE');
          } else if (value is DateTime) {
            items.add('$k DATETIME');
          } else if (value is bool) {
            items.add('$k INT');
          } else {
            items.add('$k VARCHAR(255)');
          }
        }
      });
      sqlList.add('CREATE TABLE ${schema.$tableName} (${items.join(', ')});');
    }
    for (var sql in sqlList) {
      try {
        var res = await MysqlHelper.pool.execute(sql);
        print(res);
      } catch (e) {
        print(e);
      }
    }
  }
}
