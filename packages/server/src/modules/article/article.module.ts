import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { RedisModule } from 'nestjs-redis'
import redisConfig from '@/config/redis.config';

@Module({
  imports: [
    RedisModule.register(redisConfig)
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
