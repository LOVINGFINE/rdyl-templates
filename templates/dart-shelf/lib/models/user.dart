import 'package:dart_shelf/models/common.dart';

class User extends DbSchema {
  String username = '';
  String nickname = '';
  String password = 'UNKNOWN';
  String email = '';
  int status = 1;

  User() : super('users');

  int get isSetPassword {
    if (password == 'UNKNOWN') {
      return 0;
    }
    return 1;
  }

  @override
  Map<String, dynamic> get toDbMap {
    return $merge({
      'username': username,
      'nickname': nickname,
      'password': password,
      'email': email,
      'status': 1
    });
  }

  @override
  Map<String, dynamic> get toMap {
    return $merge(toDbMap, {'isSetPassword': isSetPassword});
  }

  static User formJson(Map<String, dynamic> json) {
    User user = User();
    json.forEach((name, value) {
      user.$setProperty(name, value);
    });
    return User();
  }
}
