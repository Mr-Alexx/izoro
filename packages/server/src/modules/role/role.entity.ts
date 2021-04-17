/**
 * @format
 * @description 角色模型
 * @module modules/role/entity
 * @author 潜
 */

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
  id: string

  @Column({ comment: '角色名称' })
  name: string

  @Column({ comment: '描述' })
  description: string

  @ManyToMany(() => User, user => user.roles)
  @JoinTable()
  users: Array<User>

  @ManyToMany(() => Menu, menu => menu.roles)
  @JoinTable()
  menus: Array<Menu>

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
