import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { getModelForClass } from '@typegoose/typegoose';
import { Article, ArticleProvider } from './article.model';

@Module({
  imports: [getModelForClass(Article)], // 注册model
  controllers: [ArticleController],
  providers: [ArticleProvider, ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
