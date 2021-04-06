import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CategoryService } from './category.service'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '分类列表' })
  @Get()
  findAll(@Query() query): Promise<object> {
    return this.categoryService.findAll(query)
  }

  @ApiOperation({ summary: '新增分类' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() category) {
    return this.categoryService.create(category)
  }

  @ApiOperation({ summary: '更新分类' })
  @Put()
  @UseGuards(JwtAuthGuard)
  updateById(@Body() category) {
    return this.categoryService.updateById(category)
  }

  @ApiOperation({ summary: '删除分类' })
  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Body() body) {
    const { ids } = body
    return this.categoryService.delete(ids)
  }
}
