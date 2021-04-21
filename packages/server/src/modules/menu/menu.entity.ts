/**
 * @format
 * @description 菜单模型
 * @module modules/menu/entity
 * @author 潜
 */

import { MenuNodeTypes, MenuStatus } from '@/interfaces/status.interface'
import { IsNumber, IsString } from 'class-validator'
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Role } from '../role/role.entity'

@Entity()
export class Menu {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number

  @IsString()
  @Column({ comment: '菜单名称' })
  name: string

  @IsString()
  @Column({ comment: '菜单标识' })
  menu_code: string

  @Column({ comment: '菜单描述', default: null })
  description: string

  @IsNumber()
  @Column({ comment: '父id', default: 0 })
  pid: number

  @Column({ comment: '节点类型，1目录 2页面 3按钮', default: MenuNodeTypes.directory })
  node_type: MenuNodeTypes

  @Column({ comment: '图标', default: null })
  icon: string

  @Column({ comment: '排序', default: 1 })
  @IsNumber()
  sort: number

  @Column({ comment: '页面路径', default: null })
  url: string

  @Column({ comment: '菜单树层级，以便于查询指定层级的菜单', default: 1 })
  level: number

  @Column({
    comment: '树id的路径，主要用于存放从根节点到当前树的父节点的路径，逗号分隔，想要找父节点会特别快',
    default: null
  })
  path: string

  @Column({ comment: '状态，0禁用 1正常', default: MenuStatus.normal })
  status: MenuStatus

  @ManyToMany(() => Role, role => role.menus, { cascade: true })
  roles: Array<Role>

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at'
  })
  create_at: Date

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at'
  })
  update_at: Date
}
