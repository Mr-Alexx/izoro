import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 查询参数
export class PermissionQueryDto {
  @ApiPropertyOptional({ description: '角色id，多个用英文逗号分隔' })
  roleIds: string;
}

// 创建参数
export class PermissionCreateDto {
  @ApiProperty({ description: '权限名称' })
  name: string;

  @ApiProperty({ description: '权限编码' })
  code: string;

  @ApiProperty({ description: '状态， 0废弃 1正常' })
  status: number;
}

// 编辑参数
export class PermissionEditDto extends PermissionCreateDto {
  @ApiProperty({ description: '权限id' })
  id: number;
}

// 删除参数
export class PermissionDeleteDto {
  @ApiProperty({ description: '权限id' })
  id: number;
}
