import { Controller, Get, Query } from '@nestjs/common';

@Controller('cache')
export class CacheController {
  constructor() {}

  @Get()
  get() {
    return {
      success: true,
      data: 'test',
    };
  }
}
