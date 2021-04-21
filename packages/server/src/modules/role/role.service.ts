/**
 * @format
 * @description 角色服务
 * @module modules/role/service
 * @author 潜
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { Role } from './role.entity'
import _ from '@/utils'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async findAll(query: Record<string, any>): Promise<any> {
    const { status, name } = query
    let { page, limit } = query
    page = page || 1
    limit = limit || 20
    const where = {}
    status && (where['status'] = status)
    name && (where['name'] = Like(`%${name}%`))

    const [list, total] = await this.roleRepository.findAndCount({
      where,
      order: {
        id: 'ASC'
      },
      skip: (page - 1) * limit,
      take: limit
    })
    return {
      total,
      list
    }
  }

  async create(role: Partial<Role>): Promise<number> {
    if (!_.isObject(role)) {
      throw new HttpException('角色必须为一个对象！', HttpStatus.BAD_REQUEST)
    }

    const existRole = await this.roleRepository.findOne({ name: role.name })
    if (existRole) {
      throw new HttpException('该角色名称已存在，请修改！', HttpStatus.BAD_REQUEST)
    }

    try {
      const newRole = await this.roleRepository.create(role)
      await this.roleRepository.save(newRole)
      return Promise.resolve(newRole.id)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateById(id: number, role: Partial<Role>): Promise<Role> {
    if (!id) {
      throw new HttpException('role id 必须有！', HttpStatus.BAD_REQUEST)
    }
    const oldRole = await this.roleRepository.findOne(id)
    if (!oldRole) {
      throw new HttpException('找不到对应id的role！', HttpStatus.NOT_FOUND)
    }

    const newRole = await this.roleRepository.merge(oldRole, role)
    return this.roleRepository.save(newRole)
  }

  async deleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('role id 必须有！', HttpStatus.BAD_REQUEST)
    }

    await this.roleRepository.delete(id)
    return `删除成功！`
  }
}
