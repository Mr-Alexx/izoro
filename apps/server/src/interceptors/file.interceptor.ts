/**
 * @description 文件上传拦截器
 * @module interceptors/file
 * @author 潜
 * @useage controller @UseInterceptors(FileInterceptor)
 */

import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MultipartFile } from '@/interfaces/global.interface';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = ctx.switchToHttp().getRequest();
    const isMultipart = req.isMultipart();
    if (!isMultipart) {
      throw new HttpException('Body type must be multipart/form-data!', HttpStatus.BAD_REQUEST);
    }
    let file: MultipartFile = await req.file();
    if (!file) {
      throw new HttpException('File expected!', HttpStatus.BAD_REQUEST);
    }
    req['incomingFile'] = file; // 将上传的文件对象挂载到req内
    return next.handle();
  }
}
