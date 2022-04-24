/**
 * @create 2022/03/09
 * @desc Setting model. 配置模块数据模型
 * @module module/setting/model
 * @author 潜
 */

import { ApiPropertyColumn } from '@/decorators/agregate.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn({ comment: '标签id，自增主键' })
  id: number;

  @ApiPropertyColumn({ comment: 'logo', default: null })
  logo: string;

  @ApiPropertyColumn({ comment: 'favicon', default: null })
  favicon: string;

  @ApiPropertyColumn({ comment: '站点名称' })
  site_name: string;

  @ApiPropertyColumn({ comment: 'seo关键词', default: null })
  seo_keyword: string;

  @ApiPropertyColumn({ comment: 'seo描述', default: null })
  seo_description: string;

  @ApiPropertyColumn({ comment: '百度统计id', default: null })
  baidu_analysis_id: string;

  @ApiPropertyColumn({ comment: '谷歌分析id', default: null })
  google_analysis_id: string;

  @ApiPropertyColumn({ comment: 'sentry browser sdk', default: null })
  sentry_sdk: string;

  @ApiPropertyColumn({ comment: 'sentry dsn key，初始化sentry用', default: null })
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
