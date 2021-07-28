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

@Controller('schedule')
@ApiTags('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiOperation({ summary: '定时任务列表' })
  @Get()
  // @UseGuards(PermissionGuard)
  // @Permission(PermissionsType.定时任务列表)
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: undefined | Record<string, any>): Promise<any> {
    return this.scheduleService.findAll(query);
  }

  @ApiOperation({ summary: '创建定时任务' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() schedule: Partial<Schedule>): Promise<number> {
    return await this.scheduleService.create(schedule);
  }
}
