/**
 * 聚合多个装饰器的 装饰器
 * @author 潜
 */

import { applyDecorators } from '@nestjs/common';
import { Column, ColumnOptions } from 'typeorm';
import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';

/**
 * @description 组合swagger的 @Column 和 @ApiProperty 的装饰器
 * 为的是entity调用的时候，mysql可以生成注释，而且文档生成响应的时候也可以附带注释。
 * 如果不单独使用，会配置相同的注释
 * @useage
 * @doc https://docs.nestjs.cn/8/customdecorators?id=装饰器聚合
 */
export const ApiPropertyColumn = (options?: ColumnOptions & ApiPropertyOptions) => {
  return applyDecorators(Column(options), ApiProperty({ ...options, description: options.comment }));
};

/**
 * 同上，但是是可选形式
 */
export const ApiPropertyOptionalColumn = (options?: ColumnOptions & ApiPropertyOptions) => {
  return applyDecorators(Column(options), ApiPropertyOptional({ ...options, description: options.comment }));
};
