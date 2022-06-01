/**
 * @description 权限服务
 * @module modules/Permission/service
 * @author 潜
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Permission } from './permission.entity';
import _ from '@/utils';
import { PermissionEditDto, PermissionQueryDto } from './permission.dto';
import { COMMON_STATUS_ENUM } from '@/constants/index.constant';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly PermissionRepository: Repository<Permission>,
  ) {}

  async findAll(query: any): Promise<any> {
    const queryBuilder = this.PermissionRepository.createQueryBuilder('permission').where(
      'permission.status = :status',
      { status: COMMON_STATUS_ENUM.normal },
    );

    if (_.isObject(query)) {
      const { roleIds, ids } = query;

      if (_.isArray(ids)) {
        queryBuilder.where({ id: In(ids) });
      }

      if (_.isArray(roleIds)) {
        queryBuilder.leftJoinAndSelect('permission.roles', 'role', 'role.id IN (:ids)', { ids: roleIds });
      }
    }

    try {
      // .addOrderBy('permission.id', 'DESC')
      const [data, total] = await queryBuilder.orderBy('permission.id', 'DESC').getManyAndCount();
      // 设置checked属性
      // data.forEach(v => {
      //   v['checked'] = v.roles ? v.roles.length > 0 : false;
      //   delete v.roles;
      // });
      return {
        data,
        total,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description 创建权限
   * @param { Partial<Permission> } permission
   * @author 潜
   * @return { Promise<number> }
   */
  async create(permission: Partial<Permission>): Promise<number> {
    if (!_.isObject(permission)) {
      throw new HttpException('节点必须为一个对象！', HttpStatus.BAD_REQUEST);
    }
    // 权限不允许相同的出现
    const existPermission = await this.PermissionRepository.findOne({
      code: permission.code,
    });
    if (existPermission) {
      throw new HttpException('该权限编码已经存在，请修改！', HttpStatus.BAD_REQUEST);
    }

    try {
      const newPermission = await this.PermissionRepository.create(permission);
      await this.PermissionRepository.save(newPermission);
      return Promise.resolve(newPermission.id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateById(permission: PermissionEditDto): Promise<Permission> {
    if (!permission.id) {
      throw new HttpException('权限id必须不能为空！', HttpStatus.BAD_REQUEST);
    }
    const oldPermission = await this.PermissionRepository.findOne(permission.id);
    if (!oldPermission) {
      throw new HttpException('找不到对应id的权限！', HttpStatus.NOT_FOUND);
    }

    const newAccess = await this.PermissionRepository.merge(oldPermission, permission);
    return this.PermissionRepository.save(newAccess);
  }

  /**
   * @description 删除权限及其子权限 - 软删（状态改为-1）
   * @param { number } id 权限id
   * @return { Promise<string> }
   */
  async softDeleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('权限id不能为空！', HttpStatus.BAD_REQUEST);
    }
    // 删除对应id行，并且删除pid为id的所有行
    try {
      await this.PermissionRepository.createQueryBuilder('permission')
        .update()
        .set({ status: COMMON_STATUS_ENUM.trash })
        .where('permission.id = :id', { id })
        .execute();
      return `删除成功！`;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description 删除权限 - 硬删（注意）
   * @param { number } id 权限id
   * @return { Promise<string> }
   */
  async deleteById(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('权限id不能为空！', HttpStatus.BAD_REQUEST);
    }
    // 删除对应id行，并且删除pid为id的所有行
    try {
      await this.PermissionRepository.createQueryBuilder('permission')
        .where('permission.id = :id', { id })
        .delete()
        .execute();
      return `删除成功！`;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
