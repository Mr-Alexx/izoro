import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ArticleService } from './article.service'
// import { Article } from './article.model';
// import { Crud } from "nestjs-mongoose-crud";
import { ApiTags } from '@nestjs/swagger';

// @Crud({
//   model: Article // Article采用增删改查接口模式
// })
@Controller('article')
@ApiTags('文章模块')
export class ArticleController {
  // 注入service，this调用
  constructor (
    // @InjectModel(Article) private readonly model,
    private readonly articleService: ArticleService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query) {
    return this.articleService.findAll(query)
  }
}
