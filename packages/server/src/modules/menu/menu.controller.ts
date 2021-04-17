/**
 * @format
 * @description 菜单控制器
 * @module modules/menu/controller
 * @author 潜
 */

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { Menu } from './menu.entity'
import { MenuService } from './menu.service'

@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<any> {
    return Promise.resolve({
      total: 0,
      list: []
    })
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number): Promise<any> {
    console.log(id)
    return Promise.resolve({})
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Body() menu: Partial<Menu>): Promise<number> {
    return this.menuService.create(menu)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body('data') data: Partial<Menu>): Promise<string> {
    return Promise.resolve('更新成功')
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<string> {
    return Promise.resolve('删除成功')
  }
}
