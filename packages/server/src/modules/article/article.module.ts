import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { RedisModule } from 'nestjs-redis'
import redisConfig from '@/config/redis.config';
import { CacheService } from './cache.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    RedisModule.register(redisConfig),
    TypeOrmModule.forFeature([Article]),
    CategoryModule,
    TagModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService, CacheService],
  exports: [ArticleService]
})
export class ArticleModule {}
