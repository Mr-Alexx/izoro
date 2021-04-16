/**
 * @format
 * @description 文件控制器 文件上传参考 https://stackoverflow.com/questions/63724194/nestjs-file-upload-with-fastify-multipart
 * @module modules/file/controller
 * @author 潜
 */

import { MultipartFile } from '@/interfaces/global.interface'
import { UploadFile } from '@/decorators/file.decorator'
import { Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FileService } from './file.service'
import { FileInterceptor } from '@/interceptors/file.interceptor'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'

@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor)
  @UseGuards(JwtAuthGuard)
  async upload(@UploadFile() file: MultipartFile): Promise<any> {
    return await this.fileService.upload(file)
  }
}
