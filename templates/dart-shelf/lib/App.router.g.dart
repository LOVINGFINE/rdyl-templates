// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AppControllerGenerator
// **************************************************************************

import 'package:shelf_router/shelf_router.dart';
import 'package:dart_shelf/controllers/sign/login.dart';
import 'package:dart_shelf/controllers/sign/main.dart';
import 'package:dart_shelf/controllers/sign/register.dart';

// 白名单
List<String> $Whitelist = [
  '/api/login/send-email',
  '/api/login',
  '/api/register/send-email',
  '/api/register'
];

Router $AppRouter() {
  Router router = Router();
  router.post('/api/login/send-email', (req) async {
    LoginController instance = LoginController(req);
    return await instance.handler(instance.sendEmail, public: true);
  });

  router.post('/api/login', (req) async {
    LoginController instance = LoginController(req);
    return await instance.handler(instance.login, public: true);
  });

  router.post('/api/my-info', (req) async {
    SignController instance = SignController(req);
    return await instance.handler(instance.register, public: false);
  });

  router.post('/api/register/send-email', (req) async {
    RegisterController instance = RegisterController(req);
    return await instance.handler(instance.sendEmail, public: true);
  });

  router.post('/api/register', (req) async {
    RegisterController instance = RegisterController(req);
    return await instance.handler(instance.register, public: true);
  });

  return router;
}
