/**
 * @format
 * @description 菜单服务
 * @module modules/menu/service
 * @author 潜
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { Menu } from './menu.entity'
import _ from '@/utils'
import { MenuNodeTypes, MenuStatus } from '@/interfaces/status.interface'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) {}

  async findAll(query: any): Promise<any> {
    const queryBuilder = this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.status != :status', { status: MenuStatus.deleted })

    if (_.isObject(query)) {
      const { node_type, menuIds, roleIds } = query

      if (node_type !== 'all') {
        queryBuilder.andWhere('menu.node_type != :type', { type: MenuNodeTypes.button })
      }
      if (_.isArray(menuIds) && menuIds.length > 0) {
        queryBuilder.andWhere('menu.id IN (:menus)', { menus: query?.menuIds })
      }
      if (_.isArray(roleIds)) {
        queryBuilder.leftJoinAndSelect('menu.roles', 'role', 'role.id IN (:ids)', { ids: roleIds })
      }
    }

    try {
      const data = await queryBuilder.orderBy('menu.sort', 'ASC').addOrderBy('menu.update_at', 'DESC').getMany()
      // 设置checked属性
      data.forEach(v => {
        v['checked'] = v.roles ? v.roles.length > 0 : false
        delete v.roles
      })
      return data
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getMenuTree(query: any): Promise<any[]> {
    if (_.isString(query?.roleIds)) {
      query.roleIds = query.roleIds.split(',').map(Number)
    }

    const data = await this.findAll(query)
    return this.makeTree(data)
  }

  async findButtonsByMenuId(id: number): Promise<Menu[]> {
    const data = await this.menuRepository
      .createQueryBuilder('menu')
      .where({
        pid: id,
        status: Not(MenuStatus.deleted),
        node_type: MenuNodeTypes.button
      })
      .orderBy('sort', 'ASC')
      .addOrderBy('update_at', 'DESC')
      .getMany()
    return data
  }

  /**
   * @description 构造按钮属性结构-递归
   * @param { Array } list
   * @param { number } pid default: 0
   * @return { Array }
   */
  makeTree(list: any[], pid = 0): any[] {
    const arr = []
    list.forEach(item => {
      if (item.pid === pid) {
        const children = this.makeTree(list, item.id)
        if (children.length > 0) {
          item.children = children
        }
        arr.push(item)
      }
    })
    return arr
  }

  /**
   * @description 创建菜单
   * @param { Partial<Menu> } menu
   * @author 潜
   * @return { Promise<number> }
   */
  async create(menu: Partial<Menu>): Promise<number> {
    if (!_.isObject(menu)) {
      throw new HttpException('节点必须为一个对象！', HttpStatus.BAD_REQUEST)
    }

    // 权限不允许相同的出现
    const existMenu = await this.menuRepository.findOne({
      menu_code: menu.menu_code,
      pid: menu.pid,
      node_type: MenuNodeTypes.button
    })
    if (existMenu) {
      throw new HttpException('同一父节点下的子节点编码不能重复！', HttpStatus.BAD_REQUEST)
    }

    try {
      if (menu.pid) {
        const parentMenu = await this.menuRepository.findOne({ id: menu.pid })
        if (!parentMenu) {
          throw new HttpException('未查找到对应的父节点！', HttpStatus.NOT_FOUND)
        } else {
          // 如果查找到父节点
          // 则设置level为父节点level + 1
          // 设置path为父节点path + ',' + 父节点id（保存所有父节点，方便查找）
          menu = Object.assign(
            {
              level: parentMenu.level + 1,
              path: parentMenu.path ? `${parentMenu.path},${parentMenu.id}` : `${parentMenu.id}`
            },
            menu
          )
        }
      }

      const newMenu = await this.menuRepository.create(menu)
      await this.menuRepository.save(newMenu)
      return Promise.resolve(newMenu.id)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateById(id: number, menu: Partial<Menu>): Promise<Menu> {
    if (!id) {
      throw new HttpException('menu id 必须有！', HttpStatus.BAD_REQUEST)
    }
    const oldMenu = await this.menuRepository.findOne(id)
    if (!oldMenu) {
      throw new HttpException('找不到对应id的menu！', HttpStatus.NOT_FOUND)
    }

    const newMenu = await this.menuRepository.merge(oldMenu, menu)
    return this.menuRepository.save(newMenu)
  }

  /**
   * @description 删除菜单及其子菜单 - 软删（状态改为-1）
   * @param { number } id 菜单id
   * @return { Promise<string> }
   */
  async softDeleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('menu id 必须有！', HttpStatus.BAD_REQUEST)
    }
    // 删除对应id行，并且删除pid为id的所有行
    try {
      await this.menuRepository
        .createQueryBuilder('menu')
        .update()
        .set({ status: -1 })
        .where('menu.id = :id', { id })
        .orWhere('menu.pid = :id', { id })
        .execute()
      return `删除成功！`
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * @description 删除菜单 - 硬删（注意）
   * @param { number } id 菜单id
   * @return { Promise<string> }
   */
  async deleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('menu id 必须有！', HttpStatus.BAD_REQUEST)
    }
    // 删除对应id行，并且删除pid为id的所有行
    try {
      await this.menuRepository
        .createQueryBuilder('menu')
        .where('menu.id = :id', { id })
        .orWhere('menu.pid = :id', { id })
        .delete()
        .execute()
      return `删除成功！`
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
