import { MenuNodeTypes, MenuStatus } from '@/interfaces/status.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 查询参数
export class MenuQueryDto {
  @ApiPropertyOptional({ description: '角色id，多个用英文逗号分隔' })
  roleIds: string;
}

// 创建参数
export class MenuCreateDto {
  @ApiProperty({ description: '菜单名称' })
  name: string;

  @ApiPropertyOptional({ description: '菜单标识' })
  menu_code: string;

  @ApiPropertyOptional({ description: '菜单描述', default: null })
  description: string;

  @ApiProperty({ description: '父id', default: 0 })
  pid: number;

  @ApiProperty({ description: '节点类型，1目录 2页面 3按钮', default: MenuNodeTypes.directory })
  node_type: MenuNodeTypes;

  @ApiPropertyOptional({ description: '图标', default: null })
  icon: string;

  @ApiPropertyOptional({ description: '排序', default: 1 })
  sort: number;

  @ApiProperty({ description: '页面路径', default: null })
  url: string;

  @ApiPropertyOptional({ description: '组件路径', default: null })
  component: string;

  @ApiPropertyOptional({ description: '重定向', default: null })
  redirect: string;

  @ApiProperty({ description: '是否在菜单搜索中隐藏', default: false })
  hideInSearch: boolean;

  @ApiProperty({ description: '是否在菜单中隐藏', default: false })
  hideInMenu: boolean;

  @ApiProperty({ description: '菜单树层级，以便于查询指定层级的菜单', default: 1 })
  level: number;

  @ApiProperty({
    description: '树id的路径，主要用于存放从根节点到当前树的父节点的路径，逗号分隔，想要找父节点会特别快',
    default: null,
  })
  path: string;

  @ApiProperty({ description: '状态，-1删除 0禁用 1正常', default: MenuStatus.normal })
  status: MenuStatus;

  @ApiPropertyOptional({
    description: '绑定的权限列表，所有权限在 @/constants/permission.constant.ts 内定义',
    type: 'simple-array',
  })
  permissions: string[];
}

// 编辑参数
export class MenuEditDto extends MenuCreateDto {
  @ApiProperty({ description: '菜单id' })
  id: number;
}

// 删除参数
export class MenuDeleteDto {
  @ApiProperty({ description: '菜单id' })
  id: number;
}
