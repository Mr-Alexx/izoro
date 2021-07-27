/**
 * @format
 * @description 菜单服务
 * @module modules/menu/service
 * @author 潜
 */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import _ from '@/utils';
import { PermissionsType } from '@/interfaces/permission.interface';

@Injectable()
export class CommonService {
  getPermissionsType(): { label: string; value: any }[] {
    return Object.keys(PermissionsType).map(key => ({ label: key, value: PermissionsType[key] }));
  }
}
