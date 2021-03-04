import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('标签模块')
@Controller('tag')
export class TagController {
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query) {
    return 'aaa'
  }
}
