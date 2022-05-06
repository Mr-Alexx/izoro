import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), CategoryModule, TagModule, CacheModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
