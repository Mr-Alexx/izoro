/** @format */

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
    return Promise.resolve({
      total: 0,
      list: []
    })
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
}
