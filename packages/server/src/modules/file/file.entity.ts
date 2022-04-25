/**
 * @description 文件模型
 * @module modules/file/entity
 * @author 潜
 */

import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiPropertyColumn } from '@/decorators/agregate.decorator';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyColumn({ comment: '原文件名' })
  original_name: string;

  @ApiPropertyColumn({ comment: '保存的文件名' })
  name: string;

  @ApiPropertyColumn({ comment: '文件类型' })
  mimetype: string;

  @ApiPropertyColumn({ comment: '文件大小,KB' })
  size: number;

  @ApiPropertyColumn({ comment: '文件相对路径' })
  url: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'created_at',
  })
  created_at: Date;
}
