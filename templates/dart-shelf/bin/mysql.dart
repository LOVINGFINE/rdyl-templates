import 'package:dart_shelf/helpers/mysql/main.dart';
import 'package:dart_shelf/models/user.dart';

void main() async {
  var user = User();
  await MysqlHelper.create([user]);
}
