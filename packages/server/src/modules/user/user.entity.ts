import { UserStatus } from "@/interfaces/status.interface";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ comment: '账号' })
  account: String;

  @Column({ comment: '密码' })
  password: String;

  @Column({ comment: '昵称', default: null, length: 20 })
  nickname: String;

  @Column({ comment: '头像', default: null })
  avatar: String;

  @Column({ comment: '邮箱', default: null })
  email: String;

  @Column({ comment: '角色' })
  role: String;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.active,
    comment: '账号状态：-1 作废，0 冻结，1 正常'
  })
  status: UserStatus;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  update_at: Date;
}
