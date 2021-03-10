import { UserStatus } from "@/interfaces/status.interface";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";

const SALT_OR_ROUNDS = 10

@Entity()
export class User {
  /**
   * @desc 对比密码，登录用
   * @param { string } password1 加密前密码
   * @param { string } password2 加密后密码
   */
  static async comparePassword (password1: string, password2: string): Promise<boolean> {
    return bcrypt.compareSync(password1, password2)
  }

  /**
   * @desc 加密密码，入库用
   * @param { string } password
   */
  static encryptPassword (password: string): string {
    return bcrypt.hashSync(password, SALT_OR_ROUNDS)
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '账号' })
  @IsNotEmpty()
  @IsString()
  @Column({ length: 100, comment: '账号' })
  account: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  @IsString()
  @Exclude()
  @Column({ length: 100, comment: '密码' })
  password: string;

  @ApiProperty({ description: '角色' })
  @IsNotEmpty()
  @IsString()
  @Column({ length: 100, comment: '角色' })
  role: string;

  @ApiProperty({ required: false,description: '昵称' })
  @Column({ length: 100, comment: '昵称', default: null})
  nickname: string;

  @ApiProperty({ required: false,description: '头像' })
  @Column({ length: 255, comment: '头像', default: null })
  avatar: string;

  @ApiProperty({ required: false, description: '邮箱' })
  @Column({ comment: '邮箱', default: null })
  email: string;

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

  // 插入密码前，进行加密
  @BeforeInsert()
  encrypt () {
    this.password = bcrypt.hashSync(this.password, SALT_OR_ROUNDS)
  }
}
