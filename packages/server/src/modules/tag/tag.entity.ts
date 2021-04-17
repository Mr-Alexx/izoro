/**
 * @format
 * @create 2021/03/04 17:53
 * @desc Tag model. 标签模块数据模型
 * @module module/tag/model
 * @author 潜
 */

import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Article } from '../article/article.entity'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ comment: '标签id，自增主键' })
  id: number

  @ApiProperty({ description: '标签名称', example: 'js' })
  @Column()
  name: string

  @ApiProperty({ description: '关联文章id', example: 123 })
  @ManyToMany(() => Article, article => article.tags)
  articles: Array<Article>

  @ApiProperty({ description: '创建时间', example: '2021-03-34 21:18:00' })
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at'
  })
  create_at: Date

  @ApiProperty({ description: '更新时间', example: '2021-03-34 21:18:00' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at'
  })
  update_at: Date
}
