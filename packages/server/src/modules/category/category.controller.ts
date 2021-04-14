/**
 * @format
 * @description 分类控制器
 * @module module/category/controller
 * @author 潜
 */

import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Category } from './category.entity'
import { CategoryService } from './category.service'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '分类列表' })
  @Get()
  findAll(@Query() query: { page: number; limit: number }): Promise<any> {
    return this.categoryService.findAll(query)
  }

  @ApiOperation({ summary: '新增分类' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() category: Partial<Category>): Promise<any> {
    return this.categoryService.create(category)
  }

  @ApiOperation({ summary: '更新分类' })
  @Put()
  @UseGuards(JwtAuthGuard)
  updateById(@Body() category: Partial<Category>): Promise<any> {
    return this.categoryService.updateById(category)
  }

  @ApiOperation({ summary: '删除分类' })
  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Body('ids') ids: number[]): Promise<any> {
    return this.categoryService.delete(ids)
  }
}
