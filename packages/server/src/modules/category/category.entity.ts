import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Article } from '../article/article.entity'
// 分类表设计

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '父类id', example: 0 })
  @Column({ default: 0 })
  pid: number

  @ApiProperty({ description: '分类名称', example: '测试分类' })
  @Column()
  name: string

  @ApiProperty({ description: '分类层级', example: 1 })
  @Column({ default: 1 })
  level: number

  @ApiProperty({ description: '创建时间', example: '2021-03-34 21:18:00' })
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  create_at: Date

  @ApiProperty({ description: '更新时间', example: '2021-03-34 21:18:00' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  update_at: Date

  @ApiProperty({ description: '关联的文章', example: [123, 134] })
  @OneToMany(() => Article, (article) => article.category)
  articles: Array<Article>
}
