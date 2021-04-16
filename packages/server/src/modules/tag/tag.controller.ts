/** @format */

import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { Tag } from './tag.entity'
import { TagService } from './tag.service'

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '标签列表' })
  @Get()
  findAll(@Query() query: Record<string, any>): Promise<any> {
    return this.tagService.findAll(query)
  }

  @ApiOperation({ summary: '新增标签' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() tag: Partial<Tag>): Promise<any> {
    return this.tagService.create(tag)
  }

  @ApiOperation({ summary: '更新标签' })
  @Put()
  @UseGuards(JwtAuthGuard)
  updateById(@Body() tag: Record<string, any>): Promise<any> {
    return this.tagService.updateById(tag)
  }

  @ApiOperation({ summary: '删除标签' })
  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Body() body: Record<string, any>): Promise<any> {
    const { ids } = body
    return this.tagService.delete(ids)
  }
}
