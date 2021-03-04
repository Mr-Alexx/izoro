import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Article } from "../article/article.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: Number;

  @ApiProperty({ description: '父类id', example: '一级分类' })
  @Column()
  pid: Number;

  @ApiProperty({ description: '分类名称', example: '二级分类' })
  @Column()
  name: String;
  
  @ApiProperty({ description: '创建时间', example: '2021-03-34 21:18:00' })
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  create_at: Date;

  @ApiProperty({ description: '更新时间', example: '2021-03-34 21:18:00' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  update_at: Date;

  @ApiProperty({ description: '关联的文章', example: [123, 134] })
  @OneToMany(
    () => Article,
    (article) => article.category
  )
  articles: Array<Article>
}
