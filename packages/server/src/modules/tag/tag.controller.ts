import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionGuard } from '@/guards/permission.guard';
import { TagCreateDto, TagDeleteDto, TagEditDto } from './tag.dto';

@UseGuards(PermissionGuard)
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '标签列表' })
  @Get()
  findAll(): Promise<any> {
    return this.tagService.findAll();
  }

  @ApiOperation({ summary: '新增标签' })
  @Post()
  @Permission('tag:add')
  @UseGuards(JwtAuthGuard)
  create(@Body() tag: TagCreateDto): Promise<any> {
    return this.tagService.create(tag);
  }

  @ApiOperation({ summary: '更新标签' })
  @Patch()
  @Permission('tag:edit')
  @UseGuards(JwtAuthGuard)
  updateById(@Body() tag: TagEditDto): Promise<any> {
    return this.tagService.updateById(tag);
  }

  @ApiOperation({ summary: '删除标签' })
  @Delete()
  @Permission('tag:del')
  @UseGuards(JwtAuthGuard)
  delete(@Body() body: TagDeleteDto): Promise<any> {
    const { ids } = body;
    return this.tagService.delete(ids);
  }
}
