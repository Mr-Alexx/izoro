/**
 * @format
 * @description 文件模块
 * @module modules/file/module
 * @author 潜
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileController } from './file.controller'
import { File } from './file.entity'
import { FileService } from './file.service'

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
