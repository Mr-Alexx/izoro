/** @format */

import { MultipartFile } from '@/interfaces/global.interface'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { File } from './file.entity'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileReposity: Repository<File>
  ) {}

  upload(file: MultipartFile): Promise<{ id: string; url: string }> {
    console.log(file)
    // const fileObj = await this.fileReposity.create({
    //   name: file['formatName'],
    //   type: file.mimetype,

    // })
    return Promise.resolve({ id: 'x', url: 'x' })
  }
}
