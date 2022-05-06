import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 查询参数
export class RoleQueryDto {
  @ApiProperty({ description: '页码' })
  readonly page: number;

  @ApiProperty({ description: '每页条数' })
  readonly limit: number;

  @ApiPropertyOptional({ description: '角色名称，模糊查询' })
  readonly name: string;

  @ApiPropertyOptional({ description: '角色状态状态，0禁用 1启用' })
  status: number;
}

// 创建参数
export class RoleCreateDto {
  @ApiProperty({ description: '角色名称' })
  name: string;

  @ApiPropertyOptional({ description: '描述' })
  description: string;

  @ApiProperty({ description: '状态，0 禁用，1 启用' })
  status: number;
}

// 编辑参数
export class RoleEditDto extends RoleCreateDto {
  @ApiProperty({ description: '角色id' })
  id: number;
}

// 删除参数
export class RoleDeleteDto {
  @ApiProperty({ description: '角色id数组' })
  readonly ids: number[];
}
