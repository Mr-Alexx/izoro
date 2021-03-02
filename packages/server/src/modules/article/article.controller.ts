import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ArticleService } from './article.service'
import { InjectModel } from 'nestjs-typegoose';
import { Article } from './article.model';
import { Crud } from "nestjs-mongoose-crud";

@Controller('article')
export class ArticleController {
  // 注入service，this调用
  constructor (
    @InjectModel(Article) private readonly model,
    private readonly articleService: ArticleService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query) {
    return this.articleService.findAll(query)
  }
}
