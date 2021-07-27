/**
 * @description 菜单控制器
 * @module modules/menu/controller
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
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';
import { PermissionGuard } from '@/guards/permission.guard';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionsType } from '@/interfaces/permission.interface';

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '菜单列表' })
  @Get()
  @UseGuards(PermissionGuard)
  @Permission(PermissionsType.菜单列表)
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: undefined | Record<string, any>): Promise<any> {
    return this.menuService.getMenuTree(query);
  }

  @ApiOperation({ summary: '菜单详情' })
  @Get(':id')
  @Permission(PermissionsType.菜单详情)
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number): Promise<any> {
    return this.menuService.findButtonsByMenuId(id);
  }

  @ApiOperation({ summary: '创建菜单' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(PermissionGuard)
  @Permission(PermissionsType.创建菜单)
  @UseGuards(JwtAuthGuard)
  async create(@Body() menu: Partial<Menu>): Promise<number> {
    return this.menuService.create(menu);
  }

  @ApiOperation({ summary: '编辑菜单' })
  @Patch(':id')
  @UseGuards(PermissionGuard)
  @Permission(PermissionsType.编辑菜单)
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() menu: Partial<Menu>): Promise<any> {
    return this.menuService.updateById(id, menu);
  }

  @ApiOperation({ summary: '删除菜单' })
  @Delete(':id')
  @UseGuards(PermissionGuard)
  @Permission(PermissionsType.删除菜单)
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<string> {
    return this.menuService.softDeleteById(id);
  }
}
