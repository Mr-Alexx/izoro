import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Smtp {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number;

  @IsString()
  @Column({ comment: '发件人' })
  sender: string;

  @IsString()
  @Column({ comment: '收件人' })
  receiver: string;

  @IsString()
  @Column({ comment: '主题' })
  subject: string;

  @IsString()
  @Column({ comment: '内容' })
  content: string;
}
