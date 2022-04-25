import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatus } from '@/interfaces/status.interface';

// 查询参数
export class UserQueryDto {
  @ApiPropertyOptional({
    description: '用户状态',
    example: UserStatus.active,
  })
  readonly status: UserStatus;

  @ApiPropertyOptional({
    description: '用户名，模糊搜索',
    example: 'qian',
  })
  readonly account: string;

  @ApiProperty({
    description: '每页条数',
    example: 20,
  })
  readonly limit: number;

  @ApiProperty({
    description: '页码',
    example: 1,
  })
  readonly page: number;
}

// 创建参数
export class UserCreateDto {
  @ApiProperty({ maxLength: 100, description: '账号' })
  account: string;

  @ApiProperty({ maxLength: 100, description: '密码' })
  password: string;

  @ApiProperty({ description: '角色id数组' })
  roles: number[];

  @ApiPropertyOptional({ maxLength: 100, description: '昵称' })
  nickname: string;

  @ApiPropertyOptional({ maxLength: 255, description: '头像' })
  avatar: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiPropertyOptional({ description: '手机号码' })
  phone_number: string;

  @ApiProperty({
    type: 'enum',
    enum: UserStatus,
    description: '账号状态：0 禁用，1 启用',
  })
  status: UserStatus;
}

// 编辑参数
export class UserEditDto extends UserCreateDto {
  @ApiProperty({ description: '用户id' })
  readonly id: number;
}
