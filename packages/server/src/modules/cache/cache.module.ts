import { Module, CacheModule as NestCacheModule } from '@nestjs/common';
import redisConfig from '@/config/redis.config';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    /**
     * cache模块
     * @see https://www.npmjs.com/package/cache-manager-redis-store
     * @see https://www.learmoreseekmore.com/2020/12/nestjs-redis-cache.html
     * @see https://www.zhangshengrong.com/p/Z9a23xlyNV/
     */
    NestCacheModule.register({
      ...redisConfig,
      store: redisStore,
    }),
  ],
  // imports: [RedisModule.register(redisConfig)],
  controllers: [CacheController],
  // providers: [CacheService],
  // exports: [CacheService],
})
export class CacheModule {}
