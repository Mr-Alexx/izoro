/**
 * @description 角色服务
 * @module modules/role/service
 * @author 潜
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Role } from './role.entity';
import _ from '@/utils';
import { MenuService } from '../menu/menu.service';
import { RoleDeleteDto, RoleEditDto } from './role.dto';
import { RoleQueryDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly menuService: MenuService,
  ) {}

  async findAll(query: RoleQueryDto): Promise<any> {
    const { status, name } = query;
    let { page, limit } = query;
    page = page || 1;
    limit = limit || 20;
    const where = {};
    status && (where['status'] = status);
    name && (where['name'] = Like(`%${name}%`));

    const [list, total] = await this.roleRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      total,
      list,
    };
  }

  async findByIds(ids: any[]): Promise<Array<Role>> {
    return this.roleRepository.findByIds(ids);
  }

  async create(role: Partial<Role>): Promise<number> {
    if (!_.isObject(role)) {
      throw new HttpException('角色必须为一个对象！', HttpStatus.BAD_REQUEST);
    }

    const existRole = await this.roleRepository.findOne({ name: role.name });
    if (existRole) {
      throw new HttpException('该角色名称已存在，请修改！', HttpStatus.BAD_REQUEST);
    }

    try {
      const newRole = await this.roleRepository.create(role);
      await this.roleRepository.save(newRole);
      return Promise.resolve(newRole.id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateById(role: RoleEditDto): Promise<Role> {
    if (!role.id) {
      throw new HttpException('非法传值，角色id不存在！', HttpStatus.BAD_REQUEST);
    }
    const oldRole = await this.roleRepository.findOne(role.id);
    if (!oldRole) {
      throw new HttpException('找不到对应的角色！', HttpStatus.NOT_FOUND);
    }

    const newRole = await this.roleRepository.merge(oldRole, role);
    return this.roleRepository.save(newRole);
  }

  async deleteById(ids: number[]): Promise<string> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new HttpException('非法传值，必须传入角色id数组', HttpStatus.BAD_REQUEST);
    }

    await this.roleRepository.delete(ids);
    return `删除成功！`;
  }

  /**
   * @description 角色授权菜单/权限
   * @param { data } { ids: 角色id, menuIds: 菜单id数组 }
   */
  async authorize(data: Record<string, any>): Promise<string> {
    try {
      const { roleIds, menuIds } = data;
      const oldRoles = await this.roleRepository.findByIds(roleIds);
      if (oldRoles.length === 0) {
        throw new HttpException('角色不存在，无法授权！', HttpStatus.NOT_FOUND);
      }

      if (!Array.isArray(menuIds)) {
        throw new HttpException('授权菜单参数不正确！', HttpStatus.BAD_REQUEST);
      }

      const menus = menuIds.length > 0 ? await this.menuService.findAll({ menuIds, node_type: 'all' }) : [];
      oldRoles.forEach(item => (item.menus = menus));
      await this.roleRepository.save(oldRoles);
    } catch (err) {
      console.error(err);
    }
    // this.roleRepository.
    return '授权成功';
  }
}
