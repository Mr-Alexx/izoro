import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ArticleService } from './article.service'

@Controller('article')
export class ArticleController {
  // 注入service，this调用
  constructor (
    private readonly articleService: ArticleService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query) {
    return this.articleService.findAll(query)
  }
}
