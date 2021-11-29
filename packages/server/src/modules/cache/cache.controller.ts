import { Controller, UseGuards, HttpCode, HttpStatus, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionGuard } from '@/guards/permission.guard';
import { CacheService } from './cache.service';
import { CacheItem } from './cache.d';

@Controller('cache')
@ApiTags('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @ApiOperation({ summary: '新增缓存' })
  @Post()
  @ApiBody({ schema: { examples: [{ key: 'test', value: '测试', seconds: 20 }] } })
  @HttpCode(HttpStatus.CREATED)
  // @Permission('cache:add')
  // @UseGuards(PermissionGuard)
  // @UseGuards(JwtAuthGuard)
  async create(@Body() cache: CacheItem): Promise<any> {
    const { key, value, seconds } = cache;
    return this.cacheService.set(key, value, seconds);
  }

  @ApiOperation({ summary: '删除单个缓存' })
  @Delete(':key')
  @HttpCode(HttpStatus.CREATED)
  // @Permission('cache:del')
  // @UseGuards(PermissionGuard)
  // @UseGuards(JwtAuthGuard)
  async deleteCache(@Param('key') key: string): Promise<any> {
    return this.cacheService.del(key);
  }

  @ApiOperation({ summary: '删除所有缓存' })
  @Delete('clear')
  @HttpCode(HttpStatus.CREATED)
  // @Permission('cache:clear')
  // @UseGuards(PermissionGuard)
  // @UseGuards(JwtAuthGuard)
  async clearCache(): Promise<any> {
    return this.cacheService.clearAll();
  }
}
