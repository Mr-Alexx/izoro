/**
 * @create 2021/03/04 17:53
 * @desc Tag model. 租房模块数据模型
 * @module module/rent/model
 * @author 潜
 */

import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn({ comment: '标签id，自增主键' })
  id: number;

  @ApiProperty({ description: '标题', example: '三房....' })
  @Column()
  title: string;

  @ApiProperty({ description: '发布者', example: '张三' })
  @Column()
  author: string;

  @ApiProperty({ description: '链接', example: 'https://www.baidu.com' })
  @Column()
  link: string;

  @ApiProperty({ description: '发布时间', example: '2021-03-34 21:18:00' })
  @Column()
  public_at: string;

  @ApiProperty({ description: '创建时间', example: '2021-03-34 21:18:00' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'created_at',
  })
  created_at: Date;
}
