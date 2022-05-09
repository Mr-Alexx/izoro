import { MultipartFile } from '@/interfaces/global.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import * as dayjs from 'dayjs';
import * as fs from 'fs';
import * as path from 'path';
import getEtag from '@/utils/qetag';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileReposity: Repository<File>,
  ) {}

  async upload(fileData: MultipartFile): Promise<{ id: number; url: string }> {
    const file = await this.saveFile(fileData);
    const existFile = await this.fileReposity.findOne({ url: file.url });
    if (existFile) {
      return {
        id: existFile.id,
        url: existFile.url,
      };
    }

    const newFile = await this.fileReposity.create(file);
    await this.fileReposity.save(newFile);
    return {
      id: newFile.id,
      url: `http://localhost:3001/${newFile.url.replace('/public/', '')}`,
    };
  }

  /**
   * @description 存储文件-本地
   * @param { MultipartFile } file
   * @return { Promise<Partial<File>> }
   */
  async saveFile(file: MultipartFile): Promise<Partial<File>> {
    const [mimeType, fileType] = file.mimetype.split('/');
    const date = dayjs().format('YYYY-MM-DD');
    const relativeFolder = `/public/upload/${mimeType === 'image' ? 'images' : 'files'}/${date}`;
    const folder = path.join(process.cwd(), relativeFolder);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    try {
      const fileBuffer = await file.toBuffer();
      const newFileName = await getEtag(fileBuffer);
      const absolutePath = path.resolve(__dirname, `../../../${relativeFolder}/${newFileName}`);
      const promises = [];
      if (fileType === 'jpeg' || fileType === 'jpg') {
        // jpg压缩
        promises.push(
          sharp(fileBuffer).jpeg({ quality: 80, chromaSubsampling: '4:4:4' }).toFile(`${absolutePath}.${fileType}`),
        );
      } else if (fileType === 'png') {
        // png压缩
        promises.push(
          sharp(fileBuffer)
            .png({ compressionLevel: 9, quantity: 80, palette: true })
            .toFile(`${absolutePath}.${fileType}`),
        );
      } else {
        // 其它类型的直接保存
        promises.push(sharp(fileBuffer).toFile(`${absolutePath}.${fileType}`));
      }
      if (mimeType === 'image' && !fileType.includes('gif')) {
        // https://sharp.pixelplumbing.com/api-output#webp
        promises.push(sharp(fileBuffer).webp().toFile(`${absolutePath}.webp`));
      }
      await Promise.all(promises);
      file.url = `${relativeFolder}/${newFileName}.${fileType}`;
      return {
        url: `${relativeFolder}/${newFileName}.${fileType}`,
        // oss: '',
        mimetype: file.mimetype,
        original_name: file.filename,
        name: newFileName,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
