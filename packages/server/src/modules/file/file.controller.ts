/**
 * @format
 * @description 文件控制器 文件上传参考 https://stackoverflow.com/questions/63724194/nestjs-file-upload-with-fastify-multipart
 * @module modules/file/controller
 * @author 潜
 */

import { MultipartFile } from '@/interfaces/global.interface'

import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { File } from './file.decorator'
import { FileService } from './file.service'
import { UploadGuard } from './upload.guard'

@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UploadGuard)
  async upload(@File() file: MultipartFile): Promise<any> {
    return await this.fileService.upload(file)
  }
}
