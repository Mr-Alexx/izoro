import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Rent } from './rent.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private readonly rentReposity: Repository<Rent>,
  ) {}

  /**
   * @desc 查找标签列表
   * @return { array }
   */
  async findAll(query: Record<string, any>): Promise<any> {
    // let { page, limit } = query;
    // page = page || 1;
    // limit = limit || 20;

    const [list, total] = await this.rentReposity.findAndCount();
    return {
      list,
      total,
    };
  }

  /**
   * @desc 创建发布信息
   * 支持批量创建
   */
  async create(rents: Rent[]): Promise<any> {
    try {
      await this.rentReposity.createQueryBuilder().insert().into(Rent).values(rents).execute();
      return null;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @desc 更新标签信息
   */
  async updateById(rentItem: Record<string, any>): Promise<null> {
    const { id } = rentItem;
    const oldTag = await this.rentReposity.findOne({ where: { id } });
    const updateTag = await this.rentReposity.merge(oldTag, rentItem);
    await this.rentReposity.save(updateTag);
    return Promise.resolve(null);
  }

  /**
   * @desc 删除标签
   * https://typeorm.biunav.com/zh/find-options.html#%E8%BF%9B%E9%98%B6%E9%80%89%E9%A1%B9
   */
  async delete(ids: number[]): Promise<null> {
    await this.rentReposity
      .createQueryBuilder()
      .delete()
      .where({ id: In(ids) })
      .execute();
    return Promise.resolve(null);
  }

  async findByIds(ids: any[]): Promise<Array<Rent>> {
    return this.rentReposity.findByIds(ids);
  }
}
