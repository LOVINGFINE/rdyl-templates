import { BaseController, Controller, Get } from '@/middleware/controller';

@Controller('/users')
class UsersController extends BaseController {
  @Get('paged')
  getList() {
    this.status.ok('hello world!');
  }

  @Get(':id')
  getById() {
    this.status.ok('hello world!');
  }
}

export default UsersController;
