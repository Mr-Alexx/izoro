import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Post()
  @ApiBody({ name: 'account', description: '账号', required: true, type: String, example: 'test@qq.com' })
  @ApiBody({ name: 'password', description: '密码', required: true, type: String, example: '2021-03-04 22:53:00' })
  @ApiBody({ name: 'role', description: '角色', required: true, type: Number, example: 1 })
  async register (@Body() user: User): Promise<User> {
    return this.userService.create(user)
  }
}
