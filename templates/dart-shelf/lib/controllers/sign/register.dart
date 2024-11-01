import 'dart:math';

import 'package:dart_shelf/helpers/mailer/main.dart';
import 'package:dart_shelf/models/user.dart';
import 'package:shelf/shelf.dart';
import 'package:dart_shelf/middleware/controller/main.dart';

@Controller('register', public: true)
class RegisterController extends BasicController {
  RegisterController(Request request) : super(request);

  @Post('send-email')
  Future<Response> sendEmail() async {
    String email = body['email'] ?? "";
    RegisterVerify verify = RegisterVerify(email);
    String? sign = await verify.create(email);
    if (sign != null) {
      return response(200, data: sign);
    }
    return response(400, msg: '验证码发送失败!');
  }

  @Post('')
  register() async {
    String email = body['email'] ?? "";
    String sign = body['sign'] ?? "";
    String code = body['code'] ?? "";
    var stat = RegisterVerify.check(sign, email: email, code: code);
    if (stat == CheckStat.ok) {
      //通过验证
      var user = User.formJson({'email': email, 'password': "UNKNOWN"});
      await user.insert();
      return response(200);
    }
    return response(400, msg: '注册失败');
  }
}
