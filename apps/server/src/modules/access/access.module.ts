/**
 * @description 菜单模块
 * @module modules/menu/module
 * @author 潜
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './access.controller';
import { Access } from './access.entity';
import { AccessService } from './access.service';

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  controllers: [MenuController],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {}
