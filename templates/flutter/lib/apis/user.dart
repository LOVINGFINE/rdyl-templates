import 'package:flutter/App.config.dart';

class UserApi {
  static login({required String username, required String password}) {
    return request('login',
        method: 'post', data: {'username': username, 'password': password});
  }

  static getMyInfo() {
    return request('my-info');
  }
}
