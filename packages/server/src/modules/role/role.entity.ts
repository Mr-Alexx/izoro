/** @format */

import { RoleStatus } from '@/interfaces/status.interface'
/**
 * @format
 * @description 角色模型
 * @module modules/role/entity
 * @author 潜
 */

import { IsString } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Menu } from '../menu/menu.entity'
import { User } from '../user/user.entity'

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number

  @IsString()
  @Column({ comment: '角色名称' })
  name: string

  @Column({ comment: '描述', default: null })
  description: string

  @Column({ comment: '状态，0禁用 1启用', default: RoleStatus.normal })
  status: RoleStatus

  @ManyToMany(() => User, user => user.roles)
  @JoinTable()
  users: Array<User>

  @ManyToMany(() => Menu, menu => menu.roles)
  @JoinTable()
  menus: Array<Menu>

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'created_at'
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'updated_at'
  })
  updated_at: Date
}
