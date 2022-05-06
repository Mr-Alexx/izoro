/**
 * @description 菜单控制器
 * @module modules/common/controller
 * @author 潜
 */

import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';

@Controller('common')
@ApiTags('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({ summary: 'Map列表' })
  @Get('map-list')
  async findByType(@Query('type') type: string): Promise<any> {
    let result;
    switch (type) {
      case 'permissions':
        // 权限配置映射集
        result = this.commonService.getPermissionsType();
        break;
    }
    return {
      data: result,
      total: result.length,
    };
  }
}
