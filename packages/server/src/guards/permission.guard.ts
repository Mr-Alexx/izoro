/**
 * @format
 * @description 权限守卫
 * 
 */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} 

  canActivate(context: ExecutionContext): boolean {
    // 获取当前角色
    // 获取角色的所有权限
    // 获取当前请求权限
    // 比对角色所有权限和当前请求权限
    const request: Request = context.switchToHttp().getRequest();
    const user = (request as any).user;
    if (!user) { return false; }
    // 当前请求所需权限
    // const perms = this.reflector.get<string[]>('perms', context.getHandler());
    // if (!perms) {
    //   // 空， 标识不需要权限
    //   return true;
    // }


    // 获取用户角色的权限
    // const userPerms = await .... // 一个接口 到数据库获取用户角色对应的权限

    // const hasPerm = () => userPerms.some((perm) => perms.includes(perm))
    // return user && hasPerm();
  }
}
