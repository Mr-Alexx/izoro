/**
 * @description 文件上传守卫
 * @module modules/file/upload.guard
 * @author 潜
 */

import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UploadGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const isMultipart = req.isMultipart();
    if (!isMultipart) {
      throw new HttpException('Body type must be multipart/form-data!', HttpStatus.BAD_REQUEST);
    }
    const file = await req.file();
    if (!file) {
      throw new HttpException('File expected!', HttpStatus.BAD_REQUEST);
    }

    req['incomingFile'] = file; // 将上传的文件对象挂载到req内
    return true;
  }
}
