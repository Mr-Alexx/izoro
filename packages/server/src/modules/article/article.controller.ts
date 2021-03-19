import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service'
// import { Article } from './article.model';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PublicStatus, PublishStatus } from '@/interfaces/status.interface';
import { CacheService } from './cache.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Article } from './article.entity';

// @Crud({
//   model: Article // Article采用增删改查接口模式
// })
@Controller('article')
@ApiTags('Article')
export class ArticleController {
  // 注入service，this调用
  constructor (
    private readonly articleService: ArticleService,
    private readonly cacheService: CacheService
  ) {}

  /**
   * @create 2021/03/04 21:48
   * @desc 获取文章列表
   * @author 潜
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'pulish_at', description: '发布时间', required: false, type: Date, example: '2021-03-04 22:53:00' })
  @ApiQuery({ name: 'create_at', description: '创建时间', required: false, type: Date, example: '2021-03-04 22:53:00' })
  @ApiQuery({ name: 'public_status', description: '公开状态', required: false, enum: PublicStatus, example: PublicStatus.public })
  @ApiQuery({ name: 'publish_status', description: '发布状态', required: false, enum: PublishStatus, example: PublishStatus.published })
  @ApiQuery({ name: 'title', description: '标题', required: false, type: String, example: 'js' })
  @ApiQuery({ name: 'limit', description: '每页条数', required: true, type: Number, example: 20 })
  @ApiQuery({ name: 'page', description: '页码', required: true, type: Number, example: 1 })
  async findAll(@Query() query): Promise<any> {
    // return this.articleService.findAll(query)
    // const id = this.snowflake.getUniqueID()
    // console.log(id)
    return Promise.resolve('1')
  }

  /**
   * @description 创建
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Body() article: Article) {
    return await this.articleService.create(article)
  }

  @Put('cache')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async cache(@Body() article: Article) {
    if (!article.id) {
      throw new HttpException('无法缓存该文章，文章id不存在！', HttpStatus.NOT_ACCEPTABLE)
    }
    return await this.cacheService.set(article.id, article)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async update(@Body() article: Article) {
    if (!article.id) {
      throw new HttpException('无法保存该文章，文章id不存在！', HttpStatus.NOT_ACCEPTABLE)
    }
    return await this.articleService.update(article)
  }
}
