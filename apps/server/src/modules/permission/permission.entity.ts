/**
 * @description 权限模型
 * @module modules/menu/entity
 * @author 潜
 */

import { IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { ApiPropertyColumn } from '@/decorators/agregate.decorator';
import { ApiPropertyOptionalColumn } from '@/decorators/agregate.decorator';
import { COMMON_STATUS_ENUM } from '@/constants/index.constant';
import { Menu } from '../menu/menu.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number;

  @IsString()
  @ApiPropertyColumn({ comment: '权限名称' })
  name: string;

  @IsString()
  @ApiPropertyColumn({ comment: '权限编码' })
  code: string;

  @ApiPropertyOptionalColumn({ comment: '状态', default: COMMON_STATUS_ENUM.normal })
  @IsNumber()
  status: COMMON_STATUS_ENUM;

  @ManyToMany(() => Role, role => role.permissions, { cascade: true })
  roles: Array<Role>;

  @ManyToMany(() => Menu, menu => menu.roles)
  menus: Array<Menu>;

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
}
