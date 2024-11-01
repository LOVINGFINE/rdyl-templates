import 'package:shelf/shelf.dart';
import 'package:dart_shelf/middleware/controller/main.dart';

@Controller('/')
class SignController extends BasicController {
  SignController(Request request) : super(request);

  @Post('my-info')
  register() {
    return response(200, data: 'my-info');
  }
}
