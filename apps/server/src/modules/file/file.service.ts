import { MultipartFile } from '@/interfaces/global.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileReposity: Repository<File>,
  ) {}

  async upload(file: MultipartFile): Promise<{ id: number; url: string }> {
    const existFile = await this.fileReposity.findOne({ url: file.url });
    if (existFile) {
      return {
        id: existFile.id,
        url: existFile.url,
      };
    }

    const obj: Partial<File> = {
      name: file.name,
      mimetype: file.mimetype,
      url: file.url,
      size: file.size,
      original_name: file.filename,
    };
    const newFile = await this.fileReposity.create(obj);
    await this.fileReposity.save(newFile);

    return {
      id: newFile.id,
      url: newFile.url,
    };
  }
}
