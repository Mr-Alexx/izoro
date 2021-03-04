/**
 * @desc Article model. 文章模块数据模型
 * @module module/article/model
 * @author 潜
 */

import { IsIn, IsNotEmpty, IsString, Length } from "class-validator";
import { PublicStatus, PublishStatus } from '@/interfaces/status.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Tag } from "../tag/tag.entity";
import { Category } from "../category/category.entity";

// 给添加的数据加入时间戳
@Entity()
export class Article {
  // id
  @PrimaryGeneratedColumn('uuid')
  id: String;

  // 封面图
  @Column({ default: null, comment: '文章封面图' })
  cover: String;

  // 标题
  @ApiProperty({ description: '文章标题', example: '谷歌浏览器如何调试？' })
  @IsNotEmpty({ message: '文章标题不能为空！' })
  @IsString({ message: '文章标题类型必须为字符串！' })
  @Length(1, 200)
  @Column({ comment: '文章标题' })
  title: String;

  // 副标题
  @ApiProperty({ description: '文章副标题', example: '副标题' })
  @Length(0, 200)
  @Column({ comment: '文章副标题', default: null })
  subtitle: String;

  // 摘要
  @ApiProperty({ description: '文章摘要', example: '利用network调试。。。' })
  @Column({ type: 'text', default: null, comment: '文章摘要' })
  summary: String;

  // 原始markdown内容
  @ApiProperty({ description: '文章原始内容', example: '# 标题1 xxx' })
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4', comment: '文章markdown' })
  content: String;

  // 转化为html的内容，依据content自动生成
  @ApiProperty({ description: '文章转化为html内容', example: '<div>标题1</div>' })
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4', comment: '基于markdown生成的html' })
  html: String;

  // 发布状态
  // @IsIn()
  @ApiProperty({ description: '发布状态：-1 回收，0 草稿，1 已发布', example: 1 })
  @Column({
    type: 'enum',
    enum: PublishStatus,
    default: PublishStatus.published,
    comment: '发布状态：-1 回收，0 草稿，1 已发布'
  })
  status: PublishStatus;

  // 查看人数
  @ApiProperty({ description: '查看人数', example: 100 })
  @Column()
  views: Number;

  // 公开状态
  @ApiProperty({ description: '公开状态', example: 1 })
  @Column({
    type: 'enum',
    enum: PublicStatus,
    default: PublicStatus.public,
    comment: '公开状态：0 公开，1 需要密码，2 私密'
  })
  public_status: PublicStatus;

  // seo关键字
  @ApiProperty({ description: 'SEO关键字', example: 'google google调试' })
  @Length(0, 500)
  @Column({ comment: 'seo关键字', default: null })
  seo_keywords: String;

  // seo描述
  @ApiProperty({ description: 'SEO描述', example: 'google调试是这样的。。。' })
  @Length(0, 1000)
  @Column({ comment: 'seo描述', default: null })
  seo_description: String;

  // 创建时间
  @ApiProperty({ description: '创建时间', example: '2021-03-03 09:16:25' })
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at'
  })
  create_at: Date;

  // 发布时间
  @ApiProperty({ description: '发布时间', example: '2021-03-03 09:16:25' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '发布时间',
    name: 'publish_at'
  })
  publish_at: Date;

  // 更新时间
  @ApiProperty({ description: '更新时间', example: '2021-03-03 09:16:25' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at'
  })
  update_at: Date;

  // 标签--关联标签表
  @ApiProperty({ description: '关联的标签', example: ['tag1', 'tag2'] })
  @ManyToMany(
    () => Tag,
    tag => tag.articles,
    { cascade: true }
  )
  @JoinTable()
  tags: Array<Tag>;

  // 分类--关联分类表
  @ApiProperty({ description: '关联的分类', example: '一级分类' })
  @ManyToOne(
    () => Category,
    category => category.articles,
    { cascade: true }
  )
  @JoinTable()
  category: Category
}
