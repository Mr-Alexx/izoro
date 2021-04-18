/**
 * @format
 * @description 角色控制器
 * @module modules/role/controller
 * @author 潜
 */

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { Role } from './role.entity'
import { RoleService } from './role.service'

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<any> {
    return this.roleService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number): Promise<any> {
    return Promise.resolve({})
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(@Body() role: Partial<Role>): Promise<number> {
    return this.roleService.create(role)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() role: Partial<Role>): Promise<any> {
    return this.roleService.updateById(id, role)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<string> {
    return this.roleService.deleteById(id)
  }
}
