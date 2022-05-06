/**
 * @description 权限装饰器
 * @module modules/permission/decorator
 * @example controller ...{ @Permission('menu:create') async create () {...} }
 * @author 潜
 */

import { SetMetadata } from '@nestjs/common';

export const Permission = (permission: string): any => SetMetadata('permission', permission);
