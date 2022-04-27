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
  Request,
  Delete,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionGuard } from '@/guards/permission.guard';
import { UserCreateDto, UserQueryDto, UserEditDto } from './user.dto';
import { PERMISSIONS } from '@/constants/permission.constant';
import { User } from './user.entity';

@UseGuards(PermissionGuard)
@UseGuards(JwtAuthGuard)
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Permission(PERMISSIONS.创建用户)
  async register(@Body() user: UserCreateDto): Promise<number> {
    return this.userService.create(user);
  }

  /**
   * @desc 获取用户列表
   */
  @ApiOperation({ summary: '用户列表' })
  @Get()
  @Permission(PERMISSIONS.用户列表)
  async findAll(@Query() query: UserQueryDto): Promise<App.ListRes<User[]>> {
    return await this.userService.findAll(query);
  }

  /**
   * @desc 根据用户id获取用户信息
   */
  @ApiOperation({ summary: '用户个人信息' })
  @Get('info')
  @ApiHeader({ name: 'Authorization', description: 'bearer token' })
  @Permission(PERMISSIONS.用户详情)
  GetInfo(@Request() req: Record<string, any>): Promise<User> {
    return this.userService.findById(req.user.id);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Patch(':id')
  @Permission(PERMISSIONS.编辑用户)
  async updateUser(@Body() user: UserEditDto): Promise<User> {
    if (Object.keys(user).length === 0) {
      throw new HttpException('请填写要修改的用户信息！', HttpStatus.BAD_REQUEST);
    }
    return this.userService.updateById(user);
  }

  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  @Delete(':id')
  @Permission(PERMISSIONS.删除用户)
  async deleteUser(@Param('id') id: number): Promise<string> {
    return this.userService.deleteById(id);
  }
}
