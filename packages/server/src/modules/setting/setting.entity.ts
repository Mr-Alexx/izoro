/**
 * @create 2022/03/09
 * @desc Setting model. 配置模块数据模型
 * @module module/setting/model
 * @author 潜
 */

import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn({ comment: '标签id，自增主键' })
  id: number;

  @Column({ comment: 'logo' })
  logo: string;

  @Column({ comment: 'favicon' })
  favicon: string;

  @Column({ comment: '站点名称' })
  site_name: string;

  @Column({ comment: 'seo关键词' })
  seo_keyword: string;

  @Column({ comment: 'seo描述' })
  seo_description: string;

  @Column({ comment: '百度统计id' })
  baidu_analysis_id: string;

  @Column({ comment: '谷歌分析id' })
  google_analysis_id: string;

  @Column({ comment: 'sentry browser sdk' })
  sentry_sdk: string;

  @Column({ comment: 'sentry dsn key，初始化sentry用' })
  sentry_dsn_key: string;

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
