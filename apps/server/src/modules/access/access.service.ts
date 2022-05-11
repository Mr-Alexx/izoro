/**
 * @description 菜单服务
 * @module modules/menu/service
 * @author 潜
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Access } from './access.entity';
import _ from '@/utils';
import { MenuNodeTypes, MenuStatus } from '@/interfaces/status.interface';
import { AccessEditDto, AccessQueryDto } from './access.dto';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private readonly menuRepository: Repository<Access>,
  ) {}

  async findAll(query: any): Promise<any> {
    const queryBuilder = this.menuRepository
      .createQueryBuilder('access')
      .where('access.status != :status', { status: MenuStatus.deleted });

    if (_.isObject(query)) {
      const { roleIds } = query;
      if (_.isArray(roleIds)) {
        queryBuilder.leftJoinAndSelect('access.roles', 'role', 'role.id IN (:ids)', { ids: roleIds });
      }
    }

    try {
      // .addOrderBy('access.id', 'DESC')
      const data = await queryBuilder.orderBy('access.sort', 'ASC').getMany();
      // 设置checked属性
      data.forEach(v => {
        v['checked'] = v.roles ? v.roles.length > 0 : false;
        delete v.roles;
      });
      return data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMenuTree(query: AccessQueryDto): Promise<any[]> {
    let newQuery;
    if (_.isString(query?.roleIds)) {
      newQuery = {
        roleIds: query.roleIds.split(',').map(Number),
      };
    }

    const data = await this.findAll(newQuery);
    return this.makeTree(data);
  }

  async findButtonsByMenuId(id: number): Promise<Access[]> {
    const data = await this.menuRepository
      .createQueryBuilder('access')
      .where({
        pid: id,
        status: Not(MenuStatus.deleted),
        node_type: MenuNodeTypes.button,
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
        .createQueryBuilder('access')
        .select('access.menu_code')
        .leftJoin('access.roles', 'role')
        .where('access.node_type = :type', { type: MenuNodeTypes.button })
        .andWhere('role.id in (:roles)', { roles })
        .getMany();
      // return data.map(v => v.menu_code);
      return [];
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
   * @param { Partial<Menu> } access
   * @author 潜
   * @return { Promise<number> }
   */
  async create(access: Partial<Access>): Promise<number> {
    if (!_.isObject(access)) {
      throw new HttpException('节点必须为一个对象！', HttpStatus.BAD_REQUEST);
    }
    // 权限不允许相同的出现
    // const existMenu = await this.menuRepository.findOne({
    //   menu_code: menu.menu_code,
    //   pid: menu.pid,
    //   node_type: MenuNodeTypes.button,
    // });
    // if (existMenu) {
    //   throw new HttpException('同一父节点下的子节点编码不能重复！', HttpStatus.BAD_REQUEST);
    // }

    try {
      if (access.pid) {
        const parentMenu = await this.menuRepository.findOne({ id: access.pid });
        if (!parentMenu) {
          throw new HttpException('未查找到对应的父节点！', HttpStatus.NOT_FOUND);
        }
      }

      const newAccess = await this.menuRepository.create(access);
      await this.menuRepository.save(newAccess);
      return Promise.resolve(newAccess.id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateById(access: AccessEditDto): Promise<Access> {
    if (!access.id) {
      throw new HttpException('menu id 必须有！', HttpStatus.BAD_REQUEST);
    }
    const oldMenu = await this.menuRepository.findOne(access.id);
    if (!oldMenu) {
      throw new HttpException('找不到对应id的menu！', HttpStatus.NOT_FOUND);
    }

    const newAccess = await this.menuRepository.merge(oldMenu, access);
    return this.menuRepository.save(newAccess);
  }

  /**
   * @description 删除菜单及其子菜单 - 软删（状态改为-1）
   * @param { number } id 菜单id
   * @return { Promise<string> }
   */
  async softDeleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('access id 必须有！', HttpStatus.BAD_REQUEST);
    }
    // 删除对应id行，并且删除pid为id的所有行
    try {
      await this.menuRepository
        .createQueryBuilder('access')
        .update()
        .set({ status: 0 })
        .where('access.id = :id', { id })
        .orWhere('access.pid = :id', { id })
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
      throw new HttpException('access id 必须有！', HttpStatus.BAD_REQUEST);
    }
    // 删除对应id行，并且删除pid为id的所有行
    try {
      await this.menuRepository
        .createQueryBuilder('access')
        .where('access.id = :id', { id })
        .orWhere('access.pid = :id', { id })
        .delete()
        .execute();
      return `删除成功！`;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
