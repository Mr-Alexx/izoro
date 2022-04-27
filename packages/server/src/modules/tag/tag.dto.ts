import { ApiProperty } from '@nestjs/swagger';

// 创建参数
export class TagCreateDto {
  @ApiProperty({ description: '标签名称' })
  name: string;
}

// 编辑参数
export class TagEditDto extends TagCreateDto {
  @ApiProperty({ description: '标签id' })
  id: number;
}

// 删除参数
export class TagDeleteDto {
  @ApiProperty({ description: '标签id数组' })
  readonly ids: number[];
}
