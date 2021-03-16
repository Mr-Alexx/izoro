import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor (
    private readonly tagService: TagService
  ) {}

  @ApiOperation({ summary: '标签列表' })
  @Get()
  findAll (@Query() query): Promise<object> {
    return this.tagService.findAll(query)
  }

  @ApiOperation({ summary: '新增标签' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create (@Body() tag) {
    return this.tagService.create(tag)
  }

  @ApiOperation({ summary: '更新标签' })
  @Put()
  @UseGuards(JwtAuthGuard)
  updateById (@Body() tag) {
    return this.tagService.updateById(tag)
  }

  @ApiOperation({ summary: '删除标签' })
  @Delete()
  @UseGuards(JwtAuthGuard)
  delete (@Body() body) {
    const { ids } = body
    return this.tagService.delete(ids)
  }
}
