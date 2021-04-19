/**
 * @format
 * @description 菜单服务
 * @module modules/menu/service
 * @author 潜
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Menu } from './menu.entity'
import _ from '@/utils'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) {}

  async findAll(): Promise<any> {
    const [total, list] = await this.menuRepository.findAndCount()
    return {
      total,
      list
    }
  }

  makeTree(list: any[], pid = 0) {
    if (list.length === 0) {
      return list
    }

    // const arr = list.filter(item => item.pid === pid)
    // arr.forEach(item => {
    //   const children = list.filter(v => v.pid === item.id)
    //   if (children.length > 0) {
    //     item.children = this.makeTree(children, item.id)
    //   }
    // })
    // return arr
    const arr = []
    list.forEach(item => {
      if (item.pid === pid) {
      }
    })
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

    const existMenu = await this.menuRepository.findOne({ menu_code: menu.menu_code, pid: menu.pid })
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

  async deleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('menu id 必须有！', HttpStatus.BAD_REQUEST)
    }

    await this.menuRepository.delete(id)
    return `删除成功！`
  }
}
