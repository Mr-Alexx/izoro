import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublishStatus, PublicStatus, StatusType } from '@/interfaces/status.interface';

// 查询参数
export class ScheduleQueryDto {
  @ApiProperty({ description: '页码' })
  page: number;

  @ApiProperty({ description: '每页条数' })
  limit: number;
}

// 创建参数
export class ScheduleCreateDto {
  @ApiProperty({ description: '任务名称' })
  name: string;

  @ApiPropertyOptional({ description: '详细描述' })
  description: string;

  @ApiProperty({ description: '调用方法' })
  method: string;

  @ApiPropertyOptional({ description: '最大运行时间' })
  max_run_time: number;

  // 参考 https://github.com/kelektiv/node-cron
  // https://blog.csdn.net/m0_37263637/article/details/83862250
  @ApiProperty({ description: '配置定时任务的时间' })
  cron_time: string;

  @ApiProperty({
    description: '运行状态（0：未运行，1：运行中）',
    type: 'enum',
    enum: StatusType,
    default: StatusType.disabled,
  })
  run_status: StatusType;

  @ApiProperty({
    description: '任务状态（0：禁用，1：启用）',
    type: 'enum',
    enum: StatusType,
    default: StatusType.disabled,
  })
  status: StatusType;
}

// 编辑参数
export class ScheduleEditDto extends ScheduleCreateDto {
  @ApiProperty({ description: '定时任务id' })
  id: number;
}

// 删除参数
export class ScheduleDeleteDto {
  @ApiProperty({ description: '定时任务id' })
  id: number;
}
