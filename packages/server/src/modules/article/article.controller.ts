/** @format */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { ArticleService } from './article.service'
// import { Article } from './article.model';
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { PublishStatus } from '@/interfaces/status.interface'
import { CacheService } from './cache.service'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { Article } from './article.entity'

// @Crud({
//   model: Article // Article采用增删改查接口模式
// })
@Controller('article')
@ApiTags('Article')
export class ArticleController {
  // 注入service，this调用
  constructor(private readonly articleService: ArticleService, private readonly cacheService: CacheService) {}

  /**
   * @create 2021/03/04 21:48
   * @desc 获取文章列表
   * @author 潜
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'pulish_at_start',
    description: '发布开始时间',
    required: false,
    type: Date,
    example: '2021-03-04 22:53:00'
  })
  @ApiQuery({
    name: 'pulish_at_end',
    description: '发布结束时间',
    required: false,
    type: Date,
    example: '2021-03-04 22:53:00'
  })
  @ApiQuery({
    name: 'create_at_start',
    description: '创建开始时间',
    required: false,
    type: Date,
    example: '2021-03-04 22:53:00'
  })
  @ApiQuery({
    name: 'create_at_end',
    description: '创建结束时间',
    required: false,
    type: Date,
    example: '2021-03-04 22:53:00'
  })
  @ApiQuery({ name: 'tags', description: '标签id，多个用英文逗号分开', required: false, type: String, example: '1, 2' })
  @ApiQuery({ name: 'cid', description: '分类id', required: false, type: String, example: 1 })
  @ApiQuery({
    name: 'publish_status',
    description: '发布状态',
    required: false,
    enum: PublishStatus,
    example: PublishStatus.published
  })
  @ApiQuery({ name: 'keyword', description: '搜索关键词', required: false, type: String, example: '测试' })
  @ApiQuery({ name: 'limit', description: '每页条数', required: true, type: Number, example: 20 })
  @ApiQuery({ name: 'page', description: '页码', required: true, type: Number, example: 1 })
  async findAll(@Query() query: Record<string, any>): Promise<any> {
    return this.articleService.findAll(query)
  }

  /**
   * @description id查找
   */
  @Get(':id')
  findById(@Param('id') id: string): Promise<Article> {
    return this.articleService.findById(id)
  }

  /**
   * @description 创建
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Body() article: Partial<Article>): Promise<any> {
    return await this.articleService.create(article)
  }

  @Put('cache')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async cache(@Body() article: Article): Promise<any> {
    if (!article.id) {
      throw new HttpException('无法缓存该文章，文章id不存在！', HttpStatus.NOT_ACCEPTABLE)
    }
    try {
      await this.cacheService.set(`article:id:${article.id}`, article)
      return Promise.resolve('缓存成功')
    } catch (err) {
      throw new HttpException('缓存失败', HttpStatus.BAD_REQUEST)
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() article: Article): Promise<any> {
    return await this.articleService.update(id, article)
  }

  /**
   * @description 文章删除-软删
   */
  @Patch('delete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async recycleAll(@Body('ids') ids: string[]): Promise<any> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new HttpException('非法操作！ids数组不能为空！', HttpStatus.BAD_REQUEST)
    }
    return this.articleService.recycleAll(ids)
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteAll(@Body('ids') ids: string[]): Promise<any> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new HttpException('非法操作！ids数组不能为空！', HttpStatus.BAD_REQUEST)
    }
    return await this.articleService.deleteAll(ids)
  }
}
