/**
 * @format
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
  UseGuards
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { Menu } from './menu.entity'
import { MenuService } from './menu.service'
import { PermissionGuard } from '@/guards/permission.guard'
import { Permission } from '@/decorators/permission.decorator'

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '菜单列表' })
  @Get()
  @UseGuards(PermissionGuard)
  @Permission('menu:list')
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: undefined | Record<string, any>): Promise<any> {
    return this.menuService.getMenuTree(query)
  }

  @ApiOperation({ summary: '菜单详情' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number): Promise<any> {
    return this.menuService.findButtonsByMenuId(id)
  }

  @ApiOperation({ summary: '创建菜单' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(PermissionGuard)
  @Permission('menu:add')
  @UseGuards(JwtAuthGuard)
  async create(@Body() menu: Partial<Menu>): Promise<number> {
    return this.menuService.create(menu)
  }

  @ApiOperation({ summary: '更新菜单' })
  @Patch(':id')
  @UseGuards(PermissionGuard)
  @Permission('menu:edit')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() menu: Partial<Menu>): Promise<any> {
    return this.menuService.updateById(id, menu)
  }

  @ApiOperation({ summary: '移除菜单' })
  @Delete(':id')
  @UseGuards(PermissionGuard)
  @Permission('menu:del')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<string> {
    return this.menuService.softDeleteById(id)
  }
}
