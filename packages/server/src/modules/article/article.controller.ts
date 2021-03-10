import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ArticleService } from './article.service'
// import { Article } from './article.model';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PublicStatus, PublishStatus } from '@/interfaces/status.interface';

// @Crud({
//   model: Article // Article采用增删改查接口模式
// })
@Controller('article')
@ApiTags('Article')
export class ArticleController {
  // 注入service，this调用
  constructor (
    private readonly articleService: ArticleService
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
  findAll(@Query() query) {
    return this.articleService.findAll(query)
  }
}
