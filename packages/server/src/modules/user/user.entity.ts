import { UserStatus } from "@/interfaces/status.interface";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @ApiProperty({ description: '账号' })
  @IsNotEmpty({ message: '账号不能为空' })
  @Column({ comment: '账号' })
  account: String;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Column({ comment: '密码' })
  password: String;

  @ApiProperty({ description: '角色' })
  @IsNotEmpty({ message: '角色不能为空' })
  @Column({ comment: '角色' })
  role: String;

  @ApiProperty({ required: false,description: '昵称' })
  @Column({ comment: '昵称', default: null, length: 20 })
  nickname: String;

  @ApiProperty({ required: false,description: '头像' })
  @Column({ comment: '头像', default: null })
  avatar: String;

  @ApiProperty({ required: false,description: '邮箱' })
  @Column({ comment: '邮箱', default: null })
  email: String;

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
