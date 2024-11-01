import 'package:dart_shelf/helpers/mailer/main.dart';
import 'package:shelf/shelf.dart';
import 'package:dart_shelf/middleware/controller/main.dart';

@Controller('login', public: true)
class LoginController extends BasicController {
  LoginController(Request request) : super(request);

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
  login() {
    return response(200, data: 'login');
  }
}
