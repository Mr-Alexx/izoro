/**
 * @format
 * @description 文件模型
 * @module modules/file/entity
 * @author 潜
 */

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '原文件名' })
  original_name: string

  @Column({ comment: '保存的文件名' })
  name: string

  @Column({ comment: '文件类型' })
  mimetype: string

  @Column({ comment: '文件大小,KB' })
  size: number

  @Column({ comment: '文件相对路径' })
  url: string

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at'
  })
  create_at: Date
}
