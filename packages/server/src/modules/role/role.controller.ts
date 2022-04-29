/**
 * @description 角色控制器
 * @module modules/role/controller
 * @author 潜
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { PermissionGuard } from '@/guards/permission.guard';
import { Permission } from '@/decorators/permission.decorator';
import { RoleCreateDto, RoleDeleteDto, RoleQueryDto } from './role.dto';
import { RoleEditDto } from './role.dto';

@UseGuards(PermissionGuard)
@UseGuards(JwtAuthGuard)
@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '角色列表' })
  @Get()
  async findAll(@Query() query: RoleQueryDto): Promise<App.ListRes<Role[]>> {
    return this.roleService.findAll(query);
  }

  @ApiOperation({ summary: '获取指定角色' })
  async findByIds(@Query('ids') ids: any[]): Promise<any> {
    return this.roleService.findByIds(ids);
  }

  @ApiOperation({ summary: '创建角色' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() role: RoleCreateDto): Promise<number> {
    return this.roleService.create(role);
  }

  @ApiOperation({ summary: '更新角色' })
  @Patch()
  @Permission('role:edit')
  async update(@Body() role: RoleEditDto): Promise<any> {
    return this.roleService.updateById(role);
  }

  @ApiOperation({ summary: '删除角色' })
  @Delete()
  async delete(@Body() body: RoleDeleteDto): Promise<string> {
    const { ids } = body;
    return this.roleService.deleteById(ids);
  }

  @ApiOperation({ summary: '角色授权' })
  @Patch('authorize')
  async authorize(@Body() data: Record<string, any>): Promise<string> {
    // 授权
    return this.roleService.authorize(data);
  }
}
