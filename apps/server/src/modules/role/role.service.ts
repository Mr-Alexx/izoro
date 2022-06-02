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
import { RoleAuthorizeDto, RoleCreateDto, RoleDeleteDto, RoleEditDto } from './role.dto';
import { RoleQueryDto } from './role.dto';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly menuService: MenuService,
    private readonly permissionService: PermissionService,
  ) {}

  async findAll(query: RoleQueryDto): Promise<App.ListRes<Role[]>> {
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

  async create(role: RoleCreateDto): Promise<number> {
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
   * @param { RoleAuthorizeDto } data
   */
  async authorize(data: RoleAuthorizeDto): Promise<string> {
    const { menus, permissions, roles } = data;
    if (!Array.isArray(roles)) {
      throw new HttpException('roles必填，且必须为 number[] 类型', HttpStatus.BAD_REQUEST);
    } else if (!Array.isArray(menus)) {
      throw new HttpException('menus必填，且必须为 number[] 类型', HttpStatus.BAD_REQUEST);
    }

    const oldRoles = await this.roleRepository.findByIds(roles);
    if (oldRoles.length === 0) {
      throw new HttpException('角色不存在，无法授权！', HttpStatus.NOT_FOUND);
    }

    try {
      // 授权菜单，授权权限
      const [menuList, permissionData] = await Promise.all([
        this.menuService.findAll({ ids: menus }),
        permissions.length === 0 ? [] : this.permissionService.findAll({ ids: permissions }),
      ]);

      oldRoles.forEach(item => {
        if (Array.isArray(menuList)) {
          item.menus = menuList;
        }
        if (permissionData.total > 0) {
          item.permissions = permissionData.data;
        }
      });
      await this.roleRepository.save(oldRoles);
      return '授权成功';
    } catch (err) {
      console.error(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
