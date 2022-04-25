import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TagCreateDto, TagDeleteDto, TagEditDto } from './tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagReposity: Repository<Tag>,
  ) {}

  /**
   * @desc 查找标签列表
   * @return { array }
   */
  async findAll(): Promise<any> {
    const [list, total] = await this.tagReposity.findAndCount();
    return {
      list,
      total,
    };
  }

  /**
   * @desc 创建标签
   */
  async create(tag: TagCreateDto): Promise<null> {
    const { name } = tag;
    const existTag = await this.tagReposity.find({ where: { name } });

    if (existTag.length > 0) {
      throw new HttpException('该标签已存在！', HttpStatus.BAD_REQUEST);
    }
    const newTag = await this.tagReposity.create(tag);
    await this.tagReposity.save(newTag);
    return Promise.resolve(null);
  }

  /**
   * @desc 更新标签信息
   */
  async updateById(tag: TagEditDto): Promise<null> {
    const { id } = tag;
    const oldTag = await this.tagReposity.findOne({ where: { id } });
    const updateTag = await this.tagReposity.merge(oldTag, tag);
    await this.tagReposity.save(updateTag);
    return Promise.resolve(null);
  }

  /**
   * @desc 删除标签
   * https://typeorm.biunav.com/zh/find-options.html#%E8%BF%9B%E9%98%B6%E9%80%89%E9%A1%B9
   */
  async delete(ids: number[]): Promise<null> {
    await this.tagReposity
      .createQueryBuilder()
      .delete()
      .where({ id: In(ids) })
      .execute();
    return Promise.resolve(null);
  }

  async findByIds(ids: any[]): Promise<Array<Tag>> {
    return this.tagReposity.findByIds(ids);
  }
}
