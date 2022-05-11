/**
 * @description 菜单控制器
 * @module modules/access/controller
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
import { AccessService } from './access.service';
import { PermissionGuard } from '@/guards/permission.guard';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionsType } from '@/interfaces/permission.interface';
import { PERMISSIONS } from '@/constants/permission.constant';
import { AccessCreateDto, AccessEditDto, AccessQueryDto } from './access.dto';

@Controller('access')
@ApiTags('access')
@UseGuards(PermissionGuard)
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuService: AccessService) {}

  @ApiOperation({ summary: '菜单列表' })
  @Get()
  @Permission(PermissionsType.菜单列表)
  async findAll(@Query() query: AccessQueryDto): Promise<any> {
    return this.menuService.getMenuTree(query);
  }

  @ApiOperation({ summary: '菜单详情' })
  @Get(':id')
  @Permission(PermissionsType.菜单详情)
  async findById(@Param('id') id: number): Promise<any> {
    return this.menuService.findButtonsByMenuId(id);
  }

  @ApiOperation({ summary: '创建菜单' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Permission(PermissionsType.创建菜单)
  async create(@Body() access: AccessCreateDto): Promise<number> {
    return this.menuService.create(access);
  }

  @ApiOperation({ summary: '编辑菜单' })
  @Patch(':id')
  @Permission(PermissionsType.编辑菜单)
  async update(@Body() access: AccessEditDto): Promise<any> {
    return this.menuService.updateById(access);
  }

  @ApiOperation({ summary: '删除菜单' })
  @Delete(':id')
  @Permission(PermissionsType.删除菜单)
  async delete(@Param('id') id: number): Promise<string> {
    return this.menuService.softDeleteById(id);
  }

  @ApiOperation({ summary: '权限列表MAP' })
  @Get('permissions')
  async getPermissions(): Promise<{ value: string; label: string }[]> {
    return Object.keys(PERMISSIONS).map(key => ({ label: key, value: PERMISSIONS[key] }));
  }
}
