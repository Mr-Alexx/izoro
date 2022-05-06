/**
 * @desc Article model. 文章模块数据模型
 * @module module/article/model
 * @author 潜
 */

import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PublicStatus, PublishStatus } from '@/interfaces/status.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';
import { ApiPropertyColumn } from '@/decorators/agregate.decorator';

// 给添加的数据加入时间戳
@Entity()
export class Article {
  @PrimaryColumn({ comment: 'id（snowflake）', type: 'bigint' })
  id: string; // bigint保存 https://stackoverflow.com/questions/59927625/how-to-store-big-int-in-nest-js-using-typeorm

  @ApiPropertyColumn({ default: null, comment: '文章封面图' })
  // @IsString()
  cover: string;

  // @IsNotEmpty({ message: '文章标题不能为空！' })
  // @IsString({ message: '文章标题类型必须为字符串！' })
  // @Length(1, 200)
  @ApiPropertyColumn({ comment: '文章标题' })
  title: string;

  @ApiPropertyColumn({ type: 'text', default: null, comment: '文章摘要' })
  summary: string;

  @ApiPropertyColumn({ type: 'mediumtext', default: null, charset: 'utf8mb4', comment: '文章markdown' })
  markdown: string;

  @ApiPropertyColumn({ type: 'mediumtext', default: null, charset: 'utf8mb4', comment: '基于markdown生成的html' })
  html: string;

  @ApiPropertyColumn({ length: 100, comment: 'markdown主题', default: 'juejin' })
  theme: string;

  @ApiPropertyColumn({ length: 100, comment: '代码高亮主题', default: '' })
  highlight: string;

  @ApiPropertyColumn({
    type: 'enum',
    enum: PublishStatus,
    default: PublishStatus.draft,
    comment: '发布状态：-1 回收，0 草稿，1 已发布',
  })
  status: PublishStatus;

  @ApiPropertyColumn({ comment: '查看人数', default: 0 })
  views: number;

  @ApiPropertyColumn({ comment: '密码', default: null })
  password: string;

  @ApiPropertyColumn({
    type: 'enum',
    enum: PublicStatus,
    default: PublicStatus.public,
    comment: '公开状态：0 公开，1 需要密码，2 私密',
  })
  public_status: PublicStatus;

  @ApiPropertyColumn({ comment: 'seo关键字', default: null })
  seo_keywords: string;

  @ApiPropertyColumn({ comment: 'seo描述', default: null })
  seo_description: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'created_at',
  })
  created_at: Date;

  @ApiPropertyColumn({
    type: 'datetime',
    comment: '发布时间',
    name: 'publish_at',
    default: null,
  })
  publish_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'updated_at',
  })
  updated_at: Date;

  // 标签--关联标签表
  @ApiProperty({ description: '关联标签组' })
  @ManyToMany(() => Tag, tag => tag.articles, { cascade: true })
  @JoinTable()
  tags: Array<Tag>;

  // 分类--关联分类表 使用ApiProperty注释会引起循环引用的问题
  @ApiProperty({ description: '关联分类' })
  @ManyToOne(() => Category, category => category.articles, { cascade: true })
  @JoinTable()
  category: Category;
}
