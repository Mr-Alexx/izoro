/**
 * @description 菜单模型
 * @module modules/menu/entity
 * @author 潜
 */

import { StatusType } from '@/interfaces/status.interface';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number;

  @Column({ comment: '任务名称' })
  @IsNotEmpty()
  name: string;

  @Column({ comment: '详细描述', default: null })
  description: string;

  @Column({ comment: '调用方法' })
  method: string;

  @Column({ comment: '最大运行时间', default: null })
  max_run_time: number;

  // 参考 https://github.com/kelektiv/node-cron
  // https://blog.csdn.net/m0_37263637/article/details/83862250
  @Column({ comment: '配置定时任务的时间' })
  @IsNotEmpty()
  cron_time: string;

  @Column({ comment: '运行状态（0：未运行，1：运行中）', type: 'enum', enum: StatusType, default: StatusType.disabled })
  run_status: StatusType;

  @Column({ comment: '任务状态（0：禁用，1：启用）', type: 'enum', enum: StatusType, default: StatusType.disabled })
  status: StatusType;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'updated_at',
  })
  updated_at: Date;
}
