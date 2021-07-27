/**
 * @description 公共模块
 * @module modules/common/module
 * @author 潜
 */

import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
