import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

interface Test {
  account: User['account'],
  password: User['password'],
  role: User['role']
}

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @ApiOperation({ summary: '用户注册' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register (@Body() user: Partial<User>): Promise<Object> {
    return this.userService.create(user)
  }

  // @Get()
  // findAll (): Promise<any> {
  //   return this.userService.getUsers()
  // }

  // @ApiOperation({ summary: '用户更新' })
  // @Put(':id')
  // async update (@Body() user: User): Promise<User> {

  // }
}
