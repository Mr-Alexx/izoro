/**
 * @description 公共模块
 * @module modules/common/module
 * @author 潜
 */

import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';

@Module({
  controllers: [CommonController],
})
export class CommonModule {}
