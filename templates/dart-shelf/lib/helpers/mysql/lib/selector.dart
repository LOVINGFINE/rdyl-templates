import 'package:dart_shelf/App.config.dart';
import 'package:dart_shelf/helpers/mysql/main.dart';
import 'package:mysql_client/mysql_client.dart';
import 'meta.dart';

// INSERT
class MysqlInserter {
  String tableName;
  MysqlInserter(this.tableName);
  List<String> names = [];
  List<Map<String, dynamic>> values = [];

  String get nameSql {
    return '(${names.join(', ')})';
  }

  String get valueSql {
    List<String> valueItems = [];
    for (Map<String, dynamic> item in values) {
      List<String> list = [];
      for (String k in names) {
        list.add(item[k]);
      }
      valueItems.add(MetaUtil.valuesLinkTo(list));
    }
    return valueItems.join(',\n');
  }

  get sql {
    String target = 'INSERT INTO $tableName';
    target += nameSql;
    if (values.isEmpty) {
      return '';
    }
    target += '\nVALUES\n';
    target += valueSql;
    return '$target;';
  }

  push(Map<String, dynamic> data) {
    for (var i = 0; i < data.keys.length; i++) {
      String k = data.keys.elementAt(i);
      if (!names.contains(k)) {
        names.add(k);
      }
    }
    values.add(data);
  }

  /// 插入数据
  Future<IResultSet> result() async {
    return await MysqlHelper.pool.execute(sql);
  }
}

// SELECT
class MysqlSelector {
  String tableName;
  List<SqlCondition> conditions = [];
  SqlOptions options = SqlOptions();
  MysqlSelector(this.tableName);

  conditionToSql(List<SqlCondition> list) {
    String target = '';
    for (SqlCondition ele in list) {
      target = ele.link(target);
    }
    return '$target\n';
  }

  get sql {
    if (conditions.isEmpty) {
      return '';
    }
    String target = 'SELECT * FROM $tableName\n';
    target += MetaUtil.conditionToSql(conditions);
    target += options.sql;
    return '$target;';
  }

  MysqlSelector select(String field, dynamic value, Condition condition,
      {RelationKey relation = RelationKey.AND}) {
    conditions.add(
        SqlCondition(field, value, condition: condition, relation: relation));
    return this;
  }

  MysqlSelector limit(int n) {
    options.limit = n;
    return this;
  }

  MysqlSelector skip(int n) {
    options.skip = n;
    return this;
  }

  MysqlSelector order(String field, OrderKey value) {
    options.order[field] = value;
    return this;
  }
}

// UPDATE
class MysqlUpdater {
  String tableName;
  MysqlUpdater(this.tableName);

  get sql {
    String target = 'SELECT * FROM $tableName';
    return target;
  }
}

// INSERT
class MysqlDeleter {
  String tableName;
  MysqlDeleter(this.tableName);

  get sql {
    String target = 'SELECT * FROM $tableName';
    return target;
  }
}
