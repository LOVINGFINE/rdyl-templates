import 'dart:mirrors';

import 'package:dart_shelf/helpers/mysql/main.dart';
import 'package:dart_shelf/utils/easy_date.dart';

class Paged<T> {
  int page;
  int pageSize;
  List<T> records = [];
  int total = 0;

  Paged({required this.page, required this.pageSize});

  get toJson {
    return {
      'total': total,
      'page': page,
      'pageSize': pageSize,
      'records': records
    };
  }
}

class DbSchema {
  String $tableName = '';
  late int id;
  late DateTime createTime;
  late DateTime updateTime;

  DbSchema(this.$tableName,
      {this.id = 0, DateTime? createTime, DateTime? updateTime}) {
    this.createTime = createTime ?? DateTime.now();
    this.updateTime = updateTime ?? DateTime.now();
  }

  Map<String, dynamic> $merge(
      [Map<String, dynamic>? map1, Map<String, dynamic>? map2]) {
    Map<String, dynamic> target = {
      'id': id,
      'createTime': EasyDate(date: createTime).format(),
      'updateTime': EasyDate(date: updateTime).format(),
    };
    if (map1 != null) {
      target.addAll(map1);
    }
    if (map2 != null) {
      target.addAll(map2);
    }
    return target;
  }

  Map<String, dynamic> get toMap {
    return $merge({});
  }

  Map<String, dynamic> get toDbMap {
    return $merge({});
  }

  $setProperty(String name, dynamic value) {
    var mirror = reflect(this);
    var v = mirror.getField(Symbol(name));
    if (v is bool) {
      mirror.setField(
          Symbol(name), value == 0 || value == false ? false : true);
    } else if (v is DateTime) {
      mirror.setField(Symbol(name), DateTime(value));
    } else {
      mirror.setField(Symbol(name), value);
    }
  }

  insert() async {
    var data = toDbMap;
    data.remove('id');
    MysqlInserter inserter = MysqlInserter($tableName);
    inserter.push(data);
    var res = await inserter.result();
    print(res);
  }
}
