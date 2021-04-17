/**
 * @format
 * @description 菜单模块
 * @module modules/menu/module
 * @author 潜
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuController } from './menu.controller'
import { Menu } from './menu.entity'
import { MenuService } from './menu.service'

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService]
})
export class MenuModule {}
