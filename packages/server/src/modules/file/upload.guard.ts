/**
 * @format
 * @description 文件上传守卫
 * @module modules/file/upload.guard
 * @author 潜
 */

import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { pipeline } from 'stream'
import { promisify } from 'util'
import * as fs from 'fs'
import * as path from 'path'
import * as dayjs from 'dayjs'

@Injectable()
export class UploadGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest
    const isMultipart = req.isMultipart()
    if (!isMultipart) {
      throw new HttpException('Body type must be multipart/form-data!', HttpStatus.BAD_REQUEST)
    }
    const file = await req.file()
    if (!file) {
      throw new HttpException('File expected!', HttpStatus.BAD_REQUEST)
    }
    const type = file.mimetype.split('/')[0]
    const date = dayjs().format('YYYY-MM-DD')
    const rootFolderName = type === 'image' ? 'images' : 'files'
    const folder = path.join(process.cwd(), `/public/upload/${rootFolderName}/${date}`)
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }

    try {
      const pump = promisify(pipeline)

      await pump(file.file, fs.createWriteStream(`${folder}/${new Date().getTime()}.${file.filename}`))
      console.log(file)
    } catch (err) {
      console.error(err)
    }

    req['incomingFile'] = file // 将上传的文件对象挂载到req内
    return true
  }
}
