/**
 * @description 定时任务控制器
 * @module modules/schedule/controller
 * @author 潜
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { PermissionGuard } from '@/guards/permission.guard';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionsType } from '@/interfaces/permission.interface';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.entity';
import { scheduleMethods } from '@/interfaces/schedule.interface';
import { PERMISSIONS } from '@/constants/permission.constant';
import { ScheduleCreateDto, ScheduleQueryDto, ScheduleEditDto, ScheduleDeleteDto } from './schedule.dto';

@Controller('schedule')
@ApiTags('schedule')
@UseGuards(PermissionGuard)
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiOperation({ summary: '定时任务方法列表' })
  @Get('methods')
  async getMethods(): Promise<any> {
    return {
      data: scheduleMethods,
      total: scheduleMethods.length,
    };
  }

  @ApiOperation({ summary: '定时任务列表' })
  @Get()
  @Permission(PERMISSIONS.定时任务列表)
  async findAll(@Query() query: ScheduleQueryDto): Promise<any> {
    return this.scheduleService.findAll(query);
  }

  @ApiOperation({ summary: '创建定时任务' })
  @Post()
  @Permission(PERMISSIONS.创建定时任务)
  async create(@Body() schedule: ScheduleCreateDto): Promise<number> {
    return await this.scheduleService.create(schedule);
  }

  @ApiOperation({ summary: '更新定时任务' })
  @Patch(':id')
  @Permission(PERMISSIONS.编辑定时任务)
  async update(@Body() schedule: ScheduleEditDto): Promise<any> {
    return await this.scheduleService.update(schedule, true);
  }

  @ApiOperation({ summary: '删除定时任务' })
  @Delete(':id')
  @Permission(PERMISSIONS.删除定时任务)
  async delete(@Param() params: ScheduleDeleteDto): Promise<any> {
    return await this.scheduleService.delete(params.id);
  }
}
