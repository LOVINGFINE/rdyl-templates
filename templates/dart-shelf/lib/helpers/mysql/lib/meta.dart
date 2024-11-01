enum RelationKey { AND, OR }

enum OrderKey {
  ASC,
  DESC,
}

enum Condition {
  eq(value: '='),
  ne(value: '!='),
  gt(value: '>'),
  gte(value: '>='),
  lt(value: '<'),
  lte(value: '<='),
  like(value: 'LIKE'),
  include(value: 'IN'),
  area(value: 'BETWEEN'), // 范围
  not(value: '='); // 'NOT {name} = {value}'

  const Condition({required this.value});
  final String value;
}

class SqlCondition {
  RelationKey relation;
  String field;
  dynamic value;
  Condition condition;
  SqlCondition(this.field, this.value,
      {this.condition = Condition.eq, this.relation = RelationKey.AND});

  String get valueSql {
    String target = '';
    if (condition == Condition.include) {
      if (value is List && value.isNotEmpty) {
        target = MetaUtil.valuesLinkTo((value));
      }
    } else if (condition == Condition.area) {
      if (value is List && value.length > 1) {
        target = '${value[0]} AND ${value[1]}';
      }
    } else {
      target = '${MetaUtil.valueTypeOf(value)}';
    }
    return target;
  }

  String get sql {
    String target = '';
    if (valueSql.isNotEmpty) {
      if (condition == Condition.not) {
        target += 'NOT ';
      }
      target += '$field ${condition.value} $valueSql';
    }
    return target;
  }

  link(String prev) {
    if (prev.isEmpty) {
      return sql;
    }
    if (sql.isEmpty) {
      return prev;
    }
    return '$prev ${relation.name} $sql';
  }
}

class SqlOptions {
  int limit = 0;
  int skip = 0;
  // 排序
  Map<String, OrderKey> order = {};

  get sql {
    String target = '';
    if (order.isNotEmpty) {
      List<String> items = [];
      order.forEach((name, v) {
        items.add('$name ${v.name}');
      });
      target += 'ORDER BY ${items.join(', ')}';
    }
    if (limit > 0) {
      target += '\nLIMIT $limit OFFSET $skip';
    }
    return target;
  }
}

class MetaUtil {
  static valueTypeOf(dynamic v) {
    if (v is String) {
      return "'$v'";
    }
    return v;
  }

  static valuesLinkTo(List<dynamic> values) {
    List<dynamic> items = [];
    for (var v in values) {
      items.add(valueTypeOf(v));
    }
    return '(${items.join(', ')})';
  }

  static conditionToSql(List<SqlCondition> list) {
    String target = '';
    for (SqlCondition ele in list) {
      target = ele.link(target);
    }
    return '$target\n';
  }
}
