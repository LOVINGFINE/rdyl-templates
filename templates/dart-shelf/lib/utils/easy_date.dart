class EasyDate {
  static final String full = 'YYYY-MM-dd HH:mm:ss';
  static String date = 'YYYY-MM-dd';
  static String time = 'HH:mm:ss';

  DateTime dateTime = DateTime.now();
  // 构造函数
  EasyDate({date}) {
    if (date is String) {
      dateTime = DateTime.parse(date);
    }
    if (date is DateTime) {
      dateTime = date;
    }
  }

  int get year {
    return dateTime.year;
  }

  int get month {
    return dateTime.month;
  }

  int get day {
    return dateTime.day;
  }

  int get hour {
    return dateTime.hour;
  }

  int get minute {
    return dateTime.minute;
  }

  int get second {
    return dateTime.second;
  }

  String format([String format = 'YYYY-MM-dd HH:mm:ss']) {
    return format
        .replaceAll('YYYY', year.toString())
        .replaceAll('MM', month > 9 ? month.toString() : '0${month.toString()}')
        .replaceAll('DD', day > 9 ? day.toString() : '0${day.toString()}')
        .replaceAll('dd', day.toString())
        .replaceAll('HH', hour > 9 ? hour.toString() : '0${hour.toString()}')
        .replaceAll('hh', hour.toString())
        .replaceAll(
            'mm', minute > 9 ? minute.toString() : '0${minute.toString()}')
        .replaceAll(
            'ss', second > 9 ? second.toString() : '0${second.toString()}');
  }
}
