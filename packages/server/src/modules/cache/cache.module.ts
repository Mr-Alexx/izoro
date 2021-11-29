import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import redisConfig from '@/config/redis.config';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';

@Module({
  imports: [RedisModule.register(redisConfig)],
  controllers: [CacheController],
  providers: [CacheService, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
