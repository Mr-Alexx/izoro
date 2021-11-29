/**
 * @description 文件上传拦截器
 * @module interceptors/file
 * @author 潜
 * @useage controller @UseInterceptors(FileInterceptor)
 */

import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { MultipartFile } from '@/interfaces/global.interface';
import { pipeline } from 'stream';
import { promisify } from 'util';
import * as dayjs from 'dayjs';
import * as fs from 'fs';
import * as path from 'path';
import getEtag from '@/utils/qetag';
const pump = promisify(pipeline);

@Injectable()
export class FileInterceptor implements NestInterceptor {
  async intercept(ctx: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest;
    const isMultipart = req.isMultipart();
    if (!isMultipart) {
      throw new HttpException('Body type must be multipart/form-data!', HttpStatus.BAD_REQUEST);
    }
    let file: MultipartFile = await req.file();
    if (!file) {
      throw new HttpException('File expected!', HttpStatus.BAD_REQUEST);
    }

    file['size'] = file.file['_readableState'].length; // 文件大小，字节
    try {
      file = await this.save(file);
    } catch (err) {
      throw new HttpException(`Save file failed. ${err.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    req['incomingFile'] = file; // 将上传的文件对象挂载到req内
    return next.handle();
  }

  /**
   * @description 存储文件-本地
   * @param { MultipartFile } file
   * @return { Promise<MultipartFile> }
   */
  async save(file: MultipartFile): Promise<MultipartFile> {
    const types = file.mimetype.split('/');
    const date = dayjs().format('YYYY-MM-DD');
    const relativeFolder = `/public/upload/${types[0] === 'image' ? 'images' : 'files'}/${date}`;
    const folder = path.join(process.cwd(), relativeFolder);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    // 先存文件，再重命名
    // 直接重命名存储的形式，调用file.toBuffer()方法会损坏文件 -- 往后研究
    try {
      const oldFileName = `${folder}/${file.filename}`;
      await pump(file.file, fs.createWriteStream(oldFileName));

      const newFileName = await getEtag(oldFileName);

      file.name = newFileName;
      file.url = `${relativeFolder}/${newFileName}.${types[1]}`;

      fs.renameSync(oldFileName, `${folder}/${newFileName}.${types[1]}`);
      return file;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
