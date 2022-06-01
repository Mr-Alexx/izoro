/**
 * @description 权限控制器
 * @module modules/permission/controller
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
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { PermissionService } from './permission.service';
import { PermissionGuard } from '@/guards/permission.guard';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionsType } from '@/interfaces/permission.interface';
import { PERMISSIONS } from '@/constants/permission.constant';
import { PermissionCreateDto, PermissionEditDto, PermissionQueryDto } from './permission.dto';

@Controller('permission')
@ApiTags('permission')
// @UseGuards(PermissionGuard)
// @UseGuards(JwtAuthGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @ApiOperation({ summary: '权限列表' })
  @Get()
  @Permission(PermissionsType.权限列表)
  async findAll(@Query() query: PermissionQueryDto): Promise<any> {
    return this.permissionService.findAll(query);
  }
  @ApiOperation({ summary: '创建权限' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Permission(PermissionsType.创建权限)
  async create(@Body() permission: PermissionCreateDto): Promise<number> {
    return this.permissionService.create(permission);
  }
  @ApiOperation({ summary: '编辑权限' })
  @Patch(':id')
  @Permission(PermissionsType.编辑权限)
  async update(@Body() permission: PermissionEditDto): Promise<any> {
    return this.permissionService.updateById(permission);
  }
  @ApiOperation({ summary: '删除权限' })
  @Delete(':id')
  @Permission(PermissionsType.删除权限)
  async delete(@Param('id') id: number): Promise<string> {
    return this.permissionService.softDeleteById(id);
  }
  @ApiOperation({ summary: '权限列表MAP' })
  @Get('permissions')
  async getPermissions(): Promise<{ value: string; label: string }[]> {
    return Object.keys(PERMISSIONS).map(key => ({ label: key, value: PERMISSIONS[key] }));
  }
}
