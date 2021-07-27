/**
 * @description 权限守卫
 */

import { MenuService } from '@/modules/menu/menu.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly menuService?: MenuService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取当前角色
    // 获取角色的所有权限
    // 获取当前请求权限
    // 比对角色所有权限和当前请求权限
    const request: Request = context.switchToHttp().getRequest();
    const user = (request as any).user;

    if (!user || user?.roles.length === 0) {
      return false;
    }

    // 当前请求所需权限
    const permission = this.reflector.get<string[]>('permission', context.getHandler());
    if (!permission) {
      // 空， 标识不需要权限
      return true;
    }

    // 获取用户角色的权限
    const userPermissions = await this.menuService.findPermissionByRoleIds(user.roles);
    return user && userPermissions.includes(permission);
  }
}
