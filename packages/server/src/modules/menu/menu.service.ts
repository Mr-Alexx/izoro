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

  async create(menu: Partial<Menu>): Promise<number> {
    if (!_.isObject(menu)) {
      throw new HttpException('菜单必须为一个对象！', HttpStatus.BAD_REQUEST)
    }

    const existMenu = await this.menuRepository.findOne({ menu_code: menu.menu_code })
    if (existMenu) {
      throw new HttpException('菜单编码重复，请修改！', HttpStatus.BAD_REQUEST)
    }

    try {
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
