/**
 * @description 分类控制器
 * @module module/category/controller
 * @author 潜
 */

import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionGuard } from '@/guards/permission.guard';
import { CategoryCreateDto, CategoryEditDto } from './category.dto';

@UseGuards(PermissionGuard)
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '分类列表' })
  @Get()
  findAll(): Promise<any> {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: '新增分类' })
  @Post()
  @Permission('category:add')
  @UseGuards(JwtAuthGuard)
  create(@Body() category: CategoryCreateDto): Promise<any> {
    return this.categoryService.create(category);
  }

  @ApiOperation({ summary: '更新分类' })
  @Put()
  @Permission('category:edit')
  @UseGuards(JwtAuthGuard)
  updateById(@Body() category: CategoryEditDto): Promise<any> {
    return this.categoryService.updateById(category);
  }

  @ApiOperation({ summary: '删除分类' })
  @Delete()
  @Permission('category:del')
  @UseGuards(JwtAuthGuard)
  delete(@Body('ids') ids: number[]): Promise<any> {
    return this.categoryService.delete(ids);
  }
}
