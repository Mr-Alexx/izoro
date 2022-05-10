/**
 * @description 菜单模型
 * @module modules/menu/entity
 * @author 潜
 */

import { MenuNodeTypes, MenuStatus } from '@/interfaces/status.interface';
import { IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { ApiPropertyColumn } from '@/decorators/agregate.decorator';
import { ApiPropertyOptionalColumn } from '@/decorators/agregate.decorator';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number;

  @IsString()
  @ApiPropertyColumn({ comment: '菜单名称' })
  name: string;

  @IsNumber()
  @ApiPropertyColumn({ comment: '父id', default: 0 })
  pid: number;

  // @ApiPropertyColumn({ comment: '节点类型，1目录 2页面 3按钮', default: MenuNodeTypes.directory })
  // node_type: MenuNodeTypes;

  @ApiPropertyOptionalColumn({ comment: '图标', default: null })
  icon: string;

  @ApiPropertyOptionalColumn({ comment: '排序', default: 1 })
  @IsNumber()
  sort: number;

  @ApiPropertyColumn({ comment: '路由地址', default: null })
  path: string;

  @ApiPropertyOptionalColumn({ comment: '组件路径', default: null })
  component: string;

  @ApiPropertyOptionalColumn({ comment: '隐藏菜单', default: false })
  hide_in_menu: boolean;

  @ApiPropertyColumn({ comment: '菜单树层级，以便于查询指定层级的菜单', default: 1 })
  level: number;

  @ApiPropertyColumn({
    comment: '树id的路径，主要用于存放从根节点到当前树的父节点的路径，逗号分隔，想要找父节点会特别快',
    default: null,
  })
  id_path: string;

  @ApiPropertyColumn({ comment: '状态，0删除 1正常', default: MenuStatus.normal })
  status: MenuStatus;

  @ManyToMany(() => Role, role => role.menus, { cascade: true })
  roles: Array<Role>;

  @ApiPropertyOptionalColumn({
    comment: '绑定的权限列表，所有权限在 @/interfaces/permission.interfaces.ts 内定义',
    type: 'simple-array',
    default: null,
  })
  permissions: string[];

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
