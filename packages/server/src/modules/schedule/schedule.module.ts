/**
 * @description 定时任务模块
 * @module modules/Schedule/module
 * @author 潜
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from './Schedule.controller';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './Schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  // exports: [ScheduleService],
})
export class ScheduleModule {}
