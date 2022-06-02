/**
 * @description 菜单服务
 * @module modules/menu/service
 * @author 潜
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Menu } from './menu.entity';
import _ from '@/utils';
import { MenuNodeTypes, MenuStatus } from '@/interfaces/status.interface';
import { MenuCreateDto, MenuEditDto, MenuQueryDto } from './menu.dto';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly permissionService: PermissionService,
  ) {}

  async findAll(query: any): Promise<any> {
    const queryBuilder = this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.status != :status', { status: MenuStatus.deleted })
      .leftJoin('menu.permissions', 'permission')
      .addSelect(['permission.name', 'permission.id']);

    // 角色具有的权限id数组
    let rolePermissionIds;

    if (_.isObject(query)) {
      const { ids, roles } = query;

      if (_.isArray(ids)) {
        queryBuilder.andWhere({ id: In(ids) });
      }
      if (_.isString(roles) || _.isArray(roles)) {
        const roleIds = _.isString(roles) ? roles.split(',').map(Number) : roles;
        queryBuilder.innerJoinAndSelect('menu.roles', 'role', 'role.id IN (:ids)', { ids: roleIds });

        const { data } = await this.permissionService.findAll({ roleIds, page: 1, limit: 1000 });
        rolePermissionIds = data.map(item => item.id);
      }
    }

    try {
      const data = await queryBuilder.orderBy('menu.sort', 'ASC').addOrderBy('menu.updated_at', 'DESC').getMany();

      // 只有是通过角色查找其具有的菜单时，才具有checked属性
      if (_.isString(query?.roles)) {
        data.forEach(menuItem => {
          menuItem['checked'] = menuItem.roles && menuItem.roles.length > 0;
          delete menuItem.roles;
          if (rolePermissionIds && _.isArray(menuItem.permissions) && menuItem.permissions.length > 0) {
            menuItem.permissions.forEach(permissionItem => {
              permissionItem['checked'] = rolePermissionIds.includes(permissionItem.id);
            });
          }
        });
      }
      return data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMenuTree(query: MenuQueryDto): Promise<any[]> {
    const data = await this.findAll(query);
    return this.makeTree(data);
  }

  async findButtonsByMenuId(id: number): Promise<Menu[]> {
    const data = await this.menuRepository
      .createQueryBuilder('menu')
      .where({
        pid: id,
        status: Not(MenuStatus.deleted),
      })
      .orderBy('sort', 'ASC')
      .addOrderBy('updated_at', 'DESC')
      .getMany();
    return data;
  }

  /**
   * @description 获取角色的菜单和权限列表
   */
  async findPermissionByRoleIds(roles: number[]): Promise<any> {
    try {
      const data = await this.menuRepository
        .createQueryBuilder('menu')
        .select('menu.menu_code')
        .leftJoin('menu.roles', 'role')
        .andWhere('role.id in (:roles)', { roles })
        .getMany();
      return data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description 构造按钮属性结构-递归
   * @param { Array } list
   * @param { number } pid default: 0
   * @return { Array }
   */
  makeTree(list: any[], pid = 0): any[] {
    const arr = [];
    list.forEach(item => {
      if (item.pid === pid) {
        const children = this.makeTree(list, item.id);
        if (children.length > 0) {
          item.children = children;
        }
        arr.push(item);
      }
    });
    return arr;
  }

  /**
   * @description 创建菜单
   * @param { Partial<Menu> } menu
   * @author 潜
   * @return { Promise<number> }
   */
  async create(menu: MenuCreateDto): Promise<number> {
    if (!_.isObject(menu)) {
      throw new HttpException('节点必须为一个对象！', HttpStatus.BAD_REQUEST);
    }
    // 权限不允许相同的出现
    const existMenu = await this.menuRepository.findOne({
      pid: menu.pid,
    });

    if (existMenu) {
      throw new HttpException('同一父节点下的子节点编码不能重复！', HttpStatus.BAD_REQUEST);
    }

    try {
      if (menu.pid) {
        const parentMenu = await this.menuRepository.findOne({ id: menu.pid });
        if (!parentMenu) {
          throw new HttpException('未查找到对应的父节点！', HttpStatus.NOT_FOUND);
        }
      }

      let permissions;
      if (menu.permissions) {
        permissions = await this.permissionService.findAll({ ids: menu.permissions });
      }

      const newMenu = await this.menuRepository.create({
        ...menu,
        permissions,
      });
      await this.menuRepository.save(newMenu);
      return Promise.resolve(newMenu.id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateById(menu: MenuEditDto): Promise<Menu> {
    if (!menu.id) {
      throw new HttpException('menu id 必须有！', HttpStatus.BAD_REQUEST);
    }
    const oldMenu = await this.menuRepository.findOne(menu.id);
    if (!oldMenu) {
      throw new HttpException('找不到对应id的menu！', HttpStatus.NOT_FOUND);
    }

    let permissions;
    if (menu.permissions) {
      const { data } = await this.permissionService.findAll({ ids: menu.permissions });
      permissions = data;
    }

    const newMenu = await this.menuRepository.merge(oldMenu, { ...menu, permissions });
    return this.menuRepository.save(newMenu);
  }

  /**
   * @description 删除菜单及其子菜单 - 软删（状态改为-1）
   * @param { number } id 菜单id
   * @return { Promise<string> }
   */
  async softDeleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('menu id 必须有！', HttpStatus.BAD_REQUEST);
    }
    // 删除对应id行，并且删除pid为id的所有行
    try {
      await this.menuRepository
        .createQueryBuilder('menu')
        .update()
        .set({ status: -1 })
        .where('menu.id = :id', { id })
        .orWhere('menu.pid = :id', { id })
        .execute();
      return `删除成功！`;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description 删除菜单 - 硬删（注意）
   * @param { number } id 菜单id
   * @return { Promise<string> }
   */
  async deleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('menu id 必须有！', HttpStatus.BAD_REQUEST);
    }
    // 删除对应id行，并且删除pid为id的所有行
    try {
      await this.menuRepository
        .createQueryBuilder('menu')
        .where('menu.id = :id', { id })
        .orWhere('menu.pid = :id', { id })
        .delete()
        .execute();
      return `删除成功！`;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
