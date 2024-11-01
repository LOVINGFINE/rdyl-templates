import 'package:dio/dio.dart';

class Request {
  Dio dio = Dio();

  Request({required String baseURL}) {
    dio.options.baseUrl = baseURL;
    // dio.options.sendTimeout = Duration(seconds: 30);
    //  dio.options.connectTimeout = Duration(seconds: 30);
  }

  fetch(
    String url, {
    String method = 'get',
    dynamic data,
    Map<String, dynamic>? params,
    Map<String, dynamic>? headers,
    ResponseType? responseType,
    String? contentType,
  }) async {
    var options = RequestOptions(
        path: url,
        queryParameters: params,
        data: data,
        headers: headers,
        contentType: contentType,
        responseType: responseType);
    var res = await dio.fetch(options);
    return res.data;
  }
}
