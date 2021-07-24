/**
 * @format
 * @desc Article model. 文章模块数据模型
 * @module module/article/model
 * @author 潜
 */

import { IsNotEmpty, IsString, Length } from 'class-validator'
import { PublicStatus, PublishStatus } from '@/interfaces/status.interface'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { Tag } from '../tag/tag.entity'
import { Category } from '../category/category.entity'

// 给添加的数据加入时间戳
@Entity()
export class Article {
  @PrimaryColumn({ comment: 'id（snowflake）', type: 'bigint' })
  id: string // bigint保存 https://stackoverflow.com/questions/59927625/how-to-store-big-int-in-nest-js-using-typeorm

  // 封面图
  @Column({ default: null, comment: '文章封面图' })
  @IsString()
  cover: string

  // 标题
  @ApiProperty({ description: '文章标题', example: '谷歌浏览器如何调试？' })
  @IsNotEmpty({ message: '文章标题不能为空！' })
  @IsString({ message: '文章标题类型必须为字符串！' })
  @Length(1, 200)
  @Column({ comment: '文章标题' })
  title: string

  // 摘要
  @ApiProperty({ description: '文章摘要', example: '利用network调试。。。' })
  @Column({ type: 'text', default: null, comment: '文章摘要' })
  summary: string

  // 原始markdown内容
  @ApiProperty({ description: '文章原始内容', example: '# 标题1 xxx' })
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4', comment: '文章markdown' })
  content: string

  // 转化为html的内容，依据content自动生成
  @ApiProperty({ description: '文章转化为html内容', example: '<div>标题1</div>' })
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4', comment: '基于markdown生成的html' })
  html: string

  @ApiProperty({ description: 'markdown主题', example: 'juejin' })
  @Column({ length: 100, comment: 'markdown主题', default: 'juejin' })
  theme: string

  @ApiProperty({ description: '代码高亮主题', example: 'vs2015' })
  @Column({ length: 100, comment: '代码高亮主题', default: '' })
  highlight: string

  // 发布状态
  // @IsIn()
  @ApiProperty({ description: '发布状态：-1 回收，0 草稿，1 已发布', example: 1 })
  @Column({
    type: 'enum',
    enum: PublishStatus,
    default: PublishStatus.draft,
    comment: '发布状态：-1 回收，0 草稿，1 已发布'
  })
  status: PublishStatus

  // 查看人数
  @ApiProperty({ description: '查看人数', example: 100 })
  @Column({ comment: '查看人数', default: 0 })
  views: number

  @ApiProperty({ description: '密码', example: '123456' })
  @Column({ comment: '密码', default: null })
  password: string

  // 公开状态
  @ApiProperty({ description: '公开状态', example: 1 })
  @Column({
    type: 'enum',
    enum: PublicStatus,
    default: PublicStatus.public,
    comment: '公开状态：0 公开，1 需要密码，2 私密'
  })
  public_status: PublicStatus

  // seo关键字
  @ApiProperty({ description: 'SEO关键字', example: 'google google调试' })
  @Column({ comment: 'seo关键字', default: null })
  seo_keywords: string

  // seo描述
  @ApiProperty({ description: 'SEO描述', example: 'google调试是这样的。。。' })
  @Column({ comment: 'seo描述', default: null })
  seo_description: string

  // 创建时间
  @ApiProperty({ description: '创建时间', example: '2021-03-03 09:16:25' })
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'created_at'
  })
  created_at: Date

  // 发布时间
  @ApiProperty({ description: '发布时间', example: '2021-03-03 09:16:25' })
  @Column({
    type: 'datetime',
    comment: '发布时间',
    name: 'publish_at',
    default: null
  })
  publish_at: Date

  // 更新时间
  @ApiProperty({ description: '更新时间', example: '2021-03-03 09:16:25' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'updated_at'
  })
  updated_at: Date

  // 标签--关联标签表
  // @ApiProperty({ description: '关联的标签', example: ['tag1', 'tag2'] })
  @ManyToMany(() => Tag, tag => tag.articles, { cascade: true })
  @JoinTable()
  tags: Array<Tag>

  // 分类--关联分类表 使用ApiProperty注释会引起循环引用的问题
  // @ApiProperty({ description: '关联的分类', example: '一级分类' })
  @ManyToOne(() => Category, category => category.articles, { cascade: true })
  @JoinTable()
  category: Category
}
