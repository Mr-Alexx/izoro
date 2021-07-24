/**
 * @format
 * @description 角色控制器
 * @module modules/role/controller
 * @author 潜
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { Role } from './role.entity'
import { RoleService } from './role.service'
import { PermissionGuard } from '@/guards/permission.guard'
import { Permission } from '@/decorators/permission.decorator'

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '角色列表' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: Record<string, any>): Promise<any> {
    return this.roleService.findAll(query)
  }

  @ApiOperation({ summary: '获取指定角色' })
  @UseGuards(JwtAuthGuard)
  async findByIds(@Query('ids') ids: any[]): Promise<any> {
    return this.roleService.findByIds(ids)
  }

  @ApiOperation({ summary: '创建角色' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Body() role: Partial<Role>): Promise<number> {
    return this.roleService.create(role)
  }

  @ApiOperation({ summary: '更新角色' })
  @Patch(':id')
  @UseGuards(PermissionGuard)
  @Permission('role:edit')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() role: Partial<Role>): Promise<any> {
    return this.roleService.updateById(id, role)
  }

  @ApiOperation({ summary: '删除角色' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<string> {
    return this.roleService.deleteById(id)
  }

  @ApiOperation({ summary: '角色授权' })
  @Patch('authorize')
  @UseGuards(JwtAuthGuard)
  async authorize(@Body() data: Record<string, any>): Promise<string> {
    // 授权
    return this.roleService.authorize(data)
  }
}
