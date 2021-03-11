import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

  /**
   * @desc
   */
  @Get(':id')
  @ApiHeader({ name: 'token' })
  @ApiParam({ name: 'id', description: '用户id' })
  @UseGuards(JwtAuthGuard)
  GetInfo (@Param() id: number): Promise<User> {
    return this.userService.findById(id)
  }

  // @Get()
  // findAll (): Promise<any> {
  //   return this.userService.getUsers()
  // }

  @ApiOperation({ summary: '用户更新' })
  @ApiParam({ name: 'id', description: '用户id' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser (@Param('id') id: number, @Body() user: Partial<User>): Promise<any> {
    if (Object.keys(user).length === 0) {
      throw new HttpException('请填写要修改的用户信息！', HttpStatus.BAD_REQUEST)
    }
    return this.userService.updateById(id, user)
  }
}
