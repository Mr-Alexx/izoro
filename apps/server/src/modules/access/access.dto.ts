import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 查询参数
export class AccessQueryDto {
  @ApiPropertyOptional({ description: '角色id，多个用英文逗号分隔' })
  roleIds: string;
}

// 创建参数
export class AccessCreateDto {
  @ApiProperty({ description: '菜单名称' })
  name: string;

  @ApiPropertyOptional({ description: '父id', default: 0 })
  pid: number;

  @ApiPropertyOptional({ description: '图标', default: null })
  icon: string;

  @ApiPropertyOptional({ description: '排序', default: 1 })
  sort: number;

  @ApiProperty({ description: '路由地址', default: null })
  path: string;

  @ApiPropertyOptional({ description: '组件路径', default: null })
  component: string;

  @ApiProperty({ description: '是否在菜单搜索中隐藏', default: 0 })
  hide_in_menu: number;

  @ApiProperty({ description: '状态， 0删除 1正常' })
  status: number;

  @ApiPropertyOptional({
    description: '绑定的权限列表，所有权限在 @/constants/permission.constant.ts 内定义',
    type: 'simple-array',
  })
  permissions: string[];
}

// 编辑参数
export class AccessEditDto extends AccessCreateDto {
  @ApiProperty({ description: '菜单id' })
  id: number;
}

// 删除参数
export class AccessDeleteDto {
  @ApiProperty({ description: '菜单id' })
  id: number;
}
