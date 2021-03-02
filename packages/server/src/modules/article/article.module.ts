import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { getModelForClass } from '@typegoose/typegoose';
import { Article } from './article.model';

@Module({
  imports: [getModelForClass(Article)], // 注册model
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {
  constructor () {
    console.log(this)
  }
}
