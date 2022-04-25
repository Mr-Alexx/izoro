import { ApiProperty } from '@nestjs/swagger';

// 创建参数
export class CategoryCreateDto {
  @ApiProperty({ description: '父类id' })
  pid: number;

  @ApiProperty({ description: '分类名称' })
  name: string;

  @ApiProperty({ description: '分类层级' })
  level: number;
}

// 编辑参数
export class CategoryEditDto extends CategoryCreateDto {
  @ApiProperty({ description: '分类id' })
  id: number;
}

// 删除参数
export class CategoryDeleteDto {
  @ApiProperty({ description: '分类id数组' })
  readonly ids: number[];
}
