import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CacheService {
  public client;
  constructor(private redisService: RedisService) {
    this.getClient();
  }
  async getClient(): Promise<void> {
    if (this.client) {
      return;
    }
    this.client = await this.redisService.getClient();
  }
  /**
   * @description 存储
   * @param { string } key 键
   * @param { any } value 值
   * @param { number } seconds 可选过期时间，单位：秒
   */
  async set(key: string, value: any, seconds?: number): Promise<void> {
    await this.getClient();

    value = JSON.stringify(value);
    const params = [key, value];
    seconds && params.push('EX', seconds);
    await this.client.set(...params);
  }

  /**
   * @description 获取存储值
   * @param { string } key 键
   * @return { any }
   */
  async get(key: string): Promise<any> {
    await this.getClient();

    const value = await this.client.get(key);
    if (!value) {
      return;
    }
    return JSON.parse(value);
  }

  /**
   * @description 删除缓存
   * @param { string } key
   */
  async del(key: string): Promise<void> {
    await this.getClient();
    const isExist = await this.client.get(key);
    if (!isExist) {
      return;
    }
    await this.client.del(key);
  }

  /**
   * @description 产出全部缓存
   */
  async clearAll(): Promise<any> {
    try {
      await this.client.flushall();
      return true;
    } catch (error) {
      return error.message;
    }
  }
}
