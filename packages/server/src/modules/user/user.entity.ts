import { UserStatus } from '@/interfaces/status.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToMany,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Role } from '../role/role.entity';
import { ApiPropertyColumn } from '@/decorators/agregate.decorator';

const SALT_OR_ROUNDS = 10;

@Entity()
export class User {
  /**
   * @desc 对比密码，登录用
   * @param { string } password1 加密前密码
   * @param { string } password2 加密后密码
   */
  static async comparePassword(password1: string, password2: string): Promise<boolean> {
    return bcrypt.compareSync(password1, password2);
  }

  /**
   * @desc 加密密码，入库用
   * @param { string } password
   */
  static encryptPassword(password: string): string {
    return bcrypt.hashSync(password, SALT_OR_ROUNDS);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyColumn({ length: 100, comment: '账号' })
  account: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
  @ApiPropertyColumn({ length: 100, comment: '密码' })
  password: string;

  // 角色，多对多
  @ManyToMany(() => Role, role => role.users, { cascade: true })
  roles: Array<Role>;

  @ApiPropertyColumn({ length: 100, comment: '昵称', default: null })
  nickname: string;

  @ApiPropertyColumn({ length: 255, comment: '头像', default: null })
  avatar: string;

  @ApiPropertyColumn({ comment: '邮箱', default: null })
  email: string;

  @ApiPropertyColumn({ comment: '手机号码', default: null })
  phone_number: string;

  @ApiPropertyColumn({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.active,
    comment: '账号状态：0 禁用，1 启用',
  })
  status: UserStatus;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'updated_at',
  })
  updated_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '最后登录时间',
    name: 'last_login_at',
  })
  last_login_at: Date;

  // 插入密码前，进行加密
  @BeforeInsert()
  @BeforeUpdate()
  encrypt(): void {
    this.password = bcrypt.hashSync(this.password, SALT_OR_ROUNDS);
  }
}
