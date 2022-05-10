import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  /**
   * @description 存储
   * @param { string } key 键
   * @param { any } value 值
   * @param { number } seconds 可选过期时间，单位：秒
   */
  async set(key: string, value: any, ttl?: number): Promise<void> {
    // value = JSON.stringify(value);
    // const params = [key, value];
    await this.cacheManager.set(key, value, { ttl });
  }

  /**
   * @description 获取存储值
   * @param { string } key 键
   * @return { any }
   */
  async get(key: string): Promise<any> {
    const value = await this.cacheManager.get(key);
    if (!value) {
      return;
    }
    return value;
  }

  /**
   * @description 删除缓存
   * @param { string } key
   */
  async del(key: string): Promise<void> {
    const isExist = await this.cacheManager.get(key);
    if (!isExist) {
      return;
    }
    await this.cacheManager.del(key);
  }

  /**
   * @description 清除全部缓存
   */
  async clearAll(): Promise<any> {
    try {
      return await this.cacheManager.reset();
    } catch (error) {
      return error.message;
    }
  }
}
