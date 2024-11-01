// ignore_for_file: file_names
import 'dart:convert';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf_static/shelf_static.dart';
import 'package:shelf_cors_headers/shelf_cors_headers.dart';
import 'package:dart_shelf/middleware/controller/lib/meta.dart';
import 'package:dart_shelf/utils/easy_date.dart';
import 'App.router.g.dart';
import 'App.config.dart';

@AppController()
class App {
  List<String> whitelist = $Whitelist;

  Router router = $AppRouter();

  Middleware get static {
    return (Handler handler) {
      return (Request request) async {
        var static = createStaticHandler('public');
        if (request.url.path.contains('public/')) {
          var newReq = request.change(
              path: request.url.path.replaceFirst('public/', ''));
          print(newReq);
          return await static(newReq);
        }
        return await handler(request);
      };
    };
  }

  Middleware get bodyParser {
    return (Handler handler) {
      return (Request request) async {
        var contentType = request.headers['content-type'];
        var ctx = await request.readAsString();
        dynamic body = ctx;
        if (contentType == 'application/json') {
          try {
            body = jsonDecode(ctx);
          } catch (e) {
            body = {};
          }
        }
        return await handler(request.change(context: {'_body': body}));
      };
    };
  }

  run() async {
    var pipeline = const Pipeline()
        .addMiddleware(logRequests())
        .addMiddleware(corsHeaders())
        .addMiddleware(static)
        .addMiddleware(bodyParser)
        .addHandler(router);
    await shelf_io.serve(pipeline, AppConfig.iPv4, AppConfig.port);
    print(
        '[${EasyDate().format(EasyDate.full)}] http://${AppConfig.iPv4.host}:${AppConfig.port}');
  }
}
