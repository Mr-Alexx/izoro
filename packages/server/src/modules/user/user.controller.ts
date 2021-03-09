import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

interface Test {
  account: User['account'],
  password: User['password'],
  role: User['role']
}

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  // @ApiBody({ name: 'account', description: '账号', required: true, type: String, example: 'test@qq.com' })
  // @ApiBody({ name: 'password', description: '密码', required: true, type: String, example: '2021-03-04 22:53:00' })
  // @ApiBody({ name: 'role', description: '角色', required: true, type: Number, example: 1 })
  @ApiBody({ type: 'Test' })
  async register (@Body() user: User): Promise<Object> {
    return this.userService.create(user)
  }

  // @Get()
  // findAll (): Promise<any> {
  //   return this.userService.getUsers()
  // }
}
