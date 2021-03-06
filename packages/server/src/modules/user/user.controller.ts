/** @format */

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request
} from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户注册' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: Partial<User>): Promise<any> {
    return this.userService.create(user)
  }

  /**
   * @desc 获取用户列表
   */
  @ApiOperation({ summary: '用户列表' })
  @Get()
  @ApiQuery({ name: 'page', description: '页码' })
  @ApiQuery({ name: 'limit', description: '每页条数' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: Record<string, any>): Promise<any> {
    return await this.userService.findAll(query)
  }

  /**
   * @desc 根据用户id获取用户信息
   */
  @ApiOperation({ summary: '用户个人信息' })
  @Get('info')
  @ApiHeader({ name: 'Authorization', description: 'bearer token' })
  @UseGuards(JwtAuthGuard)
  GetInfo(@Request() req: Record<string, any>): Promise<any> {
    return this.userService.findById(req.user.id)
  }

  @ApiOperation({ summary: '更新用户信息' })
  @ApiParam({ name: 'id', description: '用户id' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() user: Partial<User>): Promise<any> {
    if (Object.keys(user).length === 0) {
      throw new HttpException('请填写要修改的用户信息！', HttpStatus.BAD_REQUEST)
    }
    return this.userService.updateById(id, user)
  }
}
