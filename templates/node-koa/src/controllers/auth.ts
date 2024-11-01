import { BaseController, Controller, Post, Get } from '@/middleware/controller';

@Controller('')
class AuthController extends BaseController {
  @Post('login', true)
  login() {
    console.log(this.body);
    this.status.ok('hello world!');
  }

  @Get('myInfo')
  toTokenInfo() {
    this.status.ok('hello world!');
  }
}

export default AuthController;
