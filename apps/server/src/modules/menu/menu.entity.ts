/**
 * @description 菜单模型
 * @module modules/menu/entity
 * @author 潜
 */

import { MenuNodeTypes, MenuStatus } from '@/interfaces/status.interface';
import { IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { Permission } from '../permission/permission.entity';
import { ApiPropertyColumn } from '@/decorators/agregate.decorator';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number;

  @IsString()
  @ApiPropertyColumn({ comment: '菜单名称' })
  name: string;

  @ApiPropertyColumn({ comment: '菜单描述', default: null })
  description: string;

  @IsNumber()
  @ApiPropertyColumn({ comment: '父id', default: 0 })
  pid: number;

  @ApiPropertyColumn({ comment: '图标', default: null })
  icon: string;

  @ApiPropertyColumn({ comment: '排序', default: 1 })
  @IsNumber()
  sort: number;

  @ApiPropertyColumn({ comment: '页面路径', default: null })
  url: string;

  @ApiPropertyColumn({ comment: '组件路径', default: null })
  component: string;

  @ApiPropertyColumn({ comment: '重定向', default: null })
  redirect: string;

  @ApiPropertyColumn({ comment: '是否隐藏', default: false })
  hidden: boolean;

  @ApiPropertyColumn({ comment: '菜单树层级，以便于查询指定层级的菜单', default: 1 })
  level: number;

  @ApiPropertyColumn({
    comment: '树id的路径，主要用于存放从根节点到当前树的父节点的路径，逗号分隔，想要找父节点会特别快',
    default: null,
  })
  path: string;

  @ApiPropertyColumn({ comment: '状态，-1删除 0禁用 1正常', default: MenuStatus.normal })
  status: MenuStatus;

  @ManyToMany(() => Role, role => role.menus, { cascade: true })
  roles: Array<Role>;

  @ManyToMany(() => Permission, permission => permission.menus, { cascade: true })
  @JoinTable()
  permissions: Array<Permission>;

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
