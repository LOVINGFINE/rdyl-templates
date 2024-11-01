import 'package:dart_shelf/middleware/controller/main.dart';
import 'package:shelf/shelf.dart';
import 'dart:convert';

typedef ResponseHandler = dynamic Function();

class BasicController {
  Request request;
  BasicController(this.request);

// ignore: non_constant_identifier_names
  String get AuthToken {
    return request.headers['Auth-Token'] ?? "";
  }

  dynamic get body {
    return request.context['_body'];
  }

  Map<String, String> get query {
    return request.url.queryParameters;
  }

  Map<String, String> get params {
    return request.url.queryParameters;
  }

  handler(ResponseHandler fn, {public = false}) async {
    try {
      if (!public) {
        JWTStat stat = JWTHelper.verify(AuthToken);
        if (stat == JWTStat.expired) {
          return response(401, msg: 'Token Expired');
        }
        if (stat == JWTStat.invalid) {
          return response(401, msg: 'Unauthorized');
        }
      }
      return await fn();
    } catch (e) {
      print(e);
      return response(500, msg: 'Service Exception');
    }
  }

  Response response(code,
      {data = '', Map<String, Object>? headers, String? msg = 'ok'}) {
    var body = json.encode({'code': code, 'msg': msg, 'data': data});
    return Response(code,
        body: body, headers: headers ?? {'content-type': 'application/json'});
  }
}
